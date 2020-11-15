$(document).ready(function() {

    function loadInfo(){
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
  
    loadInfo();
  
    setInterval(function(){
      loadInfo(); // this will run after every 1 second
    }, 3000);
  
    /*
      $("#users-button").click((e) => {
        e.preventDefault();
        loadInfo();
      });
      */
  });