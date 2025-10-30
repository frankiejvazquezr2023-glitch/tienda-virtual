const contenedor = document.getElementById("contenedor-productos");
const form = document.getElementById("form-agregar");

let productos = [];

// Cargar JSON inicial
fetch("products.json")
    .then(res => res.json())
    .then(data => {
        productos = data;
        mostrarProductos();
    })
    .catch(err => console.log("Error al cargar el JSON:", err));

// Función para mostrar productos
function mostrarProductos() {
    contenedor.innerHTML = "";
    productos.forEach((producto, index) => {
        const div = document.createElement("div");
        div.classList.add("producto");

        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button onclick="eliminarProducto(${index})">Eliminar</button>
        `;

        contenedor.appendChild(div);
    });
}

// Función para agregar producto
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const precio = parseFloat(document.getElementById("precio").value);
    const imagen = document.getElementById("imagen").value.trim();

    if (!nombre || !precio || !imagen) {
        alert("Por favor completa todos los campos.");
        return;
    }

    const nuevoProducto = {
        id: productos.length + 1,
        nombre,
        precio,
        imagen
    };

    productos.push(nuevoProducto);
    mostrarProductos();
    form.reset();
});

// Función para eliminar producto
function eliminarProducto(index) {
    if (confirm("¿Seguro que deseas eliminar este producto?")) {
        productos.splice(index, 1);
        mostrarProductos();
    }
}
