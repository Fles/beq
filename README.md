# beq

File manipulation utilities for frontend

## ff

Find paths to components recursively, ignoring [this](lib/ff/README.md) cases

-e _\<type>_ Specify extension of files to search (default: tsx)

-w _\<keyword>_ Specify keyword of approval in file (default: React)

```
- npx beq ff // find all capitalized files that include `React` keyword
- npx beq ff -e js -w Vue // find all capitalized files that include `Vue` keyword

```
