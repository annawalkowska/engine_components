import{M as u,B as w,a as d}from"./web-ifc-api-CgBULNZm.js";import{S as p}from"./stats.min-GTpOrGrX.js";import{o as b,a as f,L as y,M,N as g,K as x}from"./index-Cbq44wZW.js";import"./_commonjsHelpers-Cpj98o6Y.js";const h=document.getElementById("container"),o=new b,B=o.get(f),e=B.create();e.scene=new y(o);e.renderer=new M(o,h);e.camera=new g(o);o.init();e.camera.controls.setLookAt(10,10,10,0,0,0);e.scene.setup();e.scene.three.background=null;const i=new u({color:"#6528D7"}),S=new u({color:"#BCF124"}),m=new w(3,3,3),c=new d(m,i),a=new d(m,i),r=new d(m,i);e.scene.three.add(c,a,r);const j=[c,a,r];a.position.x=5;r.position.x=-5;const t=Math.PI/180;function z(){c.rotation.x+=t,c.rotation.y+=t,a.rotation.x+=t,a.rotation.z+=t,r.rotation.y+=t,r.rotation.z+=t}e.renderer.onBeforeUpdate.add(z);const I=o.get(x),L=I.get(e);let l=null;window.onmousemove=()=>{const s=L.castRay(j);l&&(l.material=i),!(!s||!(s.object instanceof d))&&(s.object.material=S,l=s.object)};const n=new p;n.showPanel(2);document.body.append(n.dom);n.dom.style.left="0px";n.dom.style.zIndex="unset";e.renderer.onBeforeUpdate.add(()=>n.begin());e.renderer.onAfterUpdate.add(()=>n.end());
