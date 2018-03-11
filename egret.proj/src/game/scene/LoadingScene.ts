class LoadingScene extends BaseScene{
    public constructor(){
        super();
    }
    public onEnter():void{
        super.onEnter();
        //初始化场景层级
        this.addLayer(App.Instance.LayerMgr.UIMain);
        App.Instance.ViewMgr.open(ViewConst.LOADING);
        
    }
    public onExit():void{
        super.onExit();
    }

}