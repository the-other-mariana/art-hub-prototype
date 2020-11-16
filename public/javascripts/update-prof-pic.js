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
  
    loadPic();
  
    setInterval(function(){
      loadPic(); // this will run after every 1 second
    }, 3000);
  
    /*
      $("#users-button").click((e) => {
        e.preventDefault();
        loadInfo();
      });
      */
  });