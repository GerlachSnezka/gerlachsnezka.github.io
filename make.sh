#!/bin/bash

# update all submodules
git submodule update --init --recursive --remote

ctfs=$(find writeups/ -mindepth 1 -maxdepth 1 -type d -printf '%f\n')

for ctf in $ctfs; do
    if [ $ctf == ".github" ]; then
      continue
    fi

    echo "Parsing $ctf"

    years=$(find writeups/utctf/ -mindepth 1 -maxdepth 1 -type d -printf '%f\n' | grep -E '[0-9]{4}' | xargs -I {} basename {})

    for year in $years; do
      echo "Parsing $year for $ctf"

      if [ ! -d src/content/writeups/$ctf/$year ]; then
        mkdir -p src/content/writeups/$ctf/$year
      fi

      cp writeups/$ctf/$year/* src/content/writeups/$ctf/$year -r
      rm src/content/writeups/$ctf/$year/README.md
      rm src/content/writeups/$ctf/$year/*.json
      rm src/content/writeups/$ctf/$year/**/README.md
    done
done