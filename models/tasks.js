const Task = require('./task');

const dots = ':::';

class Tasks {
    _list = {};    
    
    get listArr(){
        
        const list = [];
        Object.keys(this._list).forEach(key =>{
            const tarea = this._list[key];
            list.push(tarea);
        });
        return list;
    }

    constructor( descripcion ){
        this._list ={};
    }

    loadTasksArray( tasks = []){
        tasks.forEach(task =>{
            this._list[task.id] = task;
        });
    }

    createTask(desc = 0){
        const task = new Task(desc);
        this._list[task.id] = task;
    }

    listTasks(){
        const list = this.listArr;
        
        for (let i = 1; i <= list.length; i++) {
            let d = list[i-1].description;
            let c = '';
            if (!list[i-1].completeDate) {
                c = 'Pendiente'.red;
            }else{
                c = 'Completa'.green;
            }
            console.log(`\n   ${i}.`.white, `${d}`.yellow, `${dots}`.white,`${c}`);
            
        }
    }

    listCompletedTasks(){
        let completedList = [];
        let i =1;
        const status = 'Completa'.green;
        this.listArr.forEach((task) => {
            const {description, completeDate} = task;
            if (completeDate) {
                console.log(`\n   ${i}.`.white, `${description}`.yellow, `${dots}`.white,`${status}`);
                i++;
            }
        });
    }
    
    listPendingTasks(){
        let completedList = [];
        let i =1;
        const status = 'Pendiente'.red;
        this.listArr.forEach((task) => {
            const {description, completeDate} = task;
            if (!completeDate) {
                console.log(`\n   ${i}.`.white, `${description}`.yellow, `${dots}`.white,`${status}`);
                i++;
            }
        });
    }
}

module.exports = Tasks;