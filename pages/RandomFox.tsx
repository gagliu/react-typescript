/* Si retornamos un numero no habria problema */
// export const RandomFox = () => {
//     // return <img />
//     return 39;
// }

const random = () => Math.floor(Math.random() * 123) + 1;

/* 
    Si tipamos la función solo permitirá retornar un elemento, 
    saldrá un error si retornamos un numeor por ejemplo
*/
/* 
    Se le indica a typescript que dentro de props hay una propiedad que se llama
    imagenUrl y se le indica que esa propiedad es tipo string.
    Definirlo así
 */
/* export function RandomFox( props: {imageUrl: string}): JSX.Element {
    // const image: string = `https://randomfox.ca/images/${random()}.jpg`;
    return <img width={320} height="auto" src={props.imageUrl} className="rounded"/>;
} */

type  Props = { imageUrl: string};

export function RandomFox( {imageUrl}: Props): JSX.Element {
    // const image: string = `https://randomfox.ca/images/${random()}.jpg`;
    return <img width={320} height="auto" src={imageUrl} className="rounded"/>;
}

// export const RandomFox = ({imageUrl}: Props): JSX.Element => {
//     // const image: string = `https://randomfox.ca/images/${random()}.jpg`;
//     return <img width={320} height="auto" src={imageUrl} className="rounded"/>;
// }

/* 
Hay mas formas viejas de definir un componente pero esta que se muestra
es la mejor
*/

/* Esta sintaxis es typescript, pues typescript esta por encima de javascript */