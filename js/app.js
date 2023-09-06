const fotoInput = document.querySelector('#traerfoto');

const nombreInput = document.querySelector('#mascota');
const marcaInput = document.querySelector('#propietario');
const cilindrajeInput = document.querySelector('#telefono');
const placaInput = document.querySelector('#fecha');
const soatInput = document.querySelector('#hora');
const consumoInput = document.querySelector('#consumo');
const descripcionInput = document.querySelector('#sintomas');

// Contenedor para las citas
const contenedorCitas = document.querySelector('#citas');

// Formulario nuevas citas
const formulario = document.querySelector('#nueva-cita')
formulario.addEventListener('submit', nuevaCita);

let editando = false;

let local = [];


// Eventos
eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded',()=>{
        local = JSON.parse(localStorage.getItem('local')) || [];
                ui.imprimirCitas(administrarCitas)
    })
    fotoInput.addEventListener('change',(e)=>{
        citaObj[e.target.name] = e.target.files[0];
    });
    // fotoInput.addEventListener('change',()=>{
    //     citaObj.lafoto= fotoInput.files[0];
    // });
    nombreInput.addEventListener('change', datosCita);
    marcaInput.addEventListener('change', datosCita);
    cilindrajeInput.addEventListener('change', datosCita);
    placaInput.addEventListener('change', datosCita);
    soatInput.addEventListener('change', datosCita);
    consumoInput.addEventListener('change', datosCita);
    descripcionInput.addEventListener('change', datosCita);
}

const citaObj = {
    lafoto:'',
    nombre: '',
    marca: '',
    cilindraje: '',
    placa: '',
    soat:'',
    consumo: '',
    descripcion: ''
}

// local = [...local,citaObj]




function datosCita(e) {
    //  console.log(e.target.name) // Obtener el Input
     citaObj[e.target.name] = e.target.value;
}

// CLasses
class Citas {
    constructor() {
        this.citas = []
    }
    agregarCita(cita) {
        this.citas = [...this.citas, cita];
        local.push(citaObj);
    }
    editarCita(citaActualizada) {
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita)
    }

    eliminarCita(id) {
        this.citas = this.citas.filter( cita => cita.id !== id);
    }
}

class UI {
    imprimirAlerta(mensaje, tipo) {
        // Crea el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');
        
        // Si es de tipo error agrega una clase
        if(tipo === 'error') {
             divMensaje.classList.add('alert-danger');
        } else {
             divMensaje.classList.add('alert-success');
        }

        // Mensaje de error
        divMensaje.textContent = mensaje;

        // Insertar en el DOM
        document.querySelector('#contenido').insertBefore( divMensaje , document.querySelector('.agregar-cita'));

        // Quitar el alert despues de 3 segundos
        setTimeout( () => {
            divMensaje.remove();
        }, 3000);
   }

   imprimirCitas({citas}) { // Se puede aplicar destructuring desde la función...
       
        this.limpiarHTML();

        citas.forEach(cita => {
            const {lafoto,nombre, marca, cilindraje, placa, soat, consumo,descripcion, id } = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            const mifoto = document.createElement('img');
            // mifoto.src = URL.createObjectURL(foto);

            const reader = new FileReader();

            reader.onload = (e) => {mifoto.src = e.target.result};
            reader.readAsDataURL(lafoto);

            mifoto.style.width = '150px';
            mifoto.style.height = '150px';

            // scRIPTING DE LOS ELEMENTOS...
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.innerHTML = `${nombre}`;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `<span class="font-weight-bolder">Marca: </span> ${marca}`;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Cilindraje: </span> ${cilindraje}`; 

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `<span class="font-weight-bolder">Placa: </span> ${placa}`;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `<span class="font-weight-bolder">Vencimiento Soat: </span> ${soat}`;
            const consumoparrafo = document.createElement('p');
            consumoparrafo.innerHTML = `<span class="font-weight-bolder">Consumo: </span> ${consumo}`;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `<span class="font-weight-bolder">Descripcion: </span> ${descripcion}`;

            // Agregar un botón de eliminar...
            const btnEliminar = document.createElement('button');
            btnEliminar.onclick = () => eliminarCita(id); // añade la opción de eliminar
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Eliminar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'

            // Añade un botón de editar...
            const btnEditar = document.createElement('button');
            btnEditar.onclick = () => cargarEdicion(cita);

            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = 'Editar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'

            // Agregar al HTML
            divCita.appendChild(mifoto);
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(consumoparrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar)
            divCita.appendChild(btnEditar)

            contenedorCitas.appendChild(divCita);
        });    
   }

   limpiarHTML() {
        while(contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
   }

}

function agregarstorage(){
    localStorage.setItem('local',JSON.stringify(local))
}

const ui = new UI();
const administrarCitas = new Citas();

function nuevaCita(e) {
    e.preventDefault();
    

    const {lafoto,nombre, marca, cilindraje, placa, soat, consumo,descripcion } = citaObj;

    // Validar
    if(lafoto === ''|| nombre === '' || marca === '' || cilindraje === '' || placa === ''  || soat === '' || consumo === '' || descripcion === '') {
        ui.imprimirAlerta('Todos los mensajes son Obligatorios', 'error')

        return;
    }

    if(editando) {
        // Estamos editando
        administrarCitas.editarCita( {...citaObj} );

        ui.imprimirAlerta('Guardado Correctamente');

        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        editando = false;

    } else {
        // Nuevo Registrando

        // Generar un ID único
        citaObj.id = Date.now();
        
        // Añade la nueva cita
        administrarCitas.agregarCita({...citaObj});

        // Mostrar mensaje de que todo esta bien...
        ui.imprimirAlerta('Se agregó correctamente')
    }


    // Imprimir el HTML de citas
    ui.imprimirCitas(administrarCitas);
    agregarstorage();

    // Reinicia el objeto para evitar futuros problemas de validación
    reiniciarObjeto();

    // Reiniciar Formulario
    formulario.reset();

    

}

function reiniciarObjeto() {
    // Reiniciar el objeto
    citaObj.lafoto='';
    citaObj.nombre = '';
    citaObj.marca = '';
    citaObj.cilindraje = '';
    citaObj.placa = '';
    citaObj.soat = '';
    citaObj.consumo = '';
    citaObj.descripcion = '';
}


function eliminarCita(id) {
    administrarCitas.eliminarCita(id);

    ui.imprimirCitas(administrarCitas)
}

function cargarEdicion(cita) {

    const {lafoto,nombre, marca, cilindraje, placa, soat, consumo,descripcion, id } = cita;

    // Reiniciar el objeto
    citaObj.lafoto = lafoto;
    citaObj.nombre = nombre;
    citaObj.marca = marca;
    citaObj.cilindraje = cilindraje;
    citaObj.placa = placa;
    citaObj.soat = soat;
    citaObj.consumo = consumo;
    citaObj.descripcion = descripcion; 
    citaObj.id = id;

    // Llenar los Inputs
    fotoInput.src=lafoto;
    nombreInput.value = nombre;
    marcaInput.value = marca;
    cilindrajeInput.value = cilindraje;
    placaInput.value = placa
    soatInput.value = soat
    consumoInput.value = consumo;
    descripcionInput.value = descripcion;

    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;

}