var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Game = (function () {
    function Game() {
        var groupName = "preload";
        var subGroups = ["loading", "preload_ui"];
        App.Instance.RES.loadGroups(groupName, subGroups, this.onResourceLoadComplete, this.onResourceLoadProgress, this);
    }
    Game.prototype.onResourceLoadComplete = function () {
        App.Instance.SceneMgr.runScene(SceneConst.GAME);
    };
    Game.prototype.onResourceLoadProgress = function (itemsLoaded, itemsTotal) {
        // let load:LoadingController = App.Instance.ControlMgr.getControl(ControlConst.LOADING);
        // load.setProgress(itemsLoaded,itemsTotal);
    };
    return Game;
}());
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map