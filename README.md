# beq

File manipulation utilities for frontend

## `ff`

Find files (file paths to components) recursively.
_[See ignore cases.](lib/ff/README.md)_

`-e` `<type>` Specify extension of files to search (default: tsx)

`-w` `<keyword>` Specify keyword of approval in file (default: React)

## Examples

Find capitalized `.tsx` files with `React` keyword in its content:

```
npx beq ff
```

Find capitalized `.js` files with `Vue` keyword in its content:

```
npx beq ff -e js -w Vue
```

---
