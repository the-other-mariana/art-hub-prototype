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

    function loadItems(){
      $.ajax({
        async: true,
        url: 'itemsInfo/',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
          console.log(data);
          // if user is artist and thre are projects
          if ((data[data.length - 1] == true) && (data.length > 0) ){
            $('#projSection').empty();
            var projSection = $('#projSection');

            // last element contains user type
            for(var i = 0; i < data.length - 1; i++){
              var projTemplate;
              if (data[i].type == "picture"){
                projTemplate = $('#PicProjTemplate');
                projTemplate.find('.card-title').text(data[i].title);
                projTemplate.find('.card-text').text(data[i].description);
                projTemplate.find('.proj-id').text(i);
                projTemplate.find('.proj-id').val(i);

                var f = '/uploads/' + data[i].media;
                projTemplate.find('.card-img-top').attr("src", f);
      
                projSection.append(projTemplate.html());
              }
              if (data[i].type == "video"){
                projTemplate = $('#VidProjTemplate');
                projTemplate.find('.card-title').text(data[i].title);
                projTemplate.find('.card-text').text(data[i].description);
                projTemplate.find('.proj-id').text(i);
                projTemplate.find('.proj-id').val(i);

                var f = '/uploads/' + data[i].media;
                projTemplate.find('.img-fluid').attr("src", f);
      
                projSection.append(projTemplate.html());
              }
              if (data[i].type == "animation"){
                projTemplate = $('#AnimProjTemplate');
                projTemplate.find('.card-title').text(data[i].title);
                projTemplate.find('.card-text').text(data[i].description);
                projTemplate.find('.proj-id').text(i);
                projTemplate.find('.proj-id').val(i);

                var f = '/uploads/' + data[i].media;
                projTemplate.find('.img-fluid').attr("src", f);
      
                projSection.append(projTemplate.html());
              }
              if (data[i].type == "audio"){
                projTemplate = $('#AudioProjTemplate');
                projTemplate.find('.card-title').text(data[i].title);
                projTemplate.find('.card-text').text(data[i].description);
                projTemplate.find('.proj-id').text(i);
                projTemplate.find('.proj-id').val(i);

                var f = '/uploads/' + data[i].media;
                projTemplate.find('.my-audio').attr("src", f);
      
                projSection.append(projTemplate.html());
              }
              
            }
          }
          // if user is company and there are vacancies
          if ((data[data.length - 1] == false) && (data.length > 0) ){
            $('#vacSection').empty();
            var projSection = $('#vacSection');

            // last element contains user type
            for(var i = 0; i < data.length - 1; i++){
              var projTemplate = $('#vacTemplate');
              projTemplate.find('.card-title').text(data[i].title);
              projTemplate.find('.card-text').text(data[i].description);
              var f = '/uploads/' + data[i].media;
              projTemplate.find('.card-img-top').attr("src", f);
    
              projSection.append(projTemplate.html());
            }
          }

        }
      });
    }

    
  
    loadPic();
    loadContact();
    loadItems();
    /*
    setInterval(function(){
      // this will run after every 1 second
      loadPic(); 
      loadContact();
      loadItems();
    }, 6000);*/
    
  });