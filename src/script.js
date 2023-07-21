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
function createTodo(todo) {
    // create DOM ELEMENTS
    const li = document.createElement('li');
    li.className = 'todo-item';

    const para = document.createElement('p');
    para.className = 'todo-text';
    para.textContent = todo;

    const img = document.createElement('img');
    img.className = 'remove-icon';
    img.src = './images/icon-cross.svg'

    // Append children
    li.appendChild(para);
    li.appendChild(img);

    return li;
};

function addTodo(e) {
    e.preventDefault();

    const newTodo = todoInput.value;
    const todo = createTodo(newTodo);

    // Add Todo to the DOM
    todoList.appendChild(todo);

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

            todoItems.forEach(item => {
                item.classList.add('light-mode-item');
            });

    } else if (moonIcon.classList.contains('display-moon') && windowWidth >= 500) {
            body.classList.add('light-mode-large');
            body.style.backgroundColor = 'hsl(236, 33%, 92%)';
            controls.classList.add('light-mode-item');

            todoItems.forEach(item => {
                item.classList.add('light-mode-item');
            });
            
    } else { // Dark mode
            body.classList.remove('light-mode');
            body.classList.remove('light-mode-large');
            body.style.backgroundColor = 'hsl(235, 21%, 11%)';

            controls.classList.remove('light-mode-item');

            todoItems.forEach(item => {
                item.classList.remove('light-mode-item');
            });
    };
    

};



// Event Listeners
todoForm.addEventListener('submit', addTodo);
sunIcon.addEventListener('click', toggleDisplay);
moonIcon.addEventListener('click', toggleDisplay);