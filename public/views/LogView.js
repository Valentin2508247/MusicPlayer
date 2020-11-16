function createRow(data){
    let tr = document.createElement("tr");

    let email_td = document.createElement("td");
    
    return tr;
}

let LogView = {
    render: async (id) =>{
        return `
        <h1 class='users-title'>
        Log Page
        </h1>
        <table id="ul-logs-table" class='ul-users-table'>
            <tr><th>Name</th><th>Perfomer</th><th>Date</th></tr>
        </table>
        `
    },

    afterRender: async (id) => {
        let logsTable = document.querySelector("#ul-logs-table");
        if (id){
            //only from this user
            db.ref('logs/' + id).once('value', function(snapshot) {  
                snapshot.forEach(function(childSnapshot) {
                    alert('Hello from ' + id);
                    var songId = childSnapshot.key;
                    var songData = childSnapshot.val();
                    let tr = createRow(songData);
                });
            });    
        }
        else{
            //from all users
            alert('Hello');
        }


    }
}

export default LogView;