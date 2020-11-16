function createRow(data){
    let tr = document.createElement("tr");
    
    let name_td = document.createElement("td");
    name_td.innerText = data.songName;
    tr.appendChild(name_td);

    let performer_td = document.createElement("td");
    performer_td.innerText = data.performer;
    tr.appendChild(performer_td);

    let date_td = document.createElement("td");
    date_td.innerText = data.date;
    tr.appendChild(date_td);
    
    tr.setAttribute('class', 'ul-users-tr');
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
            db.ref('logs/' + id).on('value', function(snapshot) {  
                logsTable.innerHTML = '';
                snapshot.forEach(function(childSnapshot) {
                    let songId = childSnapshot.key;
                    let songData = childSnapshot.val();
                    let tr = createRow(songData);
                    logsTable.appendChild(tr);
                });
            });    
        }
        else{
            //from all users
            db.ref('logs').once('value', function(snapshot) {  
                snapshot.forEach(function(childSnapshot) {
                    var userId = childSnapshot.key;
                    db.ref('logs/' + userId).on('value', function(snap)
                    {
                        logsTable.innerHTML = '';
                        snap.forEach(function(dateSnapshot) {
                            let songId = dateSnapshot.key;
                            let songData = dateSnapshot.val();
                            let tr = createRow(songData);
                            logsTable.appendChild(tr);                    
                        });
                    });
                });
            });    
        }
    }
}

export default LogView;