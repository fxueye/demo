class LoadingView extends BaseUIView implements RES.PromiseTaskReporter {
	public txtLoading:eui.Label;
	public constructor(controller:BaseController,parent:eui.Group) {
		super(controller,parent);
		this.skinName = "skin.LoadingSkin"
	}
	public onProgress(current:number,total:number):void{
		this.txtLoading.text = "资源加载中..." + current + "/" + total;
	}
	public setProgress(current:number,total:number):void{
		this.txtLoading.text = "资源加载中..." + current + "/" + total;
	}
}