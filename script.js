let tasks = []
const taskList = document.getElementById("list")
const addList = document.getElementById("add")
const counter = document.getElementById("tasks-counter")

function addTask(task) {
    if (task) {
        tasks.push(task)
        renderList(tasks)
        // showNotification("Task added successfully")
        return
    }

    showNotification("Task cannot be added")
}

function deleteTask(taskId) {
    const newtasks = tasks.filter(function (task) {
        return task.id !== taskId
    })

    tasks = newtasks
    renderList(tasks)
    showNotification("Task deleted successfully")
}

function toggleTask(taskId) {
    const newtasks = tasks.filter(function (task) {
        return task.id === taskId
    })

    if (newtasks.length > 0) {
        const currentTask = newtasks[0]
        currentTask.done = !currentTask.done
        renderList(tasks)
        // showNotification("Task toggled successfully")
        return
    }

    showNotification("Could not toggle the task")
}

function addTaskToDOM(task) {
    const li = document.createElement('li')
    li.innerHTML = `
    <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
    <label for="${task.id}">${task.text}</label>
    <img src="delete.png" class="delete" data-id="${task.id}" />
    `
    taskList.append(li)
}

function renderList(tasks) {
    taskList.innerHTML = ''
    for (let i = 0; i < tasks.length; i++) {
        addTaskToDOM(tasks[i])
    }
    counter.innerHTML = tasks.length
}

function showNotification(text) {
    alert(text)
}

function handleEnter(event) {
    if (event.key === 'Enter') {
        const text = event.target.value

        if (!text) {
            showNotification("Task cannot be empty")
            return
        }
        console.log('Text: ', text)
        const task = {
            text: text,
            id: Date.now().toString(),
            done: false
        }
        event.target.value = ''
        addTask(task)
    }
}

function handleClick(event) {
    const target = event.target

    if (target.className === 'delete') {
        const taskId = target.dataset.id
        deleteTask(taskId)
        return
    } else if (target.className === 'custom-checkbox') {
        const taskId = target.id
        toggleTask(taskId)
        return
    }
}

function initilizeApp() {
    addList.addEventListener('keyup', handleEnter)
    document.addEventListener('click', handleClick)
}

initilizeApp()