// We import the 'colors' library for adding colors to console output.
let colors = require('colors');
// We import several functions from the 'InteractiveMenu' module.
const { inquirerMenu, pause, readInput, changeStatus, deleteMenu, confirmDelete } = require('./helpers/InteractiveMenu');
// We import the 'Tasks' class from the 'tasks' module.
const Tasks = require('./models/tasks');
// We import the 'saveDB' and 'readDB' functions from the 'saveFile' module.
const { saveDB, readDB } = require('./helpers/saveFile');

// We clear the console.
console.clear();

// We define an asynchronous function 'main' as the main function of the app.
const main = async() =>{
    
    // We initialize 'opt' as an empty string.
    let opt = '';
    
    // We create a new instance of 'Tasks'.
    const tasks = new Tasks();

    // We read the tasks from the database.
    const taskDB = readDB();

    // If there are tasks in the database, we load them into 'tasks'.
    if(taskDB){
        tasks.loadTasksArray(taskDB);
    }

    // We enter a loop that continues until the user chooses to exit.
    do {
        // We display the menu and get the user's choice.
        opt = await inquirerMenu();

        // We perform different actions based on the user's choice.
        switch (opt) {
            case '1':
                // The user chose to create a task.
                const desc = await readInput('Descripción: ');
                tasks.createTask(desc);
                break;
            case '2':
                // The user chose to list the tasks.
                tasks.listTasks();                
                break;
            case '3':
                // The user chose to list the completed tasks.
                tasks.listCompletedTasks();
                break;
            case '4':
                // The user chose to list the pending tasks.
                tasks.listPendingTasks();
                break;
            case '5':
                // The user chose to change the status of tasks.
                const id = await changeStatus(tasks.listArr);
                if (id[0] !==0) {
                    tasks.taskStatus(id);
                }
                break;
            case '6':
                // The user chose to delete tasks.
                const ids = await deleteMenu(tasks.listArr);
                if (ids[0] !==0) {
                    const confirm = await confirmDelete(tasks.listArr, ids);
                    confirm ? tasks.deleteTask(ids) : console.log('Eliminación cancelada');
                }
                break;
        }

        // We save the tasks to the database.
        saveDB(tasks.listArr);
        // We pause the program.
        await pause();
    } while (opt !== '0'); // The loop continues until the user chooses to exit.
    
}

// We call the main function to start the app.
main();
