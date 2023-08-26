
/** @type {import('./$types').PageLoad} */

export async function load() {
        const res = await fetch("http://localhost:5173/palabras.json");
        const data = await res.json();
        let palabras = data.palabras.filter(p => p.length === 5); // Filtra palabras de 5 caracteres
        return{
            palabras: palabras,
        }  
}
