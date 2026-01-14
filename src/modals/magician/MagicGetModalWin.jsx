import '../../api/api-client.js'
import apiService from "../../api/api-services.js";
import showMessage from "../../utils/MessageWindow.js";


function CreateForm(modalItem, magic, patterns) {
    let magicIndexSelected = null;
    let isEdge = navigator.userAgent.includes('Edg');

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
    magicVolume.step = "1";
    magicVolume.addEventListener("input", (event) => {
        magicVolume.value = event.target.value.replace(/[^0-9]/g, '')
    })

    let magicEndDate = document.createElement("input");
    magicEndDate.type = "date";
    let today = new Date();
    let maxDay = new Date(today);
    maxDay.setFullYear(today.getFullYear() + 2);

    magicEndDate.min = today.toISOString().split("T")[0]
    magicEndDate.max = maxDay.toISOString().split("T")[0];

    magicEndDate.addEventListener("change", () => {
        if (!magicEndDate.value) return;

        const value = new Date(magicEndDate.value);
        const max = new Date(magicEndDate.max);

        if (value > max) {
            magicEndDate.value = magicEndDate.max;
        }
    });


    if (isEdge) {
        magicEndDate.style.cssText = `background: white url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" stroke="gray"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>') no-repeat right 10px center/16px;
        -webkit-appearance: none;
        appearance: none;`;
    }


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
        magicIndex.dispatchEvent(new Event('change'));
    })

    let apply_btn = document.createElement("button");
    apply_btn.className = "info_button";
    apply_btn.textContent = "Подать заявку";
    apply_btn.addEventListener("click", () => {
        if (magicIndexSelected === null) {
            showMessage('Пустое поле')
            return;
        }
        apiService.magician.createApp(sessionStorage.getItem('user_id'), {
            volume: parseInt(magicVolume.value),
            deadline: magicEndDate.value,
            magic: {
                id: magicIndexSelected.toString()
            }
        }).then(() => {
            modalItem["modalTeg"].dispatchEvent(new CustomEvent("close_event"));
        }).catch(err => console.log("Err" + err));
    })

    let saveAsPattern = document.createElement("button");
    saveAsPattern.className = "info_button";
    saveAsPattern.textContent = 'Сохранить как шаблон'
    saveAsPattern.addEventListener("click", () => {
        if (magicIndexSelected !== null &&
            magicVolume.value !== "" && magicEndDate.value !== "") {
            apiService.magician.createAppPattern(sessionStorage.getItem('user_id'), {
                volume: parseInt(magicVolume.value),
                deadline: magicEndDate.value,
                magic: {
                    id: magicIndexSelected.toString()
                }
            }).then(() => {
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
}

export default OpenMagicGetModalWin;
