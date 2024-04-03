---
title: "Beginner: Basic Reversing Problem"
description: "So many function calls... but are they that different?"
points: 100
solves: 310
date: April 3 2024
author: Jozef Steinhübl
---

## Introduction

![task](https://raw.githubusercontent.com/GerlachSnezka/utctf/main/assets/2024-reverse-beginner-task.png)

In this challenge, we got a binary file `baby-rev` that doesn't print anything when executed. We need to decompile it so we can look further into the code.

## Solving

For decompiling, we can use [IDA](https://hex-rays.com/ida-free/) or [Dogbolt](https://dogbolt.org/) which is a web-based decompiler so we don't need to install anything.

After decompiling, we can see that the binary contains a lot of function calls (from l1 to l19). However, all of them are very similar. Each function changes a char in the input using `*(a0) = x;` and then calls the next function with the `a0 + 1` pointer.

```c
void _init()
{
    if (false)
        0();
    return;
}

long long sub_401020()
{
    void* v0;  // [bp-0x8]

    v0 = 0;
}

long long sub_401030()
{
    void* v0;  // [bp-0x8]

    v0 = 0;
    return sub_401020();
}

long long _start()
{
    char v0;  // [bp+0x0], Other Possible Types: unsigned long
    unsigned long v1;  // [bp+0x8]
    unsigned long long v2;  // rsi
    unsigned long v3;  // rax
    unsigned long long v4;  // rdx

    v2 = *((long long *)&v0);
    v0 = v3;
    __libc_start_main(main, v2, &v1, __libc_csu_init, __libc_csu_fini, v4); /* do not return */
}

// No decompilation output for function sub_40108e

extern char __TMC_END__;

void deregister_tm_clones()
{
    if (true)
    {
        return;
    }
    else if (!(false))
    {
        return;
    }
}

long long register_tm_clones()
{
    if (true)
    {
        return 0;
    }
    else if (!(false))
    {
        return 0;
    }
}

extern char __TMC_END__;

long long __do_global_dtors_aux()
{
    unsigned long v0;  // [bp-0x8]
    unsigned long v2;  // rax

    if (__TMC_END__)
        return v2;
    *((int *)&v0) = rbp<8>;
    if (!(false))
    {
        __TMC_END__ = 1;
        return (unsigned long long)deregister_tm_clones();
    }
    __cxa_finalize();
}

long long frame_dummy()
{
    return register_tm_clones();
}

void l1(char *a0)
{
    *(a0) = 117;
    l2(a0 + 1);
    return;
}

void l2(char *a0)
{
    *(a0) = 116;
    l3(a0 + 1);
    return;
}

void l3(char *a0)
{
    *(a0) = 102;
    l4(a0 + 1);
    return;
}

void l4(char *a0)
{
    *(a0) = 108;
    l5(a0 + 1);
    return;
}

void l5(char *a0)
{
    *(a0) = 97;
    l6(a0 + 1);
    return;
}

void l6(char *a0)
{
    *(a0) = 103;
    l7(a0 + 1);
    return;
}

void l7(char *a0)
{
    *(a0) = 123;
    l8(a0 + 1);
    return;
}

void l8(char *a0)
{
    *(a0) = 105;
    l9(a0 + 1);
    return;
}

void l9(char *a0)
{
    *(a0) = 95;
    l10(a0 + 1);
    return;
}

void l10(char *a0)
{
    *(a0) = 99;
    l11(a0 + 1);
    return;
}

void l11(char *a0)
{
    *(a0) = 52;
    l12(a0 + 1);
    return;
}

void l12(char *a0)
{
    *(a0) = 110;
    l13(a0 + 1);
    return;
}

void l13(char *a0)
{
    *(a0) = 95;
    l14(a0 + 1);
    return;
}

void l14(char *a0)
{
    *(a0) = 114;
    l15(a0 + 1);
    return;
}

void l15(char *a0)
{
    *(a0) = 51;
    l16(a0 + 1);
    return;
}

void l16(char *a0)
{
    *(a0) = 118;
    l17(a0 + 1);
    return;
}

void l17(char *a0)
{
    *(a0) = 33;
    l18(a0 + 1);
    return;
}

void l18(char *a0)
{
    *(a0) = 125;
    l19(a0 + 1);
    return;
}

void l19(char *a0)
{
    char v0;  // [bp-0x8]
    unsigned long long v2;  // rbp

    *(a0) = 0;
    v2 = *((long long *)&v0);
    return;
}

void keygen()
{
    char v0;  // [bp-0x28]

    l1(&v0);
    return;
}

int main()
{
    keygen();
    return 0;
}

long long __libc_csu_init(unsigned long long a0, unsigned long long a1, unsigned long long a2)
{
    unsigned long v1;  // rax, Other Possible Types: unsigned long long
    struct struct_0 **v2;  // rbx, Other Possible Types: unsigned long

    v1 = _init();
    if (false)
        return v1;
    v2 = 0;
    do
    {
        v1 = *((long long *)&(&__init_array_start)[8 * v2])(a0, a1, a2);
        v2 += 1;
    } while (v2 != 1);
    return v1;
}

long long __libc_csu_fini()
{
    unsigned long v1;  // rax

    return v1;
}

long long _fini()
{
    unsigned long v1;  // rax

    return v1;
}
```

Functions `frame_dummy`, `__do_global_dtors_aux`, `register_tm_clones`, `deregister_tm_clones`, `_start`, `sub_401030`, `sub_401020`, `_init` can be ignored.

We can get the flag by extracting the characters' ASCII values from the functions and converting them to characters.

```python
flag = [117, 116, 102, 108, 97, 103, 123, 105, 95 ,99, 52, 110, 95, 114, 51, 118, 33, 125]

print(''.join([chr(x) for x in flag]))
```

The flag is 
```
utflag{i_c4n_r3v!}
```