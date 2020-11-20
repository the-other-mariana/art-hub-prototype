$(document).ready(function() {
    function loadProfileInfo(){
        $.ajax({
          async: true,
          url: 'searchProfileInfo/',
          type: 'GET',
          dataType: 'json',
          success: (data) => {
            console.log(data);

            var f = '/uploads/' + data.profilePic;
            $("#profilePic").attr("src", f);

            $("#followers").text(data.followers.length);
            $("#following").text(data.following.length);
            $("#uemail").text(data.email);
            $("#umobile").text(data.mobile);
            
            // if user is artist and there are projects
            if ((data.type == true) && (data.projects.length > 0) ){
                $('#projSection').empty();
                var projSection = $('#projSection');

                for(var i = 0; i < data.projects.length - 1; i++){
                var projTemplate;
                if (data.projects[i].type == "picture"){
                    projTemplate = $('#PicProjTemplate');
                    projTemplate.find('.card-title').text(data.projects[i].title);
                    projTemplate.find('.card-text').text(data.projects[i].description);
                    projTemplate.find('.proj-id').text(i);
                    projTemplate.find('.proj-id').val(i);

                    var f = '/uploads/' + data.projects[i].media;
                    projTemplate.find('.card-img-top').attr("src", f);
        
                    projSection.append(projTemplate.html());
                }
                if (data.projects[i].type == "video"){
                    projTemplate = $('#VidProjTemplate');
                    projTemplate.find('.card-title').text(data.projects[i].title);
                    projTemplate.find('.card-text').text(data.projects[i].description);
                    projTemplate.find('.proj-id').text(i);
                    projTemplate.find('.proj-id').val(i);

                    var f = '/uploads/' + data.projects[i].media;
                    projTemplate.find('.img-fluid').attr("src", f);
        
                    projSection.append(projTemplate.html());
                }
                if (data.projects[i].type == "animation"){
                    projTemplate = $('#AnimProjTemplate');
                    projTemplate.find('.card-title').text(data.projects[i].title);
                    projTemplate.find('.card-text').text(data.projects[i].description);
                    projTemplate.find('.proj-id').text(i);
                    projTemplate.find('.proj-id').val(i);

                    var f = '/uploads/' + data.projects[i].media;
                    projTemplate.find('.img-fluid').attr("src", f);
        
                    projSection.append(projTemplate.html());
                }
                if (data.projects[i].type == "audio"){
                    projTemplate = $('#AudioProjTemplate');
                    projTemplate.find('.card-title').text(data.projects[i].title);
                    projTemplate.find('.card-text').text(data.projects[i].description);
                    projTemplate.find('.proj-id').text(i);
                    projTemplate.find('.proj-id').val(i);

                    var f = '/uploads/' + data.projects[i].media;
                    projTemplate.find('.my-audio').attr("src", f);
        
                    projSection.append(projTemplate.html());
                }
                
                }
            }
            // if user is company and there are vacancies
            if ((data.type == true) && (data.vacancies.length > 0)){
                $('#vacSection').empty();
                var projSection = $('#vacSection');

                // last element contains user type
                for(var i = 0; i < data.vacancies.length - 1; i++){
                var projTemplate = $('#vacTemplate');
                projTemplate.find('.card-title').text(data.vacancies[i].title);
                projTemplate.find('.card-text').text(data.vacancies[i].description);
                var f = '/uploads/' + data.vacancies[i].media;
                projTemplate.find('.card-img-top').attr("src", f);
        
                projSection.append(projTemplate.html());
                }
            }
          }
        });
    }
    loadProfileInfo();
});