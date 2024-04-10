---
title: "bears-flagcord"
description: "We're building the next generation flag sharing social media inside discord! Join us for the fun flag sharing activity, well uhm actually I might need to finish testing my code. Use code 'flag' to get instant access to the flag!"
points: 472
solves: 7
author: Jozef Steinhübl
date: April 10 2024
---

## Introduction

![task](https://raw.githubusercontent.com/GerlachSnezka/amateursctf/main/assets/2024-misc-bears-flagcord.png)

In this challenge, we got a link to a discord bot that we can use to invite it to our server. The main issue is that after trying to invite the bot, we get an error saying that the integration is private.

![integration private](https://raw.githubusercontent.com/GerlachSnezka/amateursctf/main/assets/2024-misc-bears-flagcord-integration-private.png)

## Investigation

After reading the challenge description again, there's a very important keyword *sharing activity*. This probably means that the app is not a bot, but a [discord activity](https://discord.com/developers/docs/activities/overview) instead. It's a new concept that has been released recently, and it allows developers to create custom voice activities. Don't be fooled by the URL.

## Solution

As a [discord dataminer](https://github.com/xhyrom/discord-datamining), my first idea was to fetch the application details using the api because I also missed the description of the challenge. I used the following command to get the application details:

```bash
curl 'https://canary.discord.com/api/v9/applications/1223421353907064913/public' \
  -H 'authorization: <YOURDISCORDTOKEN_DONT_SHARE_WITH_ANYONE>' \
  -H 'content-type: application/json' \
  --compressed | jq
```

And we got the following response:

```json
{
  "id": "1223421353907064913",
  "name": "Bear Flag Social",
  "icon": null,
  "description": "",
  "summary": "",
  "type": null,
  "is_monetized": false,
  "bot": {
    "id": "1223421353907064913",
    "username": "Bear Flag Social",
    "global_name": null,
    "avatar": null,
    "avatar_decoration_data": null,
    "discriminator": "7585",
    "public_flags": 0,
    "clan": null,
    "bot": true,
    "banner": null,
    "banner_color": null,
    "accent_color": null
  },
  "hook": true,
  "bot_public": false,
  "bot_require_code_grant": false,
  "integration_types_config": {
    "0": {}
  },
  "verify_key": "f4ba444d9452d7ed75241c52238e37a1a42594d1e3863b7025f553299c9b2fe6",
  "flags": 131072,
  "max_participants": null,
  "embedded_activity_config": {
    "activity_preview_video_asset_id": null,
    "supported_platforms": [
      "web"
    ],
    "default_orientation_lock_state": 1,
    "tablet_default_orientation_lock_state": 1,
    "requires_age_gate": false,
    "premium_tier_requirement": null,
    "free_period_starts_at": null,
    "free_period_ends_at": null,
    "client_platform_config": {
      "web": {
        "label_type": 0,
        "label_until": null,
        "release_phase": "in_development"
      },
      "ios": {
        "label_type": 0,
        "label_until": null,
        "release_phase": "in_development"
      },
      "android": {
        "label_type": 0,
        "label_until": null,
        "release_phase": "in_development"
      }
    },
    "shelf_rank": 2147483647,
    "has_csp_exception": false,
    "displays_advertisements": false
  }
}
```

That means we're right, the application is a [discord activity](https://discord.com/developers/docs/activities/overview). Each discord activity can be accessed using `<CLIENTID>.discordsays.com` and the client id is `1223421353907064913`. So we can access the activity using the following link: [https://1223421353907064913.discordsays.com](https://1223421353907064913.discordsays.com).

![web](https://raw.githubusercontent.com/GerlachSnezka/amateursctf/main/assets/2024-misc-bears-flagcord-web.png)

We can just put the code `flag` in the input field as the description says and we get the flag.

```
amateursCTF{p0v_ac3ss_c0ntr0l_bypass_afd6e94d}
```

This challenge was actually from the latest new feature, so I'm glad that `smashmaster` decided to create a challenge about it. I hope you enjoyed it as much as I did. See you in the next one!