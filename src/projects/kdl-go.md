---
title: Golang KDL parsing, decoding, formatting, validation, and more
name: kdl-go
date: "2025-"
url: https://github.com/calico32/kdl-go
icons: [catppuccin:kdl, simple-icons:go]
class: hover:bg-teal-700 [.active]:bg-teal-700
accent: border-teal-500
---

# kdl-go

[KDL](https://kdl.dev) is a lovely document and configuration format. It reads
super easily and is flexible enough for pretty much any use case.

```kdl
node arg1 arg2 key1=value1 key2=value2 {
    child-node "child arg :)" child-key=(annotated)value
    /- commented-out {
        node 1 2 3 4 5
    }
    child-node 2
}
```

After KDL got its v2 spec, existing bindings for KDL in Go weren't updated to
support it. From tinkering around with writing my own programming languages, I
knew enough about parsing to write my own spec-compliant KDL parser and emitter
in Go to use in my own projects. And so I did!

The project has since grown to include a reflection-based decoder and encoder to
custom Go types, a schema parser and validator, and a formatting tool. I'm proud
to say the parser and emitter pass all of the official KDL test suites for both
v1 and v2, and it's even racked up a few stars on GitHub!

With its flexible parser and schema validation capabilities, this library serves
as a great foundation for editor tooling for KDL, an area where there is
currently a lack of robust tooling. I'm not as well versed in language server
development yet, but I hope to explore that in the future to provide an
outstanding editing experience for KDL.
