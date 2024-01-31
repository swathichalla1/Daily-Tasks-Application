
let selectedTag = document.getElementById("selectInput");
let addButton = document.getElementById("addButton");
let allButton = document.getElementById("All");
let healthButton = document.getElementById("Health");
let educationButton = document.getElementById("Education");
let entertainmentButton = document.getElementById("Entertainment");
let sportsButton = document.getElementById("Sports");
let otherButton = document.getElementById("Other");
let taskContainer = document.getElementById("taskContainer");
let form = document.getElementById("formContainer");
let error = document.getElementById("error");
let saveButton = document.getElementById("save");
let selectedButton = "";
let clearButton = document.getElementById("clear");


function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("tasksList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}



let tasksList = getTodoListFromLocalStorage();
//let tasksList = [{task:"Learn java",tag:"Education",uniqueNo:1,isChecked:false},{task:"Learn html",tag:"Education",uniqueNo:2,isChecked:false}];
let tasksCount = tasksList.length;

saveButton.onclick = function(){
    localStorage.setItem("tasksList",JSON.stringify(tasksList));
}


function onAddTask(){
    
    let taskInput = document.getElementById("taskInput");
       let taskValue = taskInput.value;
       let tagValue = selectedTag.value;
       

       if (taskValue ===""){
           alert("Enter some Task");
           return;
       }
       
        
       
    tasksCount = tasksCount+1;

       let newTask = {
        task : taskValue,
        tag :tagValue,
        uniqueNo:tasksCount,
        isChecked:false
       };

       
       tasksList.push(newTask);
       taskInput.value="";
}

// click on add button
addButton.onclick = function(event){
    event.preventDefault();
    onAddTask();
}


//deleting a task 
function onDeleteTodo(taskId) {
    let taskElement = document.getElementById(taskId);
    taskContainer.removeChild(taskElement);

    let deleteElementIndex = tasksList.findIndex(function(eachTask) {
        let eachTaskId = "task" + eachTask.uniqueNo;
        if (eachTaskId === taskId) {
            return true;
        } else {
            return false;
        }
    });

    tasksList.splice(deleteElementIndex, 1);
}


//checkbox status
function onCheckStatusChange(checkboxId,taskId,labelId){
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let taskIndex = tasksList.findIndex(function(eachTask){
            let eachTaskId = "task"+eachTask.uniqueNo;

            if (eachTaskId === taskId){
               return true;
            }
            else{
               return false;
            }
    });
     
    let taskObject = tasksList[taskIndex];

    if (taskObject.isChecked===true){
       taskObject.isChecked = false;
    }
    else{
       taskObject.isChecked = true;
    }
}

//creating a new task

function createAndAddNewTask(task){
    let taskId = "task"+task.uniqueNo;
    let checkboxId = "checkbox"+task.uniqueNo;
    let labelId = "label"+task.uniqueNo;

    let taskElement = document.createElement("li");
    taskElement.classList.add("task-item-container");
    taskElement.id = taskId;
    taskContainer.appendChild(taskElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = task.isChecked;

    inputElement.onclick = function(){
        onCheckStatusChange(checkboxId,taskId,labelId);
    }

    inputElement.classList.add("checkbox-input");
    taskElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container");
    taskElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = task.task;
    if (task.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("button");
    deleteIcon.textContent = "Delete";
    deleteIcon.classList.add("delete");

    deleteIcon.onclick = function() {
        onDeleteTodo(taskId);
    };

    deleteIconContainer.appendChild(deleteIcon);
}

let filteredList = [];

function removeAllTasks(){
    taskContainer.innerHTML = "";
}

function getFilteredList(selectedButton){
    removeAllTasks();
    if (selectedButton === "All"){
        filteredList = tasksList
    }
    else{
        filteredList = tasksList.filter((eachTask)=>(eachTask.tag === selectedButton));
    }
    let heading = document.createElement("h1");
    heading.textContent = selectedButton;
    heading.classList.add("taskHeading");
    taskContainer.appendChild(heading);
    if (filteredList.length>0){
        for (let task of filteredList) {
            createAndAddNewTask(task);
            }
    }
    else{
        let empty = document.createElement("h3");
        empty.textContent = "No Tasks Yet !!!";
        empty.classList.add("empty");
        taskContainer.appendChild(empty);
    }
    
}



allButton.onclick = function(){
    selectedButton = "All";
    allButton.classList.add("clicked");
    getFilteredList(selectedButton);
}
healthButton.onclick = function(){
    selectedButton = "Health";
    getFilteredList(selectedButton);
}
educationButton.onclick = function(){
    selectedButton = "Education";
    getFilteredList(selectedButton);
}
entertainmentButton.onclick = function(){
    selectedButton = "Entertainment";
    getFilteredList(selectedButton);
}
sportsButton.onclick = function(){
    selectedButton = "Sports";
    getFilteredList(selectedButton);
}
otherButton.onclick = function(){
    selectedButton = "Other";
    getFilteredList(selectedButton);
}

clearButton.onclick = function(){
    localStorage.removeItem("tasksList");
    removeAllTasks();
}




