const Unit = require("./test/Libs").Unit;

require("./test/UnitTest")
    .then(Unit.showErrors)
    .then(Unit.showSummary)
    .then(Unit.setExitCodeOnFailures);