
/** @type {import('./$types').PageLoad} */

export async function load(params) {
    console.log(params.url.href);
    // Carga de datos para la página
        const res = await fetch(`${params.url.href}palabras.json`);
        const data = await res.json();
        let palabras = data.palabras.filter(p => p.length === 5); // Filtra palabras de 5 caracteres
        return{
            palabras: palabras,
        }  
}
