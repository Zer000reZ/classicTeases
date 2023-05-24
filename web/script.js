const FILE = document.getElementById("input-file");
const TEXT = document.getElementById("text-content");
const IMG = document.getElementById("img-content");
const PAGE = document.getElementById('page-num');
const CONTINUE = document.getElementById("continue");
var PAGES;
var old_page = 1;
var last_page = 1;

document.getElementById("overlay").style.display = "flex";

FILE.onchange = async ()=>{
    loadFile(await FILE.files[0].text());
}

async function loadFile(filetext){
    try{
        var tease = JSON.parse(filetext);
        PAGES = tease['pages']
    }catch{
        alert("Invalid File. Try again");
        return;
    }
    if(tease.hasOwnProperty("oeosmeta")){
        let title = document.createElement("a");
        title.innerText = "unknown"
        if(tease["oeosmeta"].hasOwnProperty("title")){
            title.innerText = tease['oeosmeta']['title'];
        }
        title.href = "javascript:void(0)";
        if(tease["oeosmeta"].hasOwnProperty("teaseId")){
            title.href = "https://milovana.com/webteases/showtease.php?id=" + tease['oeosmeta']['teaseId'];
        }
        let tt = document.getElementById("tease_title");
        tt.insertBefore(title, tt.firstChild);

        let author = document.getElementById("author");
        author.innerText = "unknown"
        if(tease["oeosmeta"].hasOwnProperty("author")){
            author.innerText = tease['oeosmeta']['author'];
        }
        author.href = "javascript:void(0)";
        if(tease["oeosmeta"].hasOwnProperty("authorId")){
            author.href = "https://milovana.com/webteases/?author=" + tease['oeosmeta']['authorId'];
        }
    }

    while(PAGES.hasOwnProperty("page " + last_page)){last_page++}
    last_page--;//get last existing page not first non-existent page
    
    document.getElementById("overlay").style.display = "none";    
    loadPage();
}

function loadPage(){
    CONTINUE.innerHTML = "Go to Page";
    let pagename = "page " + PAGE.value;
    if(!PAGES.hasOwnProperty(pagename)){
        alert("Last Page is Page "+last_page);
        PAGE.value = old_page;
        return;
    }
    IMG.src = "https://media.milovana.com/timg/tb_l/" + PAGES[pagename]['img'];
    TEXT.innerHTML = PAGES[pagename]['text'];
    if(PAGES[pagename].hasOwnProperty('audio')){
        let audio = document.createElement('audio');
        audio.src = "https://media.milovana.com/timg/" + PAGES[pagename]['audio'];
        audio.setAttribute('controls', '');
        TEXT.parentElement.insertBefore(audio, TEXT);
    }
    if(PAGE.value*1 == last_page){
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
    old_page = PAGE.value;
}

async function acceptFile(e){
    e.preventDefault();
    if (e.dataTransfer.items) {
        for(let item of e.dataTransfer.items){
            if (item.kind === "file") {
                loadFile(await item.getAsFile().text());
                return;
            }
        }
    } else {
        loadFile(await e.dataTransfer.files[0].text());
    }
}
