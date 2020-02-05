# beq

_File manipulation utilities for frontend!_

## Commands:

### `ff`

Find files (file paths to components) recursively.

`-e` `<type>` Specify extension of files to search (default: tsx)

`-w` `<keyword>` Specify keyword of approval in file (default: React)

_Examples_

Find capitalized `.tsx` files with `React` keyword in its content:

```
npx beq ff
```

Find capitalized `.js` files with `Vue` keyword in its content:

```
npx beq ff -e js -w Vue
```

---

### `li`

List imports recursively.

`-e` `<type>` Specify extension of files to search (default: tsx)

`-f` Includes path to the file

_Examples_

List all imports from `.tsx` files:

```
npx beq li
```

List all imports from `.js` files:

```
npx beq li -e js
```

List all imports from `.tsx` files including path to the file:

```
npx beq li -f
```
---

_[List of ignore cases.](lib/ignores/README.md)_
