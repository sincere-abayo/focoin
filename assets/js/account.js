
// Get references to the elements
const accountLink = document.getElementById('account');
const modal = document.getElementById('modal');
const hideButton = document.getElementById('hide-button');
const claimButton = document.getElementById('claim-button');


// Function to show the modal
function showModal() {
    modal.classList.remove('hidden');
}

// Function to hide the modal
function hideModal() {
    modal.classList.add('hidden');
}

// Event listener for the link click
accountLink.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default behavior of the link
    showModal();
});

// Event listener for the claim button to hide the modal
hideButton.addEventListener('click', hideModal);


// Disable the button
claimButton.disabled = true;

//winner program

// const playButton=document.getElementById('play-button');
// playButton.addEventListener('click',winnerProgram);

// function winnerProgram()
// {
    // const  programBlock=document.getElementById('winner-trade-program');
    // document.getElementById("play-button").addEventListener("click", function() {
        
    //     // Navigate to the #winner-trade-program div
    //     document.getElementById("winner-trade-program").style.display = "block";
    //     window.location.hash = "#winner-trade-program";
    //   });
    document.addEventListener("DOMContentLoaded", function() {
        // Get the "Play now" button
        const playButton = document.getElementById("play-button");
    
        // Add click event listener to the "Play now" button
        playButton.addEventListener("click", function() {
          // Show the #winner-trade-program div
          document.getElementById("winner-trade-program").style.display = "block";
    
          // Scroll smoothly to the #winner-trade-program section
          document.querySelector("#winner-trade-program").scrollIntoView({
            behavior: "smooth"
          });
        });
      });
// }


document.getElementById('winner-foam').addEventListener('submit',function(event){
  
  event.preventDefault();

  // alert("yet");
  
 var fields=['wallet-address','token','email','telephone'];
 var data =[];
 var errors=[];
 fields.forEach(value => {
   let fieldsValue=document.getElementById(value).value;
   if (fieldsValue.trim()=="") {
    errors.push('enter your ' + value + ',');
    
   }
   if (value=="token") {
    if (fieldsValue.trim() <500 && fieldsValue.trim()!=0 ) {
      errors.push("Not enough coin to apply for winners \n Upgrade up to 5000 focoin and apply");
    //  return;
    }
    if (fieldsValue.trim()==0) {
      errors.push("Buy some focoin to get chance to apply for winners");
    //  return;
    }
   }
   data.push(fieldsValue);
   
 });
 if (errors.length>0) {
  var errorMessage= errors.join('\n');
  alert(errorMessage);
  return;
 }
   var xhr = new XMLHttpRequest();
   var url = 'assets/php/recordwinner.php'; // Corrected the URL spelling
   xhr.open('POST', url, true);
   xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
   
   xhr.onreadystatechange = function () {
   if (xhr.readyState == XMLHttpRequest.DONE) {
     if (xhr.status == 200) {
       alert(xhr.responseText);
     
 
     } else {
       console.log(xhr.responseURL);
     }
   }
   };
 
   var params = 'data=' + encodeURIComponent(data);
   xhr.send(params);
 
 
 
 });

