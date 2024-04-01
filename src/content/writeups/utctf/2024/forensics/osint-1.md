---
title: "OSINT 1"
description: "It seems like companies have document leaks all the time nowadays. I wonder if this company has any."
points: 580
solves: 202
author: HenyPotter
date: April 1. 2024
---

## Introduction
In this challenge, participants are tasked with performing OSINT (Open Source Intelligence) to uncover information leading to the discovery of a hidden flag. It appears that companies frequently experience document leaks, prompting the question of whether this particular company has encountered any such incidents.

## Solution
Upon visiting the provided URL [http://puffer.utctf.live:8756/](http://puffer.utctf.live:8756/), we navigated through the website and found a team section. Among the team members, Cole Minerton, the Marketing/Sales Director, caught our attention.

We searched for Cole Minerton's social media profiles and discovered his YouTube channel. Despite initially seeming like a random channel, the channel description contained a Discord invite link.

After joining the Discord server and thoroughly going through the messages in one of the channels, we stumbled upon an attachment - a PDF document.

![Discord Attachment](https://github.com/GerlachSnezka/utctf/blob/main/assets/2024-forensics-osint1-discord-conversation.png?raw=true)

After downloading and examining the document, we found the flag written within.

![PDF Flag](https://github.com/GerlachSnezka/utctf/blob/main/assets/2024-forensics-osint1-pdf-flag.png?raw=true)

**Flag:** ```utflag{discord_is_my_favorite_document_leaking_service}```
