function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) { 
    
        // Generate random number 
        var j = Math.floor(Math.random() * (i + 1));
                    
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
        
    return array;
}
var totalTareas = 8;
var fase = 0;
var num = 1;
var otro = 1;
function tarea(n,f){
    num = n;
    fase = f;
    otro = 1;
    general(fase,num,otro);
    document.getElementById("trabajo"+num).style.display = "block";
    console.log('trabajo block en tarea('+n+','+f+')');
    // document.getElementById("trabajo")
    document.getElementById("mapa").style.display = "none";
    document.getElementById("niveles").style.display = "none";
    document.getElementById("box").focus();
}
function saltar(){
    otro = 10;
    siguiente();
}
function vencido(){
    num = 1;
    fase = 0;
    otro = 1;
    numeros = shuffleArray(numeros);
    document.getElementById("trabajo"+num).style.display = "none";
    document.getElementById("mapa").style.display = "block";
    document.getElementById("niveles").style.display = "block";
}
function general(fase,n,i){
    if(0 == fase){
    sumaSimple(n,i);
    } else if(1 == fase){
    sumaSecuencial(n,i);	
    } else if(2 == fase){
    secuenciaRapida(n,i);	
    } else if(3 == fase){
    secuenciaHoyo(n,i);	
    } else if(4 == fase){
    tablaHoyo(n,i);	
    } else if(5 == fase){
    tablaRapida(n,i);	
    } else if(6 == fase){
    productoSimple(n,i);	
    } else{
    productoLoco(n,i);	
    }
    document.getElementById("box").focus();
}
function siguiente(){
    var termino = false;
    otro++;
    if(10 < otro){ // Siguiente fase
    otro = 1;
    fase++;
    if(totalTareas == fase){ // Siguiente número
        fase = 0;
        num++;
        if(10 < num){ // Ya terminó!!
        termino = true;
        }
    }
    }
    if(true == termino){
    num = 1;
    fase = 0;
    otro = 1;
    alert("¡FELICIDADES! Terminaste exitosamente la aventura.")
    } else {
    general(fase,num,otro);
    }
}
var respuesta = "";
// var INP = "<input class='form-control' type='text' id='box' onkeyup='checa();' size='3' autofocus>";
// function sumaSimple(a,b){
//     // console.log("a: "+a);
//     //var b = bm - 1;
//     // document.getElementById("pregunta"+a).innerHTML = (a*(b-1))+" + "+a+" = "+INP;
//     document.getElementById("pregunta"+a).innerHTML = `<span>${a * (b - 1)} + ${a} =</span> ${INP}`;
//     respuesta = (a*b).toString();
// }

var INP = "<input class='form-control d-inline-block w-auto' type='text' id='box' onkeyup='checa();' size='3' autofocus>";

function sumaSimple(a, b) {
    document.getElementById("desafio-title-" + a).innerHTML = 'Desafío - suma simple';
    document.getElementById("pregunta" + a).innerHTML = 
        `<span>${a * (b - 1)} + ${a} =</span> ${INP}`;
    respuesta = (a * b).toString();
}

function sumaSecuencial(a,b){
    document.getElementById("desafio-title-" + a).innerHTML = 'Desafío - suma secuencial';
    var texto = "Suma "+a+" al número anterior: 0, ";
    for(var i=1; i<b; i++){
    texto += (a*i)+", ";
    }
    texto += (a*(b-1))+" + "+a+" = "+INP;
    document.getElementById("pregunta"+a).innerHTML = texto;
    respuesta = (a*b).toString();
}
function secuenciaRapida(a,b){
    document.getElementById("desafio-title-" + a).innerHTML = 'Desafío - suma rápida';
    var texto = "Empieza con "+a+" y sigue sumando: ";
    for(var i=1; i<b; i++){
    texto += (a*i)+", ";
    }
    texto += INP;
    document.getElementById("pregunta"+a).innerHTML = texto;
    respuesta = (a*b).toString();
}
function secuenciaHoyo(a,b){
    document.getElementById("desafio-title-" + a).innerHTML = 'Desafío - secuencia';
    var texto = "Empieza con "+a+" y sigue sumando: ";
    for(var i=1; i<11; i++){
    if(b == i){
        texto += INP;
        if(i < 10){
        texto += ", ";
        }
    } else if(10 == i){
        texto += (a*i);		
    } else{
        texto += (a*i)+", ";		
    }
    }
    document.getElementById("pregunta"+a).innerHTML = texto;
    respuesta = (a*b).toString();
}
function tablaHoyo(a,b){
    var texto = "Completa la tabla del "+a+": <br>\n";
    for(var i=1; i<11; i++){
    if(b == i){
        texto += a+" x "+i+" = "+INP;
        if(i < 10){
        texto += "<br> ";
        }
    } else if(10 == i){
        texto += a+" x "+i+" = "+(a*i);		
    } else{
        texto += a+" x "+i+" = "+(a*i)+"<br> ";		
    }
    }
    document.getElementById("pregunta"+a).innerHTML = texto;
    respuesta = (a*b).toString();
}
function tablaRapida(a,b){
    var texto = "Ve escribiendo la tabla del "+a+":<br>\n ";
    for(var i=1; i<b; i++){
    texto += a+" x "+i+" = "+(a*i)+"<br> ";
    }
    texto += a+" x "+b+" = "+INP;
    document.getElementById("pregunta"+a).innerHTML = texto;
    respuesta = (a*b).toString();
}
function productoSimple(a,b){
    document.getElementById("pregunta"+a).innerHTML = a+" x "+b+" = "+INP;
    respuesta = (a*b).toString();
}
var numeros = new Array(1,2,3,4,5,6,7,8,9,10);
numeros = shuffleArray(numeros);

function productoLoco(a,bm){
    var b = numeros[bm-1];
    document.getElementById("pregunta"+a).innerHTML = a+" x "+b+" = "+INP;
    respuesta = (a*b).toString();
}

var resueltos = [];
function checa(){
    var cad = document.getElementById("box").value;
    if(respuesta.startsWith(cad)){
        document.getElementById("box").style.backgroundColor = "LightGreen";
        document.getElementById("box").style.color = "Black";
        let iconoCuidado = document.getElementById("cuidado" + num);
        if (iconoCuidado) {
            iconoCuidado.remove();
        }
        if( respuesta == cad ){
            if (!document.getElementById("palomita" + num)) {
                let iconoPalomita = document.createElement("i");
                iconoPalomita.className = "bi bi-check-circle text-success ms-2"; // Clases Bootstrap
                iconoPalomita.id = "palomita" + num; // ID único por pregunta
                document.getElementById("pregunta" + num).appendChild(iconoPalomita);
            }
            setTimeout(() => {siguiente();}, 2000);
        }
    } else {
        document.getElementById("box").style.backgroundColor = "DarkRed";
        document.getElementById("box").style.color = "Yellow";

        if (!document.getElementById("cuidado" + num)) {
            let iconoCuidado = document.createElement("i");
            iconoCuidado.className = "bi bi-exclamation-diamond text-warning ms-2"; // Clases Bootstrap
            iconoCuidado.id = "cuidado" + num; // ID único por pregunta
            document.getElementById("pregunta" + num).appendChild(iconoCuidado);
        }
    }
}
function toggle(){
    var x = document.getElementById("multiCollapseExample"+num);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function myFunction(id) {
    var x = document.getElementById(id);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}