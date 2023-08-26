<script>
import { onMount } from "svelte";
import {inicio, visitas} from "$lib/controles.js";
// Obtener el modal y el botón de cerrar
let modal;
let contModal
let closeModal;
export let abrirModalInstrucciones;

//Funcíon para abrir el modal desde el componente padre
$:if (abrirModalInstrucciones) {
    abrirModal();
}

// Mostrar el modal
function abrirModal() {
  inicio.set(false);
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
  abrirModalInstrucciones = false;
  inicio.set(true);
  visitas.set($visitas + 1);
}

//Función para abrir el modal al iniciar o recargar
onMount(() => {
    abrirModal()
});
</script>
<div id="modal" class="hidden bg-gris-100 dark:bg-azul bg-opacity-0 fixed inset-0 flex items-center justify-center z-50  transition-all duration-500" bind:this={modal}>
    <div class="bg-gris-100 dark:bg-azul opacity-0 rounded-lg w-1/2 px-6 py-10 border-2 border-negro transition-all duration-500 mt-56 max-w-[546px] cont-modal dark:text-blanco" bind:this={contModal}>
      <h1 class="font-semibold mb-4 text-4xl text-center">Cómo jugar</h1>
      <p class="text-xl">Adivina la palabra oculta en cinco intentos.
        <br/><br/>
        Cada intento debe ser una palabra válida de 5 letras.
        <br/><br/>
        Después de cada intento el color de las letras cambia para mostrar qué tan cerca estás de acertar la palabra.</p>
        <p class="font-bold text-xl my-5">Ejemplos</p>
        <div class="grid grid-cols-5 gap-2">
            <div class="aspect-square bg-verde border-2 border-negro flex justify-center items-center text-4xl font-extrabold">G</div>
            <div class="aspect-square bg-blanco border-2 border-negro flex justify-center items-center text-4xl font-extrabold">A</div>
            <div class="aspect-square bg-blanco border-2 border-negro flex justify-center items-center text-4xl font-extrabold">T</div>
            <div class="aspect-square bg-blanco border-2 border-negro flex justify-center items-center text-4xl font-extrabold">O</div>
            <div class="aspect-square bg-blanco border-2 border-negro flex justify-center items-center text-4xl font-extrabold">S</div>
        </div>
        <p class="text-xl my-5">La letra <b>G</b> está en la palabra y en la posición correcta.</p>
        <div class="grid grid-cols-5 gap-2 mt-2">
            <div class="aspect-square bg-blanco border-2 border-negro flex justify-center items-center text-4xl font-extrabold">V</div>
            <div class="aspect-square bg-blanco border-2 border-negro flex justify-center items-center text-4xl font-extrabold">O</div>
            <div class="aspect-square bg-amarillo border-2 border-negro flex justify-center items-center text-4xl font-extrabold">C</div>
            <div class="aspect-square bg-blanco border-2 border-negro flex justify-center items-center text-4xl font-extrabold">A</div>
            <div class="aspect-square bg-blanco border-2 border-negro flex justify-center items-center text-4xl font-extrabold">L</div>
        </div>
        <p class="text-xl my-5">La letra <b>C</b> está en la palabra pero en la posición incorrecta.</p>
        <div class="grid grid-cols-5 gap-2 mt-2">
            <div class="aspect-square bg-blanco border-2 border-negro flex justify-center items-center text-4xl font-extrabold">C</div>
            <div class="aspect-square bg-blanco border-2 border-negro flex justify-center items-center text-4xl font-extrabold">A</div>
            <div class="aspect-square bg-blanco border-2 border-negro flex justify-center items-center text-4xl font-extrabold">N</div>
            <div class="aspect-square bg-blanco border-2 border-negro flex justify-center items-center text-4xl font-extrabold">T</div>
            <div class="aspect-square bg-gris-300 border-2 border-negro flex justify-center items-center text-4xl font-extrabold">O</div>
        </div>
        <p class="text-xl my-5">La letra <b>O</b> no está en la palabra.</p>
        <p class="text-xl my-10">Puede haber letras repetidas. Las pistas son independientes para cada letra.</p>
        <p class="text-xl my-10 text-center">¡Una palabra nueva cada 5 minutos!</p>
      <div class="mt-4 flex justify-center">
        <button id="closeModal" class="bg-verde px-20 py-2 text-3xl font-extrabold text-blanco rounded uppercase transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-amarillo duration-300" bind:this={closeModal} on:click={cerrarModal}>
          ¡Jugar!
        </button>
      </div>
    </div>
</div>

<style>
    @media screen and (max-height: 1200px) {
        #modal{
            overflow: auto;
            align-items: start;
        }
        .cont-modal{
            margin-top: 30px !important;
        }
    }
</style>