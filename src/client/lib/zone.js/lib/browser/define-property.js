define(["require", "exports", "../common/utils"], function (require, exports, utils_1) {
    "use strict";
    /*
     * This is necessary for Chrome and Chrome mobile, to enable
     * things like redefining `createdCallback` on an element.
     */
    var _defineProperty = Object.defineProperty;
    var _getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var _create = Object.create;
    var unconfigurablesKey = utils_1.zoneSymbol('unconfigurables');
    function propertyPatch() {
        Object.defineProperty = function (obj, prop, desc) {
            if (isUnconfigurable(obj, prop)) {
                throw new TypeError('Cannot assign to read only property \'' + prop + '\' of ' + obj);
            }
            var originalConfigurableFlag = desc.configurable;
            if (prop !== 'prototype') {
                desc = rewriteDescriptor(obj, prop, desc);
            }
            return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
        };
        Object.defineProperties = function (obj, props) {
            Object.keys(props).forEach(function (prop) {
                Object.defineProperty(obj, prop, props[prop]);
            });
            return obj;
        };
        Object.create = function (obj, proto) {
            if (typeof proto === 'object' && !Object.isFrozen(proto)) {
                Object.keys(proto).forEach(function (prop) {
                    proto[prop] = rewriteDescriptor(obj, prop, proto[prop]);
                });
            }
            return _create(obj, proto);
        };
        Object.getOwnPropertyDescriptor = function (obj, prop) {
            var desc = _getOwnPropertyDescriptor(obj, prop);
            if (isUnconfigurable(obj, prop)) {
                desc.configurable = false;
            }
            return desc;
        };
    }
    exports.propertyPatch = propertyPatch;
    ;
    function _redefineProperty(obj, prop, desc) {
        var originalConfigurableFlag = desc.configurable;
        desc = rewriteDescriptor(obj, prop, desc);
        return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
    }
    exports._redefineProperty = _redefineProperty;
    ;
    function isUnconfigurable(obj, prop) {
        return obj && obj[unconfigurablesKey] && obj[unconfigurablesKey][prop];
    }
    function rewriteDescriptor(obj, prop, desc) {
        desc.configurable = true;
        if (!desc.configurable) {
            if (!obj[unconfigurablesKey]) {
                _defineProperty(obj, unconfigurablesKey, { writable: true, value: {} });
            }
            obj[unconfigurablesKey][prop] = true;
        }
        return desc;
    }
    function _tryDefineProperty(obj, prop, desc, originalConfigurableFlag) {
        try {
            return _defineProperty(obj, prop, desc);
        }
        catch (e) {
            if (desc.configurable) {
                // In case of errors, when the configurable flag was likely set by rewriteDescriptor(), let's retry with the original flag value
                if (typeof originalConfigurableFlag == 'undefined') {
                    delete desc.configurable;
                }
                else {
                    desc.configurable = originalConfigurableFlag;
                }
                return _defineProperty(obj, prop, desc);
            }
            else {
                throw e;
            }
        }
    }
});
//# sourceMappingURL=define-property.js.map