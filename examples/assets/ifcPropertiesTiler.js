var G=Object.defineProperty;var R=(t,o,e)=>o in t?G(t,o,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[o]=e;var a=(t,o,e)=>(R(t,typeof o!="symbol"?o+"":o,e),e);import{ad as x,az as k,aA as O,aB as v,aC as D,ag as z}from"./web-ifc-api-DH5A5LIH.js";import{S as T}from"./stats.min-GTpOrGrX.js";import{g as W}from"./lil-gui.module.min-Bc0DeA9g.js";import{a as j,E as $,C as M}from"./index-CyDQMoMp.js";import{W as N,S as J}from"./index-CF7dJ_Hf.js";import{G as q}from"./index-BoSMIosW.js";import{I as A}from"./index-JlpMfDan.js";import{A as F}from"./async-event-D8tC9awa.js";import{P as Y}from"./streaming-settings-t2Sej9T4.js";import{G as H}from"./ifc-geometry-types-C3SKrzrZ.js";import{S as K,a as Q}from"./simple-camera-B35NBbik.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./ifc-fragment-settings-B1HGQKzE.js";class U extends j{constructor(){super(...arguments);a(this,"onPropertiesStreamed",new F);a(this,"onProgress",new F);a(this,"onIndicesStreamed",new F);a(this,"onDisposed",new $);a(this,"enabled",!0);a(this,"settings",new Y);a(this,"webIfc",new x)}async dispose(){this.onIndicesStreamed.reset(),this.onPropertiesStreamed.reset(),this.webIfc=null,this.onDisposed.reset()}async streamFromBuffer(e){const s=performance.now();await this.readIfcFile(e),await this.streamAllProperties(),this.cleanUp(),console.log(`Streaming the IFC took ${performance.now()-s} ms!`)}async streamFromCallBack(e){const s=performance.now();await this.streamIfcFile(e),await this.streamAllProperties(),this.cleanUp(),console.log(`Streaming the IFC took ${performance.now()-s} ms!`)}async readIfcFile(e){const{path:s,absolute:r,logLevel:n}=this.settings.wasm;this.webIfc.SetWasmPath(s,r),await this.webIfc.Init(),n&&this.webIfc.SetLogLevel(n),this.webIfc.OpenModel(e,this.settings.webIfc)}async streamIfcFile(e){const{path:s,absolute:r,logLevel:n}=this.settings.wasm;this.webIfc.SetWasmPath(s,r),await this.webIfc.Init(),n&&this.webIfc.SetLogLevel(n),this.webIfc.OpenModelFromCallback(e,this.settings.webIfc)}async streamAllProperties(){const{propertiesSize:e}=this.settings,s=new Set(this.webIfc.GetIfcEntityList(0)),r=new Set([k,O,v,D,z]);for(const c of r)s.add(c);let n=.01,C=0;for(const c of s){if(C++,H.has(c))continue;const L=r.has(c),b=this.webIfc.GetLineIDsWithType(0,c),u=b.size();let S=0;for(let f=0;f<u-e;f+=e){const m={};for(let p=0;p<e;p++){S++;const d=b.get(f+p);try{const P=this.webIfc.GetLine(0,d,L);m[P.expressID]=P}catch{console.log(`Could not get property: ${d}`)}}await this.onPropertiesStreamed.trigger({type:c,data:m})}if(S!==u){const f={};for(let m=S;m<u;m++){const p=b.get(m);try{const d=this.webIfc.GetLine(0,p,L);f[d.expressID]=d}catch{console.log(`Could not get property: ${p}`)}}await this.onPropertiesStreamed.trigger({type:c,data:f})}const B=C/s.size;B>n&&(n+=.01,n=Math.max(n,B),await this.onProgress.trigger(Math.round(n*100)/100))}const E=await this.components.get(A).processFromWebIfc(this.webIfc,0);await this.onIndicesStreamed.trigger(E)}cleanUp(){this.webIfc=null,this.webIfc=new x}}a(U,"uuid","88d2c89c-ce32-47d7-8cb6-d51e4b311a0b");const V=document.getElementById("container"),i=new M,X=i.get(N),l=X.create();l.scene=new K(i);l.renderer=new J(i,V);l.camera=new Q(i);i.init();l.camera.controls.setLookAt(12,6,8,0,0,-10);const Z=i.get(q);Z.create(l);function _(t,o){const e=new File([o],t),s=document.createElement("a"),r=URL.createObjectURL(e);s.href=r,s.download=e.name,s.click(),URL.revokeObjectURL(r)}async function ee(t){for(const{name:o,bits:e}of t)_(o,e),await new Promise(s=>{setTimeout(s,100)})}const h=new U(i);h.settings.wasm={path:"https://unpkg.com/web-ifc@0.0.53/",absolute:!0};const w={types:{},ids:{},indexesFile:"small.ifc-processed-properties-indexes"};let g=0;const y=[];h.onPropertiesStreamed.add(async t=>{w.types[t.type]||(w.types[t.type]=[]),w.types[t.type].push(g);for(const s in t.data)w.ids[s]=g;const o=`small.ifc-processed-properties-${g}`,e=new Blob([JSON.stringify(t.data)]);y.push({bits:e,name:o}),g++});h.onProgress.add(async t=>{console.log(t)});h.onIndicesStreamed.add(async t=>{y.push({name:"small.ifc-processed-properties.json",bits:new Blob([JSON.stringify(w)])});const e=i.get(A).serializeRelations(t);y.push({name:"small.ifc-processed-properties-indexes",bits:new Blob([e])}),await ee(y)});async function te(){const o=await(await fetch("../../../../../resources/small.ifc")).arrayBuffer(),e=new Uint8Array(o);await h.streamFromBuffer(e)}const se={processFile:te},oe=new W;oe.add(se,"processFile").name("Process file");const I=new T;I.showPanel(2);document.body.append(I.dom);I.dom.style.left="0px";l.renderer.onBeforeUpdate.add(()=>I.begin());l.renderer.onAfterUpdate.add(()=>I.end());
