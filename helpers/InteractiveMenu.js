const inquirer = require('inquirer');
require('colors');


const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: `${'Selecciona una opcion ↑ ↓'.yellow}`,
        choices: [
            {
                value: '1',
                name: `${'1.'.yellow} ${'Crear Tareas'.white}`
            }, 
            {
                value: '2',
                name: `${'2.'.yellow} ${'Listar Tareas'.white}`
            }, 
            {
                value: '3',
                name: `${'3.'.yellow} ${'Listar Tareas Completadas'.white}`
            }, 
            {
                value: '4',
                name: `${'4.'.yellow} ${'Listar Tareas Pendientes'.white}`
            }, 
            {
                value: '5',
                name: `${'5.'.yellow} ${'Completar Tarea(s)'.white}`
            }, 
            {
                value: '6',
                name: `${'6.'.yellow} ${'Borrar Tarea'.white}`
            }, 
            {
                value: '0',
                name: `${'0.'.yellow} ${'Salir'.white}`
            }
        ]
    }
];

const pauseInput =[
    {
        type: 'input',
        name: 'pauseI',
        message: `\n\nPresiona ${'Enter'.yellow} para continuar: `
    }
]

const inquirerMenu = async() =>{
    console.clear();
    console.log('=================================='.yellow);
    console.log('   Gestor de tareas con Node.JS'.white);
    console.log('==================================\n'.yellow);

    const {opcion} = await inquirer.prompt(preguntas);
    return opcion;
}

const pause = async ()=>{
    
    const inputpause = await inquirer.prompt(pauseInput)
}
const readInput = async(msg) =>{
    const question =[
        {
            type: 'input',
            name: 'desc',
            message: msg,
            validate( value){
                if( value.length === 0){
                    return 'Por favor, ingresa un valor';
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    return desc;
}

const changeStatus = async(tasks = [])=>{

    const choices = tasks.map( (tarea, i) =>{
        if (tarea.completeDate !== null) {
            return{
                value: tarea.id,
                name: `${i+1}. ${tarea.description.white} ${'Completada'.green} ${'→'.white} ${'Pendiente'.red}`
            }
        }else{
            return{
                value: tarea.id,
                name: `${i+1}. ${tarea.description.white} ${'Pendiente'.red} ${'→'.white} ${'Completada'.green}`
            }
        }
    });
    choices.unshift({
        value: 0,
        name: '0. '.white +'Cancelar'.red
    })
    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: `${'Selecciona las opciones a borrar ↑↓'.yellow}`,
            choices
        }
    ]
    const {ids} = await inquirer.prompt(question);
    return ids;
}

const deleteMenu = async(tasks = []) =>{
    const choices = tasks.map( (tarea, i) =>{
        return{
            value: tarea.id,
            name:`${i+1}. ${tarea.description}`.white
        }
    });
    choices.unshift({
        value: 0,
        name: '0. '.white +'Cancelar'.red
    })
    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: `${'Selecciona las opciones a borrar ↑↓'.yellow}`,
            choices
        }
    ]
    const {ids} = await inquirer.prompt(question);
    return ids;
}

const confirmDelete = async(tasks = [], id) =>{
    let desc= [];
    let x =0;
    for (let i = 0; i < id.length; i++) {
        tasks.forEach(task => {
            if (task.id === id[i]) {
                
                desc.push('\n', task.description)
            }
        });
    }
    const question = [
        {
            type: 'list',
            name: 'confirmation',
            message: `¿Estás seguro que deseas borrar ${desc}?`.yellow,
            choices: [
                {
                    value: true,
                    name: 'Si'
                },
                {
                    value: false,
                    name: 'No'
                }
            ]
        }
    ]
    console.clear();
    console.log('=================================='.yellow);
    console.log('   Gestor de tareas con Node.JS'.white);
    console.log('==================================\n'.yellow);
    const {confirmation} = await inquirer.prompt(question);
    return confirmation;
}



module.exports =  {
    inquirerMenu,
    pause,
    readInput,
    changeStatus,
    deleteMenu,
    confirmDelete
}