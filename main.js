
let txt = document.querySelector(`input[type="text"]`)
let submit = document.querySelector(`input[type="submit"]`);
let result = document.querySelector(".result")

let tasks = []

if(JSON.parse(localStorage.getItem("tasks"))){
  tasks = JSON.parse(localStorage.getItem("tasks"))
  for(let i = 0 ;i< tasks.length ; i++){
    createTaskEle(tasks[i].title , tasks[i].id)
  }

  for(let i = 0 ;i< tasks.length ; i++){
    let allTasks = document.querySelectorAll("div[data-in]");
    if(tasks[i].done === "true"){
        allTasks.forEach(task=>{
          if(task.id == tasks[i].id){
            task.firstElementChild.style.cssText = "text-decoration:line-through"
            task.lastElementChild.lastElementChild.style.cssText ="opacity : 0.5"
          }
        })
      }  
    }

}

// create task element
function createTaskEle (elData , elId){
    let data = document.createElement("div");
    data.setAttribute("id", + elId)
    let data_in = document.createAttribute("data-in");
    data.setAttributeNode(data_in);

    let txtContainer = document.createElement("p");
    txtContainer.append(elData);

    let buttonsContainer = document.createElement("div");
    buttonsContainer.classList = "btns-container";

    let del = document.createElement("button");
    del.append("delete");
    del.className = "delete"

    let edit=document.createElement("button");
    edit.append("edit");
    edit.className = "edit"

    let done=document.createElement("button");
    done.append("done");
    done.className = "done"

    buttonsContainer.append(edit)
    buttonsContainer.append(del)
    buttonsContainer.append(done)

    data.append(txtContainer);
    data.append(buttonsContainer)
    result.append(data)
}

submit.addEventListener("click",function(e){
  e.preventDefault()
  if(txt.value.length > 0){
    let id = + new Date
    tasks.push({title:txt.value , id : id , done : "false"})
    window.localStorage.setItem('tasks',`${JSON.stringify(tasks)}`)
    createTaskEle(txt.value , id)
  }
  txt.value=""
})

// delete custom task
document.addEventListener("click", function(e){
  if(e.target.className === "delete"){
    tasks = tasks.filter(task => e.target.parentElement.parentElement.id != task.id)
    window.localStorage.setItem('tasks',JSON.stringify(tasks))
    e.target.parentElement.parentElement.remove();
  }
})

// edit custom task
document.addEventListener("click", function(e){
  if(e.target.className === "edit"){
    let taskText = e.target.parentElement.parentElement.firstElementChild;
    let editInput = document.createElement("input");
    editInput.style.cssText = "flex-grow:1 ;font-size: 20px;text-transform: capitalize;flex-grow: 1;outline: none; padding:0";
    editInput.value = taskText.textContent;
    taskText.replaceWith(editInput)
    editInput.focus()
    e.target.parentElement.innerHTML = `<button class="save">Save</button>`
  }
})

// save custom task
document.addEventListener("click", function(e){
  if(e.target.className === "save"){
    let taskText = e.target.parentElement.parentElement.firstElementChild;
    for(let i=0;i<tasks.length;i++){
      if(e.target.parentElement.parentElement.id == tasks[i].id){
        tasks[i].title = taskText.value;
      }
    } 
    let txtContainer = document.createElement("p");
    txtContainer.append(taskText.value)
    taskText.replaceWith(txtContainer);
    e.target.parentElement.innerHTML = `
      <button class="edit">edit</button>
      <button class="delete">delete</button>
      <button class="done">done</button>
      `
    window.localStorage.setItem('tasks',`${JSON.stringify(tasks)}`);
  }
})


function doneTask(customtask , button){
    for(let i=0;i<tasks.length;i++){
      if(button.parentElement.parentElement.id == tasks[i].id){
        if(tasks[i].done === "true"){
          tasks[i].done = "false"
        }else{
          tasks[i].done = "true"
        }
      }
    } 
    
    for(let i=0;i<tasks.length;i++){
        if(button.parentElement.parentElement.id == tasks[i].id){
          if(tasks[i].done === "true"){
            customtask.style.cssText="text-decoration:line-through"
            button.style.cssText = "opacity:0.5"
          }else{
            customtask.style.cssText="text-decoration:none";
            button.style.cssText = "opacity:1"
          }
        }
    } 
}

// done custom task
document.addEventListener("click", function(e){
  if(e.target.className === "done"){
    let task = e.target.parentElement.parentElement.firstElementChild;

    doneTask(task , e.target)

    window.localStorage.setItem('tasks',`${JSON.stringify(tasks)}`);
  }
})
