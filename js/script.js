const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
$("#year").textContent=new Date().getFullYear();

$("#theme").addEventListener("click",()=>{document.body.classList.toggle("light");$("#theme").textContent=document.body.classList.contains("light")?"☀":"☾"});

$$(".filter").forEach(btn=>btn.addEventListener("click",()=>{
  $$(".filter").forEach(b=>b.classList.remove("active"));btn.classList.add("active");
  const f=btn.dataset.filter;
  $$(".project").forEach(p=>p.style.display=(f==="all"||p.dataset.cat===f)?"block":"none");
}));

const sections=$$("main section[id]"), links=$$(".nav-links a");
window.addEventListener("scroll",()=>{
 let current="home"; sections.forEach(s=>{if(scrollY>=s.offsetTop-180)current=s.id});
 links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+current));
});

$("#contactForm").addEventListener("submit",e=>{
 e.preventDefault();const fields=[$("#name"),$("#email"),$("#subject"),$("#message")];let ok=true;
 fields.forEach(f=>{f.classList.remove("invalid","success");if(!f.checkValidity()){f.classList.add("invalid");ok=false}else f.classList.add("success")});
 const a=$("#formAlert");a.hidden=false;
 if(ok){a.textContent="✓ Your form is valid! The message passed client-side validation.";a.style.background="rgba(34,197,94,.12)";e.target.reset()}
 else{a.textContent="Please correct the highlighted fields.";a.style.background="rgba(244,63,94,.12)"}
});

$("#fetchBtn").addEventListener("click",async()=>{
 const r=$("#fetchResult");r.innerHTML="Loading GitHub data...";
 try{const res=await fetch("https://api.github.com/users/vveenakalva-ship-it");if(!res.ok)throw new Error("Unable to retrieve GitHub data.");
 const d=await res.json();r.innerHTML=`<div class="github"><img src="${d.avatar_url}" alt="GitHub avatar"><div><h3>${d.name||d.login}</h3><p>${d.bio||"Public GitHub profile"}</p><p><b>Public repositories:</b> ${d.public_repos}</p><a class="btnx primary" href="${d.html_url}" target="_blank">View Profile</a></div></div>`}
 catch(err){r.innerHTML='<div class="alert">Could not load data. Check your internet connection and try again.</div>'}
});