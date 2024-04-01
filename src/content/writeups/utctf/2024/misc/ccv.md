---
title: "CCV"
description: "I've got some credit cards but I don't which ones are valid."
points: 912
solves: 91
date: April 1 2024
author: Jozef Steinhübl
---

![ccv](https://raw.githubusercontent.com/GerlachSnezka/utctf/main/assets/2024-misc-ccv)

After connecting via netcat we got more information:
```
I'll provide you a PAN, date as MMYY, CSC, and a CVV.
You just need to reply with 1 if its valid and 0 if it's invalid.
I'm counting on you. And be sure to keep track of your answers so we don't need to check these again.
```

Each entry is in the format `PAN: X, date: X, code: X, cvv: X` for example `PAN: 7894591937750079490, date: 1241, code: 572, cvv: 231`

On wikipedia we learn that [PAN](https://en.wikipedia.org/wiki/Payment_card_number) can be checked using [Luhn algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm)

However, this is not enough for us. We have some key `dae55498c432545826fb153885bcb06b` in the description. At first, I did not understand why and only verified PAN, and date (no need to check the date after all) but did not address CSC and CVV at all. I started searching and came across [this article on LinkedIn](https://www.linkedin.com/pulse/card-verification-code-cvc-value-cvv-nayoon-cooray/) which describes CVV calculation. I implemented it and it worked exactly as it should.

> To calculate the **CVV**, we need to:
> 1. **Concatenate**: Join the PAN, expiry date, and service code together and add zeros to the end until it forms a 16-byte (32 character) string.
> 2. **Split Key**: Divide the key obtained from step 1 into two equal parts.
> 3. **Split CVV Key**: Divide the 16-Byte (32 Hexadecimal) CVV Key into two equal parts.
> 4. **Encrypt Block 1**: Use the DES (Data Encryption Standard) algorithm to encrypt the first block from Step 2 using the first block from Step 3 as the key.
> 5. **XOR**: Perform the XOR (exclusive OR) operation between the result of Step 4 and the second block from Step 2.
> 6. **Encrypt Result**: Encrypt the result from Step 5 using the first block from Step 3 as the key, again using the DES algorithm.
> 7. **Decrypt Result**: Decrypt the result from Step 6 using the second block from Step 3 as the key, using the DES algorithm.
> 8. **Encrypt Again**: Encrypt the result from Step 7 one more time using the first block from Step 3 as the key, using the DES algorithm.
> 9. **Extract Numerics**: Extract all the numeric digits from the result of Step 8.
> 10. **Get CVV**: Take the first three numbers from the result of Step 9 as the calculated CVV for the card.

So we just need to check that PAN is luhn and that our CVV calculation returns the same CVV as the socket returns.  
Then I just saved the answer for each card, which resulted in a binary string and converted it to ascii.

### Full implementation in Python

```py
from Crypto.Cipher import DES
import binascii
import socket
import re

def check_luhn(number):
    checksum = int(number[-1])
    total = 0

    for i in range(len(number) - 2, -1, -1):
        sum = 0
        digit = int(number[i])
        if i % 2 == len(number) % 2:  # right to left every odd digit
            digit = digit * 2

        sum = digit // 10 + digit % 10
        total += sum

    return (total % 10 != 0 and 10 - total % 10 == checksum) or (
        total % 10 == 0 and checksum == 0
    )


CVV_KEY = "dae55498c432545826fb153885bcb06b"
CVV_KEY_FIRST = CVV_KEY[:16]
CVV_KEY_SECOND = CVV_KEY[16:]


def des_encrypt(key, message):
    key = binascii.unhexlify(key)
    message = binascii.unhexlify(message)

    cipher = DES.new(key, DES.MODE_ECB)
    return cipher.encrypt(message).hex().upper()


def des_decrypt(key, message):
    key = binascii.unhexlify(key)
    message = binascii.unhexlify(message)

    cipher = DES.new(key, DES.MODE_ECB)
    return cipher.decrypt(message).hex().upper()


def all_numbers(message):
    return "".join([c for c in message if c.isdigit()])


def hex_xor(a, b):
    result = hex(int(a, 16) ^ int(b, 16))[2:]
    return result.zfill(max(len(a), len(b)))


def is_cvv_valid(card: str, date: str, csc: str, cvv: str) -> bool:
    pan_con = card
    pan_con += date
    pan_con += csc
    pan_con += "0" * (32 - len(pan_con))

    block1 = pan_con[:16]
    block2 = pan_con[16:]

    step4 = des_encrypt(CVV_KEY_FIRST, block1)
    step5 = hex_xor(step4, block2)
    step6 = des_encrypt(CVV_KEY_FIRST, step5)
    step7 = des_decrypt(CVV_KEY_SECOND, step6)
    step8 = des_encrypt(CVV_KEY_FIRST, step7)
    step9 = all_numbers(step8)[:3]

    return step9 == cvv


def is_valid(card: str, date: str, csc: str, cvv: str) -> bool:
    if not check_luhn(card):
        return False

    if not is_cvv_valid(card, date, csc, cvv):
        return False

    return True


s = socket.socket()
port = 8625

s.connect(("puffer.utctf.live", port))

answers = ""

while True:
    data = s.recv(1024).decode("utf-8")
    match = re.search(r"PAN: (\d+), date: (\d+), code: (\d+), cvv: (\d+)", data)
    if not data:
        break

    if match:
        card, date, csc, cvv = match.groups()
        validity = is_valid(card, date, csc, cvv)
        if validity:
            s.sendall(b"1\n")
        else:
            s.sendall(b"0\n")

        answers += "1" if validity else "0" + ""
        print(
            f"Card: {card}, Date: {date}, CSC: {csc}, CVV: {cvv}, Validity: {validity}"
        )


def bin2str(bin):
    return "".join([chr(int(bin[i : i + 8], 2)) for i in range(0, len(bin), 8)])


print(f"Flag is {bin2str(answers)}")
```


### Expected flag
```
utflag{hope_none_of_those_were_yours_lol}
```
