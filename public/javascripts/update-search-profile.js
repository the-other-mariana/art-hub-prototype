$(document).ready(function() {
    function loadProfileInfo(){
        $.ajax({
          async: true,
          url: 'searchProfileInfo/',
          type: 'GET',
          dataType: 'json',
          success: (data) => {
            console.log(data);

            var f = '/uploads/' + data.whom.profilePic;
            $("#profilePic").attr("src", f);

            $("#followers").text(data.whom.followers.length);
            $("#following").text(data.whom.following.length);
            $("#uemail").text(data.whom.email);
            $("#umobile").text(data.whom.mobile);

            if(data.whom.followers.includes(data.who)){
                $("#followBtn").prop( "disabled", true);
            }else{
                $("#followBtn").prop( "disabled", false);
            }
            
            // if user is artist and there are projects
            if ((data.whom.type == true) && (data.whom.projects.length > 0) ){
                $('#projSection').empty();
                var projSection = $('#projSection');

                for(var i = 0; i < data.whom.projects.length - 1; i++){
                var projTemplate;
                if (data.whom.projects[i].type == "picture"){
                    projTemplate = $('#PicProjTemplate');
                    projTemplate.find('.card-title').text(data.whom.projects[i].title);
                    projTemplate.find('.card-text').text(data.whom.projects[i].description);
                    projTemplate.find('.proj-id').text(i);
                    projTemplate.find('.proj-id').val(i);

                    var f = '/uploads/' + data.whom.projects[i].media;
                    projTemplate.find('.card-img-top').attr("src", f);
        
                    projSection.append(projTemplate.html());
                }
                if (data.whom.projects[i].type == "video"){
                    projTemplate = $('#VidProjTemplate');
                    projTemplate.find('.card-title').text(data.whom.projects[i].title);
                    projTemplate.find('.card-text').text(data.whom.projects[i].description);
                    projTemplate.find('.proj-id').text(i);
                    projTemplate.find('.proj-id').val(i);

                    var f = '/uploads/' + data.whom.projects[i].media;
                    projTemplate.find('.img-fluid').attr("src", f);
        
                    projSection.append(projTemplate.html());
                }
                if (data.whom.projects[i].type == "animation"){
                    projTemplate = $('#AnimProjTemplate');
                    projTemplate.find('.card-title').text(data.whom.projects[i].title);
                    projTemplate.find('.card-text').text(data.whom.projects[i].description);
                    projTemplate.find('.proj-id').text(i);
                    projTemplate.find('.proj-id').val(i);

                    var f = '/uploads/' + data.whom.projects[i].media;
                    projTemplate.find('.img-fluid').attr("src", f);
        
                    projSection.append(projTemplate.html());
                }
                if (data.whom.projects[i].type == "audio"){
                    projTemplate = $('#AudioProjTemplate');
                    projTemplate.find('.card-title').text(data.whom.projects[i].title);
                    projTemplate.find('.card-text').text(data.whom.projects[i].description);
                    projTemplate.find('.proj-id').text(i);
                    projTemplate.find('.proj-id').val(i);

                    var f = '/uploads/' + data.whom.projects[i].media;
                    projTemplate.find('.my-audio').attr("src", f);
        
                    projSection.append(projTemplate.html());
                }
                
                }
            }
            // if user is company and there are vacancies
            if ((data.whom.type == true) && (data.whom.vacancies.length > 0)){
                $('#vacSection').empty();
                var projSection = $('#vacSection');

                // last element contains user type
                for(var i = 0; i < data.whom.vacancies.length - 1; i++){
                var projTemplate = $('#vacTemplate');
                projTemplate.find('.card-title').text(data.whom.vacancies[i].title);
                projTemplate.find('.card-text').text(data.whom.vacancies[i].description);
                var f = '/uploads/' + data.whom.vacancies[i].media;
                projTemplate.find('.card-img-top').attr("src", f);
        
                projSection.append(projTemplate.html());
                }
            }
          }
        });
    }
    loadProfileInfo();
});