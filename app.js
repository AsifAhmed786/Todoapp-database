var task1 = document.getElementById("task1")
var maindiv = document.getElementById("maindiv")
function addTask() {
    var task = prompt("Please enter Task")
    if (task == null || task == "") {
        alert("Please enter something")
    }
    else {
        var tr = document.createElement("tr")
        var td1 = document.createElement("td")
        td1.setAttribute("class", "over")
        var td2 = document.createElement("td")
        td2.setAttribute("class", "text-center")
        var td3 = document.createElement("td")
        td3.setAttribute("class", "text-center")
        var textNode = document.createTextNode(task)
        //td1.appendChild(textNode)
        td1.innerHTML = task +"<p class='date1'>Created on: "+new Date().getDate()+"/"+new Date().getMonth()+"/"+new Date().getFullYear()+"</p>";    
        td2.innerHTML = "<i class='fa fa-pencil' onclick='editTask(this)' aria-hidden='true'></i>"
        td3.innerHTML = "<i class='fa fa-trash' onclick='deleteTask(this)' aria-hidden='true'></i>"
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        task1.appendChild(tr)

    }

}


function changeTheme(img){
    maindiv.style.backgroundImage = "url("+img.src+")"
    // alert(img.src)

}


function deleteTask(e){
    // alert(e.parentNode)
    // document.remove(e.parentNode)
    e.parentNode.parentNode.remove()
    

}

function editTask(e){
    var existingTask = (e.parentNode.parentNode.childNodes[0].innerHTML).substring(0,(e.parentNode.parentNode.childNodes[0].innerHTML).indexOf("<"))
    var editTask = prompt("Please update task",existingTask);
    if (editTask == null || editTask == "") {
        alert("Please enter something")
    }
    else {  
        e.parentNode.parentNode.childNodes[0].innerHTML = editTask+"<p class='date1'>Edited on: "+new Date().getDate()+"/"+new Date().getMonth()+"/"+new Date().getFullYear()+"</p>";
    }
    
       
}