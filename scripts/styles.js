let mbBtns=[document.getElementById("cancel-btn"), document.getElementById("expand-menu")], expandMenu=document.getElementById("mb-expand-menu");
mbBtns.forEach(d=>{
    d.onclick=(e)=>{
        mbBtns.forEach(element=>element.classList.toggle("hidden"));
        expandMenu.classList.toggle("hidden");
        expandMenu.style.zIndex="999";
    }
})

window.onscroll=e=>document.getElementsByTagName("nav")[0].classList.toggle("shadowy-figure", window.scrollY > 0);
window.onresize=e=>{
    if(window.innerWidth>768){
        expandMenu.style.display="block";
    }else{
        expandMenu.style.display="";
    }
}
window.onload=e=>{
    window.onresize();
}

// faq section
for(let e of document.getElementsByClassName("qa-btn")){
    e.onclick=f=>{
        for(let ch of e.children) ch.classList.toggle("hide");
        e.nextElementSibling.classList.toggle("hide");
    }
}

