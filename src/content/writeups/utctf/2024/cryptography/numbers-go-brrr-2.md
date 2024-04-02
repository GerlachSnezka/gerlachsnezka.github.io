---
title: "numbers go brrr 2"
description: "A spiritual successor the first."
points: 829
solves: 126
date: April 2 2024
author: Jozef Steinhübl
---

## Introduction

![task](https://raw.githubusercontent.com/GerlachSnezka/utctf/main/assets/2024-crypto-numbersgobrrr2-task.png)

In this task, we are given a source code of the encryption service and ip with a port to connect to using netcat.
```py
#!/usr/bin/env python3
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
from Crypto.Random import random

seed = random.randint(0, 10 ** 6)
def get_random_number():
    global seed 
    seed = int(str(seed * seed).zfill(12)[3:9])
    return seed

def encrypt(message):
    key = b''
    for i in range(8):
        key += (get_random_number() % (2 ** 16)).to_bytes(2, 'big')
    cipher = AES.new(key, AES.MODE_ECB)
    ciphertext = cipher.encrypt(pad(message, AES.block_size))
    return key.hex(), ciphertext.hex()


print("Thanks for using our encryption service! To get the start guessing, type 1. To encrypt a message, type 2.")
print("You will need to guess the key (you get 250 guesses for one key). You will do this 3 times!")

for i in range(3):
    seed = random.randint(0, 10 ** 6)
    print("Find the key " + str(i + 1) + " of 3!")
    key = encrypt(b"random text to initalize key")[0]
    while True:
        print("What would you like to do (1 - guess the key, 2 - encrypt a message)?")
        user_input = int(input())
        if(user_input == 1):
            break

        print("What is your message?")
        message = input()
        key, ciphertext = encrypt(message.encode())
        print("Here is your encrypted message:", ciphertext)
    print("You have 250 guesses to find the key!")
    
    found = False
    for j in range(250):
        print("What is your guess (in hex)?")
        guess = str(input()).lower()
        if guess == key:
            print("You found the key!")
            found = True
            break
        else:
            print("That is not the key!")

    if not found:
        print("You did not find the key!")
        exit(0)


flag = open('/src/flag.txt', 'r').read();
print("Here is the flag:", flag)
```

This encryption service allows us to guess the key in 250 tries if we type `1` and encrypts a message if we type `2`. Encryption is done same as in the [numbers go brrr](https://gerlachsnezka.github.io/writeups/utctf/2024/cryptography/numbers-go-brrr/) task.

## Solving

We can solve this similary to [the previous task](https://gerlachsnezka.github.io/writeups/utctf/2024/cryptography/numbers-go-brrr/) but with a small difference. We'll encrypt our own message and then brute-force the key. This is exactly same approach as in the previous task, but we just need to get own encrypted message first as we don't have encrypted flag. Then we'll just prompt the key and socket will return us the flag.

```py
import socket
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad, pad
import binascii

def get_next_seed(seed):
    return int(str(seed * seed).zfill(12)[3:9])

def predict_key(seed):
    key = b''
    for i in range(8):
        key += (seed % (2 ** 16)).to_bytes(2, 'big')
        seed = get_next_seed(seed)
    return key

def decrypt(ciphertext, key):
    cipher = AES.new(key, AES.MODE_ECB)
    try:
        decrypted = cipher.decrypt(ciphertext)
        return unpad(decrypted, AES.block_size)
    except ValueError:

        cipher = AES.new(key, AES.MODE_ECB)
        decrypted = cipher.decrypt(ciphertext)
        return decrypted

def hex_to_bytes(hex_str):
    return binascii.unhexlify(hex_str)

HOST = 'betta.utctf.live'
PORT = 2435

encrypted_msg_hex = input() # input your encrypted message here
encrypted_msg_bytes = hex_to_bytes(encrypted_msg_hex)

for seed in range(1000000):  
    key = predict_key(seed)
    decrypted_msg = decrypt(encrypted_msg_bytes, key)
    try:
        decrypted_msg_text = decrypted_msg.decode('utf-8')
        if decrypted_msg_text != "houska":
            continue

        print("Decrypted msg:", decrypted_msg_text)
        print("Seed:", seed)
        print("Key:", key.hex())
        break  
    except UnicodeDecodeError:
        continue
```

I used message `houska`, don't ask me why XD
![houska](https://raw.githubusercontent.com/GerlachSnezka/utctf/main/assets/2024-crypto-numbersgobrrr2-houska.jpg)

After running the script, we get the key and seed. We can now connect to the server and get the flag by typing `1` and then the key.
```
utflag{ok_you_are_either_really_lucky_or_you_solved_it_as_intended_yay}
```