class App {
    private static _instance : App;
    private _uiStage: eui.UILayer;
    private _sceneMgr: SceneMgr;
    public constructor(){
        if(this._uiStage == null){
            this._uiStage = new eui.UILayer();
            this._uiStage.percentWidth = 100;
            this._uiStage.percentHeight = 100;
            this._uiStage.touchEnabled = false;
            this.getStage().addChild(this._uiStage);
        }
        this._sceneMgr = new SceneMgr();
    }
    public static get Instance(): App{
        if(!this._instance){
            this._instance = new App();
        }
        return this._instance;
    }
    public init() : void{
        //初始化操作
    }
    
    public getUIStage(): eui.UILayer{
        return this._uiStage;
    }
    public setScaleMode(value: string): void{
        this.getStage().scaleMode = value;
    }
    public setFrameRate(value: number): void{
        this.getStage().frameRate = value;
    }
    public setMaxTouches(value: number): void{
        this.getStage().maxTouches = value;
    }
    public setTouchChildren(value: boolean): void{
        this.getStage().touchChildren = value;
    }
    public getHeight(): number{
        return this.getStage().stageHeight;
    }
    public getWidth(): number{
        return this.getStage().stageWidth;
    }
    public getStage(): egret.Stage{
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
        this.getStage().removeEventListener(egret.Event.RESIZE,this.stageOnResize,this);
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
        this.getStage().setContentSize(designWidth,designHeight);
        if(this._resizeCallback){
            this._resizeCallback();
        }
        this.getStage().addEventListener(egret.Event.RESIZE,this.stageOnResize,this);
    }

}