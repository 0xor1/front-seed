define(["require", "exports", './harness', "./spec"], function (require, exports, harness_1, spec) {
    "use strict";
    var results = harness_1.runTests(spec);
    harness_1.printResults(results);
});
//# sourceMappingURL=run.js.map