var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ViewMgr = (function () {
    function ViewMgr() {
        this._views = {};
        this._opens = [];
    }
    ViewMgr.prototype.register = function (key, view) {
        if (view == null) {
            return;
        }
        if (this._views[key]) {
            return;
        }
        this._views[key] = view;
    };
    ViewMgr.prototype.unregister = function (key) {
        if (!this._views[key]) {
            return;
        }
        this._views[key] = null;
        delete this._views[key];
    };
    ViewMgr.prototype.getView = function (key) {
        return this._views[key];
    };
    ViewMgr.prototype.destroy = function (key, newView) {
        if (newView === void 0) { newView = null; }
        var oldView = this.getView(key);
        if (oldView) {
            this.unregister(key);
            oldView.destroy();
            oldView = null;
        }
        if (newView)
            this.register(key, newView);
    };
    ViewMgr.prototype.open = function (key) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        var view = this.getView(key);
        if (view == null) {
            console.error("view_" + key + "not find!");
            return;
        }
        if (view.isShow()) {
            view.open(param);
            return view;
        }
        if (view.isInit()) {
            view.addToParent();
            view.open(param);
        }
        else {
            App.Instance.EasyLoading.showLoading();
            view.loadResource(function () {
                view.setVisible(false);
                view.addToParent();
            }.bind(this), function () {
                view.initCompoments();
                view.initData();
                view.open(param);
                view.setVisible(true);
                App.Instance.EasyLoading.hideLoading();
            }.bind(this));
        }
        this._opens.push(key);
        return view;
    };
    ViewMgr.prototype.close = function (key) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        if (!this.isShow(key)) {
            return;
        }
        var view = this.getView(key);
        if (view == null) {
            return;
        }
        var viewIndex = this._opens.indexOf(key);
        if (viewIndex > 0) {
            this._opens.splice(viewIndex, 1);
        }
        view.removeFromParent();
        view.close(param);
    };
    ViewMgr.prototype.closeView = function (view) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        var keys = Object.keys(this._views);
        for (var i = 0; i < keys.length - 1; i++) {
            var key = parseInt(keys[i]);
            if (this._views[key] == view) {
                this.close(key, param);
                return;
            }
        }
    };
    ViewMgr.prototype.isShow = function (key) {
        return this._opens.indexOf(key) != -1;
    };
    return ViewMgr;
}());
__reflect(ViewMgr.prototype, "ViewMgr");
//# sourceMappingURL=ViewMgr.js.map