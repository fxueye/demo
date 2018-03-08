class ViewMgr{
    private _views:any;
    private _opens:Array<number>;
    public constructor(){
        this._views = {};
        this._opens = [];
    }

    public register(key:number,view:IBaseView):void{
        if(view == null){
            return;
        }
        if(this._views[key]){
            return;
        }
        this._views[key] = view;
    }

    public unregister(key:number){
        if(!this._views[key]){
            return;
        }
        this._views[key] = null;
        delete this._views[key];
    }

    public getView(key:number):IBaseView{
        return this._views[key];
    }

    public destroy(key:number,newView:IBaseView = null):void{
        let oldView:IBaseView = this.getView(key);
        if(oldView){
            this.unregister(key);
            oldView.destroy();
            oldView = null;
        }
        if(newView)
            this.register(key,newView);
    }

    public open(key:number,...param:any[]):IBaseView{
        let view:IBaseView = this.getView(key);
        if(view == null){
            console.error("view_" + key + "not find!");
            return;
        }
        if(view.isShow()){
            view.open(param);
            return view;
        }
        if(view.isInit()){
            view.addToParent();
            view.open(param);
        }else{
            
        }
    }
}