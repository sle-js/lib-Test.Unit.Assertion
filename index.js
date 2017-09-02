const Maybe = mrequire("core:Native.Data.Maybe:1.0.0");


function myStackTrace() {
    const orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function (_, stack) {
        return stack;
    };
    const err = new Error;
    Error.captureStackTrace(err, arguments.callee);
    const stack = err.stack;
    Error.prepareStackTrace = orig;

    return stack;
}


const rejectPayload = message => {
    const stack = myStackTrace();
    const call = stack[2];
    return {
        fileName: call.getFileName(),
        lineNumber: call.getLineNumber(),
        message: message
    };
};


function Assertion$(content) {
    this.content = content;
}


const AllGood =
    new Assertion$([0]);


const Fail = a =>
    new Assertion$([1, a]);


const fail = msg => {
    const rejection = rejectPayload(msg);
    return Fail(rejection);
};


Assertion$.prototype.isAllGood = function () {
    return this.content[0] === 0;
};


Assertion$.prototype.failContent = function () {
    return this.content[0] === 0
        ? Maybe.Nothing
        : Maybe.Just(this.content[1]);
};


Assertion$.prototype.failMessage = function () {
    return this.content[0] === 0
        ? Maybe.Nothing
        : Maybe.Just(this.content[1].message);
};


Assertion$.prototype.isTrue = function (value) {
    if (this.isAllGood()) {
        if (value) {
            return this;
        } else {
            const rejection = rejectPayload("isTrue failed");
            return Fail(rejection);
        }
    }
    else {
        return this;
    }
};


Assertion$.prototype.equals = function (a) {
    return b => {
        if (this.isAllGood()) {
            if (a === b) {
                return this;
            } else {
                const rejection = rejectPayload("equals failed: " + a.toString() + " != " + b.toString());
                return Fail(rejection);
            }
        }
        else {
            return this;
        }
    }
};


Assertion$.prototype.notEquals = function (a) {
    return b => {
        if (this.isAllGood()) {
            if (a !== b) {
                return this;
            } else {
                const rejection = rejectPayload("notEquals failed: " + a.toString() + " == " + b.toString());
                return Fail(rejection);
            }
        } else {
            return this;
        }
    }
};


const equals = a =>
    AllGood.equals(a);


const isTrue = expression =>
    expression
        ? AllGood
        : Fail(rejectPayload("isTrue failed"));


const notEquals = a =>
    AllGood.notEquals(a);


module.exports = {
    AllGood,
    fail,
    equals,
    isTrue,
    notEquals
};