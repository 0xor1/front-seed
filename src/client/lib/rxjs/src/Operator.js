define(["require", "exports", './Subscriber'], function (require, exports, Subscriber_1) {
    "use strict";
    var Operator = (function () {
        function Operator() {
        }
        Operator.prototype.call = function (subscriber, source) {
            return source._subscribe(new Subscriber_1.Subscriber(subscriber));
        };
        return Operator;
    }());
    exports.Operator = Operator;
});
//# sourceMappingURL=Operator.js.map