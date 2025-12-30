let respuestaCorrecta;
let puntos = 0;
let aciertosSeguidos = 0; 
let tiempo = 28; 
let timerId;
let nombreJugador = "";

function iniciarJuego() {
    nombreJugador = document.getElementById('nombre-usuario').value;

    if (nombreJugador.trim() === "") {
        alert("ERROR: ACCESO DENEGADO. INGRESE NOMBRE.");
        return;
    }

    // Reset de estado inicial
    puntos = 0;
    aciertosSeguidos = 0;
    tiempo = 28; 
    
    document.getElementById('pantalla-inicio').style.display = "none";
    document.getElementById('ventana-juego').style.display = "block";
    document.getElementById('display-nombre').innerText = nombreJugador.toUpperCase();
    document.getElementById('puntos').innerText = "0000";

    nuevoReto();
    empezarCronometro();
}

function empezarCronometro() {
    if (timerId) clearInterval(timerId);

    timerId = setInterval(() => {
        tiempo--;
        document.getElementById('segundos').innerText = tiempo;

        if (tiempo <= 0) {
            clearInterval(timerId);
            alert("SISTEMA BLOQUEADO: TIEMPO AGOTADO\n----------------------------\nUSUARIO: " + nombreJugador + "\nPUNTOS: " + puntos);
            // Reinicia la aplicación por completo
            location.reload();
        }
    }, 1000);
}

function nuevoReto() {
    const tipo = Math.floor(Math.random() * 4);
    const elProblema = document.getElementById('problema');

    if (tipo === 0) { // FIBONACCI
        let a = Math.floor(Math.random() * 5);
        let b = a + 1;
        let c = a + b;
        respuestaCorrecta = b + c;
        elProblema.innerText = `${a}, ${b}, ${c}, ?`;
    }
    else if (tipo === 1) { // ARITMÉTICA
        let inicio = Math.floor(Math.random() * 20);
        let salto = Math.floor(Math.random() * 10) + 2;
        respuestaCorrecta = inicio + (salto * 3);
        elProblema.innerText = `${inicio}, ${inicio+salto}, ${inicio+salto*2}, ?`;
    }
    else if (tipo === 2) { // SUMA RÁPIDA
        let n1 = Math.floor(Math.random() * 90) + 10;
        let n2 = Math.floor(Math.random() * 90) + 10;
        respuestaCorrecta = n1 + n2;
        elProblema.innerText = `${n1} + ${n2}`;
    }
    else { // RAÍZ CUADRADA
        let bases = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        let b = bases[Math.floor(Math.random() * bases.length)];
        respuestaCorrecta = b;
        elProblema.innerText = `SQRT(${b * b})`;
    }

    document.getElementById('entrada').value = "";
    document.getElementById('entrada').focus();
}

function verificar() {
    let entrada = document.getElementById('entrada');
    let valor = parseInt(entrada.value);

    if (valor === respuestaCorrecta) {
        puntos += 100;
        aciertosSeguidos++;
        
        // Lógica de tiempo solicitada
        if (aciertosSeguidos >= 4) {
            tiempo = 50; // Combo 50 segundos
            document.getElementById('mensaje').innerText = "¡ESTADO: COMBO ACTIVO!";
            document.getElementById('mensaje').style.color = "#FFFF00"; // Amarillo neón
        } else {
            tiempo = 28; // Reinicio a 28 segundos
            document.getElementById('mensaje').innerText = "ESTADO: OK (" + aciertosSeguidos + "/4)";
            document.getElementById('mensaje').style.color = "#00FF00";
        }

        document.getElementById('puntos').innerText = puntos.toString().padStart(4, '0');
        nuevoReto();
    } else {
        document.getElementById('mensaje').innerText = "ESTADO: ERROR DE DATOS";
        document.getElementById('mensaje').style.color = "#FF0000";
        aciertosSeguidos = 0; // Reset racha si falla
        entrada.value = "";
        entrada.focus();
    }
}