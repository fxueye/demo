var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BaseController = (function () {
    function BaseController() {
    }
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