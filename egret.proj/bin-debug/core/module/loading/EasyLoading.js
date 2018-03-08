var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EasyLoading = (function () {
    function EasyLoading() {
        this._content = null;
        this._speed = 0.1;
        this.init();
    }
    EasyLoading.prototype.init = function () {
        this._content = new egret.Sprite();
        this._content.graphics.beginFill(0x000000, 0.2);
        this._content.graphics.drawRect(0, 0, App.Instance.Width, App.Instance.Height);
        this._content.graphics.endFill();
        this._content.touchEnabled = true;
        this._uiImageContainer = new egret.DisplayObjectContainer();
        this._uiImageContainer.x = this._content.width / 2;
        this._uiImageContainer.y = this._content.height / 2;
        this._content.addChild(this._uiImageContainer);
        RES.getResByUrl("resource/assets/loading.png", function (texture) {
            var img = new egret.Bitmap();
            img.texture = texture;
            img.x = -img.width / 2;
            img.y = -img.height / 2;
            this._uiImageContainer.addChild(img);
        }, this, RES.ResourceItem.TYPE_IMAGE);
    };
    EasyLoading.prototype.showLoading = function () {
        App.Instance.Stage.addChild(this._content);
        App.Instance.TimerMgr.startFarme(1, 0, this.update, this);
    };
    EasyLoading.prototype.hideLoading = function () {
        if (this._content && this._content.parent) {
            App.Instance.Stage.removeChild(this._content);
            this._uiImageContainer.rotation = 0;
        }
        App.Instance.TimerMgr.remove(this.update, this);
    };
    EasyLoading.prototype.update = function (time) {
        this._uiImageContainer.rotation += this._speed * time;
    };
    return EasyLoading;
}());
__reflect(EasyLoading.prototype, "EasyLoading");
//# sourceMappingURL=EasyLoading.js.map