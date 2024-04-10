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
};
"ctfs": {
"2024/amateursctf.md": {
	id: "2024/amateursctf.md";
  slug: "2024/amateursctf";
  body: string;
  collection: "ctfs";
  data: InferEntrySchema<"ctfs">
} & { render(): Render[".md"] };
"2024/utctf.md": {
	id: "2024/utctf.md";
  slug: "2024/utctf";
  body: string;
  collection: "ctfs";
  data: InferEntrySchema<"ctfs">
} & { render(): Render[".md"] };
};
"projects": {
};
"writeups": {
"amateursctf/2024/algo/orz-larry.md": {
	id: "amateursctf/2024/algo/orz-larry.md";
  slug: "amateursctf/2024/algo/orz-larry";
  body: string;
  collection: "writeups";
  data: InferEntrySchema<"writeups">
} & { render(): Render[".md"] };
"amateursctf/2024/crypto/aesy.md": {
	id: "amateursctf/2024/crypto/aesy.md";
  slug: "amateursctf/2024/crypto/aesy";
  body: string;
  collection: "writeups";
  data: InferEntrySchema<"writeups">
} & { render(): Render[".md"] };
"amateursctf/2024/jail/javajail1.md": {
	id: "amateursctf/2024/jail/javajail1.md";
  slug: "amateursctf/2024/jail/javajail1";
  body: string;
  collection: "writeups";
  data: InferEntrySchema<"writeups">
} & { render(): Render[".md"] };
"amateursctf/2024/jail/javajail2.md": {
	id: "amateursctf/2024/jail/javajail2.md";
  slug: "amateursctf/2024/jail/javajail2";
  body: string;
  collection: "writeups";
  data: InferEntrySchema<"writeups">
} & { render(): Render[".md"] };
"amateursctf/2024/jail/pyquinejailgolf.md": {
	id: "amateursctf/2024/jail/pyquinejailgolf.md";
  slug: "amateursctf/2024/jail/pyquinejailgolf";
  body: string;
  collection: "writeups";
  data: InferEntrySchema<"writeups">
} & { render(): Render[".md"] };
"amateursctf/2024/jail/sansomega.md": {
	id: "amateursctf/2024/jail/sansomega.md";
  slug: "amateursctf/2024/jail/sansomega";
  body: string;
  collection: "writeups";
  data: InferEntrySchema<"writeups">
} & { render(): Render[".md"] };
"amateursctf/2024/misc/bears-flagcord.md": {
	id: "amateursctf/2024/misc/bears-flagcord.md";
  slug: "amateursctf/2024/misc/bears-flagcord";
  body: string;
  collection: "writeups";
  data: InferEntrySchema<"writeups">
} & { render(): Render[".md"] };
"amateursctf/2024/misc/sanity-check.md": {
	id: "amateursctf/2024/misc/sanity-check.md";
  slug: "amateursctf/2024/misc/sanity-check";
  body: string;
  collection: "writeups";
  data: InferEntrySchema<"writeups">
} & { render(): Render[".md"] };
"amateursctf/2024/misc/survey.md": {
	id: "amateursctf/2024/misc/survey.md";
  slug: "amateursctf/2024/misc/survey";
  body: string;
  collection: "writeups";
  data: InferEntrySchema<"writeups">
} & { render(): Render[".md"] };
"amateursctf/2024/osint/bathroom-break.md": {
	id: "amateursctf/2024/osint/bathroom-break.md";
  slug: "amateursctf/2024/osint/bathroom-break";
  body: string;
  collection: "writeups";
  data: InferEntrySchema<"writeups">
} & { render(): Render[".md"] };
"amateursctf/2024/osint/cherry-blossoms.md": {
	id: "amateursctf/2024/osint/cherry-blossoms.md";
  slug: "amateursctf/2024/osint/cherry-blossoms";
  body: string;
  collection: "writeups";
  data: InferEntrySchema<"writeups">
} & { render(): Render[".md"] };
"amateursctf/2024/web/agile-rut.md": {
	id: "amateursctf/2024/web/agile-rut.md";
  slug: "amateursctf/2024/web/agile-rut";
  body: string;
  collection: "writeups";
  data: InferEntrySchema<"writeups">
} & { render(): Render[".md"] };
"amateursctf/2024/web/denied.md": {
	id: "amateursctf/2024/web/denied.md";
  slug: "amateursctf/2024/web/denied";
  body: string;
  collection: "writeups";
  data: InferEntrySchema<"writeups">
} & { render(): Render[".md"] };
"amateursctf/2024/web/one-shot.md": {
	id: "amateursctf/2024/web/one-shot.md";
  slug: "amateursctf/2024/web/one-shot";
  body: string;
  collection: "writeups";
  data: InferEntrySchema<"writeups">
} & { render(): Render[".md"] };
"amateursctf/2024/web/sculpture.md": {
	id: "amateursctf/2024/web/sculpture.md";
  slug: "amateursctf/2024/web/sculpture";
  body: string;
  collection: "writeups";
  data: InferEntrySchema<"writeups">
} & { render(): Render[".md"] };
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
