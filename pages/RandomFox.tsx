import { Console } from "console";
import {useRef, useEffect, useState} from "react";
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

type  Props = { imageUrl: string };

export const RandomFox = ({imageUrl}: Props): JSX.Element => {
    /* Debe indicarsele a useRef que elemento vamos a trabajar en el DOM */
    /* Basta con iniciar useRef en null e indicando el tipo de elemento para evitar errores */
    const node = useRef<HTMLImageElement>(null);
    /* Mostrar un cuadro gris mientras la imagen no haya cargado */
    const [src, setSrc] = useState("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=");
    
    useEffect(() => {
       //Nuevo observador
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                //onIntersection -> console.log
                if(entry.isIntersecting){
                    console.log(' ---- Hey you! ---- ');
                    setSrc(imageUrl)
                }
            })
        });

        //Observar nodo
        if (node.current) { /* si node.current existe */
            observer.observe(node.current);
        }

        //desconectar /* siempre que usamos un efecto nos desconectamos */
        return () => {
            observer.disconnect()
        }
    },[imageUrl]);
    
    //Desconectar del componente cuando sea retirado por react o halla un rerender


    // const image: string = `https://randomfox.ca/images/${random()}.jpg`;
    // return <img ref={node} width={320} height="auto" src={imageUrl} className="rounded"/>;
    /* Hacer que se ponga una imagen predeterminada, con el estado src */
    return <img ref={node} width={320} height="auto" src={src} className="rounded"/>;
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