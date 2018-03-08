interface IBaseView{
    isInit():boolean;
    isShow():boolean;
    addToParent():void;
    removeFromParent():void;
    initCompoments():void;
    initData():void;
    setVisible(value:boolean):void;
    open(...param:any[]):void;
    close(...param:any[]):void;
    destroy():void;
    setResources(resources:string[]):void;
    loadResource(loadComplete:Function,initComplete:Function):void;
}
class BaseSpriteView extends BaseSprite implements IBaseView{
    private _isInit:boolean;
    private _controller:BaseController;
    private _parent:egret.DisplayObjectContainer;
    private _resources:string[] = null;
    public constructor(controller:BaseController,parent:egret.DisplayObjectContainer){
        super();
        this._controller = controller;
        this._parent = parent;
        this._isInit = false;
        App.Instance.Stage.addEventListener(egret.Event.RESIZE,this.onResize,this);
    }

    public initCompoments():void{
        this._isInit = true;
    }
    protected onResize():void {

    }
    public isInit():boolean{
        return this._isInit;
    }
    public isShow():boolean{
        return this.stage != null && this.visible;
    }
    public addToParent():void{
        this._parent.addChild(this);
    }
    public removeFromParent():void{
        this.parent.removeChild(this);
    }
    public setVisible(value:boolean):void{
        this.visible = value;
    }
    public setResources(resources:string[]):void{
        this._resources = resources;
    }
    public loadResource(loadComplete:Function,initComplete:Function):void{
        if(this._resources && this._resources.length > 0){
            App.Instance.RES.loadResource(this._resources,[],loadComplete,null,this);
            this.once(eui.UIEvent.CREATION_COMPLETE,initComplete,this);
        }else{
            loadComplete();
            initComplete();
        }
    }
    public open(...param:any[]):void{

    }
    public close(...param:any[]):void{

    }
    public initData():void{

    }
    public destroy():void{
        this._controller = null;
        this._parent = null;
        this._resources = null;
    }

}
class BaseUIView extends eui.Component implements IBaseView{
    private _isInit:boolean;
    private _controller:BaseController;
    private _parent:egret.DisplayObjectContainer;
    private _resources:string[] = null;
    public constructor(controller:BaseController,parent:egret.DisplayObjectContainer){
        super();
        this._controller = controller;
        this._parent = parent;
        this._isInit = false;
        this.percentWidth = 100;
        this.percentHeight = 100;
    }
    public initCompoments():void{
        this._isInit = true;
    }
    public isInit():boolean{
        return this._isInit;
    }
    public isShow():boolean{
        return this.stage != null && this.visible;
    }
    public addToParent():void{
        this._parent.addChild(this);
    }
    public removeFromParent():void{
        this.parent.removeChild(this);
    }
    public setVisible(value:boolean):void{
        this.visible = value;
    }
    public setResources(resources:string[]):void{
        this._resources = resources;
    }
    public loadResource(loadComplete:Function,initComplete:Function):void{
        if(this._resources && this._resources.length > 0){
            App.Instance.RES.loadResource(this._resources,[],loadComplete,null,this);
            this.once(eui.UIEvent.CREATION_COMPLETE,initComplete,this);
        }else{
            loadComplete();
            initComplete();
        }
    }
    public open(...param:any[]):void{

    }
    public close(...param:any[]):void{

    }
    public initData():void{

    }
    public destroy():void{
        this._controller = null;
        this._parent = null;
        this._resources = null;
    }

}