class EasyLoading{
    private _content:egret.Sprite = null;
    private _speed:number = 0.1;
    private _uiImageContainer: egret.DisplayObjectContainer;
    public constructor(){
        this.init();
    }
    private init():void{
        this._content = new egret.Sprite();
        this._content.graphics.beginFill(0x000000,0.2);
        this._content.graphics.drawRect(0,0,App.Instance.Width,App.Instance.Height);
        this._content.graphics.endFill();
        this._content.touchEnabled = true;
        
        this._uiImageContainer = new egret.DisplayObjectContainer();
        this._uiImageContainer.x = this._content.width / 2;
        this._uiImageContainer.y = this._content.height / 2;
        this._content.addChild(this._uiImageContainer);
        RES.getResByUrl("resource/assets/loading.png",function(texture:egret.Texture):void{
            let img:egret.Bitmap = new egret.Bitmap();
            img.texture = texture;
            img.x = -img.width/2;
            img.y = -img.height/2;
            this._uiImageContainer.addChild(img);
        },this,RES.ResourceItem.TYPE_IMAGE);
    }
    public showLoading():void{
        App.Instance.Stage.addChild(this._content);
        App.Instance.TimerMgr.startFarme(1,0,this.update,this);
    }
    public hideLoading():void{
        if(this._content && this._content.parent){
            App.Instance.Stage.removeChild(this._content);
            this._uiImageContainer.rotation = 0;
        }
        App.Instance.TimerMgr.remove(this.update,this);
    }
    public update(time:number):void{
        this._uiImageContainer.rotation += this._speed * time;
    }
}