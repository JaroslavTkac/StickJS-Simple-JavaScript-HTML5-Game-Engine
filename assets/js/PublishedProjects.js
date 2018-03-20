/**
 * Created by jaroslavtkaciuk on 16/03/2018.
 */


$(document).ready(function () {

    //On deleting project
    $(document).on('click', '.del-project-btn', function (e) {
        let projectId = $(this).attr('id');
        let divToDelete = $(this)[0].parentNode.parentNode.parentNode;


        //Deleting published project
        deleteUsersProject(projectId);
        divToDelete.remove();
        //Deleting published projects data
        deleteUsersProjectSavedData(projectId);
    });

});