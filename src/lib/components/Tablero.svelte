<script>
    import {inicio, visitas, tecladoColores, victoria, juegos, teclaV} from "$lib/controles.js";
    import { page } from '$app/stores';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function enviarPerdiste() {
      dispatch('perdiste');
    }
    
    let ganaste = false;
    let filasValidadas = [false, false, false, false, false];
    let palabra = [];

    let fichas = [
        " "," "," "," "," ",
        " "," "," "," "," ",
        " "," "," "," "," ",
        " "," "," "," "," ",
        " "," "," "," "," ",
    ]
    let resultado = [];
    $: if (resultado){
    }

    $: if($visitas == 1){
      palabra = $page.data.palabras[Math.floor(Math.random() * $page.data.palabras.length)];
      palabra = palabra.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      palabra = palabra.toLowerCase();
      console.log("Palabra para poder ganar:", palabra);
      // Convertir la cadena a un arreglo de caracteres
      palabra = palabra.split('');
      
    }

    $: if(teclaV){
      onKeyDown({key: $teclaV});
    }

    let index = 0; // Índice para saber en qué posición insertar la letra

    function onKeyDown(event) {
      let key = event.key;

      if (key.length === 1 && /^[a-zA-ZñÑña]+$/.test(key) && index < fichas.length) {
        fichas[index] = key.toLowerCase();
        index++;
        fichas = fichas; // Esto es para que Svelte sepa que el arreglo ha cambiado
      }

      if (key === "Backspace" && index > 0) {
        let filaActual = Math.floor((index-1) / 5);
        if (!filasValidadas[filaActual]) {
          index--;
          fichas[index] = " ";
          fichas = fichas;
        }
      }
    }
  
  //Logica para comparar la palabra con la fichas por fila
  $: if(fichas[4] != " " && fichas[5] == " " && filasValidadas[0] == false){
    const primeraFila = fichas.slice(0, 5);
    const resultado = compararFila(primeraFila);
    filasValidadas[0] = true;
  }
  $: if(fichas[9] != " " && fichas[10] == " " && filasValidadas[1] == false){
    const segundaFila = fichas.slice(5, 10);
    const resultado = compararFila(segundaFila);
    filasValidadas[1] = true;
  }
  $: if(fichas[14] != " " && fichas[15] == " " && filasValidadas[2] == false){
    const terceraFila = fichas.slice(10, 15);
    const resultado = compararFila(terceraFila);
    filasValidadas[2] = true;
  }
  $: if(fichas[19] != " " && fichas[20] == " "  && filasValidadas[3] == false){
    const cuartaFila = fichas.slice(15, 20);
    const resultado = compararFila(cuartaFila);
    filasValidadas[3] = true;
  }
  $: if(fichas[24] != " "  && filasValidadas[4] == false){
    const quintaFila = fichas.slice(20, 25);
    const resultado = compararFila(quintaFila);
    filasValidadas[4] = true;
    
  }
  $: if(filasValidadas[4] == true && ganaste == false){
      enviarPerdiste();
      juegos.set($juegos + 1);
      inicio.set(false);

  }

  function compararFila(fila) {
    let resultadoTemporal = {};
    for (let i = 0; i < palabra.length; i++) {
      const letra = fila[i];
      if (fila[i] === palabra[i]) {
        resultado.push("verde");
        resultadoTemporal[letra] = "verde";
      } else if (palabra.includes(fila[i])) {
        resultado.push("amarillo");
        resultadoTemporal[letra] = "amarillo";
      } else {
        resultado.push("gris");
        resultadoTemporal[letra] = "gris";
      }
    }
    tecladoColores.update(prevState => {
      return {...prevState, ...resultadoTemporal};
    });
  
    ganaste = JSON.stringify(fila) === JSON.stringify(palabra);

    resultado = resultado;

    return resultado;
    
  }

  $: if (ganaste == true) {
    victoria.set($victoria + 1);
    juegos.set($juegos + 1);
    ganaste = false;
    
    limpiarTablero();
   
  }

  $: if($juegos){
    limpiarTablero();
  }

  function limpiarTablero(){
    setTimeout(() => {
      index = 0
      fichas = [
            " "," "," "," "," ",
            " "," "," "," "," ",
            " "," "," "," "," ",
            " "," "," "," "," ",
            " "," "," "," "," ",
        ]
        resultado = [];
        tecladoColores.set({});
        filasValidadas = [false, false, false, false, false];
    }, 1000);
    
  }

    
  
        
</script>
<svelte:window on:keydown|preventDefault={onKeyDown} />
<div class="flex justify-center mt-20">
    <div class="grid grid-cols-5 gap-4 max-w-[500px] w-full">
        {#each fichas as ficha,i}
            <div class="text-center bg-gris-100 dark:bg-azul-300 dark:text-blanco aspect-square text-4xl font-extrabold uppercase flex justify-center items-center rounded-md" class:bg-verde={resultado[i] == "verde"} class:dark:bg-verde={resultado[i] == "verde"} class:dark:bg-gris-300={resultado[i] == "gris"} class:dark:bg-darkam={resultado[i] == "amarillo"} class:bg-ligham={resultado[i] == "amarillo"} class:bg-gris-300={resultado[i] == "gris"}>{ficha}</div>
          {/each}
    </div>
</div>
