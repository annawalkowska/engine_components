import{a as c}from"./web-ifc-api-CgBULNZm.js";import{S as i}from"./stats.min-GTpOrGrX.js";import{o as l,a as m,L as f,N as w,l as p,_ as g}from"./index-Cbq44wZW.js";import{$ as h,n as u}from"./index-DconH7kp.js";import"./_commonjsHelpers-Cpj98o6Y.js";const r=document.getElementById("container"),t=new l,y=t.get(m),e=y.create();e.scene=new f(t);e.renderer=new h(t,r);e.camera=new w(t);t.init();e.camera.controls.setLookAt(5,5,5,0,0,0);e.scene.setup();const b=t.get(p);b.create(e);e.scene.three.background=null;const L=new g(t),k=await fetch("https://thatopen.github.io/engine_components/resources/small.frag"),A=await k.arrayBuffer(),B=new Uint8Array(A),d=L.load(B);e.scene.three.add(d);for(const o of d.children)o instanceof c&&e.meshes.add(o);const n=t.get(u);n.world=e;n.enabled=!0;r.ondblclick=()=>n.create();let a;window.addEventListener("keydown",o=>{o.code==="KeyO"?n.delete():o.code==="KeyS"?(a=n.get(),n.deleteAll()):o.code==="KeyL"&&a&&n.set(a)});const s=new i;s.showPanel(2);document.body.append(s.dom);s.dom.style.left="0px";s.dom.style.zIndex="unset";e.renderer.onBeforeUpdate.add(()=>s.begin());e.renderer.onAfterUpdate.add(()=>s.end());
