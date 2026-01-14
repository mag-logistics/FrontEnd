import apiService from "../api/api-services.js";
import animalToRightDict from "../DTO/Animal.js";
import autoResizeTextarea from "../utils/ResizeFunc.js";

function CreateRequestWin(animals, modalItem){
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

    let animalCount = document.createElement("input");
    animalCount.placeholder = "Количество зверей";
    animalCount.type = "number";
    animalCount.min = "0";

    let animalEndDate = document.createElement("input");
    animalEndDate.type = "date";

    let apply_btn = document.createElement("button");
    apply_btn.className = "info_button";
    apply_btn.textContent = "Подать заявку";
    apply_btn.addEventListener("click", () => {
        console.log("Заявка подана!");
        apiService.extractor.createHunterApplication(
            {
                magicId: null,
                volume: parseInt(animalCount.value),
                deadline: animalEndDate.value

            }
        ).then((res) => {
            console.log("Answ");
            console.log(res.data);
            modalItem["modalTeg"].dispatchEvent(new CustomEvent("close_event"));
        }).catch(err => console.log("Err" + err));
    })

    let back_btn = document.createElement("button");
    back_btn.className = "info_button";
    back_btn.textContent = "Отмена"
    back_btn.addEventListener("click", () => {
        modalItem["modalTeg"].dispatchEvent(new CustomEvent("close_event"));
    })

    modalItem["modalBody"].appendChild(animalSelector);
    modalItem["modalBody"].appendChild(animalInfo);
    modalItem["modalBody"].appendChild(animalCount);
    modalItem["modalBody"].appendChild(animalEndDate);
    modalItem["modalBody"].appendChild(back_btn);
    modalItem["modalBody"].appendChild(apply_btn);

    modalItem["modalTeg"].style.display = "block";
}


function AddHuntingRequestWin(modalItem) {
     apiService.general.getAllAnimals()
         .then(data => {
             let animals = animalToRightDict(data.data);
             CreateRequestWin(animals, modalItem);
         })
         .catch(error => console.log(error))

    modalItem['modalTitle'] = 'Создание заявки на высасывание'

}

export default AddHuntingRequestWin;