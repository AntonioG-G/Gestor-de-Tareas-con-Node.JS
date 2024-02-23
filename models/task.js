const { v4: uuidv4 } = require('uuid');

class Task {
    id = '';
    description = '';
    completeDate = null;

    constructor( description){
        this.id = uuidv4();
        this.description = description;
        this.completeDate = null;
    }
}

module.exports = Task;