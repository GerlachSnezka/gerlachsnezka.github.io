import { getCollection, type CollectionEntry } from "astro:content";

type WriteUp = CollectionEntry<"writeups"> & {
  ctf: CollectionEntry<"ctfs">;
  category: string;
};

export async function parseWriteUp(
  entry: CollectionEntry<"writeups">,
): Promise<WriteUp> {
  const [ctfName, year, category] = entry.slug.split("/");

  const ctf = (await getCollection("ctfs")).find(
    (ctf) =>
      ctf.data.title.toLowerCase() === ctfName &&
      ctf.data.dateStart.getFullYear() === Number(year),
  );

  if (!ctf) {
    throw new Error(`CTF not found for writeup: ${entry.slug}`);
  }

  return {
    ...entry,
    ctf: ctf,
    category: category,
  };
}
