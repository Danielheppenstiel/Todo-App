// DOM SELECTORS
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const itemCounterElement = document.querySelector('#items-left');
    // Buttons
const allBtn = document.getElementById('all-btn');
const activeBtn = document.getElementById('active-btn');
const completedBtn = document.getElementById('completed-btn');
const clearBtn = document.getElementById('clear-all');
    // Toggle Icons
var sunIcon = document.getElementById('toggle-sun');
var moonIcon = document.getElementById('toggle-moon');
    // Current Mode
let isDarkMode = true;

// Functions
function todoInit() {
    // Check todo list and all existing to 'all' localStorage
    const exisitingTodoElements = todoList.querySelectorAll('.todo-item');
    exisitingTodoElements.forEach(todo => {
        const todoText = todo.querySelector('.todo-text').textContent;
        addToLocalStorage('all', todoText);
        addToLocalStorage('active', todoText);
    });
    
};

function addToLocalStorage(key, item) {
    // check if localStorage items already exist
    const existingItems = JSON.parse(localStorage.getItem(key)) || [];
    // push new item to existing items array or to an empty array
    if (!existingItems.includes(item)) {
        existingItems.push(item);
    } 
    // set all items back to local storage
    localStorage.setItem(key, JSON.stringify(existingItems));
};

function removeFromLocalStorage(key, itemToRemove) {
    // get existing items from local storage
    const existingItems = JSON.parse(localStorage.getItem(key)) || [];
    // filter to remove item that has been deleted
    const updatedItems = existingItems.filter(item => item !== itemToRemove);
    // reset localstorage with updatedItems
    localStorage.setItem(key, JSON.stringify(updatedItems));
};

function createTodo(todo) {
    // create DOM ELEMENTS
    const li = document.createElement('li');
    li.className = 'todo-item';

    const divCheck = document.createElement('div');
    divCheck.className = 'check-mark';

    const imgCheck = document.createElement('img')
    imgCheck.src = './images/icon-check.svg';

    divCheck.appendChild(imgCheck);

    const divCircle = document.createElement('div');
    divCircle.className = 'circle';


    const para = document.createElement('p');
    para.className = 'todo-text';
    para.textContent = todo;

    const img = document.createElement('img');
    img.className = 'remove-icon';
    img.src = './images/icon-cross.svg'

    // Append children
    li.appendChild(divCheck);
    li.appendChild(divCircle);
    li.appendChild(para);
    li.appendChild(img);

    if(!isDarkMode) {
        li.classList.add('light-mode-item');
    };
    
    return li;
};

function addTodo(e) {
    e.preventDefault();
    // create todo
    const newTodo = todoInput.value;
    const todo = createTodo(newTodo);
    // Add Todo to the DOM
    todoList.appendChild(todo);
    // add todo to local storage
    addToLocalStorage('active', newTodo);
    todoInput.value = '';
};

    // Toggle Display
function toggleDisplay() {   
    const todoItems = document.querySelectorAll('.todo-item');
    const windowWidth = window.innerWidth;
    const body = document.body;
    const controls = document.querySelector('.controls');

    // toggle sun / moon icons
    sunIcon.classList.toggle('display-sun');
    sunIcon.classList.toggle('remove-sun');

    moonIcon.classList.toggle('display-moon');
    moonIcon.classList.toggle('remove-moon');

    // Update styles dark mode / light mode
    if (moonIcon.classList.contains('display-moon') && windowWidth < 500) { // light mode
            isDarkMode = false;
            body.classList.add('light-mode');
            body.style.backgroundColor = 'hsl(236, 33%, 92%)';
            controls.classList.add('light-mode-item');
            todoInput.classList.add('input-light-mode');
            

            todoItems.forEach(item => {
                item.classList.add('light-mode-item');
            });

    } else if (moonIcon.classList.contains('display-moon') && windowWidth >= 500) {
            isDarkMode = false;
            body.classList.add('light-mode-large');
            body.style.backgroundColor = 'hsl(236, 33%, 92%)';
            controls.classList.add('light-mode-item');
            todoInput.classList.add('input-light-mode');

            todoItems.forEach(item => {
                item.classList.add('light-mode-item');
            });
            
    } else { // Dark mode
            isDarkMode = true;
            body.classList.remove('light-mode');
            body.classList.remove('light-mode-large');
            body.style.backgroundColor = 'hsl(235, 21%, 11%)';
            controls.classList.remove('light-mode-item');
            todoInput.classList.remove('input-light-mode');

            todoItems.forEach(item => {
                item.classList.remove('light-mode-item');
            });
    };
    
};

function interactTodo(e) {
    const target = e.target;
    if (target.classList.contains('remove-icon')) {
        const todoText = target.parentElement.querySelector('.todo-text').textContent;
        target.parentElement.remove();
        removeFromLocalStorage('all', todoText);
        removeFromLocalStorage('active', todoText);
        removeFromLocalStorage('completed', todoText);
    } else if (target.classList.contains('circle')) {
        target.parentElement.classList.add('checked-todo');
        target.previousElementSibling.style.display = 'block';
        addToLocalStorage('completed', target.parentElement.children[2].innerText);
        setTimeout(() => {
            target.parentElement.remove();
        }, 2000);
    } else {
        return;
    };
};

    // Controls All Active Completed Clear
function displayCompleted() {
    // clear the list
    todoList.innerHTML = '';
    // get todo's from local storage
    const completedItems = JSON.parse(localStorage.getItem('completed'));
    // loop through todos and add each one to the DOM
    completedItems.forEach(item => {
       const completedTodo = createTodo(item);
       todoList.appendChild(completedTodo);
    });

    itemCounterElement.innerText = `${completedItems.length} Items remaining..`
};

function displayActive() {
    todoList.innerHTML = '';
    const activeItems = JSON.parse(localStorage.getItem('active'));
    activeItems.forEach(item => {
        const activeItems = createTodo(item);
        todoList.appendChild(activeItems);
    });

    itemCounterElement.innerText = `${activeItems.length} Items remaining..`
};

function displayAll() {
    todoList.innerHTML = '';
    let allTodos = [];
    const completedItems = JSON.parse(localStorage.getItem('completed'));
    const activeItems = JSON.parse(localStorage.getItem('active'));

    if (completedItems && activeItems) {
        allTodos = [...activeItems, ...completedItems];
    } else if (activeItems) {
        allTodos = [...activeItems];
    } else {
        allTodos = [...completedItems];
    };

    allTodos.forEach(todo => {
        const allItems = createTodo(todo);
        todoList.appendChild(allItems);
    });

    itemCounterElement.innerText = `${allTodos.length} Items remaining..`
};

function clearAll() {

};

// Event Listeners
window.addEventListener('DOMContentLoaded', todoInit);

todoForm.addEventListener('submit', addTodo);
sunIcon.addEventListener('click', toggleDisplay);
moonIcon.addEventListener('click', toggleDisplay);

todoList.addEventListener('click', interactTodo);
completedBtn.addEventListener('click', displayCompleted);
activeBtn.addEventListener('click', displayActive);
allBtn.addEventListener('click', displayAll);
clearBtn.addEventListener('click', clearAll);