
// VARIABLES

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');

let articulosCarrito = []; //Iniciamos el arreglo articulosCarrito

cargarEventListener(); //Inicializamos una Funcion que se cargue al iniciar el archivo js

function cargarEventListener(){
    //Cuando le demos click al div Lista-cursos se ejecuta la funcion
    listaCursos.addEventListener('click',agregarCursos);

    //Eliminar los Cursos del Carrito al darle click al boton con la clase carrito
    carrito.addEventListener('click',eliminarCurso);

    //Vaciar todos los Cursos del Carrito al darle click en el boton de clase vaciar-carrito // contiene una funcion anonima
    vaciarCarritoBtn.addEventListener('click',()=>{
        articulosCarrito = []; //Vaciamos el Arreglo a 0
        limpiarHtml();      // Invocamos la funcion LimpiarHtml
    });
}

//FUNCIONES

function eliminarCurso(e)
{
    if(e.target.classList.contains('borrar-curso'))
    {
        const idCurso = e.target.getAttribute('data-id'); //Obtenemos el atributo data-id
        articulosCarrito = articulosCarrito.filter(cursos => cursos.id !== idCurso) //filtramos todos los datos que sean diferentes al idCurso

        carritoHtml(); //Invocamos la funcion carritoHtml (va a mostrar el Html y limpiar el carrito)
    }

}
function agregarCursos(e){
    e.preventDefault(); //evita que se recargue la pagina con los botones sin direccion href="#"
    if(e.target.classList.contains('agregar-carrito')) //identifica si tenemos la clase 'agregar-carrito'
    {
        const cursoSeleccionado = e.target.parentElement.parentElement; //saltamos al padre del padre
        leerDatosCurso(cursoSeleccionado); //invocamos la funcion

    }
    
}

function leerDatosCurso(curso){
    
    const infoCurso = { //creamos un arreglo de objetos
        img: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    const existe = articulosCarrito.some((curso)=>curso.id === infoCurso.id); //el metodo Some ayuda a verificar si se encuentra el elemento dentro del array

    if(existe){
        const cursos = articulosCarrito.map((cursX)=>{  // el metodo map ayuda a leer el arreglo y a lavez crea un array nuevo con esos datos
        
            if(cursX.id === infoCurso.id){
                cursX.cantidad++;   //aumenta de 1 en 1
                return cursX;
            }else{
                return cursX;
        }
        });

        articulosCarrito = [...cursos]; 

    }else{
        articulosCarrito = [...articulosCarrito,infoCurso];     //el arreglo se concatena con el objeto, uno tras de otro creando una lista
    }
    

    carritoHtml(); //MUESTRA Y LIMPIA EL CARRITO
}

//Muestra las compras del Carrito y Limpia el Carrito
function carritoHtml()
{

    limpiarHtml(); //invocamos la funcion

    articulosCarrito.forEach((curso)=>{     //leemos los datos del arreglo
        const {img,titulo,precio,cantidad,id} = curso;      //Destructuring, crea variables al mismo tiempo q las lee
        const row = document.createElement('tr');   //creamos un elemento html
        row.innerHTML = `
            <td>
            <img src="${img}" width="100">
            </td>
            <td>
            ${titulo}
            </td>
            <td>
            ${precio}
            </td>
            <td>
            ${cantidad}
            </td>
            <td>
            <a href="#" data-id="${id}" class="borrar-curso">X</a>
            </td>
        `;

        contenedorCarrito.appendChild(row);     //agrega un hijo debajo de un elemento padre
    });

    
}

function limpiarHtml()
{
    while(contenedorCarrito.firstChild)         //Forma de eliminar hijos de un elemento Padre
    {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}