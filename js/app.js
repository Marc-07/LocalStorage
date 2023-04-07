//Variables

const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//Event Listeners
evenListeners();
function evenListeners(){
    formulario.addEventListener('submit', agregarTweet);

    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        console.log(tweets);

        crearHTML();
    });
}


//Funciones

function agregarTweet(e){
    e.preventDefault();

    //textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    //Validacion 

    if(tweet === ''){
        mostrarError('Un mensaje no puede ir vacio');
        return;
    }
    
    const tweetObj = {
        id: Date.now(),
        tweet
        
    }
    //Añadir al arreglo de Tweets

    tweets = [...tweets, tweetObj];
    
    //Creacion del HTML
    crearHTML();

    //Reiniciar el formulario
    formulario.reset();
}
//Mostrar mensaje de error

function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertarlo en el contenido

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Elimina la alerta despues de 3'
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);

}

//Listado de Tweets
function crearHTML(){

    limpiarHTML();

    if (tweets.length > 0){
        tweets.forEach(tweet => {
            //Agregar un botón de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';

            //Añadir la fincion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            //Crear el HTML
            const li = document.createElement('li');

            //Añadir el texto
            li.textContent = tweet.tweet;

            //Asignar el Boton
            li.appendChild(btnEliminar);

            //Insertarlo en el HTML
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();

    //Agrega los tweets al LocalStorage

    function sincronizarStorage(){
        localStorage.setItem('tweets', JSON.stringify(tweets));
    }
}

//Elimina un Tweet

function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id);

    crearHTML();
}

//Limpiar el HTML

function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}