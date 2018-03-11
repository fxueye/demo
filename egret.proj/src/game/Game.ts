class Game{
    public constructor(){
        let groupName:string = "preload";
        let subGroups:Array<string> = ["loading","preload_ui"];
        App.Instance.RES.loadGroups(groupName,subGroups,this.onResourceLoadComplete,this.onResourceLoadProgress,this);
    }
    private onResourceLoadComplete():void{
        App.Instance.SceneMgr.runScene(SceneConst.GAME);
    }
    private onResourceLoadProgress(itemsLoaded:number, itemsTotal:number):void{
        // let load:LoadingController = App.Instance.ControlMgr.getControl(ControlConst.LOADING);
        // load.setProgress(itemsLoaded,itemsTotal);
    }
}