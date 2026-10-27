document.addEventListener("DOMContentLoaded", () => {
    let isTransitioning = false;
    let currentSectionId = "hero";
    const pages = [...document.querySelectorAll("main > .page")];
    const reduceMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
    function updateTimelineDots(id) {
        document.querySelectorAll(".timeline-dot-mini").forEach(dot => {
            const active = dot.dataset.target === id;
            dot.classList.toggle("active", active);
            if(active) dot.setAttribute("aria-current", "page");
            else dot.removeAttribute("aria-current");
        });
    }
    async function openEnvelope(targetSection) {
        const hero = document.getElementById("hero");
        const cover = hero.querySelector(".hero-cover");
        const stage = document.createElement("div");
        stage.className = "envelope-stage";
        stage.setAttribute("aria-hidden", "true");
        stage.inert = true;
        const card = targetSection.cloneNode(true);
        card.removeAttribute("id");
        card.querySelectorAll("[id]").forEach(el => el.removeAttribute("id"));
        card.classList.add("active", "envelope-letter");
        stage.appendChild(card);
        const faces = ["top", "left", "right", "bottom", "seal"].map(name => {
            const face = document.createElement("div");
            face.className = "envelope-face envelope-" + name;
            face.style.backgroundImage = `url("${cover.currentSrc || cover.src}")`;
            stage.appendChild(face);
            return face;
        });
        // Leva em conta o recorte cover para manter o selo alinhado à arte.
        const width = cover.naturalWidth || 1920;
        const height = cover.naturalHeight || 1080;
        const scale = Math.max(innerWidth / width, innerHeight / height);
        const radius = width * scale * 0.105;
        stage.style.setProperty("--seal-radius", radius + "px");
        document.body.appendChild(stage);
        document.documentElement.classList.add("envelope-opening");
        const animate = (el, frames, duration, delay = 0) => el.animate(frames, {
            duration, delay, fill: "both", easing: "cubic-bezier(.22,.75,.2,1)"
        }).finished;
        try {
            await Promise.all([
                animate(faces[4], [{transform:"scale(1)", opacity:1}, {transform:"scale(1.14)", opacity:1, offset:.35}, {transform:"translateY(70px) scale(.65)", opacity:0}], 550),
                animate(faces[0], [{transform:"rotateX(0deg)", opacity:1}, {transform:"rotateX(160deg)", opacity:0}], 1000, 250),
                animate(faces[1], [{transform:"translateX(0)", opacity:1}, {transform:"translateX(-100%)", opacity:0}], 1100, 950),
                animate(faces[2], [{transform:"translateX(0)", opacity:1}, {transform:"translateX(100%)", opacity:0}], 1100, 950),
                animate(faces[3], [{transform:"translateY(0)", opacity:1}, {transform:"translateY(100%)", opacity:0}], 1100, 950),
                animate(card, [
                    {transform:"translateY(48%) scale(.72)", opacity:0, borderRadius:"18px"},
                    {transform:"translateY(-9%) scale(.82)", opacity:1, borderRadius:"18px", offset:.6},
                    {transform:"translateY(0) scale(1)", opacity:1, borderRadius:"0px"}
                ], 1500, 650)
            ]);
        } finally {
            hero.classList.remove("active");
            targetSection.classList.add("active", "envelope-revealed");
            currentSectionId = targetSection.id;
            updateTimelineDots(currentSectionId);
            targetSection.scrollIntoView({behavior:"instant"});
            stage.remove();
            document.documentElement.classList.remove("envelope-opening");
            isTransitioning = false;
        }
    }


    function go(id) {
        if(isTransitioning || currentSectionId === id) return;
        const target = document.getElementById(id);
        if(!target) return;
        if(currentSectionId === "hero" && id === "memory1" && !reduceMotion()) {
            isTransitioning = true;
            openEnvelope(target).catch(console.error);
            return;
        }
        target.scrollIntoView({behavior:reduceMotion()?"instant":"smooth"});
    }
    document.querySelectorAll("[data-target]").forEach(button => button.addEventListener("click",()=>go(button.dataset.target)));
    document.getElementById("scrollDown").addEventListener("click",()=>go("memory1"));
    const observer = new IntersectionObserver(entries => {
        if(isTransitioning) return;
        for(const entry of entries) if(entry.isIntersecting) {
            currentSectionId = entry.target.id;
            updateTimelineDots(currentSectionId);
        }
    }, {threshold:.6});
    pages.forEach(page=>observer.observe(page));
    updateTimelineDots("hero");
    window.addEventListener("wheel", e => {
        if(isTransitioning) {e.preventDefault();return;}
        if(currentSectionId === "hero" && e.deltaY > 0) {e.preventDefault();go("memory1");}
    }, {passive:false});
    let touchY = 0;
    document.addEventListener("touchstart",e=>{touchY=e.touches[0].clientY;},{passive:true});
    document.addEventListener("touchmove",e=>{
        if(isTransitioning) {e.preventDefault();return;}
        if(currentSectionId === "hero" && touchY-e.touches[0].clientY>8) {
            e.preventDefault();go("memory1");
        }
    },{passive:false});
    document.addEventListener("keydown",e=>{
        if(e.target.closest("input,textarea,select,iframe")) return;
        if(isTransitioning && ["ArrowDown","ArrowUp","PageDown","PageUp"," ","Home","End"].includes(e.key)) {e.preventDefault();return;}
        if(e.key === " " && e.target.closest("button,a")) return;
        const i = pages.findIndex(p=>p.id===currentSectionId);
        let next;
        if(["ArrowDown","PageDown"," "].includes(e.key)) next=Math.min(i+1,3);
        if(["ArrowUp","PageUp"].includes(e.key)) next=Math.max(i-1,0);
        if(e.key==="Home") next=0;
        if(e.key==="End") next=3;
        if(next!==undefined){e.preventDefault();go(pages[next].id);}
    });
    const config = window.CONVITE_CONFIG || {};
    const address = String(config.endereco || "").trim();
    const key = String(config.googleMapsApiKey || "").trim();
    const frame = document.getElementById("mapFrame");
    const box = document.getElementById("mapBox");
    if(address && key) {
        frame.src = "https://www.google.com/maps/embed/v1/place?"+new URLSearchParams({key,q:address,language:"pt-BR"});
        frame.hidden = false;
        document.getElementById("mapPlaceholder").hidden = true;
    }
    // A API requer 200px mínimos. Reduz o iframe dentro da moldura em telas pequenas.
    new ResizeObserver(()=>{
        const {width,height}=box.getBoundingClientRect();
        const scale=Math.min(1,width/200,height/200);
        if(scale>0){frame.style.width=width/scale+"px";frame.style.height=height/scale+"px";frame.style.transform=`scale(${scale})`;}
    }).observe(box);
    const phone=String(config.telefoneWhatsApp || "").replace(/\D/g, "");
    const confirm=document.getElementById("confirmButton");
    if(/^\d{10,15}$/.test(phone)) {
        confirm.href="https://wa.me/"+phone+"?text="+encodeURIComponent(config.mensagemWhatsApp || "oii confirmo minha presença na sua formatura");
        confirm.removeAttribute("aria-disabled");
    } else {
        confirm.addEventListener("click",e=>{e.preventDefault();document.getElementById("confirmStatus").textContent="Confirmação disponível em breve.";});
        confirm.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();confirm.click();}});
    }
});
