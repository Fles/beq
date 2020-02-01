# beq

File manipulation utilities for frontend

## ff

Find paths to component files recursively
[Ignore](lib/ff/README.md)

-e _\<type>_ Specify extension of files to search (default: tsx)

-w _\<keyword>_ Specify keyword of approval in file (default: React)

---

## Examples

List all capitalized file paths that include `React` keyword in content

```
- npx beq ff
```

List all capitalized file paths that include `Vue` keyword in content

```
- npx beq ff -e js -w Vue
```
