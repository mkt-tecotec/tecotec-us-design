import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { validate } from './validate.mjs';

const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'));
const collator = new Intl.Collator('vi');

export function loadData(root) {
  const d = join(root, 'data');
  const pages = readJson(join(d, 'pages.json'));
  const mediums = readJson(join(d, 'mediums.json'));
  const artists = readJson(join(d, 'artists.json'));
  const artworks = readJson(join(d, 'artworks.json'));
  const slots = readJson(join(d, 'image-slots.json'));
  const imagesPath = join(d, 'images.json');
  const images = existsSync(imagesPath) ? readJson(imagesPath) : {};

  validate({ pages, mediums, artists, artworks, images, slots });

  const mediumBySlug = Object.fromEntries(mediums.map((m) => [m.slug, m]));
  const artistBySlug = Object.fromEntries(artists.map((a) => [a.slug, a]));
  const pageById = Object.fromEntries(pages.map((p) => [p.id, p]));

  const worksSorted = [...artworks].sort((a, b) => collator.compare(a.tw_inventory_no, b.tw_inventory_no));
  const worksByMedium = {};
  const worksByArtist = {};
  const anonymousWorks = [];
  const sets = {};
  for (const w of worksSorted) {
    (worksByMedium[w.medium] ||= []).push(w);
    if (w.tw_creator) (worksByArtist[w.tw_creator] ||= []).push(w);
    else anonymousWorks.push(w);
    if (w.tw_part_of_set) (sets[w.tw_part_of_set] ||= []).push(w);
  }
  for (const k of Object.keys(sets)) sets[k].sort((a, b) => a.tw_set_position - b.tw_set_position);

  const approvedArtists = artists
    .filter((a) => a.artist_status === 'approved')
    .sort((a, b) => collator.compare(a.name, b.name));
  const listedArtists = artists
    .filter((a) => a.artist_status !== 'draft')
    .sort((a, b) => collator.compare(a.name, b.name));

  const creatorOf = (w) => (w.tw_creator ? artistBySlug[w.tw_creator] : null);
  const setOf = (w) => (w.tw_part_of_set ? sets[w.tw_part_of_set] : null);
  const workBySlug = Object.fromEntries(artworks.map((w) => [w.slug, w]));

  const counts = {
    artworks: artworks.length,
    artists_approved: approvedArtists.length,
    artists_total: artists.length,
    anonymous: anonymousWorks.length,
    sets: Object.keys(sets).length,
    mediums_public: mediums.filter((m) => m.public).length,
    pages: pages.length,
    pages_full: pages.filter((p) => p.status === 'full').length,
    pages_variant: pages.filter((p) => p.status === 'variant').length,
    pages_stub: pages.filter((p) => p.status === 'stub').length,
    images: Object.keys(images).length
  };

  return {
    pages, mediums, artists, artworks, slots, images,
    mediumBySlug, artistBySlug, pageById, workBySlug,
    worksSorted, worksByMedium, worksByArtist, anonymousWorks, sets,
    approvedArtists, listedArtists, creatorOf, setOf, counts
  };
}
