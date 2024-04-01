import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { HOME } from "@consts";

type Context = {
  site: string;
};

export async function GET(context: Context) {
  const ctfs = await getCollection("ctfs");

  const items = [...ctfs].sort(
    (a, b) =>
      new Date(b.data.dateStart).valueOf() -
      new Date(a.data.dateStart).valueOf(),
  );

  return rss({
    title: HOME.TITLE,
    description: HOME.DESCRIPTION,
    site: context.site,
    items: items.map((item) => ({
      title: item.data.title,
      description: item.data.description,
      pubDate: item.data.dateStart,
      link: `/${item.collection}/${item.slug}/`,
    })),
  });
}
