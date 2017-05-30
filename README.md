# Generate TypeScript definitions for ProseMirror

This package serves as a workspace for building TypeScript definitions for
ProseMirror. It consists of:

- Git submodules for each prosemirror-* package.
- A guide (what you're reading now)


1. Clone this repo:

    ```
    git clone git@github.com:bradleyayers/generate-prosemirror-types
    ```

1. Install dependencies:

    ```
    npm install
    ```

1. Update all packages to their latest version:

    ```
    git submodule update --remote
    ```

1. Edit `compile.ts` to put output in your DefinitelyTyped directory, then compile:

    ```
    ./node_modules/.bin/ts-node compile.ts
    ```

1. Update tests as needed, and raise PRs for modified packages in DefinitelyTyped.