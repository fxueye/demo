class GameScene extends BaseScene{
    private _groupName:string = "preload";
    private _subGroups:Array<string> = ["loading","preload_ui"];
    private _inited:boolean = false;

    private _resources:string[] = null;
    public constructor(){
        super();
    }

    public onEnter():void{
        super.onEnter();
        this.addLayer(App.Instance.LayerMgr.UIMain);
        this.addLayer(App.Instance.LayerMgr.UIPopup);
        this.addLayer(App.Instance.LayerMgr.UIMessage);
        this.addLayer(App.Instance.LayerMgr.UITips);
        if(!this._inited){
            App.Instance.ViewMgr.open(ViewConst.LOADING);
            App.Instance.RES.loadGroups(this._groupName,this._subGroups,this.onResourceLoadComplete,this.onResourceLoadProgress,this);
            return;
        }
       
        let rect:eui.Rect = new eui.Rect();
        rect.fillColor = 0x78b93f;
        rect.percentHeight = 100;
        rect.percentWidth = 100;
        App.Instance.LayerMgr.UIMain.addChild(rect);
        
    }
        
    private onResourceLoadComplete():void{
        this._inited = true;
        App.Instance.ViewMgr.close(ViewConst.LOADING);
        this.onEnter();
    }
    private onResourceLoadProgress(itemsLoaded:number, itemsTotal:number):void{
        App.Instance.ControlMgr.getControl<LoadingController>(ControlConst.LOADING).setProgress(itemsLoaded,itemsTotal);
    }

    public onExit():void{
        super.onExit();
    }
}