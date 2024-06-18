import { Console } from "console";
import {useRef, useEffect, useState} from "react";
import {ImgHTMLAttributes} from "react"; /* Esto permite que la imagen herede todos los tipos que funcionan para esta */

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

/* Estos seran solo para LazyImage, para el componente */
type  LazyImageProps = { 
    src: string;
    // Reto
    onLazyLoad?: (img: HTMLImageElement) => void; //Propiedad opcional, es una imagen
};

type ImageNative = ImgHTMLAttributes<HTMLImageElement>;

/* Tipos para todo el componente */
type Props = LazyImageProps & ImageNative;
/* 
    ...imgProps significa: Todo lo demás (o sea los demas props que vienen), 
    guardalos en imgProps, para no tener que declarar uno por uno
 */
export const LazyImage = ({
        src, 
        onLazyLoad, 
        ...imgProps
    }: Props): JSX.Element => {
    /* Debe indicarsele a useRef que elemento vamos a trabajar en el DOM */
    /* Basta con iniciar useRef en null e indicando el tipo de elemento para evitar errores */
    const node = useRef<HTMLImageElement>(null);
    const [isLazyLoaded, setIsLazyLoaded] = useState(false);
    /* Mostrar un cuadro gris mientras la imagen no haya cargado */
    const [currentSrc, setCurrentSrc] = useState("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=");
    
    useEffect(() => {
        if (isLazyLoaded) {
            return;
        }
       //Nuevo observador
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                //onIntersection -> console.log
                if(entry.isIntersecting){
                    console.log(' ---- Hey you! ---- ');
                    setCurrentSrc(src) /* Actualizar el estado con el src que llega desde el componente padre */

                    observer.disconnect();
                    setIsLazyLoaded(true);

                    if (typeof onLazyLoad === "function") {
                        onLazyLoad(node.current);
                    }
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
    },[currentSrc, onLazyLoad, isLazyLoaded]);
    
    //Desconectar del componente cuando sea retirado por react o halla un rerender


    // const image: string = `https://randomfox.ca/images/${random()}.jpg`;
    // return <img ref={node} width={320} height="auto" src={imageUrl} className="rounded"/>;
    /* Hacer que se ponga una imagen predeterminada, con el estado src */
    /* Al inspeccionar */
    /* Si se va a la definición para saber que tipo es admitido en el img element */
    return ( 
        <img 
            ref={node}
            src={src} /* El componente LazyImage solo debe tener ref, src y las propiedades de tipado */
            {...imgProps} /* Con esto se indica que se incluyen los props adecauados para la imagen. 
                En imgProps estan todos los tipos */
             />
        );
        
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