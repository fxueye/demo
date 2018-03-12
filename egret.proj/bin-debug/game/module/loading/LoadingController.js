var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var LoadingController = (function (_super) {
    __extends(LoadingController, _super);
    function LoadingController() {
        var _this = _super.call(this) || this;
        _this._loadingView = new LoadingView(_this, App.Instance.LayerMgr.UIMain);
        App.Instance.ViewMgr.register(ViewConst.LOADING, _this._loadingView);
        _this.registerFunc(LoadingController.SetProgress, _this.setProgress, _this);
        return _this;
    }
    LoadingController.prototype.setProgress = function (current, total) {
        this._loadingView.setProgress(current, total);
    };
    LoadingController.SetProgress = 10000;
    return LoadingController;
}(BaseController));
__reflect(LoadingController.prototype, "LoadingController");
//# sourceMappingURL=LoadingController.js.map