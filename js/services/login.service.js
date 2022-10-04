'use strict'


var gUsers = new Array()
var Sorting = "Name"

function _createUsers() {
     gUsers.push(  {
        id: 'u101',
        username: 'puki',
        password: 'secret',
        lastLoginTime: 1601891998864,
        isAdmin: true
    })
    gUsers.push(  {
        id: 'u102',
        username: 'saar',
        password: 'fridman',
        lastLoginTime: 1601891998864,
        isAdmin: true
    })
    gUsers.push(  {
        id: 'u103',
        username: 'hasel',
        password: 'thebazel',
        lastLoginTime: 1601891998864,
        isAdmin: false
    })

}

//  saves the users to localStorage
function _saveUsers() {
for (let i = 0; i < gUsers.length; i++) {
    var currKey = gUsers[i].username + gUsers[i].password
   saveToStorage(currKey,gUsers[i])  
}
}



// returns users by the current sorting
function getUsersToShow() {
    if(Sorting === "Name")
    {
        gUsers.sort((a, b) => {
            const nameA = a.username.toUpperCase(); // ignore upper and lowercase
            const nameB = b.username.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
          
            // names must be equal
            return 0;
          });
    }
    else{
        gUsers.sort((a, b) => {a.lastLoginTime - b.lastLoginTime
          });
    }
    console.log(gUsers)
    return gUsers

}


//the function should return the user object if found or null if not
// (HINT: use array.find)
//If the user successfully log-in, update his lastLoginDate
//Also save the loggedinUser to localStorage

function doLogin(userName, password) {
    var currKey = userName + password
 var currentUser = loadFromStorage(currKey)
 if(currentUser === null)
 {
    return null
 }
 currentUser.lastLoginTime = Date.now()
 saveToStorage(currKey,currentUser)
 return 1
}

