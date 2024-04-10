---
title: "javajail1"
description: "Good luck getting anything to run."
points: 309
solves: 88
author: Jozef Steinhübl
date: April 10 2024
---

## Introduction

![task](https://raw.githubusercontent.com/GerlachSnezka/amateursctf/main/assets/2024-jail-javajail1.png)

In this challenge, we had to write a program that reads a `flag.txt` file and prints its content. The main issue is that we can't use `import`, `class`, `Main`, `{`, `}`.

## Investigation

Well, `import`, `class` and `Main` are not a big deal, we can just use a direct class name (with package name) and the main method can be in `interface` and doesn't have to be named `main`. The real issue is that we can't use `{` and `}`. That's a bit tricky. We can't write any program without curly braces, right? Well, we can, but it's gonna be a bit weird.

## Solution

The java compiler first recognizes Unicode escapes in its input, translating the ASCII characters \u followed by four hexadecimal digits to UTF-8. That means we can write anything and just translate the final program to Unicode escapes. We can use the following code for example:

```java
import java.io.*;
import java.nio.file.*;

interface Lmao { // you can use class instead of interface
  public static void main(String[] args) throws Exception {
    System.out.println(Files.readString(Paths.get("flag.txt")));
  }
}
```

Then we can use a website like [dencode](https://dencode.com/string/unicode-escape) to convert the code to Unicode escapes. The final file will look like this:

```
\u0069\u006D\u0070\u006F\u0072\u0074\u0020\u006A\u0061\u0076\u0061\u002E\u0069\u006F\u002E\u002A\u003B\u000D\u000A\u0069\u006D\u0070\u006F\u0072\u0074\u0020\u006A\u0061\u0076\u0061\u002E\u006E\u0069\u006F\u002E\u0066\u0069\u006C\u0065\u002E\u002A\u003B\u000D\u000A\u000D\u000A\u0069\u006E\u0074\u0065\u0072\u0066\u0061\u0063\u0065\u0020\u004C\u006D\u0061\u006F\u0020\u007B\u000D\u000A\u0020\u0020\u0070\u0075\u0062\u006C\u0069\u0063\u0020\u0073\u0074\u0061\u0074\u0069\u0063\u0020\u0076\u006F\u0069\u0064\u0020\u006D\u0061\u0069\u006E\u0028\u0053\u0074\u0072\u0069\u006E\u0067\u005B\u005D\u0020\u0061\u0072\u0067\u0073\u0029\u0020\u0074\u0068\u0072\u006F\u0077\u0073\u0020\u0045\u0078\u0063\u0065\u0070\u0074\u0069\u006F\u006E\u0020\u007B\u000D\u000A\u0020\u0020\u0020\u0020\u0053\u0079\u0073\u0074\u0065\u006D\u002E\u006F\u0075\u0074\u002E\u0070\u0072\u0069\u006E\u0074\u006C\u006E\u0028\u0046\u0069\u006C\u0065\u0073\u002E\u0072\u0065\u0061\u0064\u0053\u0074\u0072\u0069\u006E\u0067\u0028\u0050\u0061\u0074\u0068\u0073\u002E\u0067\u0065\u0074\u0028\u0022\u0066\u006C\u0061\u0067\u002E\u0074\u0078\u0074\u0022\u0029\u0029\u0029\u003B\u000D\u000A\u0020\u0020\u007D\u000D\u000A\u007D
```

And that's it! We can now paste the code to the server and get the flag.

```
amateursCTF{yeah_this_looks_like_a_good_feature_to_me!}
```