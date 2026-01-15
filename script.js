
let body = document.querySelector('body');
let seta = document.getElementById('seta');


let lua = document.getElementById('div-tema');
lua.addEventListener('click', escolhasMode);


let menuMOde = document.createElement('div');
    menuMOde.style ="background-color: #242424;width:140px;height:100px;position:absolute;top: 15%;left: 85%;border-radius:10px;border:2px solid #6c6c6cb4;gap:1.5px;display:flex;align-items:center;justify-content:center;flex-direction:column;";

let light = document.createElement('div');
    light.classList = "modos";
    light.innerHTML = `<i class="bi bi-sun-fill" value="light"></i><span>Light</span>`;
    light.addEventListener('click', modeLight);

let dark = document.createElement('div');
    dark.classList = "modos";
    dark.innerHTML = `<i class="bi bi-moon-stars-fill"></i><span>Dark</span>`;
    dark.addEventListener('click', modeDark);

let random = document.createElement('div');
    random.classList = "modos";
    random.innerHTML = `<i class="bi bi-brilliance"></i><span>Random</span>`;
    random.addEventListener('click', randomMode)

let icons = document.createElement('span');


function checkMode(){
    let localstorageOFC = localStorage.getItem("mode");
    if(!localstorageOFC){
       randomMode();
    }else{
        if(localstorageOFC.includes("darkMode")){
            modeDark();
        }else{
            if(localstorageOFC.includes("lightMode")){
                modeLight()
            }else{
                randomMode()
            }
        }
    }
}


let verificador = false;


function escolhasMode(){
    if(verificador == false){
        
    verificador = true;

    menuMOde.appendChild(light);
    menuMOde.appendChild(random);
    menuMOde.appendChild(dark);
    body.appendChild(menuMOde);

    }else{
        verificador = false;

        body.removeChild(menuMOde);

    }
}

function modeLight(){
    localStorage.clear();
    light.style = "background-color: #ffffff;";
    body.classList.add('light-mode');
    localStorage.setItem("mode", "lightMode");

    icons.innerHTML=`<i class="bi bi-brightness-high"></i>`;
}

function modeDark(){
    localStorage.clear();
    dark.style = "background-color: #696969;";
    body.classList.remove('light-mode');
    localStorage.setItem("mode", "darkMode");

    icons.innerHTML=`<i class="bi bi-moon-stars-fill"></i>`;
}

function randomMode(){
    localStorage.clear();
    random.style = "background-color: #e6dd37;";
    localStorage.setItem("mode", "randomMode");

    let sorteioMode = Math.floor(Math.random()*2);
    if(sorteioMode == 0){
        body.classList.add('light-mode');
    }else{
        body.classList.remove('light-mode');
    }

    icons.innerHTML = `<i class="bi bi-brilliance"></i>`;
}

  lua.insertBefore(icons, seta);

checkMode();