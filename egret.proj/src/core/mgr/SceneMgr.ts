class SceneMgr{
    private _scenes:any;
    private _currScene:number;

    public constructor(){
        this._scenes = {};
    }
    public register(key:number, scene:BaseScene): void{
        this._scenes[key] = scene;
    }
    public runScene(key: number, ...param:any[]): void{
        let nowScene:BaseScene = this._scenes[key];
        if(nowScene == null){
            console.log(key + "scene not find!");
            return;
        }
        let oldScene:BaseScene = this._scenes[this._currScene];
        if(oldScene){
            oldScene.onExit();
        }
        nowScene.onEnter(param);
        this._currScene = key;
    }
    public getCurrScene(): number{
        return this._currScene;
    }
    public clear(): void{
        let nowScene:BaseScene = this._scenes[this._currScene];
        if(nowScene){
            nowScene.onExit();
            this._currScene = null;
        }
        this._scenes = {};
    }
}