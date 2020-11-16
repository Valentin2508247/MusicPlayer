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
        db.ref("tracks").once('value', function(snapshot) {  

        });
    }
}

export default LogView;