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
var UIScene = (function (_super) {
    __extends(UIScene, _super);
    function UIScene() {
        return _super.call(this) || this;
    }
    UIScene.prototype.onEnter = function () {
        _super.prototype.onEnter.call(this);
        this.addLayer(App.Instance.LayerMgr.UIMain);
        this.addLayer(App.Instance.LayerMgr.UIPopup);
        this.addLayer(App.Instance.LayerMgr.UIMessage);
        this.addLayer(App.Instance.LayerMgr.UITips);
        var rect = new eui.Rect();
        rect.fillColor = 0x78b93f;
        rect.percentHeight = 100;
        rect.percentWidth = 100;
        App.Instance.LayerMgr.UIMain.addChild(rect);
    };
    UIScene.prototype.onExit = function () {
        _super.prototype.onExit.call(this);
    };
    return UIScene;
}(BaseScene));
__reflect(UIScene.prototype, "UIScene");
//# sourceMappingURL=UIScene.js.map