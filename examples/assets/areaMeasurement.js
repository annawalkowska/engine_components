import{B as d,M as c,a as m}from"./web-ifc-api-x-FY_BW3.js";import{S as i}from"./stats.min-BpIepu9J.js";import{p as l,C as p,o as w,W as u,d as b}from"./index-Dr4eFCtu.js";import{S as f,I as g}from"./index-Bkd9n44b.js";const a=document.getElementById("container"),n=new l,y=n.get(p),e=y.create();e.scene=new w(n);e.renderer=new f(n,a);e.camera=new u(n);n.init();e.camera.controls.setLookAt(5,5,5,0,0,0);e.scene.setup();const h=n.get(b);h.create(e);e.scene.three.background=null;const k=new d(3,3,3),B=new c({color:"#6528D7"}),s=new m(k,B);s.position.set(0,1.5,0);e.scene.three.add(s);e.meshes.add(s);const t=n.get(g);t.world=e;t.enabled=!0;a.ondblclick=()=>t.create();a.oncontextmenu=()=>t.endCreation();window.onkeydown=r=>{(r.code==="Delete"||r.code==="Backspace")&&t.deleteAll()};const o=new i;o.showPanel(2);document.body.append(o.dom);o.dom.style.left="0px";o.dom.style.zIndex="unset";e.renderer.onBeforeUpdate.add(()=>o.begin());e.renderer.onAfterUpdate.add(()=>o.end());
