import '../api/api-client.js'
import apiClient from '../api/api-client.js'
import apiService from "../api/api-services.js";

function showError(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.remove("hidden");
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
        toast.classList.add("hidden");
    }, 3000);
}

function openMagicGetModalWin(modalItem) {
    let magicIndexList = [
        "1",
        "2",
        "3",
        "4",
        "5"
    ]

    let magicIndexSelected = null;
    modalItem['modalTitle'].textContent = "Подача заявки на получение магии";
    let text = document.createElement("p");

    let magicVolume = document.createElement("input");
    magicVolume.placeholder = "Объем магии";
    magicVolume.type = "number";
    magicVolume.min = "0";

    let magicEndDate = document.createElement("input");
    magicEndDate.placeholder = "Срок";
    magicEndDate.type = "date";

    let magicIndex = document.createElement("select");
    let magicIndexPlaceholder = document.createElement("option");
    magicIndexPlaceholder.value = "";
    magicIndexPlaceholder.text = "Магический индекс";
    magicIndexPlaceholder.disabled = true;
    magicIndexPlaceholder.selected = true;
    magicIndex.appendChild(magicIndexPlaceholder);
    for (let i = 0; i < magicIndexList.length; i++) {
        let option = document.createElement("option");
        option.value = magicIndexList[i];
        option.text = magicIndexList[i];
        magicIndex.appendChild(option);
    }
    magicIndex.addEventListener("change", (event) => {
        magicIndexSelected = event.target.value;
    })

    let apply_btn = document.createElement("button");
    apply_btn.className = "info_button";
    apply_btn.textContent = "Подать заявку";
    apply_btn.addEventListener("click", () =>  {
        console.log("Заявка подана!");
        apiService.magician.createApp('', {
            quantity: magicVolume.value,
            deadline: magicEndDate.value,
            magicId: magicIndexSelected.toString()
        }).then(res => {
            console.log(res.data);
            // let event = new CustomEvent("close_event");
            // modalItem["modalTeg"].dispatchEvent(event);
        }).catch(err => console.log(err));
        console.log(magicIndexSelected)
        let event = new CustomEvent("close_event");
        modalItem["modalTeg"].dispatchEvent(event);
    })

    let saveAsPattern = document.createElement("button");
    saveAsPattern.className = "info_button";
    saveAsPattern.textContent = 'Сохранить как шаблон'
    saveAsPattern.addEventListener("click", () =>  {
        if (magicIndexSelected !== null &&
        magicVolume.value !== "" && magicEndDate.value !== "") {
            apiService.magician.createAppPattern(magicIndexSelected)
        } else {
            showError('Пустые поля')
        }

    })

    modalItem["modalBody"].appendChild(text);
    modalItem["modalBody"].appendChild(magicVolume);
    modalItem["modalBody"].appendChild(magicEndDate);
    modalItem["modalBody"].appendChild(magicIndex);
    modalItem["modalBody"].appendChild(apply_btn);
    modalItem["modalBody"].appendChild(saveAsPattern);

    modalItem["modalTeg"].style.display = "block";
}

export default openMagicGetModalWin;
