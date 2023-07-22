// DOM SELECTORS
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
    // Buttons
const allBtn = document.getElementById('all-btn');
const activeBtn = document.getElementById('active-btn');
const completedBtn = document.getElementById('completed-btn');
    // Toggle Icons
var sunIcon = document.getElementById('toggle-sun');
var moonIcon = document.getElementById('toggle-moon');


// Functions
function addToLocalStorage(key, item) {
    // check if localStorage items already exist
    const existingItems = JSON.parse(localStorage.getItem(key)) || [];
    // push new item to existing items array or to an empty array
    existingItems.push(item);
    // set all items back to local storage
    localStorage.setItem(key, JSON.stringify(existingItems));
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
    addToLocalStorage('all', newTodo);
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
            body.classList.add('light-mode');
            body.style.backgroundColor = 'hsl(236, 33%, 92%)';
            controls.classList.add('light-mode-item');
            todoInput.classList.add('input-light-mode');
            

            todoItems.forEach(item => {
                item.classList.add('light-mode-item');
            });

    } else if (moonIcon.classList.contains('display-moon') && windowWidth >= 500) {
            body.classList.add('light-mode-large');
            body.style.backgroundColor = 'hsl(236, 33%, 92%)';
            controls.classList.add('light-mode-item');
            todoInput.classList.add('input-light-mode');

            todoItems.forEach(item => {
                item.classList.add('light-mode-item');
            });
            
    } else { // Dark mode
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
        target.parentElement.remove();
    } else if (target.classList.contains('circle')) {
        target.parentElement.classList.add('checked-todo');
        target.previousElementSibling.style.display = 'block';
        addToLocalStorage('completed', target.parentElement.children[2].innerText);
        setTimeout(() => {
            target.parentElement.remove();
        }, 2000);
    } else {
        return;
    }

};



// Event Listeners
todoForm.addEventListener('submit', addTodo);
sunIcon.addEventListener('click', toggleDisplay);
moonIcon.addEventListener('click', toggleDisplay);

todoList.addEventListener('click', interactTodo);



// LOCAL STORAGE FUNCTIONALITY
    // 1.set items to local storage based on their keu (all, active, completed)
    // 2. when all, active or completed is clicked, I want the corresponding todo's to be displayed
    // 3. Be able to remove items from local storage