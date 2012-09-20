Library
==============

A collection of plugins, aka `Cards`, for use with [Card-Catalog](https://github.com/School-Yard/Card-Catalog).

This is where the majority of functionality for a site built on the TxSSC CMS will come from.

## Overview

`Cards` are meant to be abstracted in a way such that you can logically split an MVC like structure out of an application for use with [Card Catalog](https://github.com/School-Yard/Card-Catalog).
*Typically* most `Cards` are plug and play, but there might be exceptions with a few. For example user logins.

## Testing Cards

Need tests for a card once you write the actual card?
Just create a directory under that specific card named tests, with an *index.js* that exposes your tests.
If you need help writing tests see [Mocha](https://github.com/visionmedia/mocha).

## Example card structure
```
cards/example/
|-- controllers
|   `-- users.js
|-- index.js
|-- models
|   `-- user.js
|-- templates
|   `-- users
|       |-- edit.dust
|       |-- index.dust
|       |-- new.dust
|       `-- show.dust
`-- tests
    |-- controller.js
    |-- index.js
    `-- model.js
```