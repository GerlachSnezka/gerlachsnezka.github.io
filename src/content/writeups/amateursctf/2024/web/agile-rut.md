---
title: "agile-rut"
description: "check out this cool font i made!"
points: 173
solves: 311
author: Jozef Steinhübl
date: April 11 2024
---

## Introduction

![task](https://raw.githubusercontent.com/GerlachSnezka/amateursctf/main/assets/2024-web-agile-rut.png)

There's a website with textarea and custom font. We have to inspect the font and find the flag.

## Solution

After downloading the font, we can drop it into [FontDrop](https://fontdrop.info/) to inspect it. In the `glyphs` tab, we can see a glyph with the very unusual name lig.j.u.s.t.a.n.a.m.e.o.k.xxxxxxxxx.xxxx.x.xxxxxxxxxx.x.x.x.xxxxxxxxxx.xxx.xxxxxxxxxx.x.x.x.x.xxxxxxxxxx.x.x.x.x.xxxxxxxxxx.x.x.x.xxxxxxxxxx.x.x.x.x.x.xxxx.xxxxxxxxxx.xxxxx.xxxxx.xxxxx.xxxxxxxxxx

![glyph](https://raw.githubusercontent.com/GerlachSnezka/amateursctf/main/assets/2024-web-agile-rut-glyph.png)

![glyph info](https://raw.githubusercontent.com/GerlachSnezka/amateursctf/main/assets/2024-web-agile-rut-glyph-info.png)

In an earlier version of the font the glyph was named lig.a.m.a.t.e.u.r.s.C.T.F.braceleft.zero.k.underscore.b.u.t.underscore.one.underscore.d.o.n.t.underscore.l.i.k.e.underscore.t.h.e.underscore.j.b.m.o.n.zero.underscore.equal.equal.equal.braceright which can be translated to `amateursCTF{0k_but_1_dont_like_the_jbmon0_===}`. It didn't work anyway.

After inspecting using another service, called [GlyphrStudio](https://www.glyphrstudio.com/app/), we can see that there's a ligature with the same "icon".

![glyphrstudio ligatures](https://raw.githubusercontent.com/GerlachSnezka/amateursctf/main/assets/2024-web-agile-rut-glyphrstudio-ligatures.png)

![glyphrstudio ligature](https://raw.githubusercontent.com/GerlachSnezka/amateursctf/main/assets/2024-web-agile-rut-glyphrstudio-ligature.png)

Using dev tools we can copy the ligature name and we'll get the flag:

```
amateursctf{0k_but_1_dont_like_the_jbmon0_===}
```