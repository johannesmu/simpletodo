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
function createTask(data){
  // create task as a javascript object with status:0 = not done
  var task = {name:data,id:getTaskID(),status:0};
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
  accessStorage("set",data);
}

function readTasks(arr){
  arr = JSON.parse(accessStorage("get",""));
  renderTasks("task-list",TasksList);
}

function renderTasks(elm,arr){
  count = arr.length;
  console.log(count);
  for(i=0;i<count;i++){
    item = arr[i];
    id=item.id;
    name=item.name;
    task='<li data-id="'+id+'">'+name+'</li>';
    $('.task-list').append(task);
  }
}
function accessStorage(mode,data){
  if(mode=="set"){
    localStorage.setItem("tasks",data);
  }
  if(mode=="get"){
    tasks = localStorage.getItem("tasks");
    return tasks;
  }
}
