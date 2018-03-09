class App {
    private static _instance : App;
    private _uiStage: eui.UILayer;
    private _sceneMgr: SceneMgr;
    private _res:ResLoader;
    private _timerMgr:TimerMgr;
    private _easyloading:EasyLoading;
    private _layerMgr:LayerMgr;
    private _viewMgr:ViewMgr;
    public constructor(){
        if(this._uiStage == null){
            this._uiStage = new eui.UILayer();
            this._uiStage.percentWidth = 100;
            this._uiStage.percentHeight = 100;
            this._uiStage.touchEnabled = false;
            this.Stage.addChild(this._uiStage);
        }

    }
    public static get Instance(): App{
        if(!this._instance){
            this._instance = new App();
        }
        return this._instance;
    }
    public init() : void{
        //初始化操作
        this._res = new ResLoader();
        this._timerMgr = new TimerMgr();
        this._easyloading = new EasyLoading();
        this._sceneMgr = new SceneMgr();
        this._layerMgr = new LayerMgr();
        this._viewMgr = new ViewMgr();
    }
    public get ViewMgr():ViewMgr{
        if(!this._viewMgr){
            this._viewMgr = new ViewMgr();
        }
        return this._viewMgr;
    }
    public get LayerMgr():LayerMgr{
        if(!this._layerMgr){
            this._layerMgr = new LayerMgr();
        }
        return this._layerMgr;
    }
    public get RES():ResLoader{
        if(!this._res){
            this._res = new ResLoader();
        }
        return this._res;
    }
    public get SceneMgr():SceneMgr{
        if(!this._sceneMgr){
            this._sceneMgr = new SceneMgr();
        }
        return this._sceneMgr;
    }
    public get TimerMgr():TimerMgr{
        if(!this._timerMgr){
            this._timerMgr = new TimerMgr();
        }
        return this._timerMgr;
    }
    public get EasyLoading():EasyLoading{
        if(!this._easyloading){
            this._easyloading = new EasyLoading();
        }
        return this._easyloading;
    }
    public get UIStage(): eui.UILayer{
        return this._uiStage;
    }
    public setScaleMode(value: string): void{
        this.Stage.scaleMode = value;
    }
    public setFrameRate(value: number): void{
        this.Stage.frameRate = value;
    }
    public setMaxTouches(value: number): void{
        this.Stage.maxTouches = value;
    }
    public setTouchChildren(value: boolean): void{
        this.Stage.touchChildren = value;
    }
    public get Height(): number{
        return this.Stage.stageHeight;
    }
    public get Width(): number{
        return this.Stage.stageWidth;
    }
    public get Stage(): egret.Stage{
        return egret.MainContext.instance.stage;
    }
    //全屏适配
    private _designWidth: number;
    private _designHeight: number;
    private _resizeCallback: Function;
    public fullScreenAdaptation(designWidth: number,designHeight: number,resizeCallback: Function):void{
        this._designWidth = designWidth;
        this._designHeight = designHeight;
        this._resizeCallback = resizeCallback;
        
    }
    private stageOnResize(): void{
        this.Stage.removeEventListener(egret.Event.RESIZE,this.stageOnResize,this);
        let designWidth: number = this._designWidth;
        let designHeight: number = this._designHeight;
        let clientWidth:number = window.innerWidth;
        let clientHeight:number = window.innerHeight;
        let a: number = clientWidth /  clientHeight;
        let b: number = designWidth / designHeight;
        let c: number = a / b;
        if(a > b){
            designWidth = Math.floor(designWidth * c);
            designHeight = Math.floor(designHeight * c);
        }
        this.Stage.setContentSize(designWidth,designHeight);
        if(this._resizeCallback){
            this._resizeCallback();
        }
        this.Stage.addEventListener(egret.Event.RESIZE,this.stageOnResize,this);
    }

}