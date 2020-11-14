let Users = {
    render: async (id) =>{
        return `
        <p>
            Users page
        </p>
        <ul id="ul-users-list">
        </ul>
        `
    },

    afterRender: async (id) => {
        db.ref("users").once('value', function(snapshot) {
            let userList = document.querySelector("#ul-users-list");
            userList.innerHTML = "";
            snapshot.forEach(function(childSnapshot) {
              var userId = childSnapshot.key;
              var userData = childSnapshot.val();
              let li = document.createElement("li");
              li.innerText = userData.email + "\t" + userData.role;
              userList.appendChild(li);
            });
          });
    }
}

export default Users;