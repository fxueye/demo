class LoadingController extends BaseController {
	public static SetProgress:number = 10000;

	private _loadingView:LoadingView;
	public constructor() {
		super();
		this._loadingView = new LoadingView(this,App.Instance.LayerMgr.UIMain);
		App.Instance.ViewMgr.register(ViewConst.LOADING,this._loadingView);
		
		this.registerFunc(LoadingController.SetProgress,this.setProgress,this);
	}
	private setProgress(current:number,total:number):void{
		this._loadingView.setProgress(current,total);
	}
}