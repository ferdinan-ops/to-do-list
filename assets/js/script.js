const textInfo = document.querySelector("#textInfo");
const taskBox = document.querySelector(".task-box");
const filters = document.querySelectorAll(".filter span");
const clearBtn = document.querySelector("#clearBtn");

// localStorage
let todos = JSON.parse(localStorage.getItem("todo-list"));
let editId;
let isEdited = false;

textInfo.addEventListener("keyup", e => {
    let userTask = textInfo.value.trim();
    if (e.key == "Enter" && userTask) {
        if (!isEdited) {
            if (!todos) {
                todos = [];
            }
            let taskInfo = { name: userTask, status: "pending" };
            console.log(todos);
            todos.push(taskInfo);
            console.log(todos);
        } else {
            todos[editId].name = userTask;
        }
        textInfo.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        console.log(todos);
        showToDoList("all");
    }
});

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showToDoList(btn.id);
    })
});

clearBtn.addEventListener("click", () => {
    // splice berguna untuk menghapus array dlm jlh banyak => array.splice(index_mulai, index_until)
    todos.splice(0, todos.length); // hapus index 0 sampai index terkahir
    localStorage.setItem("todo-list", JSON.stringify(todos)); // update localStorage
    showToDoList("all");
});

showToDoList("all");


// Function
function showToDoList(filter) {
    let li = "";
    todos.forEach((value, index) => {
        let isCompleted = value.status == "completed" ? "checked" : "";
        if (filter == value.status || filter == "all") {
            li += `<li class="task">
                    <label for="${index}">
                        <input onclick="updateStatus(this)" type="checkbox" id="${index}" ${isCompleted}>
                        <p class="${isCompleted}">${value.name}</p>
                    </label>
                    <div class="more">
                        <i class="uil uil-ellipsis-h" onclick="showMore(this)"></i>
                        <ul class="task-menu">
                            <li onclick="editTask(${index}, '${value.name}')"><i class="uil uil-pen"></i>Edit</li>
                            <li onclick="deleteTask(${index})"><i class="uil uil-trash"></i>Delete</li>
                        </ul>
                    </div>
                </li>`;
        }
    });
    taskBox.innerHTML = li || `<span>You don't have any task here</span>`;
}

function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    console.log(taskName);
    if (selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
    // showToDoList("all");
}

function showMore(moreBtn) {
    let taskMenu = moreBtn.parentElement.lastElementChild;
    taskMenu.classList.toggle("active");
}

function deleteTask(index) {
    todos.splice(index, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showToDoList("all");
}

function editTask(index, taskName) {
    textInfo.value = taskName;
    editId = index;
    isEdited = true;
}