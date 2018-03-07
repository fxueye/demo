var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var App = (function () {
    function App() {
        if (this._uiStage == null) {
            this._uiStage = new eui.UILayer();
            this._uiStage.percentWidth = 100;
            this._uiStage.percentHeight = 100;
            this._uiStage.touchEnabled = false;
            this.getStage().addChild(this._uiStage);
        }
        this._sceneMgr = new SceneMgr();
    }
    Object.defineProperty(App, "Instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new App();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    App.prototype.init = function () {
        //初始化操作
    };
    App.prototype.getUIStage = function () {
        return this._uiStage;
    };
    App.prototype.setScaleMode = function (value) {
        this.getStage().scaleMode = value;
    };
    App.prototype.setFrameRate = function (value) {
        this.getStage().frameRate = value;
    };
    App.prototype.setMaxTouches = function (value) {
        this.getStage().maxTouches = value;
    };
    App.prototype.setTouchChildren = function (value) {
        this.getStage().touchChildren = value;
    };
    App.prototype.getHeight = function () {
        return this.getStage().stageHeight;
    };
    App.prototype.getWidth = function () {
        return this.getStage().stageWidth;
    };
    App.prototype.getStage = function () {
        return egret.MainContext.instance.stage;
    };
    App.prototype.fullScreenAdaptation = function (designWidth, designHeight, resizeCallback) {
        this._designWidth = designWidth;
        this._designHeight = designHeight;
        this._resizeCallback = resizeCallback;
    };
    App.prototype.stageOnResize = function () {
        this.getStage().removeEventListener(egret.Event.RESIZE, this.stageOnResize, this);
        var designWidth = this._designWidth;
        var designHeight = this._designHeight;
        var clientWidth = window.innerWidth;
        var clientHeight = window.innerHeight;
        var a = clientWidth / clientHeight;
        var b = designWidth / designHeight;
        var c = a / b;
        if (a > b) {
            designWidth = Math.floor(designWidth * c);
            designHeight = Math.floor(designHeight * c);
        }
        this.getStage().setContentSize(designWidth, designHeight);
        if (this._resizeCallback) {
            this._resizeCallback();
        }
        this.getStage().addEventListener(egret.Event.RESIZE, this.stageOnResize, this);
    };
    return App;
}());
__reflect(App.prototype, "App");
//# sourceMappingURL=App.js.map