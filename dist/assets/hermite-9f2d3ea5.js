import{T as g}from"./style-5280ba96.js";import{C as W}from"./control_center-768d83c8.js";let Z=!0;document.getElementById("draw-full-curve").addEventListener("change",o=>{Z=o.currentTarget.checked,M.requestUpdate()});let oo;document.getElementById("show-vectors").addEventListener("change",o=>{oo=o.currentTarget.checked,M.requestUpdate()});const M=new W;M.tMax=2;const I=document.getElementById("hermite_canvas"),n=new g({fitted:!0}).appendTo(I),F=n.makePath();var ao=n.makeGroup(),to=n.makeGroup(),io=n.makeGroup();F.noFill().closed=!1;F.stroke="#408ed0";F.linewidth=5;let D=[n.width*.15,n.height*.6],A=[n.width*.45,n.height*.4],U=[n.width*.75,n.height*.7],V=[n.width*.2,n.height*.4],q=[n.width*.7,n.height*.35],H=[n.width*.9,n.height*.6];var G=n.makeArrow(D[0],D[1],V[0],V[1]),T=n.makeArrow(A[0],A[1],q[0],q[1]),B=n.makeArrow(U[0],U[1],H[0],H[1]);to.add(G,T,B);var w=Y(D[0],D[1]),s=Y(A[0],A[1]),l=Y(U[0],U[1]);ao.add(w,s,l);var E=n.makeCircle(0,0,10);E.stroke="#b5b5b5";io.add(E);var d=$(V[0],V[1]),h=$(q[0],q[1]),c=$(H[0],H[1]);io.add(d,h,c);const eo=n.makeGroup();function po(){if(M.shouldUpdate()&&(G.remove(),T.remove(),B.remove(),G=X(w,d),T=X(s,h),B=X(l,c),to.add(G,T,B),F.vertices.length=0,Z?(b([w.position.x,w.position.y],[s.position.x,s.position.y],[d.position.x,d.position.y],[h.position.x,h.position.y],1),b([s.position.x,s.position.y],[l.position.x,l.position.y],[h.position.x,h.position.y],[c.position.x,c.position.y],1)):(b([w.position.x,w.position.y],[s.position.x,s.position.y],[d.position.x,d.position.y],[h.position.x,h.position.y],Math.min(M.t,1)),M.t>1&&b([s.position.x,s.position.y],[l.position.x,l.position.y],[h.position.x,h.position.y],[c.position.x,c.position.y],M.t-1)),so([w.position.x,w.position.y],[s.position.x,s.position.y],[l.position.x,l.position.y],[d.position.x,d.position.y],[h.position.x,h.position.y],[c.position.x,c.position.y]),eo.children.forEach(o=>o.remove()),oo))if(M.t<=1){const o={x:d.position.x-w.position.x,y:d.position.y-w.position.y},t={x:h.position.x-s.position.x,y:h.position.y-s.position.y};K(w,s,o,t,M.t)}else{const o={x:h.position.x-s.position.x,y:h.position.y-s.position.y},t={x:c.position.x-l.position.x,y:c.position.y-l.position.y};K(s,l,o,t,M.t-1)}}n.bind("update",po);n.play();let v=null;I.addEventListener("mouseup",()=>v=null);I.addEventListener("mouseleave",()=>v=null);I.addEventListener("mousemove",o=>{v!==null&&(v.position.x+=o.movementX,v.position.y+=o.movementY,v===w&&(d.position.x+=o.movementX,d.position.y+=o.movementY),v===s&&(h.position.x+=o.movementX,h.position.y+=o.movementY),v===l&&(c.position.x+=o.movementX,c.position.y+=o.movementY),M.requestUpdate())});function K(o,t,e,y,r){const u=2*Math.pow(r,3)-3*Math.pow(r,2)+1,x=-2*Math.pow(r,3)+3*Math.pow(r,2),p=Math.pow(r,3)-2*Math.pow(r,2)+r,m=Math.pow(r,3)-Math.pow(r,2),i=L(n.width/2,n.height/2,o.position.x-n.width/2,o.position.y-n.height/2,u,"#D08240"),f=L(i.x2,i.y2,t.position.x-n.width/2,t.position.y-n.height/2,x,"#408ed0"),C=L(f.x2,f.y2,e.x,e.y,p,"#CA40D0"),no=L(C.x2,C.y2,y.x,y.y,m,"#46D040");eo.add(no.arrow,C.arrow,f.arrow,i.arrow)}function L(o,t,e,y,r,u){const x=o+e*r,p=t+y*r,m=n.makeArrow(o,t,x,p);m.stroke=u,m.linewidth=3;const i=n.makeCircle(o,t,4);return i.noFill(),i.stroke=u,i.linewidth=3,{arrow:n.makeGroup([m,i]),x2:x,y2:p}}function Y(o,t){const e=n.makeCircle(o,t,10);return e.fill="#408ed0",e.stroke="#50b2ff",e.linewidth=10,n.update(),e.renderer.elem.addEventListener("mousedown",()=>v=e),e}function X(o,t){let e=n.makeArrow(o.position.x-16*(o.position.x-t.position.x)/Math.sqrt(Math.pow(o.position.x-t.position.x,2)+Math.pow(o.position.y-t.position.y,2)),o.position.y-16*(o.position.y-t.position.y)/Math.sqrt(Math.pow(o.position.x-t.position.x,2)+Math.pow(o.position.y-t.position.y,2)),t.position.x+5*(t.position.x-o.position.x)/Math.sqrt(Math.pow(o.position.x-t.position.x,2)+Math.pow(o.position.y-t.position.y,2)),t.position.y+5*(t.position.y-o.position.y)/Math.sqrt(Math.pow(o.position.x-t.position.x,2)+Math.pow(o.position.y-t.position.y,2)));return e.stroke="#D08240",e.linewidth=3,e.opacity=.5,e}function $(o,t){const e=n.makeCircle(o,t,14);return e.opacity=1e-5,e.linewidth=0,n.update(),e.renderer.elem.addEventListener("mousedown",()=>v=e),e}function b(o,t,e,y,r){let u=[e[0]-o[0],e[1]-o[1]],x=[y[0]-t[0],y[1]-t[1]];for(let p=0;p<=r+.001;p+=.01){let m=(2*Math.pow(p,3)-3*Math.pow(p,2)+1)*o[0]+(-2*Math.pow(p,3)+3*Math.pow(p,2))*t[0]+(Math.pow(p,3)-2*Math.pow(p,2)+p)*u[0]+(Math.pow(p,3)-Math.pow(p,2))*x[0],i=(2*Math.pow(p,3)-3*Math.pow(p,2)+1)*o[1]+(-2*Math.pow(p,3)+3*Math.pow(p,2))*t[1]+(Math.pow(p,3)-2*Math.pow(p,2)+p)*u[1]+(Math.pow(p,3)-Math.pow(p,2))*x[1];F.vertices.push(new g.Vector(m,i))}}function so(o,t,e,y,r,u){let x=[y[0]-o[0],y[1]-o[1]],p=[r[0]-t[0],r[1]-t[1]],m=[u[0]-e[0],u[1]-e[1]],i=M.t;if(i<1){let f=(2*Math.pow(i,3)-3*Math.pow(i,2)+1)*o[0]+(-2*Math.pow(i,3)+3*Math.pow(i,2))*t[0]+(Math.pow(i,3)-2*Math.pow(i,2)+i)*x[0]+(Math.pow(i,3)-Math.pow(i,2))*p[0],C=(2*Math.pow(i,3)-3*Math.pow(i,2)+1)*o[1]+(-2*Math.pow(i,3)+3*Math.pow(i,2))*t[1]+(Math.pow(i,3)-2*Math.pow(i,2)+i)*x[1]+(Math.pow(i,3)-Math.pow(i,2))*p[1];E.position.x=f,E.position.y=C}else{let f=(2*Math.pow(i-1,3)-3*Math.pow(i-1,2)+1)*t[0]+(-2*Math.pow(i-1,3)+3*Math.pow(i-1,2))*e[0]+(Math.pow(i-1,3)-2*Math.pow(i-1,2)+i-1)*p[0]+(Math.pow(i-1,3)-Math.pow(i-1,2))*m[0],C=(2*Math.pow(i-1,3)-3*Math.pow(i-1,2)+1)*t[1]+(-2*Math.pow(i-1,3)+3*Math.pow(i-1,2))*e[1]+(Math.pow(i-1,3)-2*Math.pow(i-1,2)+i-1)*p[1]+(Math.pow(i-1,3)-Math.pow(i-1,2))*m[1];E.position.x=f,E.position.y=C}}b(D,A,V,q);n.update();const N=new W,ho=document.getElementById("side_canvas"),a=new g({fitted:!0}).appendTo(ho);a.makeArrow(0,a.height,0,0);a.makeArrow(0,a.height*.8,a.width,a.height*.8);const _=a.makePath();_.noFill().closed=!1;_.stroke="#D08240";for(let o=0;o<=100;o++){let t=2*Math.pow(o/100,3)-3*Math.pow(o/100,2)+1,e=new g.Vector(o/100*a.width,.8*a.height-t*.8*a.height);_.vertices.push(e)}var O=P("#D08240","#f2974a");const j=a.makePath();j.noFill().closed=!1;j.stroke="#CA40D0";for(let o=0;o<=100;o++){let t=Math.pow(o/100,3)-2*Math.pow(o/100,2)+o/100,e=new g.Vector(o/100*a.width,.8*a.height-t*.8*a.height);j.vertices.push(e)}var Q=P("#D0408E","#f04aa2");const z=a.makePath();z.noFill().closed=!1;z.stroke="#408ed0";for(let o=0;o<=100;o++){let t=-2*Math.pow(o/100,3)+3*Math.pow(o/100,2),e=new g.Vector(o/100*a.width,.8*a.height-t*.8*a.height);z.vertices.push(e)}var R=P("#408ed0","#50b2ff");const J=a.makePath();J.noFill().closed=!1;J.stroke="#46D040";for(let o=0;o<=100;o++){let t=Math.pow(o/100,3)-Math.pow(o/100,2),e=new g.Vector(o/100*a.width,.8*a.height-t*.8*a.height);J.vertices.push(e)}var S=P("#8ED040","#a2ef4a");function k(o,t){return new g.Vector(o,.8*a.height-t*.8*a.height)}function P(o,t){const e=a.makeCircle(0,0,4);return e.fill=o,e.stroke=t,e.linewidth=4,e}function ro(){if(!N.shouldUpdate())return;const o=N.t;o<1?(O.position=k(o*a.width,2*Math.pow(o,3)-3*Math.pow(o,2)+1),Q.position=k(o*a.width,Math.pow(o,3)-2*Math.pow(o,2)+o),R.position=k(o*a.width,-2*Math.pow(o,3)+3*Math.pow(o,2)),S.position=k(o*a.width,Math.pow(o,3)-Math.pow(o,2))):(O.position=k((o-1)*a.width,2*Math.pow(o-1,3)-3*Math.pow(o-1,2)+1),Q.position=k((o-1)*a.width,Math.pow(o-1,3)-2*Math.pow(o-1,2)+(o-1)),R.position=k((o-1)*a.width,-2*Math.pow(o-1,3)+3*Math.pow(o-1,2)),S.position=k((o-1)*a.width,Math.pow(o-1,3)-Math.pow(o-1,2)))}a.bind("update",ro);a.play();a.update();
