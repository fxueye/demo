class BaseController{
    private _messages:any;
    private _model:BaseModel;
    public constructor(){   
        this._messages = {}
    }
    public registerFunc(key:any,callbackFunc:Function,callbackObj:any):void{
        this._messages[key] = [callbackFunc,callbackObj];
    }
    public applyFunc(key:any,...param:any[]):any{
        let listen:any = this._messages[key];
        if(listen){
            return listen[0].apply(listen[1],param);
        }else{
            console.trace("key:"+ key +" not find!");
            return null;
        }
    }
    public setModel(model:BaseModel){
        this._model = model;
    }
    public getModel():BaseModel{
        return this._model;
    }
}