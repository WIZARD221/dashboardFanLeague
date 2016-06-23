function initTableEdit(){
    $('#team-profile-table').Tabledit({
        restoreButton: false,
        url: 'teamprofiles',
        columns: {
            identifier: [0, 'id'],
            editable: [[1, 'name'], 
                      [2, 'homeStadium'], 
                      [3, 'awayColour'], 
                      [4, 'homeColour'], 
                      [6, 'country']]
        }
    });  
};

$( document ).ready( initTableEdit )