'use strict'



function onInit() {
   _createUsers()
   _saveUsers()
   getUsersToShow()
}


function onClickLogin()
{
    var elUserName =  document.getElementById("username")
    var elPassword =  document.getElementById("password")
    var currUserName = elUserName.value
    var currPassword = elPassword.value
   var isUser =  doLogin(currUserName,currPassword)
   if(isUser != 1)
   {
    alert("wrong user name or password")
    return
   }
   var elForm =  document.getElementById("form")
   elForm.action = "user_page.html"
}
function renderTodos() {

    const todos = getTodosForDisplay()

    const strHTMLs = todos.map(todo => `
        <li class="${(todo.isDone) ? 'done' : ''}" onclick="onToggleTodo('${todo.id}')">
            ${todo.txt}
            <button onclick="onRemoveTodo(event,'${todo.id}')" >X</button>
        </li>
    `)

    document.querySelector('ul').innerHTML = strHTMLs.join('')
    document.querySelector('span.total').innerText = getTotalCount()
    document.querySelector('span.active').innerText = getActiveCount()
}


function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    console.log('Removing:', todoId)
    removeTodo(todoId)
    renderTodos()
}

function onToggleTodo(todoId) {
    console.log('Toggling:', todoId)
    toggleTodo(todoId)
    renderTodos()
}

function onAddTodo(ev) {
    ev.preventDefault()
    const elTxt = document.querySelector('[name=txt]')
    const txt = elTxt.value
    addTodo(txt)
    renderTodos()
    elTxt.value = ''
}

function onSetFilter(filterBy) {
    console.log('filterBy:', filterBy)
    setFilter(filterBy)
    renderTodos()
}


function onSetFilterByTxt(txt) {
    console.log('Filtering by txt', txt)
    setFilterByTxt(txt)
    renderTodos()
}
