# Egg Programming Language

Inspired from Eloquent JS book! ツ

Egg is a general purpose high level mathematical and functional programming language created for fun built on top of JavaScript, it supports simple features like, bindings, scopes, functions, closure, recursive calls, if/while/do applications, comments, & basic arithmetic/comparison operations.

## Table of contents

- [Text editor features](#text-editor-features)
- [Language syntax](#language-syntax)
  - [Declaring bindings](#declaring-bindings)
  - [Executing multi-line program](#executing-multi-line-program)
  - [Seperating applications](#seperating-applications)
  - [Commenting](#commenting)
  - [Arithmetic operators](#arithmetic-operators)
  - [Comparison operators](#comparison-operators)
  - [Looping](#looping)
  - [Declaring functions](#declaring-functions)
  - [Using arrays](#using-arrays)
- [Author](#author)

## Text editor features

- Auto indent lines.
- Auto close parenthesis.

## Language syntax

### Declaring bindings

If you're declaring a variable for the first use the special form `def`\
If you're changing an existing variable use the special form `set`

### Executing multi-line program

Done by using the special form `do`

### Seperating applications

Done by using `,`

### Commenting

Done by using `#`

### Arithmetic operators

`+` for addition.\
`-` for substraction.\
`*` for multiplication.\
`/` for division.\
`%` for remainder.

### Comparison operators

`=` for checking equality.\
`<` to check if less than.\
`>` to check if greater than.\
`<=` to check if less or equal than.\
`>=` to check if greater or equal than.\
`!=` to check if not equal to.

### Looping

Done by using the special form `while`

```
do(
    def(total, 0),
    def(count, 0),
    while(<(count, 11),
        do(
            set(total, +(total, count)),
            set(count, +(count, 1))
        )
    ),
    print(total) # → 55
)
```

### Declaring functions

Done by using the special form `fun`

```
do(
	def(plusOne, fun(a, +(a, 1))),
	print(plusOne(10)) # → 11
)
```

### Using arrays

To make an array use the special form `[].from`\
To get the length of an array use the special from `[].len`\
To index a value in an array use the special from `[].elem`

```
do(
	def(arr, [].from(1, 2, 3)),
	print([].len(arr)), # → 3
	print([].elem(arr, 1)) # → 2
)
```

## Author

See more projects - [@devmotheg](https://github.com/devmotheg?tab=repositories)
