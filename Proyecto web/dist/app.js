'use strict'
const buscando = document.getElementById("buscando");
const inputBuscar = document.getElementById("input_buscar");

/* listado para meter la informacion de la api */
const listado = document.getElementById('listPrice');

/* crear fragmento */
const fragment = new DocumentFragment();

/* crear variable para obtener el content del template  */
const temp = document.getElementById('template').content;

buscando.addEventListener("click", (e)=>{
    if(inputBuscar.classList.contains('buscarOculto')){

        /* classList: llamar los estilos del elemento, (asignar estilos prestablecudos a un elemento, o removerlos) */
        inputBuscar.classList.remove("buscarOculto");
        inputBuscar.classList.add("buscarVisible");

    }else if(inputBuscar.classList.contains('buscarVisible')){

        inputBuscar.classList.add("buscarOculto");
        inputBuscar.classList.remove("buscarVisible");
    }
});


/* consumo fetch */


fetch('https://jsonplaceholder.typicode.com/todos/1')
/* en la funcion tipo flecha si solo es de una linea se puede quitar los parentesis y los corchetes y solo dejar la flecha */
    .then(response=>response.json())
    .then(data=>console.log(data))
    .finally(console.log("Hemos finalizado con la peticion"))
    /* capturar error */
    .catch(error => console.error("Se ha presentado un error: " + error));

/* npm = gestor de paquetes de node js */


/* AXIOS - ES MAS USADO*/

/* CONSUMO DE API CON AXIOS  Y UTILIZACION DE ASYNC / AWAIT*/


/* se debe indicar el verbo de la peticion get, postm put, patch, delete */
async function obtenerLista(){
    /* se debe indicar el verbo de la peticion get, postm put, patch, delete */
    const resp = await axios
    .get("https://pokeapi.co/api/v2/pokemon")
    .then((response) => {
        /* con axios siempre se debe poner el .data */
        /* results es lo que nos da la API de pokemon */
        const resultados = response.data.results;
        console.log(resultados)
        let poke= [];

        for (const i in resultados){
            poke.push(resultados[i]);
            /* push permite agregar elementos al Arreglo en su ultima posicion */
        }
        return poke;
    })
    .catch((error)=>{
        console.log("Se ha generado un error en la peticion" + error);
        return 0;
    });

    return resp;
}

const data = await obtenerLista();


/* comprobar si el navegador soporta el template */

/* pregunta si puede insertar elementos de tipo template */
const testTemplate = "content" in document.createElement("template");

if(testTemplate){
    data.forEach(element => {
        temp.querySelector("#code").innerHTML = `Codigo: ${element.name}`;
        temp.querySelector("#detail").innerHTML = `Detalle: ${element.url}`;

        /* Clonar */
        const myElement = temp.cloneNode(true);
        fragment.appendChild(myElement);
    });
}

listado.appendChild(fragment);



