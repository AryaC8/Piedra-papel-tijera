// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];
//    //


//Variables para los campos de introducción de datos
var nombre = document.getElementsByTagName("input")[0];
var partidas = document.getElementsByTagName("input")[1];

//Variables para valor total y actual
var total = document.getElementById("total");
var actual = document.getElementById("actual");

//Variables de los botones 
var botonJUGAR = document.getElementsByTagName("button")[0];
var botonYA = document.getElementsByTagName("button")[1];
var botonRESET = document.getElementsByTagName("button")[2];

//Variables para las imágenes del jugador

var piedra = document.getElementsByTagName("img")[0];
var papel = document.getElementsByTagName("img")[1];
var tijera = document.getElementsByTagName("img")[2];

var imagenOrdenador = document.getElementsByTagName("img")[3];


//Botón ¡YA! desahabilitado hasta que de comienzo el juego
botonYA.disabled = true;
//El div de las imágenes del jugador están desabilitadas
document.getElementById("jugador").disabled = true;


//botón JUGAR
botonJUGAR.addEventListener("click", iniciar);

//Botón YA
botonYA.addEventListener("click", jugada);

//Botón RESET
botonRESET.addEventListener("click", resetear);



//------------------------------------------------------------------------------------------------------------------
//FUNCIONES

//validar el nombre de usuario utilizando una expresión regular
function validarNombre() {
    
    var nombreIntroducido = nombre.value;  //guardo el nombre introducido en una variable

    var regex= /^\D[A-z]{3,}/;  //utilizo una expresión regular para evaluar que el primer caracter no puede ser un número 
                                // y que tiene que tener más de tres caracteres

    return regex.test(nombreIntroducido);   //devuelve verdadero o falso dependiendo de si se cumple la validación

}


//Validar el número introducido de partidas
function validarNumero() {

    var partidasJugadas = partidas.value;   //guardo las partidas introducidas en una variable

    if(!isNaN(partidasJugadas) && partidasJugadas > 0){  //si es un número y es mayor que 0, entonces:

        total.innerHTML = partidasJugadas;  //el número se inserta en el valor de total

        partidas.classList.remove("fondoRojo");  //quita el fondo rojo

        //campo desactivado
        partidas.disabled = true;  //descativa el campo

        return true;   //devuelve verdadero porque se ha cumplido la validación

    }else{  //si es menor que 0, entonces:

        partidas.classList.add("fondoRojo");  //añade el fondo rojo y no desactiva el campo

        return false; //devuelve falso porque la validación no se ha cumplido
    }       
}


//Comprobar que ambos campos tengas datos correctos y añadir las imágenes al jugador
function comprobar(){

    if (!validarNombre()) { //si el nombre introducido no es correcto marca el fondo rojo
        
        nombre.classList.add("fondoRojo");        

    }else if(validarNombre()){ //si es correcto quita el fondo rojo y desactiva el campo del nombre
        
        nombre.classList.remove("fondoRojo");
        
        nombre.disabled = true;
    }

    validarNumero(); //Uso la función de validar el número despues de la del nombre


    //Si el nombre y la cantidad de partidas son correctos, entonces asigna las imágenes al apartado de Jugador
    if(validarNombre() && validarNumero()){
    //Asigna las imágenes del arrayJugador al array de posibilidades y cambiar los "src" de las imágenes del jugador
    arrayJugador = ["img/piedraJugador.png", "img/papelJugador.png", "img/tijeraJugador.png"];           
    
        for (var i = 0; i < posibilidades.length; i++) {
    
            posibilidades[i] = arrayJugador[i];

            document.getElementsByTagName("img")[i].src= posibilidades[i];
        }
    }
}


//Elección imagen jugador

//Con estas funciones cambio las clases de las diferentes imágenes al ser seleccionadas

//Para la imagen de piedra
function piedraCSS(){    
    piedra.classList.add("seleccionado");
    piedra.classList.remove("noSeleccionado"); 
    papel.classList.remove("seleccionado");
    tijera.classList.remove("seleccionado");
}
//Para la imagen de papel
function papelCSS(){
    papel.classList.add("seleccionado");
    papel.classList.remove("noSeleccionado"); 
    piedra.classList.remove("seleccionado");
    tijera.classList.remove("seleccionado");
}
//Para la imagen de tijeras
function tijeraCSS(){
    tijera.classList.add("seleccionado");
    tijera.classList.remove("noSeleccionado"); 
    papel.classList.remove("seleccionado");
    piedra.classList.remove("seleccionado");    
}

//A cada imagen le asigno "su" función para modificar el CSS
piedra.addEventListener("click", piedraCSS);
papel.addEventListener("click", papelCSS);
tijera.addEventListener("click", tijeraCSS);


//Aquí elige la imagen dependiendo de qué imagen está seleccionada
function eleccionJugador(){
    if (piedra.className == "seleccionado") {
        return posibilidades[0];                 
    }else if(papel.className == "seleccionado"){
        return posibilidades[1];
    }else if(tijera.className == "seleccionado"){
        return posibilidades[2];
    }
}



//Asigna las imágenes al ordenador para que salga una aleatoria
function eleccionOrdenador(){

    arrayOrdenador = ["img/piedraOrdenador.png", "img/papelOrdenador.png", "img/tijeraOrdenador.png"];
   
    for (var i = 0; i < posibilidades.length; i++) {      
       
        arrayOrdenador[i] = posibilidades[i];          
    }

   var tiradaOrdenador = Math.floor(Math.random()*3); //un número aleatorio multiplicado por las tres posibilidades

   manoOrdenador = posibilidades[tiradaOrdenador];  //guardo en una variable la elección aleatoria del array

   imagenOrdenador.src=manoOrdenador;   //cambio el "src" de la imagen del ordenador

   return manoOrdenador;  //devuelve el resultado

}


//función para comparar resultados de la jugada 
function ganador(jugador, ordenador){

    if (jugador === ordenador) { //si ambos seleccionan la misma imagen
        return "Empate";               
   }else if(jugador === posibilidades[0]){   //si jugador elije piedra
       if(ordenador === posibilidades[1]){   //si ordenador elije papel
           return (nombre.value) + " pierde. Gana la máquina";               
       }
       if (ordenador === posibilidades[2]) {  //si ordenador elije tijeras
           return (nombre.value) + " gana.";                 
       }
   }else if(jugador === posibilidades[1]){   //si jugador elije papel
       if(ordenador === posibilidades[2]){   //si ordenador elije tijeras
           return (nombre.value) + " pierde. Gana la máquina";                
       }
       if (ordenador === posibilidades[0]) { //si ordenador elije piedra
           return (nombre.value) + " gana.";               
       }
   }else if(jugador === posibilidades[2]){   //si jugador elije tijeras
       if(ordenador === posibilidades[0]){   //si ordenador elije piedra
           return (nombre.value) + " pierde. Gana la máquina";                 
       }
       if (ordenador === posibilidades[1]) {   //si ordenador elije papel
           return (nombre.value) + " gana.";               
       }
   }    
}


//función para añadir el resultado al historial
//crea elementos "li" dentro de la lista "ul" con id "historial"
function añadirHistorial(result){
    var li = document.createElement("li");
    var lista = document.createTextNode(result);
    li.appendChild(lista);
    document.getElementById("historial").appendChild(li);
    
}




//------------------------------------------------------------------------------------------------------------

//FUNCIONES PARA AÑADIR A LOS BOTONES DE JUGAR, ¡YA! Y RESET

//Esta función es para el botón JUGAR
function iniciar (){
    //evalúa el nombre de usuario y asigna las partidas que se van a jugar
    comprobar();    

    //Habilita el botón ¡YA! al pulsar en en el botón JUGAR si los campos de datos son ambos correctos
    if(validarNombre() && validarNumero()){
     botonYA.disabled = false; 
    }else{          //Deshabilita el botón ¡YA! al pulsar en en el botón JUGAR si los campos de datos son ambos correctos
        botonYA.disabled = true; 
    }
}



 //Variable para luego incrementar el valor de actual
 var numero = 0;

//Esta función es para el botón ¡YA!
function jugada(){
    
    numero+=1;    //incrementa el número cada vez que se pulsa el botón

    actual.innerHTML = numero;      //el número se inserta en el valor de actual

    if (numero == partidas.value){  //si el número actual de la partidas es el mismo que el de partidas elegidas

         botonYA.disabled = true;    //se descativa el botón ¡YA! para que no se pueda seguir jugando
    }     
   
    var juegoJugador= eleccionJugador();          //guarda la elección de la imagen del jugador
    var juegoOrdenador = eleccionOrdenador();    //guarda la elección de la imagen del ordenador

   var resultado = ganador(juegoJugador, juegoOrdenador);     //guarda el resultado de la partida

   añadirHistorial(resultado);    //añade el resultado al historial
   
}


//Esta función es para el botón RESET
function resetear(){

    //Añado al historial el mensaje de que se va a empezar una nueva partida
    añadirHistorial("NUEVA PARTIDA");
    //activa el campo del nombre
    nombre.disabled = false;
    //activa el campo de las partidas
    partidas.disabled = false;
    //Pone a 0 los contadores de "actual" y "total"
    total.innerHTML= 0;
    actual.innerHTML= 0;
    //Cambia a imagen por defecto en la opción del ordenador
    imagenOrdenador.src = "img/defecto.png";
    //Deja a 0 el número de partidas
    partidas.value = 0;
    //Activa el botón YA
    botonYA.disabled = false;
    //Resetear el número de partidas jugadas
    numero = 0;
    //Se deshabilita el botón ¡YA! para realizar una nueva elección
    botonYA.disabled = true;
    
}