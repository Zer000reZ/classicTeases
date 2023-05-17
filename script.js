const FILE = document.getElementById("input-file");
const TEXT = document.getElementById("text-content");
const IMG = document.getElementById("img-content");
const PAGE = document.getElementById('page-num');
var TEASE;
var old_page = 1;

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
    document.getElementById("continue").innerHTML = "Go to Page";
    if(!TEASE.hasOwnProperty("page " + PAGE.value)){
        alert("Page number too big");
        PAGE.value = old_Page;
        return;
    }
    IMG.src = "https://media.milovana.com/timg/tb_l/" + TEASE["page " + old_Page = PAGE.value;]['img']
    TEXT.innerHTML = TEASE["page " + PAGE.value]['text'];
    if(!TEASE.hasOwnProperty("page " + (PAGE.value*1 + 1))){
        document.getElementById("continue").innerHTML = "END<br>Go to Page";
        PAGE.value = 1;
    }else{
       PAGE.value = PAGE.value*1 + 1;
    }
    old_Page = PAGE.value;
}
