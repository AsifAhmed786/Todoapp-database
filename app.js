var task1 = document.getElementById("task1")
var maindiv = document.getElementById("maindiv")
var database = firebase.database()  //taking reference of database

function fetchData() {
    database.ref("todo/").once("value", function (load1) {
        // console.log(load1.val())
        for (var keys in load1.val()) {
            console.log(keys)
            database.ref("todo/" + keys).once("value", function (load2) {
                console.log(load2.val().date)
                console.log(load2.val().taksobj)
                addTaskNew(load2.val().date, load2.val().taksobj, load2.val().key, "No")
            })
        }
    })

}
fetchData()


function addTaskNew(dateNew, taskNew, initKey, state) {
    var dbkey;
    if (state == "No") {
        dbkey = initKey
    }
    else {
        dbkey = database.ref("todo/").push().key
        var taksObject = {
            taksobj: taskNew,
            date: "Created on: " + new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear(),
            key: dbkey
        }
        database.ref("todo/" + dbkey).set(taksObject)

    }   
    var tr = document.createElement("tr")
    var td1 = document.createElement("td")
    td1.setAttribute("class", "over")
    var td2 = document.createElement("td")
    td2.setAttribute("class", "text-center")
    var td3 = document.createElement("td")
    td3.setAttribute("class", "text-center")
    var textNode = document.createTextNode(taskNew)
    //td1.appendChild(textNode)
    td1.innerHTML = taskNew + "<p class='date1'>" + dateNew + "</p>";
    td2.innerHTML = "<i class='fa fa-pencil' name='"+dbkey+"' onclick='editTask(this)' aria-hidden='true'></i>"
    td3.innerHTML = "<i class='fa fa-trash' name='"+dbkey+"' onclick='deleteTask(this)' aria-hidden='true'></i>"
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    task1.appendChild(tr)

}

function addTask() {
    var task = prompt("Please enter Task")
    if (task == null || task == "") {
        alert("Please enter something")
    }
    else {
        // td1.innerHTML = task + 
        var sectionDate = "Created on: " + new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear();
        addTaskNew(sectionDate, task,0,"Yes")

    }

}


function changeTheme(img) {
    maindiv.style.backgroundImage = "url(" + img.src + ")"
    // alert(img.src)

}


function deleteTask(e) {
    var delkey = e.getAttribute("name")
    database.ref("todo/"+delkey).remove()
    e.parentNode.parentNode.remove()        
}

function editTask(e) {
    var existingTask = (e.parentNode.parentNode.childNodes[0].innerHTML).substring(0, (e.parentNode.parentNode.childNodes[0].innerHTML).indexOf("<"))
    var editTask = prompt("Please update task", existingTask);
    if (editTask == null || editTask == "") {
        alert("Please enter something")
    }
    else {
        var editkey = e.getAttribute("name")
        database.ref("todo/"+editkey).set({
            
            taksobj: editTask,
            date: "Edited on: " + new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear(),
            key: editkey,

        })
        e.parentNode.parentNode.childNodes[0].innerHTML = editTask + "<p class='date1'>Edited on: " + new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear() + "</p>";       
        
        
    }


}


function removeAll(){
    database.ref("todo").remove()
    var a = document.getElementsByTagName("tr");
    for(var i = 0;i < a.length;i++){
        // console.log(a[i])
        a[i].remove();
    }
    for(var i = 0;i < a.length;i++){
        // console.log(a[i])
        a[i].remove();
    }

    
}