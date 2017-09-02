const Unit = require("./Libs").Unit;
const Assertion = require("../index");

const toPromise = assertion =>
    new Promise(function(resolve, reject) {
       if (assertion.isAllGood()) {
           resolve(true);
       } else {
           reject(assertion.failContent());
       }
    });


module.exports = Unit.Suite("Test.Unit.Assertion")([
    Unit.Test("AllGood is indeed all good")(toPromise(Assertion.AllGood)),
    Unit.Suite(".equals")([
        Unit.Test("String")(toPromise(Assertion.equals("Hello")("Hello"))),
        Unit.Test("Int")(toPromise(Assertion.equals(123)(123))),
        Unit.Test("Boolean")(toPromise(Assertion.equals(true)(true)))
    ]),
    Unit.Test(".isTrue")(toPromise(Assertion.isTrue(true))),
    Unit.Suite(".notEquals")([
        Unit.Test("String")(toPromise(Assertion.notEquals("Hello")("World"))),
        Unit.Test("Int")(toPromise(Assertion.notEquals(123)(456))),
        Unit.Test("Boolean")(toPromise(Assertion.notEquals(true)(false)))
    ]),
    Unit.Test(".equals Message")(toPromise(Assertion.equals(Assertion.equals("Hello")("World").failMessage().withDefault(""))("equals failed: Hello != World"))),
    Unit.Test("A fail on an already failed assertion does not change the first assertion message")(toPromise(
        Assertion.equals(Assertion.equals("Hello")("World").isTrue(false).failMessage().withDefault(""))("equals failed: Hello != World")
    )),
]);
