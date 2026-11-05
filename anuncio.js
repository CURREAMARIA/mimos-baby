// Anuncio de Mimos Baby: lo usan la tienda y la vista previa del panel
(function(){
  const TEMAS = {
    rosa:    {nombre:"Rosa",     bg:"linear-gradient(150deg,#fde2e4 0%,#fbc4cf 55%,#f6a6b8 100%)", ink:"#5a2a35", btn:"#d9667f", conf:["#ffffff","#f6a6b8","#ffd36e","#c98bdb"]},
    menta:   {nombre:"Menta",    bg:"linear-gradient(150deg,#e3f4ec 0%,#c2e6d5 55%,#94cfb4 100%)", ink:"#1f4a3a", btn:"#4f9c7c", conf:["#ffffff","#94cfb4","#ffd36e","#8ec5e8"]},
    playa:   {nombre:"Playa",    bg:"linear-gradient(160deg,#dff3fb 0%,#9fd9ef 50%,#ffe3a8 100%)", ink:"#16485e", btn:"#2b8bb3", conf:["#ffffff","#ffd36e","#ff9e7a","#7fd1ee"]},
    navidad: {nombre:"Navidad",  bg:"linear-gradient(150deg,#b8323a 0%,#8f1f29 60%,#5e1219 100%)", ink:"#ffffff", btn:"#2f6b45", conf:["#ffffff","#ffd36e","#7fc49a","#f6a6b8"]},
    noche:   {nombre:"Elegante", bg:"linear-gradient(150deg,#3d3530 0%,#2a2420 100%)",              ink:"#fbf6ef", btn:"#e9a8a0", conf:["#e9a8a0","#ffd36e","#ffffff","#7fa38f"]},
    lila:    {nombre:"Lila",     bg:"linear-gradient(150deg,#efe6fb 0%,#d9c6f3 55%,#bfa3ea 100%)", ink:"#3d2766", btn:"#8a63c9", conf:["#ffffff","#bfa3ea","#ffd36e","#f6a6b8"]}
  };
  const css = `
  .mb-ov{position:fixed;inset:0;z-index:60;display:flex;align-items:center;justify-content:center;padding:22px;background:rgba(40,30,25,.55);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);animation:mbFade .25s ease}
  .mb-card{position:relative;width:100%;max-width:370px;border-radius:28px;overflow:hidden;box-shadow:0 18px 50px rgba(0,0,0,.28);animation:mbPop .45s cubic-bezier(.2,1.4,.4,1);text-align:center;font-family:'Nunito',system-ui,sans-serif}
  .mb-card.inline{animation:none;box-shadow:0 6px 20px rgba(0,0,0,.12)}
  .mb-conf{position:absolute;inset:0;pointer-events:none;overflow:hidden}
  .mb-conf i{position:absolute;top:-14px;width:8px;height:12px;border-radius:2px;opacity:.9;animation:mbFall linear infinite}
  .mb-img{width:100%;height:170px;object-fit:cover;display:block}
  .mb-in{position:relative;padding:22px 22px 22px}
  .mb-emoji{font-size:46px;line-height:1;display:inline-block;animation:mbBob 2.2s ease-in-out infinite;filter:drop-shadow(0 4px 6px rgba(0,0,0,.12))}
  .mb-kick{display:inline-block;margin-top:10px;font-size:11.5px;font-weight:800;letter-spacing:1.4px;text-transform:uppercase;padding:5px 12px;border-radius:999px;background:rgba(255,255,255,.55)}
  .mb-t{font-family:'Fraunces',Georgia,serif;font-weight:600;font-size:27px;line-height:1.12;margin:12px 0 8px}
  .mb-p{font-size:15.5px;line-height:1.45;white-space:pre-line;opacity:.92}
  .mb-big{font-family:'Fraunces',Georgia,serif;font-size:54px;font-weight:600;line-height:1;margin:10px 0 2px;animation:mbPulse 1.8s ease-in-out infinite}
  .mb-code{display:inline-flex;align-items:center;gap:8px;margin-top:12px;border:2px dashed currentColor;border-radius:12px;padding:8px 14px;font-weight:800;font-size:17px;letter-spacing:1.5px;background:rgba(255,255,255,.35);cursor:pointer}
  .mb-code small{font-size:11px;letter-spacing:.3px;font-weight:700;opacity:.8}
  .mb-cd{display:flex;justify-content:center;gap:8px;margin-top:14px}
  .mb-cd div{background:rgba(255,255,255,.55);border-radius:10px;padding:6px 8px;min-width:52px}
  .mb-cd b{display:block;font-size:20px;font-family:'Fraunces',Georgia,serif}
  .mb-cd span{font-size:10.5px;font-weight:800;text-transform:uppercase;letter-spacing:.6px;opacity:.75}
  .mb-btn{margin-top:18px;border:0;border-radius:14px;padding:14px 26px;font:800 16px 'Nunito',system-ui,sans-serif;color:#fff;cursor:pointer;box-shadow:0 6px 16px rgba(0,0,0,.18);animation:mbGlow 2.4s ease-in-out infinite}
  .mb-x{position:absolute;top:10px;right:12px;z-index:2;width:32px;height:32px;border-radius:50%;border:0;background:rgba(255,255,255,.75);font-size:20px;line-height:1;cursor:pointer;color:#3d3530}
  @keyframes mbFade{from{opacity:0}to{opacity:1}}
  @keyframes mbPop{0%{transform:scale(.7) translateY(30px);opacity:0}100%{transform:none;opacity:1}}
  @keyframes mbBob{0%,100%{transform:translateY(0) rotate(-4deg)}50%{transform:translateY(-6px) rotate(4deg)}}
  @keyframes mbPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
  @keyframes mbGlow{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
  @keyframes mbFall{0%{transform:translateY(0) rotate(0)}100%{transform:translateY(560px) rotate(540deg)}}`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  const esc = t => String(t ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

  function build(a, opts){
    const T = TEMAS[a.anuncio_tema] || TEMAS.rosa;
    const card = document.createElement("div");
    card.className = "mb-card" + (opts.inline ? " inline" : "");
    card.style.background = T.bg; card.style.color = T.ink;
    const conf = Array.from({length:22}, (_,i) => `<i style="left:${(i*4.6+Math.random()*3)%100}%;background:${T.conf[i%T.conf.length]};animation-duration:${3.5+Math.random()*3}s;animation-delay:${-Math.random()*6}s;${i%3?"":"border-radius:50%;width:9px;height:9px;"}"></i>`).join("");
    const hasta = a.anuncio_hasta ? new Date(a.anuncio_hasta + "T23:59:59") : null;
    card.innerHTML = `
      ${opts.inline ? "" : '<button class="mb-x" aria-label="Cerrar">×</button>'}
      ${a.anuncio_imagen ? `<img class="mb-img" src="${esc(a.anuncio_imagen)}" alt="">` : ""}
      <div class="mb-conf">${conf}</div>
      <div class="mb-in">
        ${a.anuncio_imagen ? "" : `<div class="mb-emoji">${esc(a.anuncio_emoji || "🎉")}</div><br>`}
        ${a.anuncio_etiqueta ? `<span class="mb-kick">${esc(a.anuncio_etiqueta)}</span>` : ""}
        ${a.anuncio_titulo ? `<div class="mb-t">${esc(a.anuncio_titulo)}</div>` : ""}
        ${a.anuncio_grande ? `<div class="mb-big">${esc(a.anuncio_grande)}</div>` : ""}
        ${a.anuncio_texto ? `<div class="mb-p">${esc(a.anuncio_texto)}</div>` : ""}
        ${a.anuncio_codigo ? `<div class="mb-code" title="Copiar">${esc(a.anuncio_codigo)} <small>📋 copiar</small></div>` : ""}
        ${hasta ? `<div class="mb-cd"><div><b data-k="d">0</b><span>días</span></div><div><b data-k="h">0</b><span>horas</span></div><div><b data-k="m">0</b><span>min</span></div><div><b data-k="s">0</b><span>seg</span></div></div>` : ""}
        <button class="mb-btn" style="background:${T.btn}">${esc(a.anuncio_boton || "¡Quiero ver!")}</button>
      </div>`;
    if(hasta){
      const tick = () => {
        let ms = Math.max(0, hasta - new Date()), s = Math.floor(ms/1000);
        const v = {d:Math.floor(s/86400), h:Math.floor(s%86400/3600), m:Math.floor(s%3600/60), s:s%60};
        card.querySelectorAll("[data-k]").forEach(b => b.textContent = String(v[b.dataset.k]).padStart(2,"0"));
      };
      tick(); const iv = setInterval(() => { if(!card.isConnected) return clearInterval(iv); tick(); }, 1000);
    }
    const code = card.querySelector(".mb-code");
    if(code) code.onclick = () => { try{ navigator.clipboard.writeText(a.anuncio_codigo); code.querySelector("small").textContent = "✓ copiado"; }catch(e){} };
    return card;
  }

  window.MIMOS_ANUNCIO = {
    TEMAS, build,
    vencido: a => a.anuncio_hasta && new Date(a.anuncio_hasta + "T23:59:59") < new Date(),
    show(a, onBtn){
      const ov = document.createElement("div"); ov.className = "mb-ov";
      const card = build(a, {}); ov.appendChild(card); document.body.appendChild(ov);
      const close = () => ov.remove();
      card.querySelector(".mb-x").onclick = close;
      ov.addEventListener("click", e => { if(e.target === ov) close(); });
      card.querySelector(".mb-btn").onclick = () => { close(); onBtn && onBtn(a); };
      return close;
    }
  };
})();
