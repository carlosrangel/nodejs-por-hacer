const completada = {
    alias: 'c',
    default: true,
    desc: 'estado de la tarea'
}

const descripcion = {
    alias: 'd',
    demand: true,
}
const argv = require('yargs')
    .command('crear', 'Crea una tarea por hacer', { descripcion })
    .command('listar', 'Muestra las tareas registradas', { completada: { alias: 'c', desc: 'Estado de la tarea' } })
    .command('actualizar', 'Cambia el estado de una tarea registrada', { descripcion, completada })
    .command('borrar', 'Borra una tarea por hacer', { descripcion })
    .help()
    .argv;

module.exports = {
    argv,
}