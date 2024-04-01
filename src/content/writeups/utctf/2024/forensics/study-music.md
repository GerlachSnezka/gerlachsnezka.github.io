---
title: "Study Music"
description: "task"
points: 834
solves: 122
author: HenyPotter
---

We began with a YouTube video featuring a cat dancing to music playing only in the left channel, looping for an outstanding 10 hours. Our initial attempts to find clues in the video's description, subtitles, and the uploader's profile provided no results.

We turned to [youtube-dl-gui](https://github.com/MrS0m30n3/youtube-dl-gui) to extract the audio from the video. Upon analyzing the audio in Audacity, we stumbled upon an unusual occurrence at the 3-hour, 14-minute, and 5-second mark.

![Audio Anomaly](https://media.discordapp.net/attachments/975453880991248394/1224379773627662452/394g1oA.png?ex=661d4785&is=660ad285&hm=5ba229348ff38ab399064b7c737b6b07c628e3cc999266c502c35a39a5f11a5a&=&format=webp&quality=lossless&width=1440&height=346)

This anomaly turned out to be Morse code, though barely audible. To make the Morse code clearer, we utilized Audacity's "Analyze > Plot Spectrum" function, revealing a concentration of beeps around 500 Hz.

![Spectrum Analysis](https://media.discordapp.net/attachments/975453880991248394/1224384349277782046/gyugJMv.png?ex=661d4bc8&is=660ad6c8&hm=ae3f7d37f44906491c765296a404f0240dbd92a95c156157864a62e68e3e7fbc&=&format=webp&quality=lossless&width=358&height=350)

To make the Morse code more discernible, we adjusted the audio frequencies using Audacity's "Effect > EQ and Filters > Filter Curve EQ" feature, boosting frequencies around 500 Hz while suppressing others.

![EQ Adjustment](https://cdn.discordapp.com/attachments/975453880991248394/1224385564795473962/WziYUib.png?ex=661d4cea&is=660ad7ea&hm=8170e1952a99cf83c0bef7c13adc17d5dc4afbcfee1f0bfe8ff09c07fce26c78&)

With the Morse code now clearer, we visually represented it using red dots and dashes in free graphics software.

![Morse Code Representation](https://media.discordapp.net/attachments/975453880991248394/1224386575702692010/JM686Jt.png?ex=661d4ddb&is=660ad8db&hm=8199f401361dd5bc0a53d8d7f72cc75b2fec0d4ba4d8b83815a8c55808e8de0d&=&format=webp&quality=lossless&width=1440&height=148)

Finally, we used an online Morse code decoder to translate the Morse code, which revealed the flag:

![Flag](https://media.discordapp.net/attachments/975453880991248394/1224388413491253349/ohM6hip.png?ex=661d4f91&is=660ada91&hm=a11b63ab645c7676c8f1f58f56e7c993009661333ca4be357937f14bc9fd39f5&=&format=webp&quality=lossless)

**Flag:** `UTFLAGL0V3TH4TDANC3`
