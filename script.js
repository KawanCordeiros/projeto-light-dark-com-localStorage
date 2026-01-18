/* Aqui eu seleciono o body e um elemento para manipulá-los, adicionar eventos
   e trabalhar com o DOM através do getElementById, onde eu pego elementos
   do HTML por meio do seu id */
let body = document.querySelector('body');
let seta = document.getElementById('seta');

/* Aqui eu pego a div responsável por mudar os ícones de escolha de cor do tema.
   Caso seja light, adiciona/troca o ícone para o elemento correspondente */
let lua = document.getElementById('div-tema');

/* Aqui eu adiciono um evento de click, onde ao clicar na div será acionada
   a função "escolhasMode" */
lua.addEventListener('click', escolhasMode);

/* Nesta linha está sendo criada uma div responsável por armazenar
   as opções de escolha do usuário */
let menuMOde = document.createElement('div');

/* Aqui eu adiciono uma classe para estilizar ("enfeitar") o elemento pai
   e seus elementos filhos */
menuMOde.classList = "menu-mode";

/* Aqui eu crio uma div onde será inserido o ícone do modo light.
   Também adiciono uma classe para estilização e animação */
let light = document.createElement('div');
light.classList = "modos";
light.innerHTML = `<i class="bi bi-sun-fill"></i><span>Light</span>`; 
/* Aqui eu adiciono ao elemento o ícone e um span com o texto */
light.addEventListener('click', modeLight); 
/* Ao clicar, chama a função "modeLight" */

/* Aqui é a mesma lógica da variável "light", porém utilizando
   o ícone e o texto do modo dark */
let dark = document.createElement('div');
dark.classList = "modos";
dark.innerHTML = `<i class="bi bi-moon-stars-fill"></i><span>Dark</span>`;
dark.addEventListener('click', modeDark); 
/* Ao clicar no modo dark, chama a função "modeDark" */

/* Aqui segue a mesma lógica do modo light/dark, porém no modo random,
   onde o tema será escolhido aleatoriamente entre light e dark */
let random = document.createElement('div');
random.classList = "modos"; 
/* As três variáveis (light, dark e random) compartilham a mesma classe,
   pois a lógica permite controlar qual modo está ativo através
   de uma classe extra */
random.innerHTML = `<i class="bi bi-brilliance"></i><span>Random</span>`;
random.addEventListener('click', randomMode); 
/* Ao clicar, chama a função randomMode */

/* Esta variável é responsável por armazenar o ícone do modo
   escolhido no momento */
let icons = document.createElement('span');
icons.classList = "icons";

/* Aqui eu pego um elemento HTML através do seu id.
   Essa variável será responsável por executar a animação
   de transição via CSS */
let transicao = document.getElementById('transicao');

function checkMode() {
    /* Esta função é responsável por verificar o localStorage do navegador
       e identificar qual tema foi escolhido pelo usuário no último acesso.
       Caso seja o primeiro acesso, o modo padrão será o random */
    let localstorageOFC = localStorage.getItem("mode");

    if (!localstorageOFC) {
        /* Caso não exista nenhuma opção salva no localStorage,
           significa que é o primeiro acesso */
        randomMode();
    } else {
        if (localstorageOFC.includes("darkMode")) {
            /* Caso exista "darkMode" no localStorage,
               chama a função modeDark */
            modeDark();
        } else {
            if (localstorageOFC.includes("lightMode")) {
                /* Caso exista "lightMode", chama a função modeLight */
                modeLight();
            } else {
                /* Caso não exista nem darkMode nem lightMode,
                   aplica o modo random */
                randomMode();
            }
        }
    }
}

let verificador = false; 
/* Este verificador é responsável por identificar se o menu
   de modos está ativo ou desativado, permitindo adicioná-lo
   ou removê-lo do DOM */

function escolhasMode() {
    if (verificador == false) {
        /* Caso o menu ainda não esteja no DOM, ele será adicionado
           juntamente com os modos light, dark e random */
        verificador = true;

        menuMOde.appendChild(light);
        menuMOde.appendChild(random);
        menuMOde.appendChild(dark);

        seta.classList.add('roda'); 
        /* Essa classe aplica uma animação de rotação na seta */
        icons.classList.add('roda'); 
        /* Aplica a mesma animação ao ícone */

        body.appendChild(menuMOde); 
        /* Adiciona o menu ao body para melhorar a experiência do usuário */
    } else {
        /* Caso o menu já esteja ativo, ele será removido do DOM */
        verificador = false;

        seta.classList.remove('roda'); 
        icons.classList.remove('roda');

        body.removeChild(menuMOde); 
        /* Remove o menu para evitar conflitos de lógica */
    }
}

function modeLight() {
    /* Aplica o modo Light, ajustando estilos, animações
       e salvando a preferência do usuário */
    localStorage.clear(); 
    /* Limpa o localStorage para manter controle do modo ativo */

    transicao.classList.remove('dark-transicao');
    void transicao.offsetWidth; 
    /* Força um reflow para garantir que a animação CSS seja aplicada corretamente */
    transicao.classList.add('light-transicao');

    random.classList.remove('ativo');
    dark.classList.remove('ativo');
    light.classList.add('ativo');

    body.classList.add('light-mode'); 
    /* Ativa o modo light */

    localStorage.setItem("mode", "lightMode");

    icons.innerHTML = `<i class="bi bi-brightness-high"></i>`;
}

function modeDark() {
    /* O modo dark segue a mesma lógica do modo light */
    localStorage.clear();

    transicao.classList.remove('light-transicao');
    void transicao.offsetWidth;
    transicao.classList.add('dark-transicao');

    light.classList.remove('ativo');
    random.classList.remove('ativo');
    dark.classList.add('ativo');

    body.classList.remove('light-mode');

    localStorage.setItem("mode", "darkMode");

    icons.innerHTML = `<i class="bi bi-moon-stars-fill"></i>`;
}

function randomMode() {
    /* O modo random escolhe aleatoriamente entre light e dark */
    localStorage.clear();

    light.classList.remove('ativo');
    dark.classList.remove('ativo');
    random.classList.add('ativo');

    localStorage.setItem("mode", "randomMode");

    let sorteioMode = Math.floor(Math.random() * 2);
    if (sorteioMode == 0) {
        body.classList.add('light-mode');
    } else {
        body.classList.remove('light-mode');
    }

    icons.innerHTML = `<i class="bi bi-brilliance"></i>`;
}

/* Aqui eu insiro o ícone antes da seta dentro da div de tema.
   O insertBefore adiciona o elemento no DOM antes de outro elemento */
lua.insertBefore(icons, seta);

/* Aqui eu chamo a função que verifica a última escolha
   de tema do usuário */
checkMode();
