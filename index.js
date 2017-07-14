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


const rejectPromise = message => {
    const stack = myStackTrace();
    const call = stack[2];
    return Promise.reject({
        fileName: call.getFileName(),
        lineNumber: call.getLineNumber(),
        message: message
    });
};


function AssertionType(content) {
    this.content = content;
}


const AllGood =
    new AssertionType(Promise.resolve(true));


AssertionType.prototype.then = function (fThen, fCatch) {
    return this.content.then(fThen, fCatch);
};


AssertionType.prototype.catch = function (fCatch) {
    return this.content.catch(fCatch);
};


AssertionType.prototype.isTrue = function (value) {
    if (value) {
        return this;
    } else {
        const rejection = rejectPromise("isTrue failed");
        return new AssertionType(this.content.then(_ => rejection));
    }
};


AssertionType.prototype.equals = function (a) {
    return b => {
        if (a === b) {
            return this;
        } else {
            const rejection = rejectPromise("equals failed: " + a.toString() + " != " + b.toString());
            return new AssertionType(this.content.then(_ => rejection));
        }
    }
};


AssertionType.prototype.notEquals = function (a) {
    return b => {
        if (a !== b) {
            return this;
        } else {
            const rejection = rejectPromise("notEquals failed: " + a.toString() + " == " + b.toString());
            return new AssertionType(this.content.then(_ => rejection));
        }
    }
};


const equals = a =>
    AllGood.equals(a);


const isTrue = expression =>
    expression
        ? AllGood
        : new AssertionType(rejectPromise("isTrue failed"));


const notEquals = a =>
    AllGood.notEquals(a);


module.exports = {
    AllGood,
    equals,
    isTrue,
    notEquals
};