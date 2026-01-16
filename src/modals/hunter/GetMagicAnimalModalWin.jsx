import apiService from "../../api/api-services.js";
import animalToRightDict from "../../DTO/Animal.js";
import autoResizeTextarea from "../../utils/ResizeFunc.js";
import showMessage from "../../utils/MessageWindow.js";

function createAnimalBlock(animals){
    let animalIndexSelected = null;

    const container = document.createElement("div");
    container.className = "animal-block";

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
    animalSelector.className = "animal-selector";
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
    magicAnimaCount.className = "animal-count";
    magicAnimaCount.type = "number";
    magicAnimaCount.placeholder = "Количество туш";
    magicAnimaCount.min = "0";

    container.appendChild(animalSelector);
    container.appendChild(animalInfo);
    container.appendChild(magicAnimaCount);

    return container;
}

function getAndCheckResult(target){
    let checked = false;
    let result = {};
    let animalsBlock = document
        .getElementsByClassName('animals-container')[0]
        .querySelectorAll(".animal-block")

    for (let block of animalsBlock) {
        let animalId = block
            .querySelector('.animal-selector')
            .selectedOptions[0]
            .value;
        let animalCount = block
            .querySelector('.animal-count')
            .valueAsNumber;

        if (checked !== true &&
            animalId === target['animalId']) {
            target['count'] -= animalCount;
        }

        if (checked === false && target['count'] <= 0) {
            checked = true;
        }

        result[animalId] = (result[animalId] || 0) + animalCount;
    }

    return [checked, result];
}


function createAddAnimalWin(animals, modalItem){
    modalItem['modalTitle'].textContent = "Результат охоты для заявки №" + modalItem['content']['number'];

    const animalContainer = document.createElement("div");
    animalContainer.className = "animals-container";

    animalContainer.appendChild(createAnimalBlock(animals));

    let addAnimalBtn = document.createElement("button");
    addAnimalBtn.textContent = 'Добавить животное';
    addAnimalBtn.className = "info_button";
    addAnimalBtn.addEventListener("click", () =>{
        animalContainer.appendChild(createAnimalBlock(animals));
    })

    let applyBtn = document.createElement("button");
    applyBtn.textContent = "Подтвердить";
    applyBtn.className = 'info_button'
    applyBtn.addEventListener("click", () =>  {
        let [checked, huntingResult] = getAndCheckResult(
            {
                animalId: modalItem['content']['applications']['animal']['id'],
                count: modalItem['content']['applications']['count']
            }
        );
        if (checked) {
            // todo realize after back update
            // apiService.hunter.processHuntingApplication(modalItem['content']['number'])
            //     .then(() => {
            //         modalItem["modalTeg"].dispatchEvent(new CustomEvent("close_event"));
            //     })
            //     .catch(error => console.log(error));
             console.log(huntingResult)
        } else {
            console.log(huntingResult)
            showMessage('Не набрано минимальное количество требуемых туш')
        }
    })

    modalItem["modalBody"].appendChild(animalContainer);
    modalItem["modalBody"].appendChild(addAnimalBtn);
    modalItem["modalBody"].appendChild(applyBtn);

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