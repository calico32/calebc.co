---
title: A VSCode extension for highlighting and validating EBNF
name: ebnf-language-support
date: "2023"
url: https://github.com/calico32/ebnf-language-support
icons: [simple-icons:typescript, simple-icons:visualstudiocode]
class: hover:bg-emerald-700 [.active]:bg-emerald-700
accent: border-emerald-500
---

# ebnf-language-support

```ebnf
(* Grammar for Extended Backus-Naur Form (EBNF) *)
grammar = { comment | rule } ;
comment = "(*", ? any string ? - "*)", "*)" ;
rule = name "=" expression ";" ;
name = name-start-character { name-character } ;
expression = name | literal | special
    | group | repetition | optional
    | alternation | concatenation | range | except
    | one-or-more ;
```

A VSCode extension for highlighting and validating EBNF (Extended Backus-Naur
Form) grammar files. It provides syntax highlighting, validation, and error
reporting for EBNF files, making it easier to write and maintain grammars.
