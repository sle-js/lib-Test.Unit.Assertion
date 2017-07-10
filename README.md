Thus package contains a simple assertion implementation.  This implementation confirms to a promises view where each 
assertion has the following signature:

```haskell
interface Assertion extends Promise { fileName :: String, lineNumber :: Int, message :: String } ()
```

 
