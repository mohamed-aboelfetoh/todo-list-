
let title = document.querySelector("[type=text]");
let submit = document.querySelector("[type=submit]");
let tasks = document.getElementsByClassName("tasks")[0];



// create Task List
let myTask = [];


// import tasks from local storage and add them to Task List;
if( JSON.parse(localStorage.getItem("tasks")) !== null){
    myTask = JSON.parse(localStorage.getItem("tasks"));
}



submit.onclick = function(){

    // add tasks to list
    myTask.push(
        {
            id : new Date().getTime(),
            title : title.value
        }
    )

    // add task to local storage
    localStorage.setItem("tasks",JSON.stringify(myTask))

    // add current task to page
    let newTask = document.createElement("div");
    newTask.setAttribute("id",new Date().getTime())
    // create title of task
    let taskDescription = document.createElement("p");
    taskDescription.append(title.value)
    newTask.append(taskDescription)
    tasks.append(newTask)
    // create delete button
    let del = document.createElement("span");
    del.className="delete"
    del.append("Delete");
    newTask.append(del)
    // remove text from input field
    title.value=""

}



// add tasks to page
for(let i=0; i<myTask.length ;i++){
    // create main element
    let newTask = document.createElement("div");
    newTask.setAttribute("id",myTask[i].id)
    // create title of task
    let taskDescription = document.createElement("p");
    taskDescription.append(myTask[i].title)
    newTask.append(taskDescription)
    tasks.append(newTask)
    // create delete button
    let del = document.createElement("span");
    del.className="delete"
    del.append("Delete");
    newTask.append(del)
}



document.addEventListener("click",function(e){
    if(e.target.className === "delete"){
        // delete task from page
        e.target.parentNode.remove()

        // delete from local storage
        for(let i =0 ; i<myTask.length;i++){
            if(e.target.parentNode.id == myTask[i].id){
                myTask.splice([i],1)
                localStorage.setItem("tasks",JSON.stringify(myTask))
            }
        }

    }
})
