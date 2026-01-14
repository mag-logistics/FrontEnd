import apiService from "../api/api-services.js";
import animalToRightDict from "../DTO/Animal.js";
import autoResizeTextarea from "../utils/ResizeFunc.js";

function createAddAnimalWin(animals, modalItem){

    modalItem['modalTitle'].textContent = "Результат охоты для заявки №" + modalItem['content']['number'];

    let animalIndexSelected = null;
    let animalInfo = document.createElement("textarea");
    animalInfo.readOnly = true;
    animalInfo.style.resize = "none"; // Запретить изменение размера
    animalInfo.style.whiteSpace = "pre-wrap"; // Сохранять переносы строк
    animalInfo.style.overflow = "hidden";
    autoResizeTextarea(animalInfo)
    animalInfo.addEventListener("selectAnimal", () => {
        let pet = animals.find(pet => pet.id === animalIndexSelected);
        animalInfo.value = pet.magic_info;
        setTimeout(() => autoResizeTextarea(animalInfo), 0);
    });
    animalInfo.addEventListener("input", function ()  {
        autoResizeTextarea(this)
    })

    let animalSelector = document.createElement('select');
    let animalSelectPlaceholder = document.createElement("option");
    animalSelectPlaceholder.text = 'Доступные животные';
    animalSelectPlaceholder.value = '';
    animalSelectPlaceholder.disabled = true;
    animalSelectPlaceholder.selected = true;
    animalSelector.appendChild(animalSelectPlaceholder);
    for (let pet of animals) {
        let option = document.createElement("option");
        option.value = pet.id;
        option.text = pet.name;
        animalSelector.appendChild(option);
    }
    animalSelector.addEventListener("change", (event) => {
        animalIndexSelected = event.target.value;
        animalInfo.dispatchEvent(new CustomEvent('selectAnimal'));
    })

    let magicAnimaCount = document.createElement("input");
    magicAnimaCount.type = "number";
    magicAnimaCount.placeholder = "Количество туш";
    magicAnimaCount.min = "0";

    let apply_btn = document.createElement("button");
    apply_btn.textContent = "Подтвердить";
    apply_btn.className = 'info_button'
    apply_btn.addEventListener("click", () =>  {
        console.log("Заявка подана!");
        apiService.hunter.processHuntingApplication(modalItem['content']['number'])
            .then(response => {
                console.log(response.data);
                modalItem["modalTeg"].dispatchEvent(new CustomEvent("close_event"));
            })
            .catch(error => console.log(error));
    })

    modalItem["modalBody"].appendChild(animalSelector);
    modalItem["modalBody"].appendChild(animalInfo);
    modalItem["modalBody"].appendChild(magicAnimaCount);
    modalItem["modalBody"].appendChild(apply_btn);

    modalItem["modalTeg"].style.display = "block";
}


function GetMagicAnimalModalWin(modalItem) {
    apiService.general.getAllAnimals()
        .then(data => {
            let animals = animalToRightDict(data.data);
            createAddAnimalWin(animals, modalItem);
        })
        .catch(error => console.log(error))
}

export default GetMagicAnimalModalWin;