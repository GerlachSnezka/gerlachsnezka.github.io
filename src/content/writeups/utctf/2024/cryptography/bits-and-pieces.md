---
title: "bits and pieces"
description: "I really really like RSA, so implemented it myself <3."
points: 467
solves: 218
date: April 2 2024
author: Jozef Steinhübl
---

## Introduction

This task is extremely similar to the [rsa-256](https://gerlachsnezka.github.io/writeups/utctf/2024/cryptography/rsa-256/) task, but with a multiple values of `N`, `e`, and `c` in a file `vals.txt`.

> **Explanatory notes**
> (N, e) is the public key
> c is the ciphertext

## Solving

We can solve this in the same way as the previous task, but we'll do it three times.

![bits and pieces first](https://raw.githubusercontent.com/GerlachSnezka/utctf/main/assets/2024-crypto-bitsandpieces-1.png)
![bits and pieces second](https://raw.githubusercontent.com/GerlachSnezka/utctf/main/assets/2024-crypto-bitsandpieces-2.png)
![bits and pieces third](https://raw.githubusercontent.com/GerlachSnezka/utctf/main/assets/2024-crypto-bitsandpieces-3.png)

Then just combine the results:

```
utflag{oh_no_it_didnt_work_</3_i_guess_i_can_just_use_standard_libraries_in_the_future}
```