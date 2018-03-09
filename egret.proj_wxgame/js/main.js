var egret = window.egret;var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var BaseSprite = (function (_super) {
    __extends(BaseSprite, _super);
    function BaseSprite() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = false;
        return _this;
    }
    return BaseSprite;
}(egret.DisplayObjectContainer));
__reflect(BaseSprite.prototype, "BaseSprite");
var TimerMgr = (function () {
    function TimerMgr() {
        this._handlers = new Array();
        this._delHandler = new Array();
        this._currTime = 0;
        this._currFrame = 0;
        this._timeScale = 1;
        egret.Ticker.getInstance().register(this.onEnterFrame, this);
    }
    TimerMgr.prototype.onEnterFrame = function () {
        this._currFrame++;
        this._currTime = egret.getTimer();
        for (var i = 0; i < this._handlers.length; i++) {
            var handler = this._handlers[i];
            var t = handler.useFrame ? this._currFrame : this._currTime;
            if (t >= handler.exeTime) {
                handler.method.call(handler.methodObj, (this._currTime - handler.dealTime) * this._timeScale);
                handler.dealTime = this._currTime;
                handler.exeTime += handler.delay;
                if (!handler.repeat) {
                    if (handler.repeatCount > 1) {
                        handler.repeatCount--;
                    }
                    else {
                        if (handler.completeMethod) {
                            handler.completeMethod.call(handler.complateMethodObj);
                        }
                        this._delHandler.push(handler);
                    }
                }
            }
        }
        while (this._delHandler.length) {
            var handler = this._delHandler.pop();
            this.remove(handler.method, handler.methodObj);
        }
    };
    TimerMgr.prototype.create = function (useFrame, delay, repeatCount, method, methodObj, completeMethod, complateMethodObj) {
        if (delay < 0 || repeatCount < 0 || method == null) {
            console.error("Please check delay repeatCount and method!");
            return;
        }
        this.remove(method, methodObj);
        var handler = new TimerHander();
        handler.useFrame = useFrame;
        handler.repeat = repeatCount == 0;
        handler.repeatCount = repeatCount;
        handler.delay = delay;
        handler.method = method;
        handler.methodObj = methodObj;
        handler.completeMethod = completeMethod;
        handler.complateMethodObj = complateMethodObj;
        handler.exeTime = delay + (useFrame ? this._currTime : this._currTime);
        handler.dealTime = this._currTime;
        this._handlers.push(handler);
    };
    //定时执行
    TimerMgr.prototype.startTimer = function (delay, repeatCount, method, methodObj, complateMethod, complateMethodObj) {
        if (complateMethod === void 0) { complateMethod = null; }
        if (complateMethodObj === void 0) { complateMethodObj = null; }
        this.create(false, delay, repeatCount, method, methodObj, complateMethod, complateMethodObj);
    };
    TimerMgr.prototype.startFarme = function (delay, repeatCount, method, methodObj, complateMethod, complateMethodObj) {
        if (complateMethod === void 0) { complateMethod = null; }
        if (complateMethodObj === void 0) { complateMethodObj = null; }
        this.create(true, delay, repeatCount, method, methodObj, complateMethod, complateMethodObj);
    };
    TimerMgr.prototype.remove = function (method, methodObj) {
        var count = this._handlers.length;
        for (var i = count - 1; i >= 0; i--) {
            var handler = this._handlers[i];
            if (handler.method == method && handler.methodObj == methodObj) {
                this._handlers[i] = null;
                this._handlers.splice(i, 1);
            }
            break;
        }
    };
    TimerMgr.prototype.removeAll = function (methodObj) {
        var count = this._handlers.length;
        for (var i = count - 1; i >= 0; i--) {
            var handler = this._handlers[i];
            if (handler.methodObj == methodObj) {
                this._handlers[i] = null;
                this._handlers.splice(i, 1);
            }
        }
    };
    Object.defineProperty(TimerMgr.prototype, "count", {
        get: function () {
            return this._handlers.length;
        },
        enumerable: true,
        configurable: true
    });
    TimerMgr.prototype.setTimeScale = function (timeScale) {
        this._timeScale = timeScale;
    };
    return TimerMgr;
}());
__reflect(TimerMgr.prototype, "TimerMgr");
var TimerHander = (function () {
    function TimerHander() {
        this.delay = 0;
        this.repeatCount = 0;
        this.exeTime = 0;
        this.dealTime = 0;
    }
    TimerHander.prototype.clear = function () {
        this.method = null;
        this.methodObj = null;
        this.completeMethod = null;
        this.complateMethodObj = null;
    };
    return TimerHander;
}());
__reflect(TimerHander.prototype, "TimerHander");
var App = (function () {
    function App() {
        if (this._uiStage == null) {
            this._uiStage = new eui.UILayer();
            this._uiStage.percentWidth = 100;
            this._uiStage.percentHeight = 100;
            this._uiStage.touchEnabled = false;
            this.Stage.addChild(this._uiStage);
        }
    }
    Object.defineProperty(App, "Instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new App();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    App.prototype.init = function () {
        //初始化操作
        this._res = new ResLoader();
        this._timerMgr = new TimerMgr();
        this._easyloading = new EasyLoading();
        this._sceneMgr = new SceneMgr();
    };
    Object.defineProperty(App.prototype, "RES", {
        get: function () {
            return this._res;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "SceneMgr", {
        get: function () {
            return this._sceneMgr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "TimerMgr", {
        get: function () {
            return this._timerMgr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "EasyLoading", {
        get: function () {
            return this._easyloading;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "UIStage", {
        get: function () {
            return this._uiStage;
        },
        enumerable: true,
        configurable: true
    });
    App.prototype.setScaleMode = function (value) {
        this.Stage.scaleMode = value;
    };
    App.prototype.setFrameRate = function (value) {
        this.Stage.frameRate = value;
    };
    App.prototype.setMaxTouches = function (value) {
        this.Stage.maxTouches = value;
    };
    App.prototype.setTouchChildren = function (value) {
        this.Stage.touchChildren = value;
    };
    Object.defineProperty(App.prototype, "Height", {
        get: function () {
            return this.Stage.stageHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "Width", {
        get: function () {
            return this.Stage.stageWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "Stage", {
        get: function () {
            return egret.MainContext.instance.stage;
        },
        enumerable: true,
        configurable: true
    });
    App.prototype.fullScreenAdaptation = function (designWidth, designHeight, resizeCallback) {
        this._designWidth = designWidth;
        this._designHeight = designHeight;
        this._resizeCallback = resizeCallback;
    };
    App.prototype.stageOnResize = function () {
        this.Stage.removeEventListener(egret.Event.RESIZE, this.stageOnResize, this);
        var designWidth = this._designWidth;
        var designHeight = this._designHeight;
        var clientWidth = window.innerWidth;
        var clientHeight = window.innerHeight;
        var a = clientWidth / clientHeight;
        var b = designWidth / designHeight;
        var c = a / b;
        if (a > b) {
            designWidth = Math.floor(designWidth * c);
            designHeight = Math.floor(designHeight * c);
        }
        this.Stage.setContentSize(designWidth, designHeight);
        if (this._resizeCallback) {
            this._resizeCallback();
        }
        this.Stage.addEventListener(egret.Event.RESIZE, this.stageOnResize, this);
    };
    return App;
}());
__reflect(App.prototype, "App");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var AssetAdapter = (function () {
    function AssetAdapter() {
    }
    /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
    AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    return AssetAdapter;
}());
__reflect(AssetAdapter.prototype, "AssetAdapter", ["eui.IAssetAdapter"]);
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var ThemeAdapter = (function () {
    function ThemeAdapter() {
    }
    /**
     * 解析主题
     * @param url 待解析的主题url
     * @param onSuccess 解析完成回调函数，示例：compFunc(e:egret.Event):void;
     * @param onError 解析失败回调函数，示例：errorFunc():void;
     * @param thisObject 回调的this引用
     */
    ThemeAdapter.prototype.getTheme = function (url, onSuccess, onError, thisObject) {
        function onResGet(e) {
            onSuccess.call(thisObject, e);
        }
        function onResError(e) {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                onError.call(thisObject);
            }
        }
        if (typeof generateEUI !== 'undefined') {
            egret.callLater(function () {
                onSuccess.call(thisObject, generateEUI);
            }, this);
        }
        else {
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }
    };
    return ThemeAdapter;
}());
__reflect(ThemeAdapter.prototype, "ThemeAdapter", ["eui.IThemeAdapter"]);
var BaseLayer = (function (_super) {
    __extends(BaseLayer, _super);
    function BaseLayer() {
        var _this = _super.call(this) || this;
        _this.percentWidth = 100;
        _this.percentHeight = 100;
        _this.touchEnabled = false;
        return _this;
    }
    return BaseLayer;
}(eui.Group));
__reflect(BaseLayer.prototype, "BaseLayer");
var BaseScene = (function () {
    function BaseScene() {
        this._layers = new Array();
    }
    BaseScene.prototype.onEnter = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    BaseScene.prototype.onExit = function () {
        this.removeAllLayer();
    };
    BaseScene.prototype.addLayer = function (layer) {
        if (layer instanceof BaseSprite) {
            App.Instance.Stage.addChild(layer);
            this._layers.push(layer);
        }
        else if (layer instanceof BaseLayer) {
            App.Instance.UIStage.addChild(layer);
            this._layers.push(layer);
        }
    };
    BaseScene.prototype.addLayerAt = function (layer, index) {
        if (layer instanceof BaseSprite) {
            App.Instance.Stage.addChildAt(layer, index);
            this._layers.push(layer);
        }
        else if (layer instanceof BaseLayer) {
            App.Instance.UIStage.addChildAt(layer, index);
            this._layers.push(layer);
        }
    };
    BaseScene.prototype.removeLayer = function (layer) {
        if (layer instanceof BaseSprite) {
            App.Instance.Stage.removeChild(layer);
            this._layers.splice(this._layers.indexOf(layer), 1);
        }
        else if (layer instanceof BaseLayer) {
            App.Instance.UIStage.removeChild(layer);
            this._layers.splice(this._layers.indexOf(layer), 1);
        }
    };
    BaseScene.prototype.layerRemoveAllChild = function (layer) {
        if (layer instanceof BaseSprite) {
            layer.removeChildren();
        }
        else if (layer instanceof BaseLayer) {
            layer.removeChildren();
        }
    };
    BaseScene.prototype.removeAllLayer = function () {
        while (this._layers.length) {
            var layer = this._layers[0];
            this.layerRemoveAllChild(layer);
            this.removeLayer(layer);
        }
    };
    return BaseScene;
}());
__reflect(BaseScene.prototype, "BaseScene");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
var SceneMgr = (function () {
    function SceneMgr() {
        this._scenes = {};
    }
    SceneMgr.prototype.register = function (key, scene) {
        this._scenes[key] = scene;
    };
    SceneMgr.prototype.runScene = function (key) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        var nowScene = this._scenes[key];
        if (nowScene == null) {
            console.log(key + "scene not find!");
            return;
        }
        var oldScene = this._scenes[this._currScene];
        if (oldScene) {
            oldScene.onExit();
        }
        nowScene.onEnter(param);
        this._currScene = key;
    };
    SceneMgr.prototype.getCurrScene = function () {
        return this._currScene;
    };
    SceneMgr.prototype.clear = function () {
        var nowScene = this._scenes[this._currScene];
        if (nowScene) {
            nowScene.onExit();
            this._currScene = null;
        }
        this._scenes = {};
    };
    return SceneMgr;
}());
__reflect(SceneMgr.prototype, "SceneMgr");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, RES.getResAsync("description_json")];
                    case 2:
                        result = _a.sent();
                        this.startAnimation(result);
                        return [4 /*yield*/, platform.login()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 4:
                        userInfo = _a.sent();
                        console.log(userInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        var sky = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);
        var icon = this.createBitmapByName("egret_icon_png");
        this.addChild(icon);
        icon.x = 26;
        icon.y = 33;
        var line = new egret.Shape();
        line.graphics.lineStyle(2, 0xffffff);
        line.graphics.moveTo(0, 0);
        line.graphics.lineTo(0, 117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        this.addChild(line);
        var colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "Hello Egret";
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);
        var textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;
        var button = new eui.Button();
        button.label = "Click!";
        button.horizontalCenter = 0;
        button.verticalCenter = 0;
        this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        App.Instance.init();
        App.Instance.EasyLoading.showLoading();
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    Main.prototype.startAnimation = function (result) {
        var _this = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = result.map(function (text) { return parser.parse(text); });
        var textfield = this.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var textFlow = textflowArr[count];
            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, _this);
        };
        change();
    };
    /**
     * 点击按钮
     * Click the button
     */
    Main.prototype.onButtonClick = function (e) {
        var panel = new eui.Panel();
        panel.title = "Title";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
var ViewMgr = (function () {
    function ViewMgr() {
        this._views = {};
        this._opens = [];
    }
    ViewMgr.prototype.register = function (key, view) {
        if (view == null) {
            return;
        }
        if (this._views[key]) {
            return;
        }
        this._views[key] = view;
    };
    ViewMgr.prototype.unregister = function (key) {
        if (!this._views[key]) {
            return;
        }
        this._views[key] = null;
        delete this._views[key];
    };
    ViewMgr.prototype.getView = function (key) {
        return this._views[key];
    };
    ViewMgr.prototype.destroy = function (key, newView) {
        if (newView === void 0) { newView = null; }
        var oldView = this.getView(key);
        if (oldView) {
            this.unregister(key);
            oldView.destroy();
            oldView = null;
        }
        if (newView)
            this.register(key, newView);
    };
    ViewMgr.prototype.open = function (key) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        var view = this.getView(key);
        if (view == null) {
            console.error("view_" + key + "not find!");
            return;
        }
        if (view.isShow()) {
            view.open(param);
            return view;
        }
        if (view.isInit()) {
            view.addToParent();
            view.open(param);
        }
        else {
            App.Instance.EasyLoading.showLoading();
            view.loadResource(function () {
                view.setVisible(false);
                view.addToParent();
            }.bind(this), function () {
                view.initCompoments();
                view.initData();
                view.open(param);
                view.setVisible(true);
                App.Instance.EasyLoading.hideLoading();
            }.bind(this));
        }
        this._opens.push(key);
        return view;
    };
    ViewMgr.prototype.close = function (key) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        if (!this.isShow(key)) {
            return;
        }
        var view = this.getView(key);
        if (view == null) {
            return;
        }
        var viewIndex = this._opens.indexOf(key);
        if (viewIndex > 0) {
            this._opens.splice(viewIndex, 1);
        }
        view.removeFromParent();
        view.close(param);
    };
    ViewMgr.prototype.closeView = function (view) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        var keys = Object.keys(this._views);
        for (var i = 0; i < keys.length - 1; i++) {
            var key = parseInt(keys[i]);
            if (this._views[key] == view) {
                this.close(key, param);
                return;
            }
        }
    };
    ViewMgr.prototype.isShow = function (key) {
        return this._opens.indexOf(key) != -1;
    };
    return ViewMgr;
}());
__reflect(ViewMgr.prototype, "ViewMgr");
var EasyLoading = (function () {
    function EasyLoading() {
        this._content = null;
        this._speed = 0.1;
        this.init();
    }
    EasyLoading.prototype.init = function () {
        this._content = new egret.Sprite();
        this._content.graphics.beginFill(0x000000, 0.2);
        this._content.graphics.drawRect(0, 0, App.Instance.Width, App.Instance.Height);
        this._content.graphics.endFill();
        this._content.touchEnabled = true;
        this._uiImageContainer = new egret.DisplayObjectContainer();
        this._uiImageContainer.x = this._content.width / 2;
        this._uiImageContainer.y = this._content.height / 2;
        this._content.addChild(this._uiImageContainer);
        RES.getResByUrl("resource/assets/loading.png", function (texture) {
            var img = new egret.Bitmap();
            img.texture = texture;
            img.x = -img.width / 2;
            img.y = -img.height / 2;
            this._uiImageContainer.addChild(img);
        }, this, RES.ResourceItem.TYPE_IMAGE);
    };
    EasyLoading.prototype.showLoading = function () {
        App.Instance.Stage.addChild(this._content);
        App.Instance.TimerMgr.startFarme(1, 0, this.update, this);
    };
    EasyLoading.prototype.hideLoading = function () {
        if (this._content && this._content.parent) {
            App.Instance.Stage.removeChild(this._content);
            this._uiImageContainer.rotation = 0;
        }
        App.Instance.TimerMgr.remove(this.update, this);
    };
    EasyLoading.prototype.update = function (time) {
        this._uiImageContainer.rotation += this._speed * time;
    };
    return EasyLoading;
}());
__reflect(EasyLoading.prototype, "EasyLoading");
var EasyToast = (function () {
    function EasyToast() {
        this._content = null;
        this.init();
    }
    EasyToast.prototype.init = function () {
        this._content = new egret.Sprite();
        this._content.graphics.beginFill(0x000000, 0);
        this._content.graphics.drawRect(0, 0, App.Instance.Width, App.Instance.Height);
        this._content.graphics.endFill();
        this._content.touchEnabled = false;
        this._toastContainer = new egret.DisplayObjectContainer();
        this._toastContainer.x = this._content.width / 2;
        this._toastContainer.y = this._content.height / 2;
        this._content.addChild(this._toastContainer);
        this._textfield = new egret.TextField();
        this._textfield.multiline = true;
        this._textfield.size = 20;
        this._textfield.bold = true;
        this._textfield.textColor = 0xFFFFFF;
        this._textfield.stroke = 2;
        this._textfield.strokeColor = 0;
        this._textfield.textAlign = egret.HorizontalAlign.CENTER;
        this._textfield.width = App.Instance.Width * 0.5;
    };
    return EasyToast;
}());
__reflect(EasyToast.prototype, "EasyToast");
var BaseController = (function () {
    function BaseController() {
    }
    BaseController.prototype.setModel = function (model) {
        this._model = model;
    };
    BaseController.prototype.getModel = function () {
        return this._model;
    };
    return BaseController;
}());
__reflect(BaseController.prototype, "BaseController");
var BaseModel = (function () {
    function BaseModel(controller) {
        this._controller = controller;
        this._controller.setModel(this);
    }
    return BaseModel;
}());
__reflect(BaseModel.prototype, "BaseModel");
var BaseProxy = (function () {
    function BaseProxy(controller) {
        this._controller = controller;
    }
    return BaseProxy;
}());
__reflect(BaseProxy.prototype, "BaseProxy");
var BaseSpriteView = (function (_super) {
    __extends(BaseSpriteView, _super);
    function BaseSpriteView(controller, parent) {
        var _this = _super.call(this) || this;
        _this._resources = null;
        _this._controller = controller;
        _this._parent = parent;
        _this._isInit = false;
        App.Instance.Stage.addEventListener(egret.Event.RESIZE, _this.onResize, _this);
        return _this;
    }
    BaseSpriteView.prototype.initCompoments = function () {
        this._isInit = true;
    };
    BaseSpriteView.prototype.onResize = function () {
    };
    BaseSpriteView.prototype.isInit = function () {
        return this._isInit;
    };
    BaseSpriteView.prototype.isShow = function () {
        return this.stage != null && this.visible;
    };
    BaseSpriteView.prototype.addToParent = function () {
        this._parent.addChild(this);
    };
    BaseSpriteView.prototype.removeFromParent = function () {
        this.parent.removeChild(this);
    };
    BaseSpriteView.prototype.setVisible = function (value) {
        this.visible = value;
    };
    BaseSpriteView.prototype.setResources = function (resources) {
        this._resources = resources;
    };
    BaseSpriteView.prototype.loadResource = function (loadComplete, initComplete) {
        if (this._resources && this._resources.length > 0) {
            App.Instance.RES.loadResource(this._resources, [], loadComplete, null, this);
            this.once(eui.UIEvent.CREATION_COMPLETE, initComplete, this);
        }
        else {
            loadComplete();
            initComplete();
        }
    };
    BaseSpriteView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    BaseSpriteView.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    BaseSpriteView.prototype.initData = function () {
    };
    BaseSpriteView.prototype.destroy = function () {
        this._controller = null;
        this._parent = null;
        this._resources = null;
    };
    return BaseSpriteView;
}(BaseSprite));
__reflect(BaseSpriteView.prototype, "BaseSpriteView", ["IBaseView"]);
var BaseUIView = (function (_super) {
    __extends(BaseUIView, _super);
    function BaseUIView(controller, parent) {
        var _this = _super.call(this) || this;
        _this._resources = null;
        _this._controller = controller;
        _this._parent = parent;
        _this._isInit = false;
        _this.percentWidth = 100;
        _this.percentHeight = 100;
        return _this;
    }
    BaseUIView.prototype.initCompoments = function () {
        this._isInit = true;
    };
    BaseUIView.prototype.isInit = function () {
        return this._isInit;
    };
    BaseUIView.prototype.isShow = function () {
        return this.stage != null && this.visible;
    };
    BaseUIView.prototype.addToParent = function () {
        this._parent.addChild(this);
    };
    BaseUIView.prototype.removeFromParent = function () {
        this.parent.removeChild(this);
    };
    BaseUIView.prototype.setVisible = function (value) {
        this.visible = value;
    };
    BaseUIView.prototype.setResources = function (resources) {
        this._resources = resources;
    };
    BaseUIView.prototype.loadResource = function (loadComplete, initComplete) {
        if (this._resources && this._resources.length > 0) {
            App.Instance.RES.loadResource(this._resources, [], loadComplete, null, this);
            this.once(eui.UIEvent.CREATION_COMPLETE, initComplete, this);
        }
        else {
            loadComplete();
            initComplete();
        }
    };
    BaseUIView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    BaseUIView.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    BaseUIView.prototype.initData = function () {
    };
    BaseUIView.prototype.destroy = function () {
        this._controller = null;
        this._parent = null;
        this._resources = null;
    };
    return BaseUIView;
}(eui.Component));
__reflect(BaseUIView.prototype, "BaseUIView", ["IBaseView"]);
var DebugPlatform = (function () {
    function DebugPlatform() {
    }
    DebugPlatform.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { nickName: "username" }];
            });
        });
    };
    DebugPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return DebugPlatform;
}());
__reflect(DebugPlatform.prototype, "DebugPlatform", ["Platform"]);
if (!window.platform) {
    window.platform = new DebugPlatform();
}
var ResLoader = (function () {
    function ResLoader() {
        this._groupIndex = 0;
        this._configs = new Array();
        this._groups = {};
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceLoadProgress, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
    }
    ResLoader.prototype.addConfig = function (jsonPath, filePath) {
        this._configs.push([jsonPath, filePath]);
    };
    ResLoader.prototype.loadConfig = function (onConfigComplete, onConfigCompleteTarget) {
        this._onConfigComplete = onConfigComplete;
        this._onConfigCompleteTarget = onConfigCompleteTarget;
    };
    ResLoader.prototype.loadNextConfig = function () {
        if (this._configs.length == 0) {
            this._onConfigComplete.call(this._onConfigCompleteTarget);
            this._onConfigComplete = null;
            this._onConfigCompleteTarget = null;
            return;
        }
        var arr = this._configs.shift();
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigCompleteHandle, this);
        RES.loadConfig(arr[0], arr[1]);
    };
    ResLoader.prototype.onConfigCompleteHandle = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigCompleteHandle, this);
        this.loadNextConfig();
    };
    ResLoader.prototype.loadGroup = function (groupName, onResourceLoadComplete, onResourceLoadProgress, onResourceLoadCompleteTarget) {
        this._groups[groupName] = [onResourceLoadComplete, onResourceLoadProgress, onResourceLoadCompleteTarget];
        RES.loadGroup(groupName);
    };
    ResLoader.prototype.onResourceLoadComplete = function (event) {
        var groupName = event.groupName;
        if (this._groups[groupName]) {
            var loadComplete = this._groups[groupName][0];
            var loadCompleteTarget = this._groups[groupName][2];
            if (loadComplete != null) {
                loadComplete.call(loadCompleteTarget, groupName);
            }
            this._groups[groupName] = null;
            delete this._groups[groupName];
        }
    };
    ResLoader.prototype.onResourceLoadProgress = function (event) {
        var groupName = event.groupName;
        if (this._groups[groupName]) {
            var loadProgress = this._groups[groupName][1];
            var loadProgressTarget = this._groups[groupName[2]];
            if (loadProgress != null) {
                loadProgress.call(loadProgressTarget, event.itemsLoaded, event.itemsTotal);
            }
        }
    };
    ResLoader.prototype.onResourceLoadError = function (event) {
        console.log(event.groupName + " load failed!");
        this.onResourceLoadComplete(event);
    };
    ResLoader.prototype.createGroup = function (groupName, resKeys) {
        RES.createGroup(groupName, resKeys, true);
    };
    ResLoader.prototype.loadResource = function (resource, groups, onResourceLoadComplete, onResourceLoadProgress, onResourceLoadCompleteTarget) {
        if (resource === void 0) { resource = []; }
        if (groups === void 0) { groups = []; }
        if (onResourceLoadComplete === void 0) { onResourceLoadComplete = null; }
        if (onResourceLoadProgress === void 0) { onResourceLoadProgress = null; }
        if (onResourceLoadCompleteTarget === void 0) { onResourceLoadCompleteTarget = null; }
        var needLoadArr = resource.concat(groups);
        var tempName = "loadGroup_" + this._groupIndex++;
        RES.createGroup(tempName, needLoadArr, true);
        this._groups[tempName] = [onResourceLoadComplete, onResourceLoadProgress, onResourceLoadCompleteTarget];
        RES.loadGroup(tempName);
    };
    return ResLoader;
}());
__reflect(ResLoader.prototype, "ResLoader");
;window.Main = Main;