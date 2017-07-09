const Array = mrequire("core:Native.Data.Array:1.0.0");

const Unit = require("./Libs").Unit;
const Assertion = require("../index");


module.exports = Unit.Suite("Test.Unit.Assertion")([
    Unit.Suite(".equals")([
        Unit.Test("String")(Assertion.equals("Hello")("Hello")),
        Unit.Test("Int")(Assertion.equals(123)(123)),
        Unit.Test("Boolean")(Assertion.equals(true)(true))
    ]),
    Unit.Test(".isTrue")(Assertion.isTrue(true)),
    Unit.Suite(".notEquals")([
        Unit.Test("String")(Assertion.notEquals("Hello")("World")),
        Unit.Test("Int")(Assertion.notEquals(123)(456)),
        Unit.Test("Boolean")(Assertion.notEquals(true)(false))
    ])
]);
