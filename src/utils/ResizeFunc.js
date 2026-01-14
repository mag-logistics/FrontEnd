function autoResizeTextarea(textarea) {
    // Сбрасываем высоту чтобы получить правильный scrollHeight
    textarea.style.height = 'auto';
    // Устанавливаем высоту равную scrollHeight
    textarea.style.height = textarea.scrollHeight + 'px';
}

export default autoResizeTextarea;