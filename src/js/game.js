const grid = document.querySelector('.grid')
const player = document.querySelector('.player')
const timer = document.querySelector('.timer')
const chars = [
    'Hinata.webp',
    'Itachi.webp',
    'Kakashi.webp',
    'madara.jpg',
    'Naruto.webp',
    'Orochimaru.webp',
    'Rock_Lee.webp',
    'Sakura.webp',
    'Sasuke.webp',
    'Shikamaru.png'
]
let firstCard = ''
let secondCard = ''

//Cria os cards
const createCard = (char) => {
    //Funcao para criar elemento e atribuir classe
    const createElement = (tag, className) => {
        const element = document.createElement(tag)
        element.className = className
        return element
    }
    //Cria o card com seus atributos
    const card = createElement('div', 'card')
    const front = createElement('div', 'face front')
    const back = createElement('div', 'face back')
    //Carrega a imagem do card
    front.style.backgroundImage = `url('../assets/${char}')`
    //Atribui parentesco às tags
    card.append(front, back)
    //Adiciona um atributo para compararmos os cards
    card.setAttribute('data-char', char)
    //Gira o card ao clicar
    card.addEventListener('click', ({ target }) => {
        //se o card já tiver a classe revea-card, encerra o evento. Isso serve para prevenir bugs em alguns navegadores
        if (target.parentNode.className.includes('reveal-card'))
            return

        if (firstCard == '') {
            target.parentNode.classList.add('reveal-card')
            firstCard = target.parentNode
        }
        else if (secondCard == '') {
            target.parentNode.classList.add('reveal-card')
            secondCard = target.parentNode
        }
        //Verifica se acertou ou errou
        const checkCards = () => {
            const firstChar = firstCard.getAttribute('data-char')
            const secondChar = secondCard.getAttribute('data-char')
            //Se acertou
            if (firstChar == secondChar) {
                firstCard.firstChild.classList.add('disabled-card')
                secondCard.firstChild.classList.add('disabled-card')
                firstCard = ''
                secondCard = ''
                //Encerra o jogo ao acertar todos
                const checkEndGame = () => {
                    const disabledCards = document.querySelectorAll('.disabled-card')
                    if (disabledCards.length == 20){
                        clearInterval(this.loop)
                        setTimeout(function () { alert(`Parabéns ${player.innerText}, seu tempo foi de ${timer.innerText} segundos`) }, 400)
                    }
                }
                checkEndGame()
                //Se errou
            } else {
                setTimeout(() => {
                    firstCard.classList.remove('reveal-card')
                    secondCard.classList.remove('reveal-card')
                    firstCard = ''
                    secondCard = ''
                }, 500)
            }

        }
        checkCards()
    })
    return card
}
//Renderiza os carda na tela
const loadGame = () => {
    //duplica o array de personagens
    const doubleChars = [...chars, ...chars]
    //embaralha os itens no array

    const shuffleChars = doubleChars.sort(() => Math.random() - 0.5)
    shuffleChars.forEach(el => {
        const card = createCard(el)
        grid.appendChild(card)
    });
}

//Carrega as informações depois de carregada a página
window.onload = () => {
    player.innerText = sessionStorage.getItem('@user')
    const startTimer = () => {
        this.loop = setInterval(()=>{
            const time = +timer.innerText + 1
             timer.innerText = ("000" + time).slice(-3)
        },1000)        
    }
    startTimer()
    loadGame()
}