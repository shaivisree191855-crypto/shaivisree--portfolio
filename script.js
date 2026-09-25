const canvas = document.getElementById("spaceCanvas");
const ctx = canvas.getContext("2d");
let stars = [];
let width, height, dpr;

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const count = Math.min(130, Math.floor((width * height) / 9500));
  stars = Array.from({length: count}, () => ({
    x: Math.random() * width, y: Math.random() * height,
    vx: (Math.random() - .5) * .18, vy: (Math.random() - .5) * .18,
    r: Math.random() * 1.5 + .3
  }));
}
function draw() {
  ctx.clearRect(0,0,width,height);
  for (const s of stars) {
    s.x += s.vx; s.y += s.vy;
    if (s.x < -10) s.x = width + 10;
    if (s.x > width + 10) s.x = -10;
    if (s.y < -10) s.y = height + 10;
    if (s.y > height + 10) s.y = -10;
    ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fillStyle = "rgba(190,235,255,.75)"; ctx.fill();
  }
  for(let i=0;i<stars.length;i++){
    for(let j=i+1;j<stars.length;j++){
      const a=stars[i],b=stars[j],dx=a.x-b.x,dy=a.y-b.y,d=Math.hypot(dx,dy);
      if(d<105){
        ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
        ctx.strokeStyle=`rgba(0,240,255,${(1-d/105)*.16})`;
        ctx.lineWidth=.6; ctx.stroke();
      }
    }
  }
  requestAnimationFrame(draw);
}
window.addEventListener("resize", resize);
resize(); draw();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add("visible");
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
document.getElementById("year").textContent = new Date().getFullYear();
