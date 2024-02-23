require('colors');

const mostrarMenu = () =>{

    return new Promise(resolve =>{

        console.clear();
        console.log('================================='.yellow);
        console.log('   Selecciona una opción'.white);
        console.log('=================================\n'.yellow);
    
        console.log(`${'1.'.yellow} ${'Crear Tareas'.white}`);
        console.log(`${'2.'.yellow} ${'Listar Tareas'.white}`);
        console.log(`${'3.'.yellow} ${'Listar Tareas Completadas'.white}`);
        console.log(`${'4.'.yellow} ${'Listar Tareas Pendientes'.white}`);
        console.log(`${'5.'.yellow} ${'Completar Tarea(s)'.white}`);
        console.log(`${'6.'.yellow} ${'Borrar Tarea'.white}`);
        console.log(`${'0.'.yellow} ${'Salir\n '.white}`);
    
        const readline = require('node:readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
    
        readline.question('Seleccione una opción: ', (opt) =>{
            readline.close();
            resolve(opt);
        });
    });
}

const pause = () =>{
    return new Promise(resolve => {

        const readline = require('node:readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
    
        readline.question(`\nPresiona ${'Enter'.yellow} para continuar: `, (opt) =>{
            readline.close();
            resolve();
        });
    })
}

module.exports ={
    mostrarMenu,
    pause
}