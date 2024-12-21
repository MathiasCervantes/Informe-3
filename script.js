function calcularAnillo() {
    // Obtener valores ingresados por el usuario
    const n = parseInt(document.getElementById('dimension').value); // Dimensión de la matriz
    const k = parseInt(document.getElementById('anillo').value);   // Anillo seleccionado

    // Validación: el valor de k no puede exceder la mitad del tamaño de la matriz
    if (k >= Math.ceil(n / 2)) {
        alert("El valor de k es demasiado grande para esta matriz.");
        return; // Salir de la función si k no es válido
    }

    // Generar una matriz aleatoria con dimensiones n x n
    const matriz = generarMatriz(n);

    // Mostrar la matriz generada en la página
    mostrarMatriz(matriz, n);

    // Calcular la suma de los elementos del anillo k
    const suma = sumarAnillo(matriz, n, k);

    // Mostrar el resultado en el elemento correspondiente
    document.getElementById('resultado').innerText = suma;
}

function generarMatriz(n) {
    const matriz = [];
    for (let i = 0; i < n; i++) {
        const fila = [];
        for (let j = 0; j < n; j++) {
            // Generar números aleatorios entre -10 y 10 para llenar la matriz
            fila.push(Math.floor(Math.random() * 20) - 10); 
        }
        matriz.push(fila);
    }
    return matriz;
}

function mostrarMatriz(matriz, n) {
    const contenedor = document.getElementById('matriz');
    contenedor.innerHTML = ""; // Limpia cualquier contenido previo en el contenedor
    const tabla = document.createElement('table'); // Crea un elemento de tabla HTML dinámicamente

    // Recorre cada fila de la matriz
    for (let i = 0; i < n; i++) {
        const fila = document.createElement('tr'); // Crea un elemento de fila (tr)
        // Recorre cada columna de la matriz
        for (let j = 0; j < n; j++) {
            const celda = document.createElement('td'); // Crea una celda (td) para cada valor
            celda.innerText = matriz[i][j]; // Inserta el valor correspondiente de la matriz en la celda
            fila.appendChild(celda); // Agrega la celda a la fila
        }
        tabla.appendChild(fila); // Agrega la fila a la tabla
    }
    contenedor.appendChild(tabla); // Agrega la tabla al contenedor
}

function sumarAnillo(matriz, n, k) {
    let suma = 0;
    // Sumar el borde superior
    for (let j = k; j < n - k; j++) {
        suma += matriz[k][j];
    }
    // Sumar el borde derecho
    for (let i = k + 1; i < n - k; i++) {
        suma += matriz[i][n - k - 1];
    }
    // Sumar el borde inferior (si no se repite con el borde superior)
    if (k < n - k - 1) {
        for (let j = n - k - 2; j >= k; j--) {
            suma += matriz[n - k - 1][j];
        }
    }
    // Sumar el borde izquierdo (si no se repite con el borde derecho)
    if (k < n - k - 1) {
        for (let i = n - k - 2; i > k; i--) {
            suma += matriz[i][k];
        }
    }
    return suma;
}
