// Task.JS stores the construction of the task, along with its main attributes using a constructor

// We import the 'v4' function from the 'uuid' library and rename it to 'uuidv4'.
// This function generates a unique identifier (UUID) version 4.
const { v4: uuidv4 } = require('uuid');

// We define a 'Task' class to represent a task.
class Task {
    // Each task has a unique 'id', a 'description', and a 'completeDate'.
    id = '';
    description = '';
    completeDate = null;

    // The constructor of the 'Task' class takes a 'description' parameter.
    constructor(description){
        // We generate a unique 'id' for the task using 'uuidv4'.
        this.id = uuidv4();
        // We assign the provided 'description' to the task's 'description' property.
        this.description = description;
        // We initialize 'completeDate' to 'null' as the task is not yet complete.
        this.completeDate = null;
    }
}

// We export the 'Task' class so it can be used in other modules.
module.exports = Task;