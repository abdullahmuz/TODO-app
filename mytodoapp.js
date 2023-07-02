/* MODEL */
let todos;

const savedTodos=JSON.parse(localStorage.getItem('todos'));
if(Array.isArray(savedTodos)){
    todos=savedTodos;
}
else{
    todos=[{
        title: 'Get groceries',
        dueDate: '2023-06-01',
        id: 'id1'},
        {title: 'Eat dinner',
        dueDate: '2023-05-15',
        id: 'id2'},
        {title: 'Learn JS',
        dueDate: '2023-05-28',
        id: 'id3'}
        ];
}

render();

/* Create todo */
function createTodo(title,dueDate){
    const id=''+new Date().getTime();

    todos.push({
        title: title,
        dueDate: dueDate,
        id: id
    });

    saveTodos();
}

/* Delete todo */
function removeTodo(idToDelete){
    todos=todos.filter(function(todo){
        if(idToDelete===todo.id)
        return false;
        else
        return true;
   });

   saveTodos();
}

/* Save todo */
function saveTodos(){
    localStorage.setItem('todos',JSON.stringify(todos));
}

/* VIEW */
function render(){
    //reset our list
    document.getElementById('todo-list').innerHTML='';

    todos.forEach(function(todo){
        const element = document.createElement('div');
        element.style.backgroundColor='rgb(236, 236, 236)';
        element.style.color='rgb(32, 28, 28)';
        element.style.fontFamily='Roboto';
        element.style.display = 'flex';
        element.style.justifyContent = 'space-between';

        const titleElement = document.createElement('div');
        titleElement.innerText = todo.title;
        titleElement.style.flexGrow = '1';
        element.appendChild(titleElement);

        const dueDateElement = document.createElement('div');
        dueDateElement.innerText = todo.dueDate;
        dueDateElement.style.margin = '0 122px 0 10px';
        element.appendChild(dueDateElement);

        const deleteButton=document.createElement('button');
        deleteButton.className = 'trash-icon';
        deleteButton.onclick=deleteTodo;
        deleteButton.id=todo.id;
        deleteButton.style.marginRight='20px';
        element.appendChild(deleteButton);

        const todoList=document.getElementById('todo-list');
        todoList.appendChild(element);
    });
};

/* CONTROLLER */
function addTodo(){
    const textbox=document.getElementById('todo-title');
    const title=textbox.value;

    const datePicker=document.getElementById('date-picker');
    const dueDate=datePicker.value;

    createTodo(title,dueDate)

    render();
};

function deleteTodo(event){
    const deleteButton=event.target;
    const idToDelete=deleteButton.id;

    removeTodo(idToDelete);

    render();
}