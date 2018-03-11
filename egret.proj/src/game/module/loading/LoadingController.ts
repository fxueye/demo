class LoadingController extends BaseController {
	private _loadingView:LoadingView;
	public constructor() {
		super();
		this._loadingView = new LoadingView(this,App.Instance.LayerMgr.UIMain);
		App.Instance.ViewMgr.register(ViewConst.LOADING,this._loadingView);
		// App.Instance.SoundMgr.playBg("bg_mp3",true);
		
	}
	private setProgress(current:number,total:number):void{
		this._loadingView.setProgress(current,total);
	}
}