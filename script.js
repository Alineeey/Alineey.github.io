document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
  });
  
  function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");
    
    if (taskInput.value === "") {
      alert("Por favor, insira uma tarefa!");
      return;
    }
    
    var li = document.createElement("li");
    li.textContent = taskInput.value;
    li.addEventListener("click", toggleTaskCompletion);
    li.addEventListener("dblclick", editTask); // Adiciona um evento de duplo clique para editar o item
    taskList.appendChild(li);
    
    taskInput.value = "";
  
    saveTasks();
  }
  
  function clearTask(event) {
    var listItem = event.target;
    listItem.remove();
    saveTasks();
  }
  
  function toggleTaskCompletion(event) {
    var listItem = event.target;
    listItem.classList.toggle("completed");
  
    saveTasks();
  }
  
  function editTask(event) {
    var listItem = event.target;
    var newText = prompt("Editar Tarefa:", listItem.textContent);
    if (newText !== null) {
      listItem.textContent = newText;
      saveTasks();
    }
  }
  
  function saveTasks() {
    var taskList = document.getElementById("taskList").innerHTML;
    localStorage.setItem("tasks", taskList);
  }
  
  function loadTasks() {
    var taskList = document.getElementById("taskList");
    var savedTasks = localStorage.getItem("tasks");
    
    if (savedTasks) {
      taskList.innerHTML = savedTasks;
      var tasks = taskList.getElementsByTagName("li");
      for (var i = 0; i < tasks.length; i++) {
        tasks[i].addEventListener("click", toggleTaskCompletion);
        tasks[i].addEventListener("dblclick", editTask); // Adiciona evento de duplo clique para editar o item carregado
        tasks[i].addEventListener("contextmenu", function(event) {
          event.preventDefault();
          clearTask(event);
        });
      }
    }
  }
  
  document.getElementById("clearTasksBtn").addEventListener("click", clearCompletedTasks);
  