
let body = document.querySelector('body');

let lua = document.getElementById('tema-dark');
let sol = document.getElementById('tema-light');

sol.addEventListener('click', modoLight);
lua.addEventListener('click', modoDark);

function modoLight(){
    body.classList.add('light-mode');
}

function modoDark(){
    body.classList.remove('light-mode');
}
