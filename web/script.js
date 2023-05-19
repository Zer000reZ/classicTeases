const FILE = document.getElementById("input-file");
const TEXT = document.getElementById("text-content");
const IMG = document.getElementById("img-content");
const PAGE = document.getElementById('page-num');
const CONTINUE = document.getElementById("continue");
var TEASE;
var old_page = 1;

document.getElementById("overlay").style.display = "flex";

FILE.onchange = async ()=>{
    loadFile(await FILE.files[0].text());
}

async function loadFile(filetext){
    try{
        TEASE = JSON.parse(filetext);
        
    }catch{
        alert("Invalid File. Try again");
        return;
    }
    if(TEASE.hasOwnProperty("oeosmeta")){
        let title = document.createElement("a");
        title.innerText = "unknown"
        if(TEASE["oeosmeta"].hasOwnProperty("title")){
            title.innerText = TEASE['oeosmeta']['title'];
        }
        title.href = "javascript:void(0)";
        if(TEASE["oeosmeta"].hasOwnProperty("teaseId")){
            title.href = "https://milovana.com/webteases/showtease.php?id=" + TEASE['oeosmeta']['teaseId'];
        }
        let tt = document.getElementById("tease_title");
        tt.insertBefore(title, tt.firstChild);

        let author = document.getElementById("author");
        author.innerText = "unknown"
        if(TEASE["oeosmeta"].hasOwnProperty("author")){
            author.innerText = TEASE['oeosmeta']['author'];
        }
        author.href = "javascript:void(0)";
        if(TEASE["oeosmeta"].hasOwnProperty("authorId")){
            author.href = "https://milovana.com/webteases/?author=" + TEASE['oeosmeta']['authorId'];
        }
    }
    
    document.getElementById("overlay").style.display = "none";    
    loadPage();
}

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
