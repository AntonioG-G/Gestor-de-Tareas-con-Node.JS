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
            let date = list[i-1].completeDate;
            let c = '';
            if (!list[i-1].completeDate) {
                c = 'Pendiente'.red;
            }else{
                c = 'Completa'.green;
            }
            if (date!=null) {
                console.log(`\n   ${i}.`.white, `${d}`.yellow, `${dots}`.white,`${c}`, ` ${dots}`.white, `${date}`.yellow);
            }else{
                console.log(`\n   ${i}.`.white, `${d}`.yellow, `${dots}`.white,`${c}`);
            }
            
        }
    }

    listCompletedTasks(){
        let completedList = [];
        let i =1;
        const status = 'Completa'.green;
        this.listArr.forEach((task) => {
            const {description, completeDate} = task;
            if (completeDate) {
                console.log(`\n   ${i}.`.white, `${description}`.yellow, `${dots}`.white,`${status}`, ` ${dots}`.white, `${completeDate}`.yellow);
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

    taskStatus(id){
        id.forEach((id)=>{
            if(this._list[id]){
                
                if (this._list[id].completeDate) {
                    this._list[id].completeDate = null;
                }
                else{
                    const date =  new Date();
                    this._list[id].completeDate = date.toISOString().slice(0,10);
                }
            }
        })
    }

    deleteTask(ids){
        ids.forEach((id)=>{
            if (this._list[id]) {
                delete this._list[id]
            }
        })
    }
}

module.exports = Tasks;