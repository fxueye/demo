var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BaseController = (function () {
    function BaseController() {
        this._messages = {};
    }
    BaseController.prototype.registerFunc = function (key, callbackFunc, callbackObj) {
        this._messages[key] = [callbackFunc, callbackObj];
    };
    BaseController.prototype.applyFunc = function (key) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var listen = this._messages[key];
        if (listen) {
            var func = listen[0];
            return func.apply(listen[1], args);
        }
        else {
            console.trace("key:" + key + " not find!");
            return null;
        }
    };
    BaseController.prototype.setModel = function (model) {
        this._model = model;
    };
    BaseController.prototype.getModel = function () {
        return this._model;
    };
    return BaseController;
}());
__reflect(BaseController.prototype, "BaseController");
//# sourceMappingURL=BaseController.js.map