import{a as c}from"./web-ifc-api-cV7FPlIA.js";import{S as i}from"./stats.min-BpIepu9J.js";import{p as l,C as f,O as m,H as p,u as w,h}from"./index-BkOJFY0w.js";import{x as u,b as g}from"./index-DRPmJ_zb.js";const r=document.getElementById("container"),t=new l,y=t.get(f),e=y.create();e.scene=new m(t);e.renderer=new u(t,r);e.camera=new p(t);t.init();e.camera.controls.setLookAt(5,5,5,0,0,0);e.scene.setup();const b=t.get(w);b.create(e);e.scene.three.background=null;const k=new h(t),x=await fetch("https://thatopen.github.io/engine_components/resources/small.frag"),A=await x.arrayBuffer(),B=new Uint8Array(A),d=k.load(B);e.scene.three.add(d);for(const o of d.children)o instanceof c&&e.meshes.add(o);const n=t.get(g);n.world=e;n.enabled=!0;r.ondblclick=()=>n.create();let a;window.addEventListener("keydown",o=>{o.code==="KeyO"?n.delete():o.code==="KeyS"?(a=n.get(),n.deleteAll()):o.code==="KeyL"&&a&&n.set(a)});const s=new i;s.showPanel(2);document.body.append(s.dom);s.dom.style.left="0px";s.dom.style.zIndex="unset";e.renderer.onBeforeUpdate.add(()=>s.begin());e.renderer.onAfterUpdate.add(()=>s.end());
