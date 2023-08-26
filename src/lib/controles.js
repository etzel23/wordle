import { writable } from 'svelte/store';

export const inicio = writable(false);
export const visitas = writable(0);
export const tecladoColores = writable({});
export const juegos = writable(0);
export const victoria = writable(0);
export const teclaV = writable("");

// export const inicio = writable(0);
// export const errorUbicacion = writable("");