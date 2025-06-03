import '../utils/api.js'
import api from '../utils/api.js'


function enteringStorageDataModalWin(modalItem) {
    let magicCreaturesList = [ // todo api request from back
        "Кристальные пауки",
        "Лесных духов",
        "Болотные кикиморы",
        "Домовые",
        "Болотных кикимор"
    ]

    modalItem['modalTitle'].textContent = "Данные о месте хранения магических существ"
    let magicCreaturesNameSelected = null;

    let text = document.createElement("p");

    let magicCreaturesName = document.createElement("select");
    let magicCreaturesNamePlaceholder = document.createElement("option");
    magicCreaturesNamePlaceholder.value = "";
    magicCreaturesNamePlaceholder.text = "Наименование магического существа";
    magicCreaturesNamePlaceholder.disabled = true;
    magicCreaturesNamePlaceholder.selected = true;
    magicCreaturesName.appendChild(magicCreaturesNamePlaceholder);
    for (let i = 0; i < magicCreaturesList.length; i++) {
        let option = document.createElement("option");
        option.value = magicCreaturesList[i];
        option.text = magicCreaturesList[i];
        magicCreaturesName.appendChild(option);
    }
    magicCreaturesName.addEventListener("change", (event) => {
        magicCreaturesNameSelected = event.target.value;
    })

    let magicCreaturesCount = document.createElement("input");
    magicCreaturesCount.placeholder = "Количество магических существ";
    magicCreaturesCount.type = "number";
    magicCreaturesCount.min = "1";

    let magicCreaturesStorage = document.createElement("input");
    magicCreaturesStorage.type = "text";
    magicCreaturesStorage.placeholder = "Место хранения";

    let storageSaveBtn = document.createElement("button");
    storageSaveBtn.textContent = "Сохранить данные";
    storageSaveBtn.addEventListener("click", () =>  {
        if (magicCreaturesNameSelected === null) {
            console.log("Не заполнены поля!");
        }
        else {
            api.post("hunter/order/create", { // todo so-so xd
                magicCreaturesName: magicCreaturesNameSelected,
                magicCreaturesCount: magicCreaturesCount.value,
                magicCreaturesStorage: magicCreaturesStorage.value
            }).then(res => {
                console.log(res.data);
            })
            console.log("Заявка подана!");
            modalItem["modalTeg"].dispatchEvent(new CustomEvent("close_event"));
        }
    })

    modalItem["modalBody"].appendChild(text);
    modalItem["modalBody"].appendChild(magicCreaturesName);
    modalItem["modalBody"].appendChild(magicCreaturesCount);
    modalItem["modalBody"].appendChild(magicCreaturesStorage);
    modalItem["modalBody"].appendChild(storageSaveBtn);
    modalItem["modalTeg"].style.display = "block";
}

export default enteringStorageDataModalWin;
