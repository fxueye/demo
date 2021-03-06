class EasyToast{
    private _msg:string;
    private _content:egret.Sprite = null;
    private _toastContainer:egret.DisplayObjectContainer;
    private _textfield:egret.TextField;
    public constructor(){
        this.init();
    }
    private init():void{
        this._content = new egret.Sprite();
        this._content.graphics.beginFill(0x000000,0);
        this._content.graphics.drawRect(0,0,App.Instance.Width,App.Instance.Height);
        this._content.graphics.endFill();
        this._content.touchEnabled = false;
        this._toastContainer = new egret.DisplayObjectContainer();
        this._toastContainer.x = this._content.width / 2;
        this._toastContainer.y = this._content.height /2;
        this._content.addChild(this._toastContainer);
        this._textfield = new egret.TextField();
        this._textfield.multiline = true;
        this._textfield.size = 20;
        this._textfield.bold = true;
        this._textfield.textColor = 0xFFFFFF;
        this._textfield.stroke = 2;
        this._textfield.strokeColor = 0;
        this._textfield.textAlign = egret.HorizontalAlign.CENTER;
        this._textfield.width = App.Instance.Width * 0.5;
    }

}