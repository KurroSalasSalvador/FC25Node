export function glosarioPosiciones (baseDeDatos: any): any[] {

    const posiciones: any = []
    baseDeDatos.forEach((dato: any)=> {

        if(!posiciones.includes(dato.position.shortLabel)){
            posiciones.push(dato.position.shortLabel);
        }

    });

    return posiciones;

}