
const inputElement = document.querySelector('.new-task-input')
const addButton = document.querySelector('.new-task-button');
const taskContainer = document.querySelector('.task-container')


//VALIDAÇÃO DO INPUT, ENTRADA DOS DADOS
const validateInput = () =>{
    return inputElement.value.trim().length >  0
}

const handleAddTask = ()=>{
    const inputIsValid = validateInput(); 

    if(!inputIsValid){
        inputElement.classList.add('error')
    }

    // CRIAÇÃO E SAÍDA DE DADOS

    const taskItemContainer =  document.createElement('div')
    taskItemContainer.classList.add('task-item')

    const taskContent = document.createElement('p');
    taskContent.innerText = inputElement.value;

    taskContent.addEventListener('click',() => handleClick(taskContent))

    const deleteItem = document.createElement('i')
    deleteItem.classList.add('far')
    deleteItem.classList.add('fa-trash-alt');
    deleteItem.classList.add('delete-task-button')

    deleteItem.addEventListener('click', ()=> handleDeleteClick(taskItemContainer, taskContent))

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);

    taskContainer.appendChild(taskItemContainer);

    inputElement.value = "";

    updateLocalStorage()


};

const handleClick = (taskContent) =>{

    const tasks = taskContainer.childNodes;

    for (const task of tasks){
        if(task.firstChild.isSameNode(taskContent)){
            task.firstChild.classList.toggle('completed');
        }
    }

    updateLocalStorage()
};

const handleDeleteClick = (taskItemContainer, taskContent) =>{
    const tasks = taskContainer.childNodes;

    for(const task of tasks){
        if(task.firstChild.isSameNode(taskContent)){
            taskItemContainer.remove();
        }
    }
    updateLocalStorage()
};

const handleInputChange = () => {
    const inputIsValid = validateInput();

    if(inputIsValid){
        return inputElement.classList.remove('error')
    }
};

// LOCAL STORAGE
const updateLocalStorage = ()=> {
   const  tasks = taskContainer.childNodes;
   const localStorageTask = [...tasks].map(task =>{
       const content = task.firstChild;
       const isCompleted = content.classList.contains('completed')

       return{
           description:content.innerText,
           isCompleted: isCompleted
       }
   });
   localStorage.setItem('tasks', JSON.stringify(localStorageTask))

}

const refreshLocalStorage = () =>{
    const taskFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));

    if(!taskFromLocalStorage) return;
    
    for (const task of taskFromLocalStorage){
        const taskItemContainer =  document.createElement('div')
        taskItemContainer.classList.add('task-item')
    
        const taskContent = document.createElement('p');
        taskContent.innerText = task.description;
        if(task.isCompleted){
            taskContent.classList.add('completed');
        }
    
        taskContent.addEventListener('click',() => handleClick(taskContent))
    
        const deleteItem = document.createElement('i')
        deleteItem.classList.add('far')
        deleteItem.classList.add('fa-trash-alt');
        deleteItem.classList.add('delete-task-button')
    
        deleteItem.addEventListener('click', ()=> handleDeleteClick(taskItemContainer, taskContent))
    
        taskItemContainer.appendChild(taskContent);
        taskItemContainer.appendChild(deleteItem);
    
        taskContainer.appendChild(taskItemContainer);
    }  
};
refreshLocalStorage();


// EVENTOS
addButton.addEventListener('click', ()=> handleAddTask());
inputElement.addEventListener('change', () => handleInputChange());
