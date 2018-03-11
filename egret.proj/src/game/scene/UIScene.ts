class UIScene extends BaseScene{
    public constructor(){
        super();
    }
    public onEnter():void{
        super.onEnter();
        this.addLayer(App.Instance.LayerMgr.UIMain);
        this.addLayer(App.Instance.LayerMgr.UIPopup);
        this.addLayer(App.Instance.LayerMgr.UIMessage);
        this.addLayer(App.Instance.LayerMgr.UITips);
        let rect:eui.Rect = new eui.Rect();
        rect.fillColor = 0x78b93f;
        rect.percentHeight = 100;
        rect.percentWidth = 100;
        App.Instance.LayerMgr.UIMain.addChild(rect);
        
        
    }
    public onExit():void{
        super.onExit();
    }
}