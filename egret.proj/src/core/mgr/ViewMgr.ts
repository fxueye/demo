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
            App.Instance.EasyLoading.showLoading();
            view.loadResource(function(){
                view.setVisible(false);
                view.addToParent();
            }.bind(this),function(){
                view.initCompoments();
                view.initData();
                view.open(param);
                view.setVisible(true);
                App.Instance.EasyLoading.hideLoading();
            }.bind(this));
        }
        this._opens.push(key);
        return view;
    }
    public close(key:number, ...param:any[]):void{
        if(!this.isShow(key)){
            return;
        }
        let view:IBaseView = this.getView(key);
        if(view == null){
            return;
        }
        let viewIndex = this._opens.indexOf(key);
        if(viewIndex > 0){
            this._opens.splice(viewIndex,1);
        }
        view.removeFromParent();
        view.close(param);
    }
    public closeView(view:IBaseView, ...param:any[]):void{
        let keys = Object.keys(this._views);
        for(let i:number = 0 ; i < keys.length - 1; i++){
            let key:number = parseInt(keys[i]);
            if(this._views[key] == view){
                this.close(key,param);
                return;
            }
        }
    }
    public isShow(key:number):boolean{
        return this._opens.indexOf(key) != -1;
    }
}