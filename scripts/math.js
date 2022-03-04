let form1=document.getElementsByTagName("form")[0]
form1.onsubmit=e=>{
    e.preventDefault();
    console.log(e);   
}

let costCalc={
    writtingMode:document.getElementsByName("writing-mode"),
    essayType:document.getElementById("essay-type"),
    educationLevel:document.getElementById("education-level"),
    duration:document.getElementById("duration"),
    pageCount:document.getElementById("no-of-pages"),
    spaceCount:document.getElementsByName("essay-spaces"),
    wordCount:document.getElementById("no-of-words"),
    price:document.getElementById("price-calc")
}

// little styling before we do some math
costCalc.writtingMode.forEach(d=>d.onclick=e=>{costCalc.writtingMode.forEach(e=>{e.parentElement.style.backgroundColor=e.checked?"blue":"white"})})
costCalc.spaceCount.forEach(d=>d.onclick=()=>{costCalc.spaceCount.forEach(e=>{e.parentElement.style.backgroundColor=e.checked?"blue":"white"})})

// calculating the price
let costs={
    writtingMode:{writting:2, rewritting:1.5, editting:1},
    essayType:{"a":1.4046158984955592,"b":0.12211497658635495,"c":1.9630722076567726,"d":0.5562904447440453,"e":1.3261814301922825,"f":2.1309549792850357,"g":1.1852851936742437,"h":2.412633696111781,"i":1.5970403489838185,"j":1.1684319785916637,"k":0.7265679890868731,"l":1.3579913121692555,"m":1.0446940869678933,"n":0.10229763988350682,"o":1.556049883172172,"p":0.6471144680688068,"q":1.6440199191029259,"r":1.9521347223654257,"s":1.4666053577863396,"t":0.8870041499734688,"u":1.7835999959698419,"v":1.2135134825972538,"w":1.7678748069744943,"x":2.110360284995946,"y":0.09908002711865038,"z":2.3106954230823633,"A":2.4942544403222278,"B":1.62207475622215,"C":1.1792233978501714},
    educationLevel:{Highschool:2, college:2.1, university:2.5, masters:3.5, phd:5},
    duration:e=>25/e+1,
    pageCount:(e, f)=>e*f,
    spaceCount:{single:2, double:1}
}

function getPrice(writtingMode, essayType, educationLevel, duration, pageCount, spaceCount){
    return costs.pageCount(pageCount, costs.writtingMode[writtingMode]+costs.essayType[essayType]+costs.educationLevel[educationLevel]+costs.duration(duration+costs.spaceCount[spaceCount]));
}

function radioVal(radioList){
    for(let e of radioList){
        if(e.checked){
            return e.value;
        }
    }
    return null;
}

let inputs=()=>[
    radioVal(costCalc.writtingMode), 
    costCalc.essayType.value,
    costCalc.educationLevel.value,
    costCalc.duration.value,
    costCalc.pageCount.value,
    radioVal(costCalc.spaceCount)
]
let pages=costCalc.pageCount;
form1.onchange=e=>{
    let x=getPrice(...inputs());
    if(typeof(x)=='number') x=x.toFixed(2);
    costCalc.price.innerText= !isNaN(x) && x? x : "--select all options--";
    if(parseInt(pages.value)<1) pages.value=1;
}
costCalc.writtingMode[0].checked=true; costCalc.writtingMode[0].onclick();
costCalc.spaceCount[0].checked=true; costCalc.spaceCount[0].onclick();
pages.value=1;

document.getElementById("pages-plus").onclick=e=>{pages.value=parseInt(pages.value)+1; form1.onchange();};
document.getElementById("pages-minus").onclick=e=>{pages.value=parseInt(pages.value)-1; form1.onchange();};