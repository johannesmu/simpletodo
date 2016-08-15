window.addEventListener('load',onLoad);
function onLoad(){
  document.addEventListener('deviceready',initialize);
}
function onDeviceReady(){
  document.addEventListener("pause", onPause, false);
  document.addEventListener("resume", onResume, false);
  document.addEventListener("backbutton", onBack, false);
}
//when back button is pressed
function onBack(){
  navigator.app.exitApp();
}
//when app is paused
function onPause(){

}

//when app resumes
function onResume(){

}
