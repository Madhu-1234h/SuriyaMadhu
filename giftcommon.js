/* shared: opened-tracker, Back/Next bar, confetti, hearts, reveal, image loader, lightbox */
(function(){
  var id=document.body.getAttribute("data-gift");
  try{var o=JSON.parse(localStorage.getItem("openedGifts")||"[]");if(id&&o.indexOf(id)<0){o.push(id);localStorage.setItem("openedGifts",JSON.stringify(o))}}catch(e){}
  var nav=document.createElement("div");nav.className="gnav";
  nav.innerHTML='<a class="back" href="birthdaygift.html">← BACK</a><a id="gnext" href="birthdaygift.html">NEXT GIFT 🎁</a>';
  document.body.appendChild(nav);
  var cv=document.createElement("canvas");cv.id="fx";document.body.appendChild(cv);
  var cx=cv.getContext("2d"),P=[];
  function rs(){cv.width=innerWidth;cv.height=innerHeight}rs();addEventListener("resize",rs);
  window.burst=function(x,y,n){n=n||90;var c=["#E0527F","#FFB6CB","#FFB6CB","#A8559B","#E0527F","#E0A63D"];for(var i=0;i<n;i++){var a=Math.random()*6.28,v=3+Math.random()*9;P.push({x:x,y:y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-4,s:4+Math.random()*6,c:c[i%6],r:Math.random()*6,l:100+Math.random()*60})}};
  window.fire=function(){for(var i=0;i<6;i++)setTimeout(function(){burst(innerWidth*(.15+Math.random()*.7),innerHeight*(.15+Math.random()*.4),70)},i*350)};
  (function loop(){cx.clearRect(0,0,cv.width,cv.height);P=P.filter(function(p){return p.l-->0});P.forEach(function(p){p.x+=p.vx;p.y+=p.vy;p.vy+=.2;p.vx*=.99;p.r+=.2;cx.fillStyle=p.c;cx.globalAlpha=Math.min(1,p.l/40);cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);cx.restore()});requestAnimationFrame(loop)})();
  addEventListener("click",function(e){burst(e.clientX,e.clientY,14)});
  if(document.body.hasAttribute("data-hearts"))setInterval(function(){var h=document.createElement("div");h.className="fh";h.textContent=Math.random()>.5?"♡":"♥";h.style.color=["#E0527F","#FFB6CB","#FFB6CB","#A8559B","#E0527F"][Math.floor(Math.random()*5)];h.style.cssText+="left:"+Math.random()*100+"vw;font-size:"+(12+Math.random()*18)+"px;animation-duration:"+(7+Math.random()*5)+"s";document.body.appendChild(h);setTimeout(function(){h.remove()},12500)},1100);
  window.pulseNext=function(){document.getElementById("gnext").classList.add("pulse")};
  /* reveal on scroll */
  var io=("IntersectionObserver" in window)?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.15}):null;
  window.rvObserve=function(r){(r||document).querySelectorAll(".rv:not(.in)").forEach(function(el){io?io.observe(el):el.classList.add("in")})};rvObserve();
  window.onView=function(el,cb){if(!("IntersectionObserver" in window)){cb();return}var o2=new IntersectionObserver(function(es){if(es[0].isIntersecting){o2.disconnect();cb()}},{threshold:.45});o2.observe(el)};
  /* placeholder + image loader (.jpg .jpeg .png .webp) */
  window.ph=function(label){return"data:image/svg+xml,"+encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='400' height='500'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#FFFFFF'/><stop offset='1' stop-color='#EC5F8C'/></linearGradient></defs><rect width='400' height='500' fill='url(#g)'/><text x='200' y='270' font-size='96' text-anchor='middle' fill='#E0527F'>♡</text><text x='200' y='340' font-size='24' text-anchor='middle' fill='#7A4A63'>"+String(label||"").replace(/[<>&]/g,"")+"</text></svg>")};
  window.loadImg=function(base,label){var ex=[".jpg",".jpeg",".png",".webp",".JPG",".JPEG",".PNG"],i=0,img=new Image();
    img.onerror=function(){i++;if(i<ex.length)img.src=base+ex[i];else{img.onerror=null;img.src=ph(label||base)}};
    img.src=base+ex[0];img.alt=label||"";return img};
  window.fixImgs=function(sel){document.querySelectorAll(sel).forEach(function(img){function bad(){img.onerror=null;img.src=ph(img.alt)}img.onerror=bad;if(img.complete&&img.naturalWidth===0)bad()})};
  /* lightbox */
  window.openLB=function(src){var l=document.getElementById("lb");if(!l)return;l.innerHTML='<img src="'+src+'">';l.classList.add("on")};
  document.addEventListener("click",function(e){var l=document.getElementById("lb");if(l&&l.classList.contains("on")&&l.contains(e.target)){l.classList.remove("on");l.innerHTML=""}});
})();
