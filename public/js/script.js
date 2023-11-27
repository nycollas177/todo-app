function completarTarefas(id){
    fetch('http://localhost:3000/completar',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({ id })
    })

    window.location.reload()
}
function alterarTema(){
    const body = document.querySelector('body')
    const button = document.querySelector('.tema-button')
    const tema = localStorage.getItem('tema')
    body.classList.add(tema)
    if (tema){
        let novoTema;
        if(tema === 'light'){
            novoTema = 'dark'
            body.classList.remove('light')
            body.classList.add('dark')
            button.innerHTML = `<img src="/images/sun-icon.png" alt="Ícone de Sol">`
        } else {
            novoTema = "light"
            body.classList.remove('dark')
            body.classList.add('light')
            button.innerHTML = `<img src="/images/moon-icon.png" alt="Ícone de Lua">`
        }
        localStorage.setItem('tema',novoTema)
        return
    }
    localStorage.setItem('tema',"dark")
    body.classList.add('dark')
}

function verificarTema(){
    const body = document.querySelector('body')
    const tema = localStorage.getItem('tema')
    const button = document.querySelector('.tema-button')
    if(tema){
        if(tema === 'dark'){
            body.classList.add('dark')
            button.innerHTML = `<img src="/images/sun-icon.png" alt="Ícone de Sol">`
        } else {
            body.classList.add('light')
            button.innerHTML = `<img src="/images/moon-icon.png" alt="Ícone de Lua">`
        }
    }
}

verificarTema()