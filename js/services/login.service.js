'use strict'

const STORAGE_KEY = 'todoDB'
var gFilterBy = {
    txt: '',
    status: ''
}
var gTodos



function getTodosForDisplay() {
    var todos = gTodos

    if (gFilterBy.status) {
        todos = todos.filter(todo =>
            (todo.isDone && gFilterBy.status === 'done') ||
            (!todo.isDone && gFilterBy.status === 'active')
        )
    }
    todos = todos.filter(todo => todo.txt.toLowerCase().includes(gFilterBy.txt.toLowerCase()))
    return todos
}

function removeTodo(todoId) {
    const todoIdx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(todoIdx, 1)
    _saveTodosToStorage()
}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    _saveTodosToStorage()
}


function addTodo(txt) {
    // const todo = {
    //     id: _makeId(),
    //     txt,
    //     isDone: false
    // }
    // THE SAME
    const todo = _createTodo(txt)
    gTodos.push(todo)
    _saveTodosToStorage()
}

function setFilter(status) {
    gFilterBy.status = status
}

function setFilterByTxt(txt) {
    gFilterBy.txt = txt
}

function getTotalCount() {
    return gTodos.length
}

function getActiveCount() {
    return gTodos.filter(todo => !todo.isDone).length
}



function _createTodo(txt) {
    const todo = {
        id: _makeId(),
        txt,
        isDone: false
    }
    return todo
}


function _saveTodosToStorage() {
    saveToStorage(STORAGE_KEY, gTodos)
}

function _makeId(length = 5) {
    var txt = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return txt;
}








var gUsers = new Array()
var Sorting = "Name"

function  _createUsers() {
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
}

