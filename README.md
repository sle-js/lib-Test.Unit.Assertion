The signature for a unit test assertion is

```haskell
data Assertion a = AllGood | Fail a where
    isAllGood :: () -> Boolean
    isAllGood = case self of
        AllGood -> true
        else -> false

    failContent :: () -> Maybe a
            
    failMessage :: () -> Maybe String
```

This package provides an implementation of this package with a number of functions to create assertion instances.
Given that this is an implementation of the above interface the type variable `a` is bound to 
`{ fileName :: String, lineNumber :: Int, message :: String }`.


 
