// Submit new blog article

function submitArticle() {
  
  const infoForUser = document.getElementById('infoa');
  const allParagraphs = document.getElementsByClassName('textPara');
  const toBeSent = {subject: [], paragraphs: [], imageLinks: [] }; // we send only those that are not empty
  const imageLinks = [document.getElementById('linkPlace1').value,
                     document.getElementById('linkPlace2').value];
  
  for (let ix = 0; ix < allParagraphs.length; ix++) {
    if (allParagraphs[ix].value != "") {
      if (ix === 0) {toBeSent.subject.push(allParagraphs[ix].value);}
      else {
        toBeSent.paragraphs.push(allParagraphs[ix].value);
      }
    } 
  }
  
  if (toBeSent.length < 2) {
    infoForUser.innerHTML = "Can not send empty subject or paragraphs.";
    
    setTimeout(() => { 
      infoForUser.innerHTML = ""; 
    }, 3000);
  }
  
  else {
    
    if (imageLinks[1] != "" ) {toBeSent.imageLinks.push(imageLinks[1]);}
    if (imageLinks[0] != "" ) {toBeSent.imageLinks.push(imageLinks[0]);}
    console.log("to be send: ", toBeSent);

    $.ajax({  
          
      url : '/addArticle', 
      data: {"toBeSent" : toBeSent},
      type: 'post',
      success : (response) => {

        console.log("server says: "+ response);

        if (response === "send ok") {

          console.log("send ok");
          // clear fields:
          for (let ixx = 0; ixx < allParagraphs.length; ixx++) { 
            allParagraphs[ixx].value = "";
          }
          document.getElementById('linkPlace1').value = "";
          document.getElementById('linkPlace2').value = "";
          
          infoForUser.innerHTML = "Article saved to database!"
          setTimeout(() => { 
            infoForUser.innerHTML = ""; 
          }, 3000);
          
          hideTextPlaces();
        } 

        else {

          console.log("not send! ", response);
          infoForUser.innerHTML = "Error in send! See console for details."
          setTimeout(() => { 
            infoForUser.innerHTML = ""; 
          }, 3000);

        }                
      }    
    });  
  }
}

function hideTextPlaces(){
  // setting so that only those boxes show that we want:
  const allParagraphs = document.getElementsByClassName('textPara');
    
    for(let i = 0; i < allParagraphs.length;i++){
      allParagraphs[i].classList.add('notShowing');
    }
  
   allParagraphs[0].classList.remove('notShowing');
  
  for (let ix = 0; ix < allParagraphs.length; ix++)
    allParagraphs[ix].addEventListener("keyup", () => {
      allParagraphs[ix+1].classList.remove('notShowing');
  });
}

$(":button").click(function (event) {

  var makeVal = this.id;

  if (this.id === "submitArticle") {
    
    console.log("event listener for buttons fired id: ", this.id)
    submitArticle()
  
  } 
               
});

$( document ).ready(function() {
  hideTextPlaces();
});

