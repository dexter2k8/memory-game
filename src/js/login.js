//Define os elementos manipulados nas requisições
const input = document.querySelector('.login__input')
const button = document.querySelector('.login__button')
const form = document.querySelector('.login-form')

//Desabilita o botão quando o input está vazio
input.addEventListener('input', ({ target }) => {
    if (target.value.length)
        button.removeAttribute('disabled')
    else
        button.setAttribute('disabled', '')
})

//Realiza o login e vai para o jogo
function handleSubmit(event) {
    event.preventDefault()
    sessionStorage.setItem('@user', input.value)
    window.location = './src/pages/game.html'
}
form.addEventListener('submit', handleSubmit)