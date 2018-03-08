class BaseController{
    private _model:BaseModel;
    public constructor(){

    }
    public setModel(model:BaseModel){
        this._model = model;
    }
    public getModel():BaseModel{
        return this._model;
    }
}