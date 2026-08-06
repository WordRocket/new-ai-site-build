// Pre-build script: generates public/chatbot-embeddings.json from real
// content collections + site config so the chatbot widget has actual
// site data to search against. Run before `astro build`.
//
// Data sources (in priority order):
//   1. site-config.json — business name, contact, hours, description
//   2. content/pages/*.md — page descriptions + FAQ entries
//   3. content/services/*.md — service titles, descriptions, FAQ
//   4. content/locations/*.md — location titles, descriptions, FAQ
//   5. content/blog/*.md — post titles + descriptions
//   6. content/projects/*.md — project titles + descriptions
//   7. content/categories/*.md — category titles + descriptions
//
// Each chunk: { id, title, section, url, text }

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join, basename, sep } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');

// ── Helpers ────────────────────────────────────────────────────────

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, 'utf-8'));
  } catch {
    return null;
  }
}

// Minimal frontmatter parser: extracts YAML frontmatter as a flat
// object (good enough for our content schemas — no nesting needed).
function parseFrontmatter(raw) {
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!fmMatch) return { data: {}, body: raw };

  const yaml = fmMatch[1];
  const body = fmMatch[2].trim();
  const data = {};

  let currentArray = null;

  for (const line of yaml.split('\n')) {
    // Array item start: "- question: ..." or "- title: ..."
    const arrayItemMatch = line.match(/^\s*-\s+(\w+):\s*(.*)$/);
    if (arrayItemMatch) {
      if (currentArray) {
        currentArray.push({});
        currentArray[currentArray.length - 1][arrayItemMatch[1]] = arrayItemMatch[2];
      }
      continue;
    }

    // Continuation of an array item: "  answer: ..."
    const continuationMatch = line.match(/^\s+(\w+):\s*(.*)$/);
    if (continuationMatch && currentArray && currentArray.length > 0) {
      const last = currentArray[currentArray.length - 1];
      if (!(continuationMatch[1] in last)) {
        last[continuationMatch[1]] = continuationMatch[2];
      }
      continue;
    }

    // Key: value (stops array tracking)
    const kvMatch = line.match(/^(\w+):\s*(.*)$/);
    if (kvMatch) {
      currentArray = null;
      const key = kvMatch[1];
      let val = kvMatch[2].trim();

      // Inline array: [a, b, c]
      if (val.startsWith('[') && val.endsWith(']')) {
        val = val.slice(1, -1).split(',').map(s => s.trim()).filter(Boolean);
        data[key] = val;
        continue;
      }

      // Empty value — might be start of a block array
      if (val === '') {
        data[key] = [];
        currentArray = data[key];
        continue;
      }

      // Strip quotes
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      data[key] = val;
    }
  }

  return { data, body };
}

function stripMd(md) {
  return (md || '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')   // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links → text
    .replace(/^#{1,6}\s+/gm, '')             // headings
    .replace(/[*_`~>#-]/g, ' ')              // markdown chars
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanText(text, maxLen = 500) {
  const cleaned = stripMd(text);
  return cleaned.length > maxLen ? cleaned.slice(0, maxLen) + '…' : cleaned;
}

// ── Content readers ────────────────────────────────────────────────

function readContentDir(dirName, urlPrefix) {
  const dir = join(ROOT, 'src', 'content', dirName);
  if (!existsSync(dir)) return [];

  const chunks = [];
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;
    const slug = basename(file, file.endsWith('.mdx') ? '.mdx' : '.md');
    if (slug === '.gitkeep') continue;

    const raw = readFileSync(join(dir, file), 'utf-8');
    const { data, body } = parseFrontmatter(raw);
    const title = data.title || slug;
    const url = `${urlPrefix}/${slug}`;

    // Main description chunk
    const desc = (data.description || '').trim() || cleanText(body);
    if (desc) {
      chunks.push({
        id: `${dirName}-${slug}`,
        title,
        section: dirName.charAt(0).toUpperCase() + dirName.slice(1),
        url,
        text: cleanText(desc, 600),
      });
    }

    // Short description (services have both)
    if (data.shortDescription) {
      chunks.push({
        id: `${dirName}-${slug}-short`,
        title: `${title} — Overview`,
        section: dirName.charAt(0).toUpperCase() + dirName.slice(1),
        url,
        text: cleanText(data.shortDescription, 300),
      });
    }

    // FAQ entries
    if (Array.isArray(data.faq)) {
      data.faq.forEach((item, i) => {
        if (item.question && item.answer) {
          chunks.push({
            id: `${dirName}-${slug}-faq-${i}`,
            title: item.question,
            section: 'FAQ',
            url,
            text: cleanText(item.answer, 400),
          });
        }
      });
    }

    // Features
    if (Array.isArray(data.features)) {
      data.features.forEach((item, i) => {
        if (item.title && item.desc) {
          chunks.push({
            id: `${dirName}-${slug}-feat-${i}`,
            title: item.title,
            section: title,
            url,
            text: cleanText(item.desc, 300),
          });
        }
      });
    }

    // Process steps
    if (Array.isArray(data.steps)) {
      data.steps.forEach((item, i) => {
        if (item.title && item.desc) {
          chunks.push({
            id: `${dirName}-${slug}-step-${i}`,
            title: item.title,
            section: title,
            url,
            text: cleanText(item.desc, 300),
          });
        }
      });
    }
  }
  return chunks;
}

function readPages() {
  const dir = join(ROOT, 'src', 'content', 'pages');
  if (!existsSync(dir)) return [];

  const chunks = [];
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;
    const slug = basename(file, file.endsWith('.mdx') ? '.mdx' : '.md');

    const raw = readFileSync(join(dir, file), 'utf-8');
    const { data, body } = parseFrontmatter(raw);
    const title = data.title || slug;
    // Pages with known slugs get clean URLs
    const knownSlugs = ['home', 'about', 'contact', 'faq', 'privacy-policy', 'terms-and-conditions'];
    const url = knownSlugs.includes(slug) ? `/${slug === 'home' ? '' : slug}` : `/${slug}`;

    const desc = (data.description || '').trim() || cleanText(body);
    if (desc) {
      chunks.push({
        id: `page-${slug}`,
        title,
        section: 'Pages',
        url: url === '/home' ? '/' : url,
        text: cleanText(desc, 600),
      });
    }

    // Feature grid
    if (Array.isArray(data.featureGrid)) {
      data.featureGrid.forEach((item, i) => {
        if (item.title && item.desc) {
          chunks.push({
            id: `page-${slug}-feat-${i}`,
            title: item.title,
            section: title,
            url: url === '/home' ? '/' : url,
            text: cleanText(item.desc, 300),
          });
        }
      });
    }

    // Process steps
    if (Array.isArray(data.processSteps)) {
      data.processSteps.forEach((item, i) => {
        if (item.title && item.desc) {
          chunks.push({
            id: `page-${slug}-step-${i}`,
            title: item.title,
            section: title,
            url: url === '/home' ? '/' : url,
            text: cleanText(item.desc, 300),
          });
        }
      });
    }

    // FAQ entries
    if (Array.isArray(data.faq)) {
      data.faq.forEach((item, i) => {
        if (item.question && item.answer) {
          chunks.push({
            id: `page-${slug}-faq-${i}`,
            title: item.question,
            section: 'FAQ',
            url: url === '/home' ? '/' : url,
            text: cleanText(item.answer, 400),
          });
        }
      });
    }

    // FAQ categories (structured FAQ)
    if (Array.isArray(data.faqCategories)) {
      data.faqCategories.forEach((cat, ci) => {
        if (Array.isArray(cat.items)) {
          cat.items.forEach((item, i) => {
            if (item.question && item.answer) {
              chunks.push({
                id: `page-${slug}-faqcat-${ci}-${i}`,
                title: item.question,
                section: 'FAQ',
                url: url === '/home' ? '/' : url,
                text: cleanText(item.answer, 400),
              });
            }
          });
        }
      });
    }
  }
  return chunks;
}

function readSiteConfig(config) {
  const chunks = [];
  const name = config.name || 'Our Business';
  const section = 'About';

  // Business overview
  if (config.description) {
    chunks.push({
      id: 'cfg-overview',
      title: `About ${name}`,
      section,
      url: '/about',
      text: cleanText(`${config.description}${config.tagline ? ' ' + config.tagline : ''}`, 500),
    });
  }

  // Contact — phone
  if (config.phone) {
    chunks.push({
      id: 'cfg-phone',
      title: 'Contact Phone',
      section: 'Contact',
      url: '/contact',
      text: `You can reach ${name} by phone at ${config.phone}.`,
    });
  }

  // Contact — email
  if (config.email) {
    chunks.push({
      id: 'cfg-email',
      title: 'Contact Email',
      section: 'Contact',
      url: '/contact',
      text: `Send an email to ${config.email} and we will get back to you promptly.`,
    });
  }

  // Contact — address
  const addressParts = [config.address, config.city, config.state, config.zip].filter(Boolean);
  if (addressParts.length > 0) {
    chunks.push({
      id: 'cfg-address',
      title: 'Our Address',
      section: 'Contact',
      url: '/contact',
      text: `Visit us at ${addressParts.join(', ')}.`,
    });
  }

  // Business hours
  if (Array.isArray(config.openingHours) && config.openingHours.length > 0) {
    const hoursText = config.openingHours
      .map(h => `${h.days || h.day || ''}: ${h.hours || h.time || ''}`)
      .filter(t => t.trim() !== ': ')
      .join('; ');
    if (hoursText) {
      chunks.push({
        id: 'cfg-hours',
        title: 'Business Hours',
        section: 'Hours',
        url: '/contact',
        text: `Our business hours: ${hoursText}`,
      });
    }
  }

  // Areas served
  if (Array.isArray(config.serviceAreas) && config.serviceAreas.length > 0) {
    chunks.push({
      id: 'cfg-areas',
      title: 'Areas We Serve',
      section: 'Service Area',
      url: '/',
      text: `We serve: ${config.serviceAreas.join(', ')}.`,
    });
  }

  // Trust signals
  if (config.yearsInBusiness) {
    chunks.push({
      id: 'cfg-years',
      title: 'Years in Business',
      section: 'About',
      url: '/about',
      text: `We have been in business for ${config.yearsInBusiness} years.`,
    });
  }

  if (config.clientsServed) {
    chunks.push({
      id: 'cfg-clients',
      title: 'Clients Served',
      section: 'About',
      url: '/about',
      text: `We have served ${config.clientsServed} clients.`,
    });
  }

  // Social links
  const socials = [
    { key: 'facebookUrl', label: 'Facebook' },
    { key: 'linkedinUrl', label: 'LinkedIn' },
    { key: 'instagramUrl', label: 'Instagram' },
    { key: 'twitterUrl', label: 'Twitter' },
  ];
  const socialLinks = socials
    .filter(s => config[s.key])
    .map(s => `${s.label}: ${config[s.key]}`);
  if (socialLinks.length > 0) {
    chunks.push({
      id: 'cfg-social',
      title: 'Social Media',
      section: 'Contact',
      url: '/contact',
      text: `Connect with us — ${socialLinks.join('; ')}.`,
    });
  }

  return chunks;
}

// ── Main ───────────────────────────────────────────────────────────

function main() {
  const config = readJson(join(ROOT, 'src', 'data', 'site-config.json'));
  if (!config) {
    console.warn('[chatbot-embeddings] No site-config.json found, skipping.');
    return;
  }

  const chunks = [
    ...readSiteConfig(config),
    ...readPages(),
    ...readContentDir('services', '/services'),
    ...readContentDir('locations', '/locations'),
    ...readContentDir('blog', '/blog'),
    ...readContentDir('projects', '/our-work'),
    ...readContentDir('categories', '/category'),
  ];

  if (chunks.length === 0) {
    console.warn('[chatbot-embeddings] No content found, writing empty array.');
    writeFileSync(join(ROOT, 'public', 'chatbot-embeddings.json'), '[]');
    return;
  }

  // Deduplicate by id (keep first occurrence)
  const seen = new Set();
  const deduped = chunks.filter(c => {
    if (seen.has(c.id)) return false;
    seen.add(c.id);
    return true;
  });

  const outPath = join(ROOT, 'public', 'chatbot-embeddings.json');
  writeFileSync(outPath, JSON.stringify(deduped, null, 2));
  console.log(`[chatbot-embeddings] Generated ${deduped.length} chunks → public/chatbot-embeddings.json`);
}

main();
