let todoItemsContainer=document.getElementById("todoItemsContainer");
/* let todoList=[
    {
        text: "Learn HTML",
        uniqueId: 1
    },
    {
        text: "Learn CSS",
        uniqueId: 2
    },
    {
        text: "Learn Javascript",
        uniqueId: 3
    }
]; */

localStorage.removeItem("TodoList1");

let saveButton=document.getElementById("Save-subject");

saveButton.onclick=function(){
    localStorage.setItem("TodoList",JSON.stringify(todoList));
}

function parsedfunction(){
    let getitem=localStorage.getItem("TodoList");
    let parsedValue=JSON.parse(getitem);
    if (parsedValue===null)
    {
        return [];
    }
    else
    {
        return parsedValue;
    }
}

let todoList=parsedfunction();



let count=todoList.length;

function statuschange(checkboxid,labelid,todoIsChecked){
    let cid=document.getElementById(checkboxid);
    let lid=document.getElementById(labelid);
    /*if (cid.checked === true){
        lid.classList.add("line-through");
    }
    else
    {
        lid.classList.remove("line-through");
    }*/

    /* or */

    

    lid.classList.toggle('line-through');  // we should use class name
    let val=todoList.findIndex(function(eachitem)
    {   
        let eachtodoid="subject"+eachitem.uniqueId;
        if (todoIsChecked === eachtodoid)
        {
            return true;
        }
        else
        {
            return false;
        }
    });
    let checkstatus=todoList[val];
    if (checkstatus.isChecked === true)
    {
        checkstatus.isChecked=false;
    }
    else
    {
        checkstatus.isChecked=true;
    }
}

function deletefunction(todolist){
    let liid=document.getElementById(todolist)
    todoItemsContainer.removeChild(liid);
    let deletingIndex=todoList.findIndex(function(eachitem){
        let uniqueid="subject"+eachitem.uniqueId;
        if (uniqueid === todolist)
        {
            return true;
        }
        else
        {
            return false;
        }
    });
    todoList.splice(deletingIndex,1);

}

function createAndAppendTodo(todo){
    let checkboxid="checkbox"+todo.uniqueId;
    let labelid="label"+todo.uniqueId;
    let todolist="subject"+todo.uniqueId;

    let todoElement=document.createElement("li");
    todoElement.classList.add("todo-item-container","d-flex","flex-row");
    todoElement.id=todolist;
    todoItemsContainer.appendChild(todoElement);


    let todoElementInput=document.createElement("input");
    todoElementInput.type="checkbox";
    todoElementInput.id=checkboxid;
    todoElementInput.classList.add("checkbox-input");
    todoElementInput.checked=todo.isChecked;
    todoElementInput.onclick=function(){
        statuschange(checkboxid,labelid,todolist);
    }
    todoElement.appendChild(todoElementInput);

    let labelContainer=document.createElement("div");
    labelContainer.classList.add("label-container","d-flex","flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement=document.createElement("label");
    labelElement.setAttribute("for",checkboxid);
    labelElement.classList.add("checkbox-label");
    labelElement.textContent=todo.text;
    labelElement.id=labelid;
    if (todo.isChecked === true)
    {
        labelElement.classList.add("line-through");
    }
    else
    {
        labelElement.classList.remove("line-through");
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer=document.createElement("div");
    deleteIconContainer.classList.add("deleteIconContainer");
    labelContainer.appendChild(deleteIconContainer);
    deleteIconContainer.style.marginLeft="auto";
    deleteIconContainer.style.marginRight="20px";
    deleteIconContainer.style.marginTop="17px";

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIconContainer.appendChild(deleteIcon);
    deleteIcon.onclick=function()
    {
        deletefunction(todolist);
    }
}

for (let todo of todoList){
    createAndAppendTodo(todo);
}

let takeinput=document.getElementById("take-input");
let addsubject=document.getElementById("add-subject");

addsubject.onclick=function(){
    let subject=takeinput.value;
    count=count+1;
    let todo1={
        text: subject,
        uniqueId: count,
        isChecked: false 
    }
    if (subject === "")
    {
        alert("Enter Valid Text");
    }
    else
    {
        todoList.push(todo1);
        createAndAppendTodo(todo1);
    }
    takeinput.value="";
}
