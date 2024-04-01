import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
  }),
});

const writeups = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().optional(),
    date: z.coerce.date().optional(),
    points: z.number(),
    solves: z.number().default(0),
  }),
});

const ctfs = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    dateStart: z.coerce.date(),
    dateEnd: z.union([z.coerce.date(), z.string()]),
    categories: z.array(
      z.object({
        name: z.string(),
        description: z.string(),
      }),
    ),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    demoURL: z.string().optional(),
    repoURL: z.string().optional(),
  }),
});

export const collections = { blog, writeups, ctfs, projects };
