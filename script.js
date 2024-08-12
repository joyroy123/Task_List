const wrapper = document.querySelector(".wrapper");
const backBtn = document.querySelector(".back-btn");
const menuBtn = document.querySelector(".menu-btn");

const toggleScreen = ()=>{
    wrapper.classList.toggle("show-category");
};
menuBtn.addEventListener("click", toggleScreen);
backBtn.addEventListener("click", toggleScreen);


const addTaskBtn = document.querySelector(".add-task-btn");
const addTaskForm = document.querySelector(".add-task");
const blackBackdrop = document.querySelector(".black-backdrop");


const toggleAddTaskForm = ()=>{
    addTaskForm.classList.toggle("active");
    blackBackdrop.classList.toggle("active");
    addTaskBtn.classList.toggle("active");
};

addTaskBtn.addEventListener("click",toggleAddTaskForm);
blackBackdrop.addEventListener("click",toggleAddTaskForm);


// Lets add categories and tasks with js

let categories = [
    {
        title: "Personal",
        img: "boy.png",
    },
    {
        title: "Coding",
        img: "web-design.png",
    },
    {
        title: "Health",
        img: "healthcare.png",
    },
    {
        title: "Shopping",
        img: "shopping.png",
    },
    {
        title: "Work",
        img: "briefcase.png",
    },
    {
        title: "Fitness",
        img: "dumbbell.png",
    },
    {
        title: "Education",
        img: "education.png",
    },
    {
        title: "Finance",
        img: "saving.png",
    },
];

let tasks = [
    {
        id: 1,
        task: "Go to market",
        category: "Shopping",
        completed: false,
    },
    {
        id: 2,
        task: "Read a chapter of a book",
        category: "Personal",
        completed: false,
    },
    {
        id: 3,
        task: "Prepare presentation for meeting",
        category: "Work",
        completed: false,
    },
    {
        id: 4,
        task: "Complate coding challenge",
        category: "Coding",
        completed: false,
    },
    {
        id: 5,
        task: "Take a 30-minute walk",
        category: "Health",
        completed: false,
    },
];

let selectedCategory = categories[0];

const categoriesContainer = document.querySelector(".categories");
const categoryTitle = document.querySelector(".category-title");
const totalCategorytasks = document.querySelector(".category-tasks");
const categoryImg = document.querySelector("#category-img");
const totalTasks = document.querySelector(".totalTasks");

const calculateTotal = ()=>{
    const categoryTasks = tasks.filter((task)=> 
        task.category.toLowerCase() === selectedCategory.title.toLowerCase()
    );

    totalCategorytasks.innerHTML = `${categoryTasks.length} Tasks`;
    totalTasks.innerHTML = tasks.length;
};


const renderCategories = ()=>{
    categoriesContainer.innerHTML="";
    categories.forEach((category)=>{
    // Get all the tasks of current category
    const categoryTasks = tasks.filter((task)=> task.category.toLowerCase() === category.title.toLowerCase());

        // Create a div to render category
        const div = document.createElement("div");
        div.classList.add("category");
        div.addEventListener("click", ()=>{
            wrapper.classList.add("show-category");
            selectedCategory = category;
            categoryTitle.innerHTML = category.title;
            categoryImg.src = `images/${category.img}`;
            calculateTotal();
            //re-render tasks when category change
            renderTasks();
        });
        div.innerHTML = `
                    <div class="left">
                        <img src="images/${category.img}" alt="${category.title}">
                        <div class="content">
                            <h1>${category.title}</h1>
                            <p>${categoryTasks.length} Tasks</p>
                        </div>
                    </div>
                    <div class="options">
                        <div class="toggle-btn">
                            <svg
                                xmlns = "https://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6">
                                <path 
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                                />
                            </svg>
                        </div>
                    </div> 
        `;

        categoriesContainer.appendChild(div);
    });
};

const tasksContainer = document.querySelector(".tasks");

const renderTasks = ()=>{
    tasksContainer.innerHTML = "";
    const categoryTasks = tasks.filter((task)=> 
        task.category.toLowerCase() === selectedCategory.title.toLowerCase()
    );
    // If no task for seleted category
    if(categoryTasks.length === 0){
        tasksContainer.innerHTML = `
        <p class="no-task">No tasks for this category.</p>
        `;
    }else{
        // if there are tasks for selected category render them
        categoryTasks.forEach((task) =>{
            const div = document.createElement("div");
            div.classList.add("task-wrapper");
            const label = document.createElement("label");
            label.classList.add("task");
            label.setAttribute("for", task.id);
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = task.id;
            checkbox.checked= task.completed;

            // add completion functionlity on click checkbox
            checkbox.addEventListener("change", ()=>{
                const index = tasks.findIndex((t) => t.id === task.id);
                // change the true and false
                tasks[index].completed=!tasks[index].completed;
                // save in local
                saveLocal(); 
            });


            div.innerHTML = `
                <div class="delete">
                    <svg
                        xmlns = "https://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6">
                        <path 
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"
                        />
                    </svg>
                </div>
            `;

            label.innerHTML = `
                <span class="checkmark">
                    <svg
                        xmlns = "https://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6">
                        <path 
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                        />
                    </svg>
                </span>
                <p>${task.task}</p>
            `;

            label.prepend(checkbox);
            div.prepend(label);
            tasksContainer.appendChild(div);


            // delete functionality
            const deleteBtn = div.querySelector(".delete");
            deleteBtn.addEventListener("click", ()=>{
                const index = tasks.findIndex((t) => t.id === task.id);

                // remove the clicked task
                tasks.splice(index, 1);
                saveLocal();
                renderTasks();
            });
        });
        renderCategories();
        calculateTotal();
    }
};

// save and get tasks from local storage
const saveLocal =()=>{
    localStorage.setItem("tasks", JSON.stringify(tasks));
};
const getLocal = ()=>{
    const localTasks = JSON.parse(localStorage.getItem("tasks"));
    // if tasks found
    if(localTasks){
        tasks=localTasks;
    }
};

// lets add functionality to add new tasks

// render all the categories in select
const categorySelect = document.querySelector("#category-select");
const cancelBtn = document.querySelector(".cancel-btn");
const addBtn = document.querySelector(".add-btn");
const taskInput = document.querySelector("#task-input");

cancelBtn.addEventListener("click", toggleAddTaskForm);

addBtn.addEventListener("click", ()=>{
    const task = taskInput.value;
    const category = categorySelect.value;

    if(task === ""){
        alert("Please Enter a Task!");
    }else{
        const newTask = {
            id: tasks.length+1,
            task,
            category,
            completed: false,
        };
        tasks.push(newTask);
        taskInput.value="";
        saveLocal();
        toggleAddTaskForm();
        renderTasks();

    }
});

categories.forEach((category) =>{
    const option = document.createElement("option");
    option.value = category.title.toLowerCase();
    option.textContent = category.title;
    categorySelect.appendChild(option);
});

// these all are already stored tasks
getLocal();
calculateTotal();
renderTasks();