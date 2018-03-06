/**
 * Created by jaroslavtkaciuk on 22/02/2018.
 */



$(document).ready(function() {
    //ON Click New project button
    $(document).on('click', '#new-project-btn', function (e) {
        e.preventDefault();
        $('#new-project-modal').modal('show');
    });

    //On submitting new project data
    $('#create-new-project-btn').on('click', function (e) {
        console.log("Creating new project");
        let projectName = $(document).find('#usr-project-name').val();
        let aboutProject = $(document).find('textarea#usr-project-about').val();


        console.log("values: " + projectName);
        console.log("about: " + aboutProject);


        if(projectName === ""){
            //empty name
            $('#new-project-form').addClass('has-error');
            $('#error-explanation').html("Empty name is not allowed");
        }
        else{
            $.ajax({
                type: "POST",
                url: "../php/create_project.php",
                data: {
                    projectName: projectName,
                    about: aboutProject,
                    userId: userId
                },
            }).done(function(response) {
                let responseArray = JSON.parse(response);

                //checking last color
                let createdProjects = document.getElementById("user-projects").children;
                let possibleColors = ["primary", "info", "success", "warning", "danger"];
                let color = "";

                if(createdProjects.length === 0)
                    color = "primary";
                else{
                    let parsedClassName = createdProjects[createdProjects.length - 1].className.
                    substr(32, createdProjects[createdProjects.length - 1].className.length);

                    let i;
                    for (i = 0; i < possibleColors.length; i++){
                        if(possibleColors[i] === parsedClassName){
                            if(i === possibleColors.length-1){
                                i = 0;
                                break;
                            }
                            else{
                                i++;
                                break;
                            }
                        }
                    }
                    color = possibleColors[i];
                }

                let data = "<div class=\"bs-calltoaction bs-calltoaction-" + color + "\">" +
                    "<div class=\"row\">" +
                    "<div class=\"col-md-9 cta-contents\">" +
                    "<h1 class=\"cta-title col-lg-9 col-md-9\">" + responseArray['name'] + "</h1>" +
                    "<p class=\"col-lg-3 col-md-3\">Created at: " + responseArray['created'] + "</p>" +
                    "<div class=\"cta-desc col-lg-12 col-md-12\">" +
                    "<p>" + responseArray['about'] + "</p>" +
                    "</div>" +
                    "</div>" +
                    "<div class=\"col-md-3 cta-button\">" +
                    "<a href=\"editor.php?project_id="+ responseArray['project_id'] + "&project_name=" + responseArray['name'] +"\" class=\"btn btn-lg btn-block btn-" + color + "\">Open</a>" +
                    "<a href=\"#\" id=\"" + responseArray['project_id'] + "\" class=\"del-project-btn btn btn-lg btn-block btn-" + color + "\">Delete</a>" +
                    "</div>" +
                    "</div>" +
                    "</div>";
                $('#user-projects').append(data);

            }).error(function (res) {
                console.log(res);
                console.log("error on running sql");
            });

        }

        $('#new-project-modal').modal('hide');
    });

    //On deleting project
    $(document).on('click', '.del-project-btn', function (e) {
        console.log("CLICK DELETE");

        let projectId = $(this).attr('id');
        let divToDelete = $(this)[0].parentNode.parentNode.parentNode;
        $.ajax({
            type: "POST",
            url: "../php/delete_project.php",
            data: {
                projectId: projectId,
                userId: userId
            },
        }).done(function(response) {
            console.log(response);
            divToDelete.remove();
        }).error(function (response){
            console.log(response);
        });
    });


    //Detect key input (delete error signs in Modal window)
    $('#usr-project-name').bind('input', function() {
        $('#new-project-form').removeClass('has-error');
        $('#error-explanation').html("");
    });
    //On modal closing
    $('#new-project-modal').on('hidden.bs.modal', function () {
        $(document).find('#usr-project-name').val('');
        $(document).find('#usr-project-about').val('...');
        $('#new-project-form').removeClass('has-error');
        $('#error-explanation').html("");
        console.log("Add shape name window closed");
    });
});