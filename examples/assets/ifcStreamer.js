import"./web-ifc-api-CgBULNZm.js";import{S as i}from"./stats.min-GTpOrGrX.js";import{o as l,a as m,L as p,M as u,N as w,l as g}from"./index-c9A1IUGD.js";import{s as h}from"./index-UqY4hWbC.js";import"./_commonjsHelpers-Cpj98o6Y.js";const f=document.getElementById("container"),o=new l,b=o.get(m),e=b.create();e.scene=new p(o);e.renderer=new u(o,f);e.camera=new w(o);o.init();e.scene.setup();e.camera.controls.setLookAt(12,6,8,0,0,-10);const y=o.get(g);y.create(e);e.scene.three.background=null;const t=o.get(h);t.world=e;t.dbCleaner.enabled=!0;t.url="https://thatopen.github.io/engine_components/resources/streaming/";async function D(s,r){const c=await(await fetch(s)).json();let a;a=await(await fetch(r)).json();const d=await t.load(c,!0,a);console.log(d)}await D("https://thatopen.github.io/engine_components/resources/streaming/small.ifc-processed.json","https://thatopen.github.io/engine_components/resources/streaming/small.ifc-processed-properties.json");e.camera.controls.addEventListener("sleep",()=>{t.culler.needsUpdate=!0});t.useCache=!0;t.culler.threshold=10;t.culler.maxHiddenTime=1e3;t.culler.maxLostTime=3e3;const n=new i;n.showPanel(2);document.body.append(n.dom);n.dom.style.left="0px";n.dom.style.zIndex="unset";e.renderer.onBeforeUpdate.add(()=>n.begin());e.renderer.onAfterUpdate.add(()=>n.end());
