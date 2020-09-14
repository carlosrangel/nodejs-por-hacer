const fs = require('fs');
const colors = require('colors');

let listadoPorHacer = [];

let guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('./db/data.json', data, (err) => {
        if (err) throw err;
    });
}

let cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

}

let crear = (descripcion) => {
    cargarDB();
    let tarea = {
        descripcion,
        completada: false,
    }
    listadoPorHacer.push(tarea);

    guardarDB();
    return tarea;
}

let listar = () => {
    cargarDB();
    console.log("=============== Por hacer =================".green);
    for (let tarea of listadoPorHacer) {
        console.log(`Descripción: ${tarea.descripcion}`);
        console.log(`Completada: ${ tarea.completada }`);
        console.log("===========================================".green);
    }

}

let listarCompletada = (completada) => {
    console.log(completada);

    cargarDB();
    console.log("=============== Por hacer =================".green);
    nuevoArreglo = listadoPorHacer.filter(resp => resp.completada === completada);
    if (nuevoArreglo.length > 0) {
        for (let tarea of nuevoArreglo) {
            console.log(`Descripción: ${tarea.descripcion}`);
            console.log("===========================================".green);
        }
    } else
        console.log("No hay tareas para mostrar".blue);

}

let actualizar = (descripcion, completada) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(resp => resp.descripcion === descripcion);
    // funcion findIndex retorna el indice cunado la condicion se cumpla, si no lo encuentra retorna -1
    if (index >= 0) {
        listadoPorHacer[index].completada = completada;
        guardarDB();
        return true;
    } else
        return false
}

let borrar = (descripcion) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(index => index.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer.splice(index, 1);
        // Elimina 1 elemento del array desde el index indicado
        //Tambien se podría hacer con el metodo filter que devuleve un nuevo arreglo segun la condicion pasada en el callback es decir, en este caso la conficion del nuevo arreglo seria todos los elementos donde la descripcion actual no se igual a la descripcion pasada como parametro
        guardarDB();
        return true;
    } else
        return false;
}



module.exports = {
    crear,
    listar,
    listarCompletada,
    actualizar,
    borrar
}