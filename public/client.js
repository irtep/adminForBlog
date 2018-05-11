
function submitForm() {
  
  console.log("submitForm fired");
  
  const infoboxi = document.getElementById("infoBox");
  const usari = document.getElementById("username");
  const passu = document.getElementById("password");
  const username = usari.value;
  const password = passu.value;
  const usePa = [username, password];    
  
  // clean info box.
  infoboxi.innerHTML = "";

  $.ajax({  
          
    url : '/users', 
    data: {"toBeSent" : usePa},
    type: 'post',
    success : function (response) {
            
      console.log("server says: "+ response);
            
      if (response === "right") {
            
        console.log("indeed");
        window.location.replace("/index3");
              
      } 
      
      else if (response == "emptys"){
            
        console.log("not ok");
        infoboxi.innerHTML = "Fill both fields please.";
            
      }
      
      else if (response == "wrong"){
            
        console.log("not ok");
        infoboxi.innerHTML = "Username of password wrong.";
            
      }
      
    }
    
  });  

}   // submit form ends

function submitRegister() {
  
  console.log("registerForm fired");
  
  const infoboxi2 = document.getElementById("infoBox2");
  const usari = document.getElementById("usernameX");
  const passu = document.getElementById("passwordX");
  const username = usari.value;
  const password = passu.value;            	  
  const usePa = [username, password];    
  
  // clean info box.
  infoboxi2.innerHTML = "";

  $.ajax({  
          
    url : '/adder', 
    data: {"toBeSent" : usePa},
    type: 'post',
    success : function (response) {
            
      console.log("server says: "+ response);
            
      if (response === "registered") {
            
        console.log("registered");
              
      } 
      
      else if (response === "exists") {
            
        console.log("exists");
        infoboxi2.innerHTML = "Exists already";
            
      } 
      
      else if (response === "emptys") {
            
        console.log("empty fields");
        infoboxi2.innerHTML = "Cannot have empty fields";
            
      }
          
    }
    
  });  

}   // submit register ends

$(":button").click(function (event) {

  var makeVal = this.id;

  if (this.id === "submitLogin") {
    
    console.log("event listener for buttons fired id: ", this.id)
    submitForm()
  
  } 
  
  else if (this.id === "submitRegister"){ 
    
    console.log("event listener for buttons fired id: ", this.id)
    submitRegister()
  
  }
               
});
