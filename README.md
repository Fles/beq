# beq

File manipulation utilities for frontend

## `ff`

Find files (file paths to components) recursively.

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

## `li`

List imports recursively.

`-e` `<type>` Specify extension of files to search (default: tsx)

## Examples

List all imports from `.tsx` files:

```
npx beq li
```

List all imports from `.js` files:

```
npx beq li -e js
```

---

_[List of ignore cases.](lib/ignores/README.md)_
