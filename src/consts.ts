import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "Gerlach Snežka",
  NUM_WRITEUPS_ON_HOMEPAGE: 5,
  NUM_CTFS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION:
    "We're a group of CTF enthusiasts from Slovakia and Czechia who enjoy the challenge of solving security problems.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const CTFS: Metadata = {
  TITLE: "CTFs",
  DESCRIPTION: "A collection of CTFs We have participated in.",
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
