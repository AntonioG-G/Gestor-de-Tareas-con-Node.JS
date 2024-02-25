let colors = require('colors');
const { inquirerMenu, pause, readInput, deleteMenu, confirmDelete } = require('./helpers/InteractiveMenu');
const Tasks = require('./models/tasks');
const { saveDB, readDB } = require('./helpers/saveFile');

console.clear();

const main = async() =>{
    
    let opt = '';
    
    const tasks = new Tasks();

    const taskDB = readDB();

    if(taskDB){
        tasks.loadTasksArray(taskDB);
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await readInput('Descripción: ');
                tasks.createTask(desc);
                break;
            case '2':
                tasks.listTasks();                
                break;
            case '3':
                tasks.listCompletedTasks();
                break;
            case '4':
                tasks.listPendingTasks();
                break;
            case '6':
                const id = await deleteMenu(tasks.listArr);
                if (id !==0) {
                    
                    const confirm = await confirmDelete(tasks.listArr, id);
                    confirm ? tasks.deleteTask(id) : console.log('Eliminación cancelada');
                }
                break;
        }

        saveDB(tasks.listArr);
        await pause();
    } while (opt !== '0');
    
}

main();