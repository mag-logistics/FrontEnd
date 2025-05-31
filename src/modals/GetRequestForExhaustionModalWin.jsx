import '../utils/api.js'
import api from '../utils/api.js'

function getRequestForExhaustionModalWin(modalItem) {
    let magicIndexList = [
        "1",
        "2",
        "3",
        "4",
        "5"
    ]
    let magicIndexSelected = null;

    modalItem['modalTitle'].textContent = "Подача заявки на высасывание магии";
    let text = document.createElement("p");

    let magicVolume = document.createElement("input");
    magicVolume.placeholder = "Объем магии";
    magicVolume.type = "number";

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
    magicIndex.addEventListener("change", () => {
        magicIndexSelected = this.value;
        // todo remove after test
        console.log("Выбрано:", magicIndexSelected);
    })

    let applyBtn = document.createElement("button");
    applyBtn.textContent = "Подать заявку";
    applyBtn.addEventListener("click", () =>  {
        // todo post-endpoint add
        api.post("", {
            magicVolume: magicVolume.value,
            magicEndDate: magicEndDate.value,
            magicIndex: magicIndexSelected,
        }).then(res => {
            console.log(res.data);
            console.log("Заявка подана!");
            modalItem["modalTeg"].dispatchEvent(new Event("custom-change"));
        })
    })

    modalItem["modalBody"].appendChild(text);
    modalItem["modalBody"].appendChild(magicVolume);
    modalItem["modalBody"].appendChild(magicEndDate);
    modalItem["modalBody"].appendChild(magicIndex);
    modalItem["modalBody"].appendChild(applyBtn);

    modalItem["modalTeg"].style.display = "block";
}

export default getRequestForExhaustionModalWin;