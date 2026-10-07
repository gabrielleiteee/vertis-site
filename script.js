const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
addEventListener("scroll",()=>$("#header").classList.toggle("scrolled",scrollY>30),{passive:true});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");if(e.target.id==="methodLine")e.target.classList.add("run");io.unobserve(e.target)}}),{threshold:.13});
$$(".reveal").forEach(x=>io.observe(x));
$$(".op").forEach(b=>b.addEventListener("click",()=>{$$(".op").forEach(x=>x.classList.remove("active"));b.classList.add("active");$("#opAnswer").textContent=b.dataset.text}));
if(matchMedia("(pointer:fine)").matches){
 const light=$(".cursor-light"), sys=$("#heroSystem"), core=$(".core",sys);
 addEventListener("mousemove",e=>{light.style.left=e.clientX+"px";light.style.top=e.clientY+"px";light.style.opacity=1});
 sys.addEventListener("mousemove",e=>{const r=sys.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)/r.width,y=(e.clientY-r.top-r.height/2)/r.height;core.style.transform=`translate(${x*15}px,${y*15}px) rotateY(${x*8}deg) rotateX(${-y*8}deg)`});
 sys.addEventListener("mouseleave",()=>core.style.transform="");
}
$$('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{const t=$(a.getAttribute("href"));if(t){e.preventDefault();t.scrollIntoView({behavior:"smooth"})}}));
// Mobile-specific immersion: scroll progress, CTA reveal and active slide feedback.
const mobileMQ=matchMedia("(max-width:620px)");
function mobileExperience(){
  if(!mobileMQ.matches)return;
  const progress=$(".mobile-progress i"), wa=$(".mobile-wa");
  const update=()=>{
    const max=document.documentElement.scrollHeight-innerHeight;
    progress.style.width=(max>0?(scrollY/max)*100:0)+"%";
    wa.classList.toggle("show",scrollY>innerHeight*.75 && scrollY<document.documentElement.scrollHeight-innerHeight*1.2);
  };
  addEventListener("scroll",update,{passive:true}); update();

  const activateClosest=(wrap,selector)=>{
    const cards=$$(selector,wrap);
    const run=()=>{
      const cx=wrap.getBoundingClientRect().left+wrap.clientWidth/2;
      let best=null,dist=Infinity;
      cards.forEach(c=>{const r=c.getBoundingClientRect(),d=Math.abs((r.left+r.width/2)-cx);if(d<dist){dist=d;best=c}});
      cards.forEach(c=>c.classList.toggle("mobile-active",c===best));
    };
    wrap.addEventListener("scroll",run,{passive:true}); run();
  };
  const paths=$(".path-wrap"), results=$(".results-stage");
  if(paths)activateClosest(paths,".path");
  if(results)activateClosest(results,".result-shot");
}
mobileExperience();
