import '../api/api-client.js'
import apiService from "../api/api-services.js";
import showMessage from "../utils/MessageWindow.js";


function CreateForm(modalItem, magic, patterns) {
    let magicIndexSelected = null;

    let patternSelector = document.createElement("select");
    let patternSelectPlaceholder = document.createElement("option");
    patternSelectPlaceholder.text = "Доступные шаблоны"
    patternSelectPlaceholder.value = "";
    patternSelectPlaceholder.disabled = true;
    patternSelectPlaceholder.selected = true;
    patternSelector.appendChild(patternSelectPlaceholder);
    for (let i = 0; i < patterns.length; i++) {
        let pattern = patterns[i];
        let option = document.createElement("option");
        option.value = i;
        option.text = pattern.name;
        patternSelector.appendChild(option);
    }

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
    magicIndexPlaceholder.text = "Доступная магия";
    magicIndexPlaceholder.disabled = true;
    magicIndexPlaceholder.selected = true;
    magicIndex.appendChild(magicIndexPlaceholder);
    for (let i = 0; i < magic.length; i++) {
        let option = document.createElement("option");
        option.value = magic[i].id;
        option.text = magic[i].name;
        magicIndex.appendChild(option);
    }

    magicIndex.addEventListener("change", (event) => {
        magicIndexSelected = event.target.value;
    })
    patternSelector.addEventListener("change", (event) => {
        let pattern = patterns[event.target.value];
        let currentMagicIndex = magic.findIndex(mag => mag.id === pattern.magic.id);

        magicVolume.value = pattern.volume;
        magicEndDate.value = pattern.deadline;
        magicIndex.selectedIndex = currentMagicIndex + 1;
    })

    let apply_btn = document.createElement("button");
    apply_btn.className = "info_button";
    apply_btn.textContent = "Подать заявку";
    apply_btn.addEventListener("click", () =>  {
        console.log("Заявка подана!");
        apiService.magician.createApp(localStorage.getItem('user_id'), {
            volume: parseInt(magicVolume.value),
            deadline: magicEndDate.value,
            magic: {
                id: magicIndexSelected.toString()
            }
        }).then(res => {
            console.log("Answ");
            console.log(res.data);
            let event = new CustomEvent("close_event");
            modalItem["modalTeg"].dispatchEvent(event);
        }).catch(err => console.log("Err" + err));
        console.log(magicIndexSelected)
    })

    let saveAsPattern = document.createElement("button");
    saveAsPattern.className = "info_button";
    saveAsPattern.textContent = 'Сохранить как шаблон'
    saveAsPattern.addEventListener("click", () =>  {
        if (magicIndexSelected !== null &&
            magicVolume.value !== "" && magicEndDate.value !== "") {
            apiService.magician.createAppPattern(localStorage.getItem('user_id'),{
                volume: parseInt(magicVolume.value),
                deadline: magicEndDate.value,
                magic: {
                    id: magicIndexSelected.toString()
                }
            }).then(res => {
                console.log("Answ");
                console.log(res.data);
                showMessage('Шаблон сохранен', false)
            }).catch(error => {
                console.log(error)
            })
        } else {
            showMessage('Пустые поля')
        }

    })

    modalItem["modalBody"].appendChild(text);
    modalItem["modalBody"].appendChild(patternSelector);
    modalItem["modalBody"].appendChild(magicVolume);
    modalItem["modalBody"].appendChild(magicEndDate);
    modalItem["modalBody"].appendChild(magicIndex);
    modalItem["modalBody"].appendChild(apply_btn);
    modalItem["modalBody"].appendChild(saveAsPattern);

    modalItem["modalTeg"].style.display = "block";
}

function OpenMagicGetModalWin(modalItem) {
    const magicPromise = apiService.general.getAllMagic()
    const patternsPromise = apiService.magician.getAllAppPatterns(sessionStorage.getItem('user_id'))

    Promise.all([magicPromise, patternsPromise])
        .then(([magicData, patternsData]) => {
            let formattedMagic = magicData.data.map(magicItem => {
                return {
                    id: magicItem.id,
                    name: "Тип: " + magicItem?.magicType?.name + " " +
                        "Цвет: " + magicItem?.magicColour?.name + " " +
                        "Состояние: " + magicItem?.magicState?.name + " " +
                        "Мощность: " + magicItem?.magicPower?.name
                }
            })

            let formattedPatterns = patternsData.data.map(pattern => {
                return {
                    id: pattern.id,
                    volume: pattern.volume,
                    deadline: pattern.deadline.split('T')[0],
                    magic: pattern.magic,
                    name: "Объем: " + pattern.volume + "\n" +
                        "Тип: " + pattern?.magic?.magicType?.name + " " +
                        "Цвет: " + pattern?.magic?.magicColour?.name + " " +
                        "Состояние: " + pattern?.magic?.magicState?.name + " " +
                        "Мощность: " + pattern?.magic?.magicPower?.name
                }
            })

            CreateForm(modalItem, formattedMagic, formattedPatterns);
        })
        .catch(error => console.log(error));

    // apiService.general.getAllMagic()
    //     .then(data => {
    //         console.log(data.data);
    //         let magic = data.data;
    //         let formattedMagic = magic.map(magicItem => {
    //             return {
    //                 id: magicItem.id,
    //                 name: "Тип: " + magicItem?.magicType?.name + " " +
    //                     "Цвет: " + magicItem?.magicColour?.name + " " +
    //                     "Состояние: " + magicItem?.magicState?.name + " " +
    //                     "Мощность: " + magicItem?.magicPower?.name
    //             }
    //         })
    //         CreateForm(modalItem, formattedMagic);
    //     })
    //     .catch(error => {
    //         console.error(error);
    // })
}

export default OpenMagicGetModalWin;
