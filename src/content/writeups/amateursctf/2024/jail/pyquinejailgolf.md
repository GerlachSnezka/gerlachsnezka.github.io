---
title: "pyquinejailgolf"
description: "What about a quine?"
points: 419
solves: 23
author: Jozef Steinhübl
date: April 10 2024
---

## Introduction

![task](https://raw.githubusercontent.com/GerlachSnezka/amateursctf/main/assets/2024-jail-pyquinejailgolf.png)

In this challenge, we had to write a [quine](https://en.wikipedia.org/wiki/Quine_(computing)) in Python. A [quine](https://en.wikipedia.org/wiki/Quine_(computing)) is a program that prints its own source code. We also got the source code of the program that will run our quine.

## Investigation

After looking into the code, we can see these restrictions:
```py
assert x == "<END>", "what did you do this time."
assert all(ord(i) < 128 for i in program), "i don't speak foreign languages."
assert all(
    i not in program for i in ['"', "'", "_"]
), "who uses strings anyway? it's not like quines require strings."
assert program != "", "scuse me, just cleaning out the garbage."
assert "pyquinejailgolf" in program, "are you sure you wrote this program yourself?"
assert len(program) == 343
```

Our program can't use `"`, `'`, `_` (basically strings are not allowed) and it has to be exactly 343 characters long. We also have to include the string `pyquinejailgolf` in our program.

We also see that the program runs our code using `exec` and modifies the `__builtins__` dictionary to prevent us from using some built-in functions. After doing some research, we found out that we can still use the `__import__` function to import modules.

## Solution

The runtime saves our program in the `program` variable in `runtime/external_run.py` file. That means we can easily access the source code of our program.

```python

with open('runtime/output.txt', 'w+') as __import__('sys').stdout:
    program = 'OUR CODE'
    safe_builtins = {}
    for i in dir(__builtins__):
        if i[0] not in __import__('string').ascii_lowercase:
            safe_builtins[i] = eval(i)
    safe_builtins['print'] = print
    new_builtins = {'__builtins__':safe_builtins}
    try:exec(program, new_builtins, new_builtins)
    except Exception as e:print(e)
```

We can use the following code to create a quine:

```python
import sys;a=sys.argv[0];import io;sys.stdout.write(io.open(a).read()[83:426][::-1])#pyquinejailgolf
```

> We're using **sys.stdout.write** instead of **print** because **print** puts a newline character at the end of the string.  
> We're using **io.open** instead of **open** because **open** is a built-in function and we can't use it (not in the `__builtins__` dictionary).  
> We're using **sys.argv[0]** to get the name of the file that is being executed.

The code reads its own source code, removes the first 83 characters (which are not part of the `program` variable) and the last 426 characters (which are not part of the `program` variable) and then reverses the string. The last part of the code is the `pyquinejailgolf` string that is required by the challenge.

Since we need 434 characters, we just add a character at the end, e. g `#`

Our final program will look like this:

```python
import sys;a=sys.argv[0];import io;sys.stdout.write(io.open(a).read()[83:426][::-1])#pyquinejailgolf###################################################################################################################################################################################################################################################
```

And that's it! We can now paste the code to the server and get the flag.

```
amateursCTF{what_is_a_quine_is_that_like_a_reversed_reverse_quine?}
```