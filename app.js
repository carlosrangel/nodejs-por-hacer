const argv = require('./config/yargs').argv
const porHacer = require('./por-hacer/por-hacer');

let comando = argv._[0];

console.log(argv);
switch (comando) {
    case 'listar':
        if (argv.completada == undefined)
            porHacer.listar();
        else
            porHacer.listarCompletada(argv.completada == 'true'); //Lo que estad entro de argv es string asi lo paso a boolean
        break
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        if (tarea) console.log("Tarea creada");
        break;
    case 'actualizar':
        console.log(argv);
        porHacer.actualizar(argv.descripcion, argv.completada);
        break;
    case 'borrar':
        porHacer.borrar(argv.descripcion);
        break;
    default:
        console.log('No se reconoe el comando');

}