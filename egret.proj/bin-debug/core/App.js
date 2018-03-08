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
            this.Stage.addChild(this._uiStage);
        }
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
        this._res = new ResLoader();
        this._timerMgr = new TimerMgr();
        this._easyloading = new EasyLoading();
        this._sceneMgr = new SceneMgr();
    };
    Object.defineProperty(App.prototype, "RES", {
        get: function () {
            return this._res;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "SceneMgr", {
        get: function () {
            return this._sceneMgr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "TimerMgr", {
        get: function () {
            return this._timerMgr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "EasyLoading", {
        get: function () {
            return this._easyloading;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "UIStage", {
        get: function () {
            return this._uiStage;
        },
        enumerable: true,
        configurable: true
    });
    App.prototype.setScaleMode = function (value) {
        this.Stage.scaleMode = value;
    };
    App.prototype.setFrameRate = function (value) {
        this.Stage.frameRate = value;
    };
    App.prototype.setMaxTouches = function (value) {
        this.Stage.maxTouches = value;
    };
    App.prototype.setTouchChildren = function (value) {
        this.Stage.touchChildren = value;
    };
    Object.defineProperty(App.prototype, "Height", {
        get: function () {
            return this.Stage.stageHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "Width", {
        get: function () {
            return this.Stage.stageWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "Stage", {
        get: function () {
            return egret.MainContext.instance.stage;
        },
        enumerable: true,
        configurable: true
    });
    App.prototype.fullScreenAdaptation = function (designWidth, designHeight, resizeCallback) {
        this._designWidth = designWidth;
        this._designHeight = designHeight;
        this._resizeCallback = resizeCallback;
    };
    App.prototype.stageOnResize = function () {
        this.Stage.removeEventListener(egret.Event.RESIZE, this.stageOnResize, this);
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
        this.Stage.setContentSize(designWidth, designHeight);
        if (this._resizeCallback) {
            this._resizeCallback();
        }
        this.Stage.addEventListener(egret.Event.RESIZE, this.stageOnResize, this);
    };
    return App;
}());
__reflect(App.prototype, "App");
//# sourceMappingURL=App.js.map