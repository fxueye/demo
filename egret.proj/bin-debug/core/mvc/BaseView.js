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
var BaseSpriteView = (function (_super) {
    __extends(BaseSpriteView, _super);
    function BaseSpriteView(controller, parent) {
        var _this = _super.call(this) || this;
        _this._resources = null;
        _this._controller = controller;
        _this._parent = parent;
        _this._isInit = false;
        App.Instance.Stage.addEventListener(egret.Event.RESIZE, _this.onResize, _this);
        return _this;
    }
    BaseSpriteView.prototype.initCompoments = function () {
        this._isInit = true;
    };
    BaseSpriteView.prototype.onResize = function () {
    };
    BaseSpriteView.prototype.isInit = function () {
        return this._isInit;
    };
    BaseSpriteView.prototype.isShow = function () {
        return this.stage != null && this.visible;
    };
    BaseSpriteView.prototype.addToParent = function () {
        this._parent.addChild(this);
    };
    BaseSpriteView.prototype.removeFromParent = function () {
        this.parent.removeChild(this);
    };
    BaseSpriteView.prototype.setVisible = function (value) {
        this.visible = value;
    };
    BaseSpriteView.prototype.setResources = function (resources) {
        this._resources = resources;
    };
    BaseSpriteView.prototype.loadResource = function (loadComplete, initComplete) {
        if (this._resources && this._resources.length > 0) {
            App.Instance.RES.loadResource(this._resources, [], loadComplete, null, this);
            this.once(eui.UIEvent.CREATION_COMPLETE, initComplete, this);
        }
        else {
            loadComplete();
            initComplete();
        }
    };
    BaseSpriteView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    BaseSpriteView.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    BaseSpriteView.prototype.initData = function () {
    };
    BaseSpriteView.prototype.destroy = function () {
        this._controller = null;
        this._parent = null;
        this._resources = null;
    };
    return BaseSpriteView;
}(BaseSprite));
__reflect(BaseSpriteView.prototype, "BaseSpriteView", ["IBaseView"]);
var BaseUIView = (function (_super) {
    __extends(BaseUIView, _super);
    function BaseUIView(controller, parent) {
        var _this = _super.call(this) || this;
        _this._resources = null;
        _this._controller = controller;
        _this._parent = parent;
        _this._isInit = false;
        _this.percentWidth = 100;
        _this.percentHeight = 100;
        return _this;
    }
    BaseUIView.prototype.initCompoments = function () {
        this._isInit = true;
    };
    BaseUIView.prototype.isInit = function () {
        return this._isInit;
    };
    BaseUIView.prototype.isShow = function () {
        return this.stage != null && this.visible;
    };
    BaseUIView.prototype.addToParent = function () {
        this._parent.addChild(this);
    };
    BaseUIView.prototype.removeFromParent = function () {
        this.parent.removeChild(this);
    };
    BaseUIView.prototype.setVisible = function (value) {
        this.visible = value;
    };
    BaseUIView.prototype.setResources = function (resources) {
        this._resources = resources;
    };
    BaseUIView.prototype.loadResource = function (loadComplete, initComplete) {
        if (this._resources && this._resources.length > 0) {
            App.Instance.RES.loadResource(this._resources, [], loadComplete, null, this);
            this.once(eui.UIEvent.CREATION_COMPLETE, initComplete, this);
        }
        else {
            loadComplete();
            initComplete();
        }
    };
    BaseUIView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    BaseUIView.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    BaseUIView.prototype.initData = function () {
    };
    BaseUIView.prototype.destroy = function () {
        this._controller = null;
        this._parent = null;
        this._resources = null;
    };
    return BaseUIView;
}(eui.Component));
__reflect(BaseUIView.prototype, "BaseUIView", ["IBaseView"]);
//# sourceMappingURL=BaseView.js.map