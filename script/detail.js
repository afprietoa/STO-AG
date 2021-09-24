let h4 = document.querySelector('h4');
let img = document.querySelector('img');
let button = document.querySelector('.btn-dark');

const getLocalStorage = () =>{
    let detail = JSON.parse(localStorage.getItem('detalle'))
    //console.log(detail)
    const {name, image} = detail;
    h4.textContent = name;
    img.setAttribute('src', image);
}

document.addEventListener('DOMContentLoaded', getLocalStorage)

button.addEventListener('click', () =>{
    window.location.href = 'index.html'
})