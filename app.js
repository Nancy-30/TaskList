//define UI vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");


// function that load all event listeners
loadEventListeners();

function loadEventListeners(){
    //dom to load event
    document.addEventListener('DOMContentLoaded',getTasks);
    //add task event
    form.addEventListener('submit' , addTask);

    // remove task event
    taskList.addEventListener('click', removeTask);

    // clear task event
    clearBtn.addEventListener('click' , clearTask);

    // filter task event
    filter.addEventListener('keyup' , filterTask);

    
}
//========== get task from LS ====================
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
       
            //create li element
            const li = document.createElement('li');
            li.className = 'collection-item';
            //create text node and append li
            li.appendChild(document.createTextNode(task));
            // Create new link elemente
        
            const link = document.createElement('a');
            link.className = 'delete-item secondary-content';
            link.innerHTML = '<i class = "fa fa-remove"></i>';
            li.appendChild(link);
        
            // append li to ul
            taskList.appendChild(li);
        

    });
}

//================ Add task func ==============================
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }
    
    if(taskInput.value!==''){
    //create li element
    const li = document.createElement('li');
    li.className = 'collection-item';
    //create text node and append li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link elemente

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);
    
    //store in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    //clear input
    taskInput.value = '';
    }

    e.preventDefault();
}

// store task
function storeTaskInLocalStorage(NewTask){
    let tasks;
    if(localStorage.getItem('NewTask')===null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('NewTask'));
    }

    tasks.push(NewTask);
    localStorage.setItem('tasks' , JSON.stringify(tasks));
}

// ================== remove task func ===========================
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
        e.target.parentElement.parentElement.remove();

        // remove from local storage
        // console.log("Error ni h yaha");
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
    e.preventDefault();
}

// remove from local storage

function removeTaskFromLocalStorage(NewTask){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index){
        if(NewTask.textContent === task ){
            tasks.splice(index , 1);
        }
    });

    localStorage.setItem('tasks' , JSON.stringify(tasks))
}


// =====clear all tasks ====================
function clearTask(){
    // taskList.innerHTML = '';    

    // faster
    while(taskList.firstChild){
        taskList.firstChild.remove();
    }

    //clear task func

    clearTaskFromStorage();
    function clearTaskFromStorage(){
        localStorage.clear();
    }
}

// ============= filter task ========================
function filterTask(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text)!=-1){
                task.style.display = 'block';
            }else{
                task.style.display = 'none';
            }
        });
}