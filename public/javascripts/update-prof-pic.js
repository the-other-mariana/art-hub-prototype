$(document).ready(function() {

    function loadPic(){
      $.ajax({
        async: true,
        url: 'profpic/',
        type: 'GET',
        dataType: 'text',
        success: (data) => {
          console.log(data);
          var f = '/uploads/' + data;
          $("#profilePic").attr("src", f);
          
        }
      });
    }

    function loadContact(){
      $.ajax({
        async: true,
        url: 'contactInfo/',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
          console.log(data);
          $("#uemail").text(data.email);
          $("#umobile").text(data.mobile);

          // edit data form with default user info
          $("#upemail").prop("defaultValue", data.email);
          $("#upmobile").prop("defaultValue", data.mobile);
        }
      });
    }
  
    loadPic();
    loadContact();
  
    setInterval(function(){
      // this will run after every 1 second
      loadPic(); 
      loadContact();
    }, 6000);
    
  });