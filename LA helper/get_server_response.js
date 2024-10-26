document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Отменяем стандартное поведение отправки формы

    // Получаем значение из поля ввода
    const inputValue = document.getElementById('inputValue').value;

    // Формируем URL с подставленным значением
    fetch(`http://localhost:3000/fetch-html/${inputValue}`)
        .then(response => response.text())  // Получаем текстовый ответ (HTML-код)
        .then(html => {
            // Вставляем полученный HTML в элемент с id="content"
            document.getElementById('content').innerHTML = html;
        })
        .catch(error => console.error('Ошибка при получении данных:', error));
});
