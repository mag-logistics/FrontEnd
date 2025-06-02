import '../utils/api.js'
import api from '../utils/api.js'


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
    magicIndex.addEventListener("change", () => {
        magicIndexSelected = this.value;
    })

    let magicAdditionDescription = document.createElement("input");
    magicAdditionDescription.placeholder = "Подробные характеристики";
    magicAdditionDescription.type = "text";

    let apply_btn = document.createElement("button");
    apply_btn.textContent = "Подать заявку";
    apply_btn.addEventListener("click", () =>  {
        console.log("Заявка подана!");
        // todo post-endpoint add
        api.post("", {
            magicVolume: magicVolume.value,
            magicEndDate: magicEndDate.value,
            magicIndex: magicIndex.value,
            magicAdditionDescription: magicAdditionDescription.value
        }).then(res => {
            console.log(res.data);
            modalItem["modalTeg"].dispatchEvent(new Event("custom-change"));
        })
    })

    modalItem["modalBody"].appendChild(text);
    modalItem["modalBody"].appendChild(magicVolume);
    modalItem["modalBody"].appendChild(magicEndDate);
    modalItem["modalBody"].appendChild(magicIndex);
    modalItem["modalBody"].appendChild(magicAdditionDescription);
    modalItem["modalBody"].appendChild(apply_btn);

    modalItem["modalTeg"].style.display = "block";
}

export default openMagicGetModalWin;
