import{a as c}from"./web-ifc-api-x-FY_BW3.js";import{S as i}from"./stats.min-BpIepu9J.js";import{p as l,C as f,o as m,W as p,d as w,h}from"./index-Dr4eFCtu.js";import{S as g,C as u}from"./index-Bkd9n44b.js";const d=document.getElementById("container"),t=new l,y=t.get(f),e=y.create();e.scene=new m(t);e.renderer=new g(t,d);e.camera=new p(t);t.init();e.camera.controls.setLookAt(5,5,5,0,0,0);e.scene.setup();const b=t.get(w);b.create(e);e.scene.three.background=null;const S=new h(t),k=await fetch("https://thatopen.github.io/engine_components/resources/small.frag"),A=await k.arrayBuffer(),C=new Uint8Array(A),r=S.load(C);e.scene.three.add(r);for(const o of r.children)o instanceof c&&e.meshes.add(o);const n=t.get(u);n.world=e;n.enabled=!0;d.ondblclick=()=>n.create();let a;window.addEventListener("keydown",o=>{o.code==="KeyO"?n.delete():o.code==="KeyS"?(a=n.get(),n.deleteAll()):o.code==="KeyL"&&a&&n.set(a)});const s=new i;s.showPanel(2);document.body.append(s.dom);s.dom.style.left="0px";s.dom.style.zIndex="unset";e.renderer.onBeforeUpdate.add(()=>s.begin());e.renderer.onAfterUpdate.add(()=>s.end());
