rollup-plugin-verify-bundle
==========

Make assertions about the state of the emitted bundle.

Use
-----

```
...
plugins: [
    ...,
    verify({noExternals: true})
]
```

Will throw an error if your build references unknown externals such as a dependency that was never declared.
