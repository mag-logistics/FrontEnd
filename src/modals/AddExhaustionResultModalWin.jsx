import app from "../App.jsx";
import apiClient from "../api/api-client.js";

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
    console.log(modalItem)
    console.log(modalItem['content'])
    applyBtn.addEventListener("click", () =>  {
        apiClient.put(`/exhaustion/magic/add?orderId=${modalItem.content.number}`, {      // todo добавить сюда отправку конкретного id в параметры запроса
            id: magicIndex.value,
            volume: magicVolume.value
        }).then(res => {
            console.log(res.data);
            let event = new CustomEvent('close_event')
            modalItem["modalTeg"].dispatchEvent(event);
        })

        let event = new CustomEvent('close_event')
        modalItem["modalTeg"].dispatchEvent(event);
    })

    modalItem["modalBody"].appendChild(text);
    modalItem["modalBody"].appendChild(magicIndex);
    modalItem["modalBody"].appendChild(magicVolume);
    modalItem["modalBody"].appendChild(applyBtn);

    modalItem["modalTeg"].style.display = "block";
}

export default AddExhaustionResultModalWin;