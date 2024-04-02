---
title: "Beginner: Anti-dcode.fr"
description: "I've heard that everyone just uses dcode.fr to solve all of their crypto problems. Shameful, really."
points: 100
solves: 305
date: April 2 2024
author: Jozef Steinhübl
---

## Introduction

![task](https://raw.githubusercontent.com/GerlachSnezka/utctf/main/assets/2024-crypto-antidcodefr-task.png)

In this task, we can see a simple Caesar cipher with a lot of random characters on both sides of the flag. In the `LoooongCaesarCipher.txt` file, there is a 100 0000 characters. As Caesar's cipher only contains a-z characters, we can make a simple script to brute force the shift. You can learn about the Caesar cipher [here](https://en.wikipedia.org/wiki/Caesar_cipher).

## Solving

Thanks to the fact that we know that every flag starts with `utflag{`, we can easily bruteforce the shift. I used multithreading to speed up the process as python is not the fastest language :P.

```py
import concurrent.futures

line = open("./LoooongCaesarCipher.txt").readline()


def caesar_cipher_crack(k: int) -> str:
    ans = ""
    for char in line:
        if char.isalpha():
            shift = -k
            if char.islower():
                ans += chr(((ord(char) - ord("a") + shift) % 26) + ord("a"))
            else:
                ans += chr(((ord(char) - ord("A") + shift) % 26) + ord("A"))
        else:
            ans += char

    return ans


with concurrent.futures.ThreadPoolExecutor() as executor:
    for i in range(len(line)):
        if "utflag{" in (result := executor.submit(caesar_cipher_crack, i).result()):
            print(f"utflag{{{result.split("utflag{")[1].split("}")[0]}}}")
            break
```

After running the script, we get the flag:
```
utflag{rip_dcode}
```