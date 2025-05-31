import '../utils/api.js'
import api from '../utils/api.js'


function enteringStorageDataModalWin(modalItem) {
    let magicCreaturesList = [
        "Кристальные пауки",
        "Лесных духов",
        "Болотные кикиморы",
        "Домовые",
        "Болотных кикимор"
    ]

    let magicCreatureStorageList = [
        "Склад-1",
        "Склад-2",
        "Склад-3",
        "Склад-4",
        "Склад-5"
    ]

    modalItem['modalTitle'].textContent = "Данные о месте хранения магических существ"
    let magicCreaturesSpeciesSelected = null;
    let magicCreaturesStorageSelected = null;

    let text = document.createElement("p");
    let magicCreaturesName = document.createElement("input");
    magicCreaturesName.placeholder = "Наименование магического существа";
    magicCreaturesName.type = "text";

    let magicCreaturesSpecies = document.createElement("select");
    let magicCreaturesSpeciesPlaceholder = document.createElement("option");
    magicCreaturesSpeciesPlaceholder.value = "";
    magicCreaturesSpeciesPlaceholder.text = "Вид";
    magicCreaturesSpeciesPlaceholder.disabled = true;
    magicCreaturesSpeciesPlaceholder.selected = true;
    magicCreaturesSpecies.appendChild(magicCreaturesSpeciesPlaceholder);
    for (let i = 0; i < magicCreaturesName.length; i++) {
        let option = document.createElement("option");
        option.value = magicCreaturesList[i];
        option.text = magicCreaturesList[i];
        magicCreaturesSpecies.appendChild(option);
    }
    magicCreaturesSpecies.addEventListener("change", () => {
        magicCreaturesSpeciesSelected = this.value;
        console.log("Выбрано:", magicCreaturesSpeciesSelected);
    })

    let magicCreaturesStorage = document.createElement("select");
    let magicCreaturesStoragePlaceholder = document.createElement("option");
    magicCreaturesStoragePlaceholder.value = "";
    magicCreaturesStoragePlaceholder.text = "Вид";
    magicCreaturesStoragePlaceholder.disabled = true;
    magicCreaturesStoragePlaceholder.selected = true;
    magicCreaturesStorage.appendChild(magicCreaturesStoragePlaceholder);
    for (let i = 0; i < magicCreatureStorageList.length; i++) {
        let option = document.createElement("option");
        option.value = magicCreatureStorageList[i];
        option.text = magicCreatureStorageList[i];
        magicCreaturesStorage.appendChild(option);
    }
    magicCreaturesStorage.addEventListener("change", () => {
        magicCreaturesStorageSelected = this.value;
        console.log("Выбрано:", magicCreaturesStorageSelected);
    })

    let storageSaveBtn = document.createElement("button");
    storageSaveBtn.textContent = "Сохранить данные";
    storageSaveBtn.addEventListener("click", () =>  {
        // todo post-endpoint add
        if (magicCreaturesSpeciesSelected === null && magicCreaturesStorageSelected === null) {
            console.log("Не заполнены поля!");
        }
        else {
            api.post("", {
                magicCreaturesName: magicCreaturesName.value,
                magicCreaturesSpecies: magicCreaturesSpeciesSelected,
                magicCreaturesStorage: magicCreaturesStorageSelected
            }).then(res => {
                console.log(res.data);
            })
            console.log("Заявка подана!");
            modalItem["modalTeg"].dispatchEvent(new Event("custom-change"));
        }
    })

    modalItem["modalBody"].appendChild(text);
    modalItem["modalBody"].appendChild(magicCreaturesName);
    modalItem["modalBody"].appendChild(magicCreaturesSpecies);
    modalItem["modalBody"].appendChild(magicCreaturesStorage);
    modalItem["modalBody"].appendChild(storageSaveBtn);
    modalItem["modalTeg"].style.display = "block";
}

export default enteringStorageDataModalWin;
