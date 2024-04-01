import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "Gerlach Snežka",
  NUM_WRITEUPS_ON_HOMEPAGE: 5,
  NUM_CTFS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Astro Nano is a minimal and lightweight blog and portfolio.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const CTFS: Metadata = {
  TITLE: "CTFs",
  DESCRIPTION: "A collection of CTFs We have participated in.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION:
    "A collection of my projects, with links to repositories and demos.",
};

export const SOCIALS: Socials = [
  {
    NAME: "github",
    HREF: "https://github.com/gerlachsnezka",
  },
  {
    NAME: "ctftime",
    HREF: "https://ctftime.org/team/287974",
  },
];
