var P=Object.defineProperty;var E=(r,s,e)=>s in r?P(r,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[s]=e;var i=(r,s,e)=>(E(r,typeof s!="symbol"?s+"":s,e),e);import{E as u,D as _,b as I}from"./simple-camera-7eQiTi1-.js";import{S as U,y as m,W as A,M as w,I as g,g as D,a8 as b,C as S,z as x}from"./unzipit.module-DQmiVUKU.js";class C{static isTransparent(s){return s.transparent&&s.opacity<1}}function T(r,s,e,t){return new Promise((n,o)=>{function a(){const d=r.clientWaitSync(s,e,0);if(d===r.WAIT_FAILED){o();return}if(d===r.TIMEOUT_EXPIRED){setTimeout(a,t);return}n()}a()})}async function B(r,s,e,t,n,o,a){const d=r.fenceSync(r.SYNC_GPU_COMMANDS_COMPLETE,0);r.flush(),await T(r,d,0,10),r.deleteSync(d),r.bindBuffer(s,e),r.getBufferSubData(s,t,n,o,a),r.bindBuffer(s,null)}async function R(r,s,e,t,n,o,a,d){const l=r.createBuffer();return r.bindBuffer(r.PIXEL_PACK_BUFFER,l),r.bufferData(r.PIXEL_PACK_BUFFER,d.byteLength,r.STREAM_READ),r.readPixels(s,e,t,n,o,a,0),r.bindBuffer(r.PIXEL_PACK_BUFFER,null),await B(r,r.PIXEL_PACK_BUFFER,l,0,d),r.deleteBuffer(l),d}class V{constructor(s,e,t){i(this,"onDisposed",new u);i(this,"onViewUpdated",new u);i(this,"enabled",!0);i(this,"needsUpdate",!1);i(this,"renderDebugFrame",!1);i(this,"components");i(this,"world");i(this,"renderer");i(this,"autoUpdate",!0);i(this,"updateInterval",1e3);i(this,"worker");i(this,"scene",new U);i(this,"_width",512);i(this,"_height",512);i(this,"_availableColor",1);i(this,"renderTarget");i(this,"bufferSize");i(this,"_buffer");i(this,"updateVisibility",async s=>{if(!this.enabled||!this.needsUpdate&&!s)return;const e=this.world.camera.three;e.updateMatrix(),this.renderer.setSize(this._width,this._height),this.renderer.setRenderTarget(this.renderTarget),this.renderer.render(this.scene,e);const t=this.renderer.getContext();await R(t,0,0,this._width,this._height,t.RGBA,t.UNSIGNED_BYTE,this._buffer),this.renderer.setRenderTarget(null),this.renderDebugFrame&&this.renderer.render(this.scene,e),this.worker.postMessage({buffer:this._buffer}),this.needsUpdate=!1});if(!e.renderer)throw new Error("The given world must have a renderer!");this.components=s,this.applySettings(t),this.world=e,this.renderer=new m,this.renderTarget=new A(this._width,this._height),this.bufferSize=this._width*this._height*4,this._buffer=new Uint8Array(this.bufferSize),this.renderer.clippingPlanes=e.renderer.clippingPlanes;const n=`
      addEventListener("message", (event) => {
        const { buffer } = event.data;
        const colors = new Map();
        for (let i = 0; i < buffer.length; i += 4) {
          const r = buffer[i];
          const g = buffer[i + 1];
          const b = buffer[i + 2];
          const code = "" + r + "-" + g + "-" + b;
          if(colors.has(code)) {
            colors.set(code, colors.get(code) + 1);
          } else {
            colors.set(code, 1);
          }
        }
        postMessage({ colors });
      });
    `,o=new Blob([n],{type:"application/javascript"});this.worker=new Worker(URL.createObjectURL(o))}dispose(){this.enabled=!1;for(const s of this.scene.children)s.removeFromParent();this.onViewUpdated.reset(),this.worker.terminate(),this.renderer.dispose(),this.renderTarget.dispose(),this._buffer=null,this.onDisposed.reset()}getAvailableColor(){let s=BigInt(this._availableColor.toString());const e=[];do e.unshift(Number(s%256n)),s/=256n;while(s);for(;e.length!==3;)e.unshift(0);const[t,n,o]=e,a=`${t}-${n}-${o}`;return{r:t,g:n,b:o,code:a}}increaseColor(){if(this._availableColor===256*256*256){console.warn("Color can't be increased over 256 x 256 x 256!");return}this._availableColor++}decreaseColor(){if(this._availableColor===1){console.warn("Color can't be decreased under 0!");return}this._availableColor--}applySettings(s){s&&(s.updateInterval!==void 0&&(this.updateInterval=s.updateInterval),s.height!==void 0&&(this._height=s.height),s.width!==void 0&&(this._width=s.width),s.autoUpdate!==void 0&&(this.autoUpdate=s.autoUpdate))}}class L extends V{constructor(e,t,n){super(e,t,n);i(this,"threshold",100);i(this,"onViewUpdated",new u);i(this,"colorMeshes",new Map);i(this,"isProcessing",!1);i(this,"_colorCodeMeshMap",new Map);i(this,"_meshIDColorCodeMap",new Map);i(this,"_currentVisibleMeshes",new Set);i(this,"_recentlyHiddenMeshes",new Set);i(this,"_transparentMat",new w({transparent:!0,opacity:0}));i(this,"handleWorkerMessage",async e=>{if(this.isProcessing)return;const t=e.data.colors;this._recentlyHiddenMeshes=new Set(this._currentVisibleMeshes),this._currentVisibleMeshes.clear();for(const[n,o]of t){if(o<this.threshold)continue;const a=this._colorCodeMeshMap.get(n);a&&(this._currentVisibleMeshes.add(a),this._recentlyHiddenMeshes.delete(a))}this.onViewUpdated.trigger({seen:this._currentVisibleMeshes,unseen:this._recentlyHiddenMeshes})});this.worker.addEventListener("message",this.handleWorkerMessage),this.autoUpdate&&window.setInterval(async()=>{this.isProcessing||await this.updateVisibility()},this.updateInterval),this.onViewUpdated.add(({seen:o,unseen:a})=>{for(const d of o)d.visible=!0;for(const d of a)d.visible=!1})}dispose(){super.dispose(),this._currentVisibleMeshes.clear(),this._recentlyHiddenMeshes.clear(),this._meshIDColorCodeMap.clear(),this._transparentMat.dispose(),this._colorCodeMeshMap.clear();const e=this.components.get(_);for(const t in this.colorMeshes){const n=this.colorMeshes.get(t);n&&e.destroy(n,!0)}this.colorMeshes.clear()}add(e){if(!this.enabled)return;if(this.isProcessing){console.log("Culler processing not finished yet.");return}this.isProcessing=!0;const t=e instanceof g,{geometry:n,material:o}=e,{colorMaterial:a,code:d}=this.getAvailableMaterial();let l;if(Array.isArray(o)){let M=!0;const p=[];for(const v of o)C.isTransparent(v)?p.push(this._transparentMat):(M=!1,p.push(a));if(M){a.dispose(),this.isProcessing=!1;return}l=p}else if(C.isTransparent(o)){a.dispose(),this.isProcessing=!1;return}else l=a;this._colorCodeMeshMap.set(d,e),this._meshIDColorCodeMap.set(e.uuid,d);const f=t?e.count:1,c=new g(n,l,f);t?c.instanceMatrix=e.instanceMatrix:c.setMatrixAt(0,new D),e.visible=!1,c.applyMatrix4(e.matrix),c.updateMatrix(),this.scene.add(c),this.colorMeshes.set(e.uuid,c),this.increaseColor(),this.isProcessing=!1}remove(e){if(this.isProcessing){console.log("Culler processing not finished yet.");return}this.isProcessing=!0;const t=this.components.get(_);this._currentVisibleMeshes.delete(e),this._recentlyHiddenMeshes.delete(e);const n=this.colorMeshes.get(e.uuid),o=this._meshIDColorCodeMap.get(e.uuid);if(!n||!o){this.isProcessing=!1,console.log(e.visible);return}this._colorCodeMeshMap.delete(o),this._meshIDColorCodeMap.delete(e.uuid),this.colorMeshes.delete(e.uuid),n.geometry=void 0,n.material=[],t.destroy(n,!0),this._recentlyHiddenMeshes.delete(e),this._currentVisibleMeshes.delete(e),this.isProcessing=!1}getAvailableMaterial(){const{r:e,g:t,b:n,code:o}=this.getAvailableColor(),a=b.enabled;b.enabled=!1;const d=new S(`rgb(${e}, ${t}, ${n})`);if(!this.world.renderer)throw new Error("Renderer not found in the world!");const l=this.world.renderer.clippingPlanes,f=new w({color:d,clippingPlanes:l,side:x});return b.enabled=a,{colorMaterial:f,code:o}}}const h=class h extends I{constructor(e){super(e);i(this,"_enabled",!0);i(this,"list",new Map);i(this,"onDisposed",new u);e.add(h.uuid,this)}get enabled(){return this._enabled}set enabled(e){this._enabled=e;for(const[t,n]of this.list)n.enabled=e}create(e,t){if(this.list.has(e.uuid))return this.list.get(e.uuid);const n=new L(this.components,e,t);return this.list.set(e.uuid,n),n}delete(e){const t=this.list.get(e.uuid);t&&t.dispose(),this.list.delete(e.uuid)}dispose(){this.enabled=!1,this.onDisposed.trigger(h.uuid),this.onDisposed.reset();for(const[e,t]of this.list)t.dispose();this.list.clear()}};i(h,"uuid","69f2a50d-c266-44fc-b1bd-fa4d34be89e6");let y=h;export{y as C};
