import {data} from '../data/data.js';


const items = document.getElementById('items');
const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();

const shoppingList = document.getElementById('shoppingList');
const totalList = document.getElementById('totalList');

const btn8 = document.querySelector('.btn8');

btn8.addEventListener('click', ()=>{ 
    alert('Gracias por su compra')
})


let shoppingCart = [];

const loadData = data => {

    data.forEach(personaje => {
        const {id, precio, name, image } = personaje;
        templateCard.querySelector('.t1').textContent = name;
        templateCard.querySelector('.t2').textContent = "$" + precio;
        templateCard.querySelector('img').setAttribute('src', image);
        templateCard.querySelector('.btn1').dataset.id = id;
        templateCard.querySelector('.btn2').dataset.id = id;
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
        
    });

    items.appendChild(fragment);
}

document.addEventListener('DOMContentLoaded', loadData(data))


items.addEventListener('click', (e) =>{
    console.log(e.target.classList.contains('btn2'));
    if(e.target.classList.contains('btn2')){
        //console.log(e.target.dataset.id)
        let findId = e.target.dataset.id;

        let art = data.find(itm => itm.id == findId) 
        console.log(art) //JSON.stringify(art)
        localStorage.setItem('detalle',JSON.stringify(art));
        window.location.href = 'detail.html';
    }
})

items.addEventListener('click', (e) =>{
    console.log(e.target.classList.contains('btn1'));
    if(e.target.classList.contains('btn1')){
        //console.log(e.target.dataset.id)
        let findId = e.target.dataset.id;

        let art = data.find(itm => itm.id == findId) 
        console.log(art) //JSON.stringify(art)
        localStorage.setItem('detalle',JSON.stringify(art));

    }
})

/*---------------------------------------------------------------- */
/*-----------------------------------------------------------------*/



items.addEventListener('click', e => {

    let idTarget = e.target.dataset.id;
    
 
    data.forEach(hero => {
 
        const {id, precio, name, image} = hero;
 
        if(id == idTarget){
 
            const objeto = {
                id: id,
                name: name,
                image: image,
                precio: precio
            }
            
 
            localStorage.setItem("Hero",JSON.stringify(objeto));

            shoppingCart.push(objeto);
            localStorage.setItem('shoppingCart',JSON.stringify(shoppingCart));
            shoppingCartList();
        }   
    })
    e.stopPropagation();
    e.preventDefault();
 })
 


 
 
 const shoppingCartList = () => {

     shoppingList.innerHTML = '';



     let total = 0;
     let totalInt = 0;
     shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
     shoppingCart === null ? ( shoppingCart = []) : (
         shoppingCart.forEach(element => {
             totalInt += element.precio;



       shoppingList.innerHTML += 
       `
       <table border="2px" align="center">
       <tr>
           <td rowspan="3"><img src="${element.image}"  width="150" height="150"></td>
           <td align="center">
            <span>${element.name} &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp   
            </span>
            <span>$ ${element.precio} &nbsp</span>
            <span><button id="${element.id}" style= "background-color:red; color:white" >x</button> &nbsp</span>
           </td>
       </tr>
   </table>

`



       
          total = totalInt;
         })
     )
     getTotal(total);
 }
 
 function getTotal(total){
     totalList.innerHTML = '';
     totalList.innerHTML = `<h1 align="center">Total a pagar ${total}</h1>`
     localStorage.setItem('Total',total)
 }
 
 shoppingList.addEventListener('click', (e) =>{
     e.preventDefault();
 
    if(e.target.innerHTML == 'x'){
         let id = e.target.id;
         deleteHero(id);
    }
 
 })
 
 
 function deleteHero(idI){
     let indexArreglo;
 
     shoppingCart.forEach((elemento,index) =>{
         if(elemento.id==idI)
         indexArreglo = index;
     })
     
    shoppingCart.splice(indexArreglo,1);
     localStorage.setItem('shoppingCart',JSON.stringify(shoppingCart));
     shoppingCartList();
 }
 
