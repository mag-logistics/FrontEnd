function ResponseMagicWin(modalItem){
    modalItem['modalTitle'].textContent = "Выдача магии";

    let responseText = document.createElement("input");
    responseText.type = "text";
    responseText.value = 'Заявка №' + modalItem['content']['number'];
    responseText.disabled = true;

    let magicSelector = document.createElement('select');

    let magicVolume = document.createElement("input");
    magicVolume.type = "number";
    magicVolume.placeholder = 'Объем магии'
    magicVolume.value = 0;

    let app_btn = document.createElement('button');
    app_btn.className = 'info_button'
    app_btn.textContent = 'Выдать';
    app_btn.addEventListener('click', () => {
        console.log('');
    })

}

export default ResponseMagicWin;