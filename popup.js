window.onload = function(){
  chrome.storage.sync.get('size', function(result){
    var radios = document.getElementsByName("screensize");
    for(var i=0; i < radios.length; i++){
      if(radios[i].value == result.size){
        radios[i].checked = true;
      }
    }
  });
  document.getElementById("savebtn").onclick = function(){
    var newsize = document.querySelector('input[name="screensize"]:checked').value;
    chrome.storage.sync.set({size: newsize}, function(){});
  }
}