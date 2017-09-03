var StatusENUMS = {
    ACTIVE:'ACTIVE',
    COMPLETE:'COMPLETE',
    DELETE:'DELETE'
}
var todos = {
    1:{title : 'learn javaScript',status:StatusENUMS.ACTIVE},
    2:{title : 'git tutorial',status:StatusENUMS.ACTIVE},
    3:{title : 'interactive git',status:StatusENUMS.ACTIVE}
}
var next_todo_id = 4;
module.exports = {
    StatusENUMS: StatusENUMS,
    Todos: todos,
    next_todo_id:next_todo_id
}