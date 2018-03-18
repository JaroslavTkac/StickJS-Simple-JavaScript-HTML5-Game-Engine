/**
 * Created by jaroslavtkaciuk on 16/03/2018.
 */



$(document).ready(function () {

    //On deleting project
    $(document).on('click', '.del-project-btn', function (e) {
        let projectId = $(this).attr('id');
        let divToDelete = $(this)[0].parentNode.parentNode.parentNode;
        $.ajax({
            type: "POST",
            url: "../php/delete_project.php",
            data: {
                projectId: projectId,
                userId: userId
            },
        }).done(function (response) {
            console.log(response);
            divToDelete.remove();
        }).error(function (response) {
            console.log(response);
        });


        /*$.ajax({
            type: "POST",
            url: "../php/upload.php",
            data: {
                cleanFolders: true,
                projectId: projectId,
                userId: userId
            },
        }).done(function (response) {
            //console.log("Searching for files");
            //console.log(response);
            console.log(JSON.parse(response)['data']);
            console.log(JSON.parse(response)['info']);
        }).error(function (response) {
            //console.log(response);
        });*/
    });


});