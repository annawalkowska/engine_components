import{b as w,L,C as F}from"./web-ifc-api-CgBULNZm.js";import{o as S,a as A,L as B,i as P,l as x,_ as D,c as M,b as U}from"./index-c9A1IUGD.js";import{$ as R,o as $,r as G,K as O}from"./index-UqY4hWbC.js";import{d as T,R as m,m as f}from"./index-CqPyogbW.js";import{S as W}from"./stats.min-GTpOrGrX.js";import"./_commonjsHelpers-Cpj98o6Y.js";const _=document.getElementById("container"),n=new S,j=n.get(A),e=j.create();e.scene=new B(n);e.renderer=new R(n,_);e.camera=new P(n);e.renderer.postproduction.enabled=!0;e.renderer.postproduction.customEffects.outlineEnabled=!0;n.init();e.camera.controls.setLookAt(12,6,8,0,0,-10);e.scene.setup();const y=n.get(x);y.config.color.setHex(6710886);const k=y.create(e);k.three.position.y-=1;e.renderer.postproduction.customEffects.excludedMeshes.push(k.three);e.scene.three.background=null;const h=n.get(D),v=await fetch("https://thatopen.github.io/engine_components/resources/small.frag"),K=await v.arrayBuffer(),N=new Uint8Array(K),s=h.load(N);e.scene.three.add(s);const q=await fetch("https://thatopen.github.io/engine_components/resources/small.json"),z=await q.json();s.setLocalProperties(z);const c=new W;c.showPanel(2);document.body.append(c.dom);c.dom.style.left="0px";c.dom.style.zIndex="unset";e.renderer.onBeforeUpdate.add(()=>c.begin());e.renderer.onAfterUpdate.add(()=>c.end());const i=n.get($);i.world=e;await i.generate(s);const d=n.get(G);d.setup({world:e});const H=n.get(M),l=H.create(e);for(const t of s.items)l.add(t.mesh);l.needsUpdate=!0;e.camera.controls.addEventListener("sleep",()=>{l.needsUpdate=!0});const a=n.get(U),r=n.get(O);a.byModel(s.uuid,s);a.byEntity(s);const C=a.find({models:[s.uuid]}),b=a.find({entities:["IFCWALLSTANDARDCASE","IFCWALL"]}),g=a.find({entities:["IFCDOOR","IFCWINDOW","IFCPLATE","IFCMEMBER"]}),V=new w({color:"gray",side:2}),J=new L({color:"black"}),Q=new w({color:"black",opacity:.5,side:2,transparent:!0});r.styles.create("thick",new Set,e,J,V,Q);for(const t in b){const o=h.list.get(t);if(!o)continue;const{mesh:u}=o;r.styles.list.thick.fragments[t]=new Set(b[t]),r.styles.list.thick.meshes.add(u)}r.styles.create("thin",new Set,e);for(const t in g){const o=h.list.get(t);if(!o)continue;const{mesh:u}=o;r.styles.list.thin.fragments[t]=new Set(g[t]),r.styles.list.thin.meshes.add(u)}await r.update(!0);T.init();const E=m.create(()=>f`
  <bim-panel active label="Plans Tutorial" class="options-menu">
      <bim-panel-section collapsed name="floorPlans" label="Plan list">
      </bim-panel-section>
    </bim-panel>
    `);document.body.append(E);const X=e.renderer.postproduction.customEffects.minGloss,p=new F("white"),I=E.querySelector("bim-panel-section[name='floorPlans']");for(const t of i.list){const o=m.create(()=>f`
      <bim-button checked label="${t.name}"
        @click="${()=>{e.renderer.postproduction.customEffects.minGloss=.1,d.backupColor=p,a.setColor(C,p),e.scene.three.background=p,i.goTo(t.id),l.needsUpdate=!0}}">
      </bim-button>
    `);I.append(o)}const Y=e.scene.three.background,Z=m.create(()=>f`
      <bim-button checked label="Exit"
        @click="${()=>{d.backupColor=null,d.clear(),e.renderer.postproduction.customEffects.minGloss=X,a.resetColor(C),e.scene.three.background=Y,i.exitPlanView(),l.needsUpdate=!0}}">
      </bim-button>
    `);I.append(Z);
