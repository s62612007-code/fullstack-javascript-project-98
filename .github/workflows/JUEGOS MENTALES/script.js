let respuestaCorrecta;
let puntos = 0;
let tiempo = 12; // Límite de 12 segundos
let timerId;
let nombreJugador = "";

function iniciarJuego() {
    nombreJugador = document.getElementById('nombre-usuario').value;
    if (nombreJugador.trim() === "") {
    alert("POR FAVOR INGRESE SU NOMBRE");
    return;
    }
    
    document.getElementById('pantalla-inicio').style.display = "none";
    document.getElementById('ventana-juego').style.display = "block";
    document.getElementById('display-nombre').innerText = nombreJugador.toUpperCase();
    
nuevoReto();
empezarCronometro();
}

        function empezarCronometro() {
        timerId = setInterval(() => {
        tiempo--;
        document.getElementById('segundos').innerText = tiempo;
        
        if (tiempo <= 0) {
            clearInterval(timerId);
            alert("TIEMPO AGOTADO\nOPERADOR: " + nombreJugador + "\nPUNTAJE: " + puntos);
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
    let valor = parseInt(document.getElementById('entrada').value);
    
    if (valor === respuestaCorrecta) {
        puntos += 100;
        tiempo = 12; // El tiempo se reinicia a 12 con cada acierto
        document.getElementById('puntos').innerText = puntos.toString().padStart(4, '0');
        document.getElementById('mensaje').innerText = "OK: CORRECTO";
        nuevoReto();
    } else {
        document.getElementById('mensaje').innerText = "ERROR: REINTENTE";
    }
}