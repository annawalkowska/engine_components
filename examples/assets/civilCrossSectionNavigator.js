import{C as B,L as E}from"./web-ifc-api-x-FY_BW3.js";import{p as M,C as v,o as S,a as k,d as A,h as C,A as D}from"./index-Dr4eFCtu.js";import{m as x}from"./index-tywNknxv.js";import{r as I}from"./index-Clxzob3C.js";import{S as L}from"./stats.min-BpIepu9J.js";import{B as P,b as U,E as j,v as H,m as N}from"./index-Bkd9n44b.js";x.init();I.init();const y=document.getElementById("container"),e=new M,W=e.get(v),t=W.create();t.scene=new S(e);t.renderer=new P(e,y);t.camera=new k(e);e.init();t.scene.setup();t.camera.controls.setLookAt(5,5,5,0,0,0);y.appendChild(t.renderer.three2D.domElement);const _=e.get(A);_.create(t);t.scene.three.background=null;const b=e.get(C),z=await fetch("https://thatopen.github.io/engine_components/resources/road.frag"),F=await z.arrayBuffer(),R=new Uint8Array(F),d=b.load(R);t.scene.three.add(d);const T=await fetch("https://thatopen.github.io/engine_components/resources/road.json");d.setLocalProperties(await T.json());const f=document.getElementById("scene-2d-left");f.components=e;if(!f.world)throw new Error("World not found!");const c=e.get(U);c.world=f.world;await c.draw(d);const l=e.get(j);l.world=t;l.draw(d);const g=document.getElementById("scene-2d-right");g.components=e;if(!g.world)throw new Error("World not found!");const h=e.get(H);h.world=g.world;h.world3D=t;c.onMarkerChange.add(({alignment:o,percentage:n,type:r,curve:s})=>{if(l.setMarker(o,n,r),r==="select"){const i=s.alignment.absolute[s.index].mesh,m=o.getPointAt(n,"absolute");h.set(i,m)}});c.onHighlight.add(({mesh:o})=>{l.highlighter.select(o);const n=o.curve.index,r=o.curve.alignment.absolute[n];r.mesh.geometry.computeBoundingSphere();const s=r.mesh.geometry.boundingSphere;s&&t.camera.controls.fitToSphere(s,!0)});c.onMarkerHidden.add(({type:o})=>{l.hideMarker(o)});const p=e.get(D);p.byEntity(d);const q=p.list,w=e.get(N),u=w.styles.list;for(const o in q.entities){const n=p.find({entities:[o]}),r=new B(Math.random(),Math.random(),Math.random()),s=new E({color:r});w.styles.create(o,new Set,g.world,s);for(const i in n){const m=b.list.get(i);m&&(u[o].fragments[i]=new Set(n[i]),u[o].meshes.add(m.mesh))}}w.update(!0);const a=new L;a.showPanel(2);document.body.append(a.dom);a.dom.style.left="0px";a.dom.style.zIndex="unset";t.renderer.onBeforeUpdate.add(()=>a.begin());t.renderer.onAfterUpdate.add(()=>a.end());
