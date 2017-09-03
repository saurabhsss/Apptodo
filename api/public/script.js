//console.log("script file is loading");
const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const TODOS_LIST_ID = 'todos_list_div';
const COMP_LIST_ID = 'Comp_list_div';
const  DEL_LIST_ID ='del_list_div';
const NEW_TODO_INPUT_ID = "new_input_id";
window.onload= getTodosAjax();
function addTodoElementsDel(id,todos_data_json) {
    var todos = JSON.parse(todos_data_json);
   var parent = document.getElementById(id);
    parent.innerHTML ="";
    if(parent){
        Object.keys(todos).forEach(
            function (key) {
                if(todos[key].status=="DELETE") {
                    var todo_element = createTodoElement(key, todos[key]);
                    parent.appendChild(todo_element);
                    console.log(parent);
                    addTodoElements(TODOS_LIST_ID,todos_data_json);
                    addTodoElementsComp(COMP_LIST_ID,todos_data_json);

                }
            }
        );
    }

}
function addTodoElementsComp(id,todos_data_json) {
    var todos = JSON.parse(todos_data_json);
    var parent = document.getElementById(id);
    parent.innerHTML ="";
    if(parent){
        Object.keys(todos).forEach(
            function (key) {
                if(todos[key].status=="COMPLETE") {
                    var todo_element = createTodoElement(key, todos[key]);
                    parent.appendChild(todo_element);

                    addTodoElements(TODOS_LIST_ID,todos_data_json);

                }
            }
        );
    }
}
function  addTodoElements(id,todos_data_json) {
    var todos = JSON.parse(todos_data_json);
    var parent = document.getElementById(id);
    parent.innerHTML = "";
   // parent.innerText = todos_data_json;
    if(parent){

        Object.keys(todos).forEach(
            function (key) {
                if(todos[key].status=="ACTIVE") {
                    var todo_element = createTodoElement(key, todos[key]);
                    parent.appendChild(todo_element);

                }
            }
        );
    }
}
function createTodoElement(id,todo_object) {
    var todo_element = document.createElement("div");
    todo_element.innerText = todo_object.title;
    todo_element.setAttribute("data-id",id);
    todo_element.setAttribute("class","todoStatus"+todo_object.status);
    if(todo_object.status == 'ACTIVE'){
        var complete_button = document.createElement("input");
        complete_button.setAttribute('type','checkbox');
        complete_button.setAttribute("onclick",'completeTodoAjax('+id+')');
        complete_button.setAttribute("class", "breathHorizontal");
        todo_element.appendChild(complete_button);
    }
    if(todo_object.status!= 'DELETE'){
        var delete_button = document.createElement("IMG");
        delete_button.setAttribute('src','/images/image.jpg');
        delete_button.setAttribute('height','13');
        del.setAttribute('class','breathHorizontal');
        todo_element.appendChild(delete_button);
        delete_button.setAttribute("onclick",'deleteTodoAjax('+id+')');
    }
    if(todo_object.status =='COMPLETE'){
        var complete = document.createElement('input');
        todo_element.appendChild(complete);
        complete.setAttribute("type", "checkbox");
        complete.setAttribute('checked','checked');
        complete.setAttribute('class','completebutton');
        complete.setAttribute('onclick','activeAJAX('+id+')');
    }
    return todo_element;
}
function activeAJAX(id){
    var xhr=new XMLHttpRequest();
    xhr.open("PUT",'/api/todos/'+id,true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    var data="todo_status=ACTIVE";
    xhr.onreadystatechange=function(){
        if(xhr.readyState == RESPONSE_DONE)
        {
            if(xhr.status ==STATUS_OK)
            {
                addTodoElements(TODOS_LIST_ID,xhr.responseText);
                addTodoElementsComp(COMP_LIST_ID,xhr.responseText);
            }
            else
            {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}
function  getTodosAjax() {

   var xhr = new XMLHttpRequest();
   xhr.open("GET","/api/todos",true);
   xhr.onreadystatechange = function () {
       if(xhr.readyState == RESPONSE_DONE)
       {
           if(xhr.status == STATUS_OK){
               console.log(xhr.responseText);
               addTodoElements(TODOS_LIST_ID,xhr.responseText);
               addTodoElementsComp(COMP_LIST_ID,xhr.responseText);
               addTodoElementsDel(DEL_LIST_ID,xhr.responseText);
           }
       }
   }

   xhr.send(data = null);
}
function addTodoAjax() {
    var title = document.getElementById(NEW_TODO_INPUT_ID).value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST","/api/todos",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var data = "todo_title="+encodeURI(title);
    xhr.onreadystatechange = function () {
        if(xhr.readyState == RESPONSE_DONE)
        {
            if(xhr.status == STATUS_OK){
                //xhr.responseText
                //refresh the list
                addTodoElements(TODOS_LIST_ID,xhr.responseText);
            }
            else{
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}
function  completeTodoAjax(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT","/api/todos/"+id,true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
   var data = "todo_status=COMPLETE";
    xhr.onreadystatechange = function(){

        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK)
            {
                addTodoElementsComp(COMP_LIST_ID, xhr.responseText);
            }
            else
            {
                console.log(xhr.responseText);
            }
        }
    }
xhr.send(data);
}
function deleteTodoAjax(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE",'/api/todos/'+id,true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    var data = "todo_status=DELETE";
    xhr.onreadystatechange = function(){

        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                addTodoElementsDel(DEL_LIST_ID, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}



function gethiddencomp()
{
    var parent=document.getElementById(COMP_LIST_ID);

    if(parent.style.display==='none')
    {
        parent.style.display='block';
    }
    else
    {
        parent.style.display='none';
    }
}
function gethiddendelete()
{
    var parent=document.getElementById(DEL_LIST_ID);

    if(parent.style.display==='none')
    {
        parent.style.display='block';
    }
    else
    {
        parent.style.display='none';
    }
}