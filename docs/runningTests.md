### ignore warnings

this warning is safe to ignore:
```
(node:451023) Warning: Accessing non-existent property 'MongoError' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
```

when running tests it will be shown for each test.

squelch with:

```
yarn test --node-arguments="--no-warnings"
```
