declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"01-getting-started/index.md": {
	id: "01-getting-started/index.md";
  slug: "01-getting-started";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"02-blog-collection/index.md": {
	id: "02-blog-collection/index.md";
  slug: "02-blog-collection";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"03-projects-collection/index.md": {
	id: "03-projects-collection/index.md";
  slug: "03-projects-collection";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"04-work-collection/index.md": {
	id: "04-work-collection/index.md";
  slug: "04-work-collection";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"05-markdown-syntax/index.md": {
	id: "05-markdown-syntax/index.md";
  slug: "05-markdown-syntax";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"06-mdx-syntax/index.mdx": {
	id: "06-mdx-syntax/index.mdx";
  slug: "06-mdx-syntax";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"07-year-sorting-example/index.md": {
	id: "07-year-sorting-example/index.md";
  slug: "07-year-sorting-example";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"08-draft-example/index.md": {
	id: "08-draft-example/index.md";
  slug: "08-draft-example";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};
"ctfs": {
"2024/utctf.md": {
	id: "2024/utctf.md";
  slug: "2024/utctf";
  body: string;
  collection: "ctfs";
  data: InferEntrySchema<"ctfs">
} & { render(): Render[".md"] };
};
"projects": {
"project-1/index.md": {
	id: "project-1/index.md";
  slug: "project-1";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"project-2/index.md": {
	id: "project-2/index.md";
  slug: "project-2";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
};
"writeups": {
"utctf/2024/cryptography/beginner:-anti-dcode.fr.md": {
	id: "utctf/2024/cryptography/beginner:-anti-dcode.fr.md";
  slug: "utctf/2024/cryptography/beginner-anti-dcodefr";
  body: string;
  collection: "writeups";
  data: InferEntrySchema<"writeups">
} & { render(): Render[".md"] };
"utctf/2024/cryptography/bits-and-pieces.md": {
	id: "utctf/2024/cryptography/bits-and-pieces.md";
  slug: "utctf/2024/cryptography/bits-and-pieces";
  body: string;
  collection: "writeups";
  data: InferEntrySchema<"writeups">
} & { render(): Render[".md"] };
"utctf/2024/cryptography/numbers-go-brrr-2.md": {
	id: "utctf/2024/cryptography/numbers-go-brrr-2.md";
  slug: "utctf/2024/cryptography/numbers-go-brrr-2";
  body: string;
  collection: "writeups";
  data: InferEntrySchema<"writeups">
} & { render(): Render[".md"] };
"utctf/2024/cryptography/numbers-go-brrr.md": {
	id: "utctf/2024/cryptography/numbers-go-brrr.md";
  slug: "utctf/2024/cryptography/numbers-go-brrr";
  body: string;
  collection: "writeups";
  data: InferEntrySchema<"writeups">
} & { render(): Render[".md"] };
"utctf/2024/cryptography/rsa-256.md": {
	id: "utctf/2024/cryptography/rsa-256.md";
  slug: "utctf/2024/cryptography/rsa-256";
  body: string;
  collection: "writeups";
  data: InferEntrySchema<"writeups">
} & { render(): Render[".md"] };
"utctf/2024/forensics/contracts.md": {
	id: "utctf/2024/forensics/contracts.md";
  slug: "utctf/2024/forensics/contracts";
  body: string;
  collection: "writeups";
  data: InferEntrySchema<"writeups">
} & { render(): Render[".md"] };
"utctf/2024/forensics/osint-1.md": {
	id: "utctf/2024/forensics/osint-1.md";
  slug: "utctf/2024/forensics/osint-1";
  body: string;
  collection: "writeups";
  data: InferEntrySchema<"writeups">
} & { render(): Render[".md"] };
"utctf/2024/forensics/study-music.md": {
	id: "utctf/2024/forensics/study-music.md";
  slug: "utctf/2024/forensics/study-music";
  body: string;
  collection: "writeups";
  data: InferEntrySchema<"writeups">
} & { render(): Render[".md"] };
"utctf/2024/misc/ccv.md": {
	id: "utctf/2024/misc/ccv.md";
  slug: "utctf/2024/misc/ccv";
  body: string;
  collection: "writeups";
  data: InferEntrySchema<"writeups">
} & { render(): Render[".md"] };
"utctf/2024/misc/survey.md": {
	id: "utctf/2024/misc/survey.md";
  slug: "utctf/2024/misc/survey";
  body: string;
  collection: "writeups";
  data: InferEntrySchema<"writeups">
} & { render(): Render[".md"] };
"utctf/2024/reverse-engineering/beginner:-basic-reversing-problem.md": {
	id: "utctf/2024/reverse-engineering/beginner:-basic-reversing-problem.md";
  slug: "utctf/2024/reverse-engineering/beginner-basic-reversing-problem";
  body: string;
  collection: "writeups";
  data: InferEntrySchema<"writeups">
} & { render(): Render[".md"] };
"utctf/2024/web/beginner:-off-brand-cookie-clicker.md": {
	id: "utctf/2024/web/beginner:-off-brand-cookie-clicker.md";
  slug: "utctf/2024/web/beginner-off-brand-cookie-clicker";
  body: string;
  collection: "writeups";
  data: InferEntrySchema<"writeups">
} & { render(): Render[".md"] };
"utctf/2024/web/easy-mergers-v0.1.md": {
	id: "utctf/2024/web/easy-mergers-v0.1.md";
  slug: "utctf/2024/web/easy-mergers-v01";
  body: string;
  collection: "writeups";
  data: InferEntrySchema<"writeups">
} & { render(): Render[".md"] };
"utctf/2024/web/schrödinger.md": {
	id: "utctf/2024/web/schrödinger.md";
  slug: "utctf/2024/web/schrödinger";
  body: string;
  collection: "writeups";
  data: InferEntrySchema<"writeups">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../src/content/config.js");
}
