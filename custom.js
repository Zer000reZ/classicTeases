const FILE = document.getElementById("input-file");
const TEXT = document.getElementById("text-content");
const IMG = document.getElementById("img-content");
var TEASE
var Page = 1;

FILE.onchange = async ()=>{
    try{
        TEASE = JSON.parse(await FILE.files[0].text());
        let tt = document.getElementById("tease_title")
        tt.innerHTML = TEASE['meta']['title'] + tt.innerHTML;
    }catch{
        alert("Invalid File. Try again");
        return;
    }
    document.getElementById("overlay").style.display = "none";    
    loadPage()
}
document.getElementById("overlay").style.display = "flex";

function loadPage(){
    Page = document.getElementById('page-num').value * 1;//str to int
    if(!TEASE.hasOwnProperty("page " + Page)){
        alert("Page number too big");
        return;
    }
    IMG.src = "https://media.milovana.com/timg/tb_l/" + TEASE["page " + Page]['img']
    TEXT.innerHTML = TEASE["page " + Page]['text'];
    document.getElementById('page-num').value = Page + 1;
}