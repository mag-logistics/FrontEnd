import app from "../App.jsx";

function AddExhaustionResultModalWin(modalItem) {
    let magicIndexList = [
        '1',
        '2',
        '3',
        '4',
        '5'
    ]

    modalItem['modalTitle'].textContent = "Заполнение данных о высосанной магии";

    let magicIndexSelected = null;
    let text = document.createElement("p");

    let magicIndex = document.createElement("select");
    let magicIndexPlaceholder = document.createElement("option");
    magicIndexPlaceholder.value = "";
    magicIndexPlaceholder.text = "Магический индекс";
    magicIndexPlaceholder.disabled = true;
    magicIndexPlaceholder.selected = true;
    magicIndex.appendChild(magicIndexPlaceholder);
    for (let i = 0; i < magicIndexList.length; i++) {
        let option = document.createElement("option");
        option.text = magicIndexList[i];
        option.value = magicIndexList[i];
        magicIndex.appendChild(option);
    }
    magicIndex.addEventListener("change", (event) => {
        magicIndexSelected = event.target.value;
    })

    let magicVolume = document.createElement("input");
    magicVolume.type = "number";
    magicVolume.min = "0";
    magicVolume.placeholder = "Объем полученной магии";

    let applyBtn = document.createElement("button");
    applyBtn.textContent = "Сохранить данные";
    applyBtn.className = "applyBtn";
    applyBtn.addEventListener("click", () => {
        // api.post("", {} todo right api + param
        // ).then(res => {
        //     console.log(res.data);
        //     modalItem["modalTeg"].dispatchEvent(new CustomEvent('close_event'));
        // })
    })

    modalItem["modalBody"].appendChild(text);
    modalItem["modalBody"].appendChild(magicIndex);
    modalItem["modalBody"].appendChild(magicVolume);
    modalItem["modalBody"].appendChild(applyBtn);

    modalItem["modalTeg"].style.display = "block";
}

export default AddExhaustionResultModalWin;