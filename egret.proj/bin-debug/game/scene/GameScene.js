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
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this._groupName = "preload";
        _this._subGroups = ["loading", "preload_ui"];
        _this._inited = false;
        _this._resources = null;
        return _this;
    }
    GameScene.prototype.onEnter = function () {
        _super.prototype.onEnter.call(this);
        if (!this._inited) {
            this.addLayer(App.Instance.LayerMgr.UIMain);
            this.addLayer(App.Instance.LayerMgr.UIPopup);
            this.addLayer(App.Instance.LayerMgr.UIMessage);
            this.addLayer(App.Instance.LayerMgr.UITips);
            App.Instance.ViewMgr.open(ViewConst.LOADING);
            App.Instance.RES.loadGroups(this._groupName, this._subGroups, this.onResourceLoadComplete, this.onResourceLoadProgress, this);
            return;
        }
        var rect = new eui.Rect();
        rect.fillColor = 0x78b93f;
        rect.percentHeight = 100;
        rect.percentWidth = 100;
        App.Instance.LayerMgr.UIMain.addChild(rect);
    };
    GameScene.prototype.onResourceLoadComplete = function () {
        this._inited = true;
        // App.Instance.ViewMgr.close(ViewConst.LOADING);
        // this.onEnter();
    };
    GameScene.prototype.onResourceLoadProgress = function (itemsLoaded, itemsTotal) {
        App.Instance.ControlMgr.getControl(ControlConst.LOADING).setProgress(itemsLoaded, itemsTotal);
    };
    GameScene.prototype.onExit = function () {
        _super.prototype.onExit.call(this);
    };
    return GameScene;
}(BaseScene));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map