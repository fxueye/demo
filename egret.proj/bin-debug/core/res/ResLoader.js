var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ResLoader = (function () {
    function ResLoader() {
        this._groupIndex = 0;
        this._configs = new Array();
        this._groups = {};
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceLoadProgress, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
    }
    ResLoader.prototype.addConfig = function (jsonPath, filePath) {
        this._configs.push([jsonPath, filePath]);
    };
    ResLoader.prototype.loadConfig = function (onConfigComplete, onConfigCompleteTarget) {
        this._onConfigComplete = onConfigComplete;
        this._onConfigCompleteTarget = onConfigCompleteTarget;
    };
    ResLoader.prototype.loadNextConfig = function () {
        if (this._configs.length == 0) {
            this._onConfigComplete.call(this._onConfigCompleteTarget);
            this._onConfigComplete = null;
            this._onConfigCompleteTarget = null;
            return;
        }
        var arr = this._configs.shift();
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigCompleteHandle, this);
        RES.loadConfig(arr[0], arr[1]);
    };
    ResLoader.prototype.onConfigCompleteHandle = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigCompleteHandle, this);
        this.loadNextConfig();
    };
    ResLoader.prototype.loadGroup = function (groupName, onResourceLoadComplete, onResourceLoadProgress, onResourceLoadCompleteTarget) {
        this._groups[groupName] = [onResourceLoadComplete, onResourceLoadProgress, onResourceLoadCompleteTarget];
        RES.loadGroup(groupName);
    };
    ResLoader.prototype.onResourceLoadComplete = function (event) {
        var groupName = event.groupName;
        if (this._groups[groupName]) {
            var loadComplete = this._groups[groupName][0];
            var loadCompleteTarget = this._groups[groupName][2];
            if (loadComplete != null) {
                loadComplete.call(loadCompleteTarget, groupName);
            }
            this._groups[groupName] = null;
            delete this._groups[groupName];
        }
    };
    ResLoader.prototype.onResourceLoadProgress = function (event) {
        var groupName = event.groupName;
        if (this._groups[groupName]) {
            var loadProgress = this._groups[groupName][1];
            var loadProgressTarget = this._groups[groupName[2]];
            if (loadProgress != null) {
                loadProgress.call(loadProgressTarget, event.itemsLoaded, event.itemsTotal);
            }
        }
    };
    ResLoader.prototype.onResourceLoadError = function (event) {
        console.log(event.groupName + " load failed!");
        this.onResourceLoadComplete(event);
    };
    ResLoader.prototype.createGroup = function (groupName, resKeys) {
        RES.createGroup(groupName, resKeys, true);
    };
    return ResLoader;
}());
__reflect(ResLoader.prototype, "ResLoader");
//# sourceMappingURL=ResLoader.js.map