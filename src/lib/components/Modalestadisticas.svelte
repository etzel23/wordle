<script>
  import {inicio, visitas, victoria, juegos} from "$lib/controles.js";
// Obtener el modal y el botón de cerrar
let modal;
let contModal
let mensaje = "Estadísticas";
let mensajeJuego = "SIGUIENTE PALABRA";
let nuevoJuego = false;
let intervalo;
export let abrirModalEstadisticas;
export let perdiste;
let tiempo = 5 * 60;
// let tiempo = 20;


//Funcíon para abrir el modal desde el componente padre
$:if (abrirModalEstadisticas) {
    abrirModal();
}
$:if (perdiste == true){

    abrirModal();
    nuevoJuego = true;
    inicio.set(false);
    visitas.set(0);
    mensaje = "Perdiste";
    mensajeJuego = "VUELVE A INTENTAR";
}
$:if ($victoria){

  abrirModal();
  nuevoJuego = true;
  inicio.set(false);
  visitas.set(0);
  mensaje = "Ganaste";
  mensajeJuego = "TE SOBRARON";
}

// Mostrar el modal
function abrirModal() {
  modal.classList.remove('hidden');
  setTimeout(() => {
    modal.classList.add('bg-opacity-80');
    contModal.classList.remove('opacity-0');
    contModal.classList.add('opacity-100');
    contModal.classList.remove('mt-56');
    contModal.classList.add('mt-0');
    
  }, 10);
}

// Ocultar el modal
function cerrarModal() {
    contModal.classList.remove('opacity-100');
    contModal.classList.add('opacity-0');
    contModal.classList.remove('mt-0');
    contModal.classList.add('mt-56');
    modal.classList.remove('bg-opacity-80');
  setTimeout(() => {
    modal.classList.add('hidden');
  }, 500);
  abrirModalEstadisticas = false;
}

//Función para jugar de nuevo
function jugar(){
  cerrarModal();
  tiempo = 5 * 60;
  // tiempo = 20;
  mensaje = "Estadísticas";
  mensajeJuego = "SIGUIENTE PALABRA";
  nuevoJuego = false;
  inicio.set(true);
  visitas.set(1);
  perdiste = false;
}

//Función para saber si el juego está en pausa
$: if($inicio == true){
  iniciarCronometro();
}else{
  clearInterval(intervalo);
}

//Función para iniciar el intervalo del contador
function iniciarCronometro(){
  intervalo = setInterval(() => {
    if (tiempo > 0){
      tiempo--;
    } else if (tiempo == 0){
      abrirModal();
      mensaje = "Fin del tiempo";
      nuevoJuego = true;
      inicio.set(false);
      visitas.set(0);
      juegos.set($juegos + 1);
    }
}, 1000)
}
//Asignar las variables reactivas que se muestran en el modal
$: minutos = Math.floor(tiempo / 60);
$: segundos = Math.floor(tiempo - minutos * 60);

</script>
<div id="modal" class="hidden bg-gris-100 dark:bg-azul bg-opacity-0 fixed inset-0 flex items-center justify-center z-50  transition-all duration-500" bind:this={modal}>
    <div class="bg-gris-100 dark:bg-azul opacity-0 rounded-lg w-1/2 px-6 py-10 border-2 border-negro transition-all duration-500 mt-56 max-w-[546px] cont-modal dark:text-blanco" bind:this={contModal}>
      <h1 class="font-semibold mb-4 text-4xl text-center">{mensaje}</h1>
      <div class="flex justify-between px-10">
        <div class="text-center">
          <p class="text-4xl my-5"><b>{$juegos}</b></p>
          <p class="text-xl">Jugadas</p>
        </div>
        <div class="text-center">
          <p class="text-4xl my-5"><b>{$victoria}</b></p>
          <p class="text-xl">Victorias</p>
        </div>
      </div>
        
        <p class="text-xl mt-10 text-center">{mensajeJuego}</p>
        <p class="text-2xl mt-5 mb-10 text-center font-extrabold">
          0{minutos}:
          {#if segundos < 10}
            0{segundos}
          {:else}
            {segundos}
          {/if}
       </p>
      <div class="mt-4 flex justify-center">
        {#if nuevoJuego}
          <button id="closeModal" class="bg-verde px-20 py-2 text-3xl font-extrabold text-blanco rounded uppercase transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-amarillo duration-300"  on:click={jugar}>
            Juegar de nuevo
          </button>
        {:else}
          <button id="closeModal" class="bg-verde px-20 py-2 text-3xl font-extrabold text-blanco rounded uppercase transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-amarillo duration-300"  on:click={cerrarModal}>
            Aceptar
          </button>
        {/if}
        
      </div>
    </div>
</div>

