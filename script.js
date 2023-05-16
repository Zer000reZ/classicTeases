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
        if(TEASE["meta"].hasOwnProperty("author")){
            let author = document.getElementById("author")
            author.innerText = TEASE['meta']['author']['name']
            author.href = "https://milovana.com/webteases/?author=" + TEASE['meta']['author']['user-id']
        }
    }catch{
        alert("Invalid File. Try again");
        return;
    }
    document.getElementById("overlay").style.display = "none";    
    loadPage()
}
document.getElementById("overlay").style.display = "flex";

function loadPage(){
    document.getElementById("continue").innerHTML = "Go to Page"
    Page = document.getElementById('page-num').value * 1;//str to int
    if(!TEASE.hasOwnProperty("page " + Page)){
        alert("Page number too big");
        return;
    }
    IMG.src = "https://media.milovana.com/timg/tb_l/" + TEASE["page " + Page]['img']
    TEXT.innerHTML = TEASE["page " + Page]['text'];
    
    if(!TEASE.hasOwnProperty("page " + (Page+1))){
        document.getElementById("continue").innerHTML = "END<br>Go to Page"
        document.getElementById("page-num").value = 1;
    }else{
        document.getElementById("page-num").value = Page + 1;
    }
}
