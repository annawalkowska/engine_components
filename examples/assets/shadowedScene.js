import{a as d,N as c,ad as i,bh as l}from"./web-ifc-api-CgBULNZm.js";import{S as h}from"./stats.min-GTpOrGrX.js";import{o as w,a as m,x as p,M as u,N as f,l as g,_ as b}from"./index-Cbq44wZW.js";import"./_commonjsHelpers-Cpj98o6Y.js";const y=document.getElementById("container"),t=new w,M=t.get(m),e=M.create();e.scene=new p(t);e.renderer=new u(t,y);e.camera=new f(t);t.init();const S=t.get(g),x=S.create(e);e.camera.controls.setLookAt(1,2,-2,-2,0,-5);e.scene.three.background=null;const B=new b(t),P=await fetch("https://thatopen.github.io/engine_components/resources/small.frag"),v=await P.arrayBuffer(),A=new Uint8Array(v),s=B.load(A);e.scene.three.add(s);const n=new d(new c(15,25,1),new i({color:"white"}));n.position.set(-2,-1,-7);n.rotation.x=-Math.PI/2;n.receiveShadow=!0;e.scene.three.add(n);e.renderer.three.shadowMap.enabled=!0;e.renderer.three.shadowMap.type=l;e.scene.setup({shadows:{cascade:1,resolution:1024}});for(const r of s.children){const o=r;o.material[0].opacity===1&&(o.castShadow=!0,o.receiveShadow=!0)}e.scene.distanceRenderer.excludedObjects.add(x.three);await e.scene.updateShadows();e.camera.controls.addEventListener("update",async()=>{await e.scene.updateShadows()});const a=new h;a.showPanel(2);document.body.append(a.dom);a.dom.style.left="0px";a.dom.style.zIndex="unset";e.renderer.onBeforeUpdate.add(()=>a.begin());e.renderer.onAfterUpdate.add(()=>a.end());
