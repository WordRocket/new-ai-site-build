import { getCollection, type CollectionEntry } from 'astro:content';

export interface ResolvedAuthor {
  id: string;
  name: string;
  bio?: string;
  avatar?: string;
  role?: string;
  website?: string;
  twitter?: string;
  linkedin?: string;
  /** Whether this author resolves to a real profile entry (vs. a legacy inline name). */
  hasProfile: boolean;
}

const cache = new Map<string, CollectionEntry<'authors'>[]>();

async function allAuthors(): Promise<CollectionEntry<'authors'>[]> {
  if (cache.has('all')) return cache.get('all')!;
  const list = await getCollection('authors').catch(() => []);
  cache.set('all', list);
  return list;
}

/** Resolve an author by the `authorId` slug reference, falling back to a name match. */
export async function resolveAuthor(opts: {
  authorId?: string;
  author?: string;
  authorBio?: string;
  authorImage?: string;
}): Promise<ResolvedAuthor> {
  const list = await allAuthors();

  let entry: CollectionEntry<'authors'> | undefined;
  if (opts.authorId) {
    entry = list.find((a) => a.slug === opts.authorId);
  }
  if (!entry && opts.author) {
    const byName = list.find((a) => a.data.name.toLowerCase() === opts.author!.toLowerCase());
    if (byName) entry = byName;
  }

  if (entry) {
    const d = entry.data;
    return {
      id: entry.slug,
      name: d.name,
      bio: d.bio,
      avatar: d.avatar,
      role: d.role,
      website: d.website,
      twitter: d.twitter,
      linkedin: d.linkedin,
      hasProfile: true,
    };
  }

  return {
    id: '',
    name: opts.author || 'Staff',
    bio: opts.authorBio,
    avatar: opts.authorImage,
    hasProfile: false,
  };
}

export async function listAuthors(): Promise<ResolvedAuthor[]> {
  const list = await allAuthors();
  return list
    .sort((a, b) => (a.data.order ?? 100) - (b.data.order ?? 100))
    .map((a) => ({
      id: a.slug,
      name: a.data.name,
      bio: a.data.bio,
      avatar: a.data.avatar,
      role: a.data.role,
      website: a.data.website,
      twitter: a.data.twitter,
      linkedin: a.data.linkedin,
      hasProfile: true,
    }));
}
