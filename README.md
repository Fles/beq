# beq

File manipulation utilities for frontend

## `ff`

Find files (file paths to components) recursively.
_[See ignore cases.](lib/ff/README.md)_

`-e` `<type>` Specify extension of files to search (default: tsx)

`-w` `<keyword>` Specify keyword of approval in file (default: React)

## Examples

Find `.tsx` with capitalized filename including `React` keyword in its content:

```
- npx beq ff
```

Find `.js` with capitalized filename including `Vue` keyword in its content:

```
- npx beq ff -e js -w Vue
```

---
