//array to hold task-list
var TasksList = [];
window.addEventListener('load',onLoad);
function onLoad(){
  document.addEventListener('deviceready',onDeviceReady);
  $(document).ready(function(){
    $("#input").on("submit",function(e){
      e.preventDefault();
      createTask($(".text-box").val());
      $(".text-box").val("");
    });
    readTasks(TasksList);
    taskAction();
  });
}

function onDeviceReady(){
  document.addEventListener("pause", onPause, false);
  document.addEventListener("resume", onResume, false);
  document.addEventListener("backbutton", onBack, false);
}
//when back button is pressed
function onBack(){
  saveTasks(TasksList);
  navigator.app.exitApp();
}
//when app is paused
function onPause(){
  saveTasks(TasksList);
}

//when app resumes
function onResume(){
  readTasks(TasksList);
}
function taskAction(){
  $('.task-list').on('touchend',function(evt){
    console.log(evt.target);
    $(evt.target).toggleClass("done");
  });
}
function createTask(data){
	var task = new Object();
	task.id = getTaskID();
	task.name = data;
	task.status = 0;
  //push to TasksList array
  TasksList.push(task);
  saveTasks(TasksList);
  renderTasks("task-list",TasksList);
}
function getTaskID(){
  //create timestamp and return it
  return Date.now();
}
function saveTasks(list){
  var data = JSON.stringify(list);
  accessStorage("set","tasks",data);
}

function readTasks(arr){
  if(itemsExists()){
    TasksList = JSON.parse(accessStorage("get","tasks",""));
    console.log(TasksList);
    renderTasks("task-list",TasksList);
  }
}
function renderTasks(elm,arr){
  count = TasksList.length;
  //empty task list
  elm = '.'+elm;
  $(".task-list").empty();
  for(i=0;i<count;i++){
    // item = TasksList[i];
    id=TasksList[i].id;
    console.log(id);
    name=TasksList[i].name;
    task='<li class="task" data-id="'+id+'">'+name+'</li>';
    $(".task-list").append(task);
  }
}
function accessStorage(mode,key,data){
  if(mode=="set"){
    localStorage.setItem(key,data);
    //check if item exists
    if(localStorage.getItem(key)){
      return "success";
    }
  }
  if(mode=="get" && itemsExists()){
    tasks = localStorage.getItem(key);
    if(tasks){
      return tasks;
    }
  }
}
function itemsExists(){
  if(localStorage.length>0){
    return true;
  }
  else{
    return false;
  }
}
