
<script>
    import Tablero from "$lib/components/Tablero.svelte";
    import Teclado from "$lib/components/Teclado.svelte";
    import { onMount } from "svelte";
    import ModalIstrucciones from "../lib/components/ModalIstrucciones.svelte";
    import Modalestadisticas from "../lib/components/Modalestadisticas.svelte";
    import { browser } from '$app/environment';
    

    let abrirModalInstrucciones = false;
    let abrirModalEstadisticas = false;
    let perdiste = false;
    let modoObscuro = false;

    function modalInstrucciones(){
        abrirModalInstrucciones = false;
        abrirModalInstrucciones = true;
    }
    function modalEstadisticas(){
        abrirModalEstadisticas = false;
        abrirModalEstadisticas = true;
    }
    function perdisteEljuego(){
        abrirModalEstadisticas = false;
        abrirModalEstadisticas = true;
        perdiste = false;
        perdiste = true;
    }

    
        function cambiarModo(){
          if (modoObscuro && browser){
              document.body.classList.add('dark');
          }else{
              document.body.classList.remove('dark');
          }
        }

</script>

<section class="container mx-auto flex justify-center">
    <div class="max-w-[638px] w-full">
        <div class="text-center w-full">
            <div class="w-full bg-gris-100 dark:bg-azul-300 mt-20 p-4 rounded-2xl flex justify-between items-center">
                <button on:click={modalInstrucciones}><img src="../ayuda.svg" alt="Logo-Wordle" border="0" class="w-7 mr-16"></button>
                <h1 class=" font-bold uppercase text-azul dark:text-blanco text-5xl txt-negro">Wordle</h1>
                <div class="flex">
                  <button on:click={modalEstadisticas}><img src="../estadisticas.svg" alt="Logo-Wordle" border="0" class="w-7 mr-2"></button>
                  <div class="toggle" title="toggle dark mode">
                      <label>
                        <input type="checkbox" name="" bind:checked={modoObscuro} on:change={cambiarModo}>
                        <span></span>
                      </label>
                  </div>
                </div>
                
            </div>
            
        </div>
    
        <Tablero on:perdiste={perdisteEljuego}/>
        <Teclado/>
    </div>
    
</section>

<ModalIstrucciones abrirModalInstrucciones = {abrirModalInstrucciones}/>
<Modalestadisticas abrirModalEstadisticas = {abrirModalEstadisticas} perdiste = {perdiste}/>

<style>

 .toggle input {
  display: none;
}
 .toggle input:checked ~ span {
  border: 1px solid #333;
  background: #2c4e63;
}
 .toggle input:checked ~ span:before {
  left: 45px;
  box-shadow: inset -0.5rem 0rem 0 0.25rem #ffc207;
  background: transparent;
}
 .toggle input:checked ~ span:after {
  content: "★";
  top: -2px;
  left: 30px;
  width: 5px;
  height: 5px;
  font-size: 25px;
  color: #ffc207;
}
 .toggle span {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 5rem;
  height: 2.5rem;
  border-radius: 5rem;
  border: 1px solid #333;
  background: #5197c4;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
 .toggle span:before {
  content: "";
  position: absolute;
  top: 6px;
  left: 4px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  box-shadow: inset -2rem -2rem 0 0 #ffc207;
  transition: all 0.5s cubic-bezier(0, 0.55, 0.45, 1);
}
 .toggle span:after {
  content: "☁";
  position: absolute;
  top: 6px;
  left: 13px;
  width: 2px;
  height: 2px;
  color: #fff;
  font-size: 30px;
  transition: all 0.5s cubic-bezier(0, 0.55, 0.45, 1);
}

</style>