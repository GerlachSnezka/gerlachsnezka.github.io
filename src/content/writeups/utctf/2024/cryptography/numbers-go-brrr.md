---
title: "numbers go brrr"
description: "I wrote an amazing encryption service. It is definitely flawless, so I'll encrypt the flag and give it to you."
points: 471
solves: 228
date: April 2 2024
author: Jozef Steinhübl
---

## Introduction

![task](https://raw.githubusercontent.com/GerlachSnezka/utctf/main/assets/2024-crypto-numbersgobrrr-task.png)

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
    return ciphertext.hex()

print("Thanks for using our encryption service! To get the encrypted flag, type 1. To encrypt a message, type 2.")
while True:
    print("What would you like to do (1 - get encrypted flag, 2 - encrypt a message)?")
    user_input = int(input())
    if(user_input == 1):
        break

    print("What is your message?")
    message = input()
    print("Here is your encrypted message:", encrypt(message.encode()))


flag = open('/src/flag.txt', 'r').read();
print("Here is the encrypted flag:", encrypt(flag.encode()))
```

This encryption service provides the encrypted flag if we type `1` and encrypts a message if we type `2`. Encryption is done using AES in ECB mode with a random key generated from a seed.

## Solving

We can easily solve this task by brute-forcing the seed and decrypting the flag. We can do this by connecting to the service and getting the encrypted flag. We can then bruteforce the seed and decrypt the flag. Since the seed is generated randomly from 0 to 10^6, we can brute force it in a reasonable time.

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
PORT = 7356

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((HOST, PORT))
    print(s.recv(1024).decode())
    s.sendall(b'1\n')
    response = s.recv(1024).decode()
    encrypted_flag_hex = response.split(": ")[1].strip()
    encrypted_flag_bytes = hex_to_bytes(encrypted_flag_hex)


for seed in range(1000000):  
    key = predict_key(seed)
    decrypted_flag = decrypt(encrypted_flag_bytes, key)
    try:
        decrypted_flag_text = decrypted_flag.decode('utf-8')
        print("Decrypted Flag:", decrypted_flag_text)
        print("Seed:", seed)
        break  
    except UnicodeDecodeError:
        continue
```

After running the script, we get the decrypted flag:
```
utflag{deep_seated_and_recurring_self-doubts}
```