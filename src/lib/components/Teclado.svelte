<script>
    import {tecladoColores, teclaV} from "$lib/controles.js";

    let colores;
    $: colores = $tecladoColores;

    let teclas = [
        "q","w","e","r","t","y","u","i","o","p",
        "a","s","d","f","g","h","j","k","l","ñ",
        "enter","z","x","c","v","b","n","m","borrar",
    ]
    function teclaVirtual(t){
        if (t == "borrar"){
            teclaV.set("Backspace");
        }else{
            teclaV.set(t);
        }
    }
</script>

<div class="flex justify-center mt-20 bg-gris-100 dark:bg-azul-300 py-10 rounded-md">
    <div class="flex flex-wrap justify-center w-full">
        {#each teclas as tetcla, i}
            {#if i <= 9}
                <div class="text-center w-[45px] h-[51px] bg-gris-200  text-xl font-extrabold uppercase flex justify-center items-center rounded-md mx-1 mb-2 cursor-pointer dark:text-blanco" class:ml-10={i == 0} class:mr-10={i == 9} class:bg-verde={colores[`${tetcla}`] == "verde"} class:dark:bg-verde={colores[`${tetcla}`] == "verde"}  class:dark:bg-darkam={colores[`${tetcla}`] == "amarillo"} class:bg-ligham={colores[`${tetcla}`] == "amarillo"} class:bg-gris-300={colores[`${tetcla}`] == "gris"} class:dark:bg-gris-300={colores[`${tetcla}`] == "gris"} on:click={()=> {teclaVirtual(tetcla)}}>{tetcla}</div> 
            {:else if i > 9 && i <= 19}
                <div class="text-center w-[45px] h-[51px] bg-gris-200  text-xl font-extrabold uppercase flex justify-center items-center rounded-md mx-1 mb-2 cursor-pointer dark:text-blanco" class:ml-16={i == 10} class:bg-verde={colores[`${tetcla}`] == "verde"} class:dark:bg-verde={colores[`${tetcla}`] == "verde"} class:dark:bg-darkam={colores[`${tetcla}`] == "amarillo"} class:bg-ligham={colores[`${tetcla}`] == "amarillo"} class:bg-gris-300={colores[`${tetcla}`] == "gris"} class:dark:bg-gris-300={colores[`${tetcla}`] == "gris"} on:click={()=> {teclaVirtual(tetcla)}}>{tetcla}</div>
            {:else if i >19}
                <div class:w-[45px]={i != 20 && i !=28} class:px-5 ={i == 20 || i ==28} class="text-center h-[51px] bg-gris-200  text-xl font-extrabold uppercase flex justify-center items-center rounded-md mx-1 cursor-pointer dark:text-blanco" class:ml-10={i == 10} class:bg-verde={colores[`${tetcla}`] == "verde"} class:dark:bg-verde={colores[`${tetcla}`] == "verde"}  class:dark:bg-darkam={colores[`${tetcla}`] == "amarillo"} class:bg-ligham={colores[`${tetcla}`] == "amarillo"} class:bg-gris-300={colores[`${tetcla}`] == "gris"} class:dark:bg-gris-300={colores[`${tetcla}`] == "gris"} on:click={()=> {teclaVirtual(tetcla)}}>{tetcla}</div>
            {/if}
            
        {/each}
    </div>
</div>