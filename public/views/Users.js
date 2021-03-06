let Users = {
    render: async (id) =>{
        return `
        <h1 class='users-title'>
            Users page
        </h1>
        <table id="ul-users-table" class='ul-users-table'>
            <tr><th>Email</th><th>Role</th><th>Status</th></tr>
        </table>
        `
    },

    afterRender: async (id) => {
        let userTable = document.querySelector("#ul-users-table");

        db.ref("users").once('value', function(snapshot) {  
            snapshot.forEach(function(childSnapshot) {
              var userId = childSnapshot.key;
              var userData = childSnapshot.val();
              let tr = document.createElement("tr");
              tr.classList.add('ul-users-tr');

              let email_td = document.createElement("td");
              
              let email_listener = (e) =>{
                console.log(e.target.innerText);
                // Валя здесь надо будет в бд присвоить пользователю новое состояние. e.target.id хранит айдиху нажатого пользователя
                location.hash = '#/logview/' + userId;
              };  

              email_td.addEventListener('click', email_listener);

              email_td.innerText = userData.email;
              

              tr.appendChild(email_td);
              let role_td = document.createElement("td");
              role_td.innerText = userData.role;
              tr.appendChild(role_td);

              let status_td = document.createElement("td");
              let block_btn = document.createElement('button');
              block_btn.id = `${userId}`;
              block_btn.classList.add('user-btn');

              if (userData.blocked){
                block_btn.innerText = 'Unblock';
              }
              else{
                block_btn.innerText = 'Block';
              }


              let btn_listener = (e) =>{
                if (userData.role != 'Admin'){
                  // Валя здесь надо будет в бд присвоить пользователю новое состояние. e.target.id хранит айдиху нажатого пользователя
                  if ( e.target.innerText === 'Block'){
                    db.ref('users/' + e.target.id).set(
                      {
                        email: userData.email,
                        role: userData.role,
                        blocked: true
                      }
                    );
                  }
                  else{
                    db.ref('users/' + e.target.id).set(
                      {
                        email: userData.email,
                        role: userData.role
                      }
                    );
                  }
                  e.target.innerText = e.target.innerText === 'Block' ? e.target.innerText = 'Unblock' : e.target.innerText = 'Block';
                }
            };
    
              block_btn.addEventListener('click', btn_listener);

              status_td.appendChild(block_btn);
              tr.appendChild(status_td);

              userTable.appendChild(tr);
            });
          });
    }
}

export default Users;