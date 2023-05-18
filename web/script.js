const FILE = document.getElementById("input-file");
const TEXT = document.getElementById("text-content");
const IMG = document.getElementById("img-content");
const PAGE = document.getElementById('page-num');
const CONTINUE = document.getElementById("continue");
var TEASE;
var old_page = 1;

FILE.onchange = async ()=>{
    try{
        TEASE = JSON.parse(await FILE.files[0].text());
        let tt = document.getElementById("tease_title")
        tt.innerHTML = TEASE['meta']['title'] + tt.innerHTML;
        if(TEASE["meta"].hasOwnProperty("author")){
            let author = document.getElementById("author");
            author.innerText = TEASE['meta']['author']['name'];
            author.href = "https://milovana.com/webteases/?author=" + TEASE['meta']['author']['user-id'];
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
    CONTINUE.innerHTML = "Go to Page";
    let pagename = "page " + PAGE.value;
    if(!TEASE.hasOwnProperty(pagename)){
        alert("Page number too big");
        PAGE.value = old_Page;
        return;
    }
    IMG.src = "https://media.milovana.com/timg/tb_l/" + TEASE[pagename]['img'];
    TEXT.innerHTML = TEASE[pagename]['text'];
    if(TEASE[pagename].hasOwnProperty('audio')){
        let audio = document.createElement('audio');
        audio.src = "https://media.milovana.com/timg/" + TEASE[pagename]['audio'];
        audio.setAttribute('controls', '');
        TEXT.parentElement.insertBefore(audio, TEXT);
    }
    if(!TEASE.hasOwnProperty("page " + (PAGE.value*1 + 1))){
        if(PAGE.value=="1"){
            CONTINUE.innerHTML = "END";
            CONTINUE.onclick = "";
            PAGE.style.display = "none";
        }else{
            CONTINUE.innerHTML = "END<br>Go back to Page";
            PAGE.value = 1;
        }
    }else{
       PAGE.value = PAGE.value*1 + 1;
    }
    old_Page = PAGE.value;
}
