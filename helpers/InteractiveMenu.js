//InteractiveMenu.js provides the connection between the tasks behavior modules,
//with the user interaction, through a dynamic and formatted menu, having a method for each feature.

// We import the 'inquirer' library for creating interactive command line interfaces.
const inquirer = require('inquirer');
// We import the 'colors' library for adding colors to console output.
require('colors');

// We define an array 'preguntas' of questions for the inquirer prompt.
const preguntas = [
    {
        type: 'list', // The type of prompt is 'list', which allows the user to select from a list of choices.
        name: 'opcion', // The name of the answer for this question will be 'opcion'.
        message: `${'Selecciona una opcion ↑ ↓'.yellow}`, // The message to display when prompting the user.
        choices: [ // The choices for the 'list' prompt.
            {
                value: '1', // The value to return if this choice is selected.
                name: `${'1.'.yellow} ${'Crear Tareas'.white}` // The name of the choice to display to the user.
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

// We define an array 'pauseInput' for the inquirer prompt that will pause the program.
const pauseInput =[
    {
        type: 'input', // The type of prompt is 'input', which allows the user to enter text.
        name: 'pauseI', // The name of the answer for this question will be 'pauseI'.
        message: `\n\nPresiona ${'Enter'.yellow} para continuar: ` // The message to display when prompting the user.
    }
]

// We define an asynchronous function 'inquirerMenu' to display the menu and get the user's choice.
const inquirerMenu = async() =>{
    console.clear(); // We clear the console.
    console.log('=================================='.yellow); // We print a yellow line to the console.
    console.log('   Gestor de tareas con Node.JS'.white); // We print the title of the program to the console.
    console.log('==================================\n'.yellow); // We print another yellow line to the console.

    const {opcion} = await inquirer.prompt(preguntas); // We use the inquirer prompt to get the user's choice.
    return opcion; // We return the user's choice.
}

// We define an asynchronous function 'pause' to pause the program.
const pause = async ()=>{
    
    const inputpause = await inquirer.prompt(pauseInput) // We use the inquirer prompt to pause the program.
}

// We define an asynchronous function 'readInput' to read input from the user.
const readInput = async(msg) =>{
    const question =[
        {
            type: 'input', // The type of prompt is 'input', which allows the user to enter text.
            name: 'desc', // The name of the answer for this question will be 'desc'.
            message: msg, // The message to display when prompting the user.
            validate( value){ // The validate function to ensure the user enters a value.
                if( value.length === 0){
                    return 'Por favor, ingresa un valor';
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question); // We use the inquirer prompt to get the user's input.
    return desc; // We return the user's input.
}

// We define an asynchronous function 'changeStatus' to change the status of tasks.
const changeStatus = async(tasks = [])=>{

    const choices = tasks.map( (task, i) =>{
        if (task.completeDate !== null) {
            return{
                value: task.id, // The value to return if this choice is selected.
                name: `${i+1}. ${task.description.white} ${'Completada'.green} ${'→'.white} ${'Pendiente'.red}` // The name of the choice to display to the user.
            }
        }else{
            return{
                value: task.id,
                name: `${i+1}. ${task.description.white} ${'Pendiente'.red} ${'→'.white} ${'Completada'.green}`
            }
        }
    });
    //We add the Cancel as the first option.
    choices.unshift({
        value: 0,
        name: '0. '.white +'Cancelar'.red
    })
    const question = [
        {
            type: 'checkbox', // The type of prompt is 'checkbox', which allows the user to select multiple choices.
            name: 'ids', // The name of the answer for this question will be 'ids'.
            message: `${'Selecciona las opciones a borrar ↑↓'.yellow}`, // The message to display when prompting the user.
            choices // The choices for the 'checkbox' prompt.
        }
    ]
    const {ids} = await inquirer.prompt(question); // We use the inquirer prompt to get the user's choices.
    return ids; // We return the user's choices.
}

// We define an asynchronous function 'deleteMenu' to delete tasks.
const deleteMenu = async(tasks = []) =>{
    const choices = tasks.map( (task, i) =>{
        return{
            value: task.id, // The value to return if this choice is selected.
            name:`${i+1}. ${task.description}`.white // The name of the choice to display to the user.
        }
    });
    choices.unshift({
        value: 0,
        name: '0. '.white +'Cancelar'.red // We add a 'Cancel' option to the choices.
    })
    const question = [
        {
            type: 'checkbox', // The type of prompt is 'checkbox', which allows the user to select multiple choices.
            name: 'ids', // The name of the answer for this question will be 'ids'.
            message: `${'Selecciona las opciones a borrar ↑↓'.yellow}`, // The message to display when prompting the user.
            choices // The choices for the 'checkbox' prompt.
        }
    ]
    const {ids} = await inquirer.prompt(question); // We use the inquirer prompt to get the user's choices.
    return ids; // We return the user's choices.
}

// We define an asynchronous function 'confirmDelete' to confirm deletion of tasks.
const confirmDelete = async(tasks = [], id) =>{
    let desc= [];
    for (let i = 0; i < id.length; i++) {
        tasks.forEach(task => {
            if (task.id === id[i]) {
                desc.push('\n', task.description) // We add the description of the task to be deleted to 'desc'.
            }
        });
    }
    const question = [
        {
            type: 'list', // The type of prompt is 'list', which allows the user to select from a list of choices.
            name: 'confirmation', // The name of the answer for this question will be 'confirmation'.
            message: `¿Estás seguro que deseas borrar ${desc}?`.yellow, // The message to display when prompting the user.
            choices: [ // The choices for the 'list' prompt.
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
    console.clear(); // We clear the console, and put the apps header on top.
    console.log('=================================='.yellow);
    console.log('   Gestor de tareas con Node.JS'.white);
    console.log('==================================\n'.yellow);
    const {confirmation} = await inquirer.prompt(question); 
    return confirmation; // We return the user's confirmation.
}

// We export the functions so they can be used in other modules.
module.exports =  {
    inquirerMenu,
    pause,
    readInput,
    changeStatus,
    deleteMenu,
    confirmDelete
}
