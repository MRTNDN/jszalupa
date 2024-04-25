 
 

 // Получаем элементы
 console.log("JavaScript is loaded");
 const modal = document.getElementById("myModal");
 const openModalBtn = document.getElementById("openModalBtn");
 const closeModalBtn = document.getElementById("closeModalBtn");

 // Добавляем обработчик события для открытия модального окна
 openModalBtn.addEventListener("click", function() {
     modal.style.display = "flex"; // Показать модальное окно
 });

 // Добавляем обработчик события для закрытия модального окна
 closeModalBtn.addEventListener("click", function() {
     modal.style.display = "none"; // Скрыть модальное окно
 });

 // Закрытие модального окна при клике за его пределы
 window.addEventListener("click", function(event) {
     if (event.target === modal) {
         modal.style.display = "none";
     }
 });