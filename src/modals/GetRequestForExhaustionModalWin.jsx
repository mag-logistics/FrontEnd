import '../api/api-client.js'
import apiClient from '../api/api-client.js'
import apiService from "../api/api-services.js";

function getRequestForExhaustionModalWin(modalItem) {
    let appId = modalItem.content?.['number'];

    modalItem['modalTitle'].textContent = "Подача заявки на высасывание магии";
    let text = document.createElement("p");

    let magicVolume = document.createElement("input");
    magicVolume.placeholder = "Объем магии";
    magicVolume.type = "number";
    magicVolume.min = "0";

    let magicEndDate = document.createElement("input");
    magicEndDate.placeholder = "Срок";
    magicEndDate.type = "date";

    let applyBtn = document.createElement("button");
    applyBtn.textContent = "Подать заявку";
    applyBtn.addEventListener("click", () =>  {
        apiService.storekeeper.createExtractionApp(
            sessionStorage.getItem('user_id'),
            {
                magicApp: {
                    id: appId
                },
                volume: magicVolume.value,
                deadline: magicEndDate.value,
            }
        ).catch(error => console.log(error));
        modalItem["modalTeg"].dispatchEvent(new CustomEvent('close_event'));
    })

    modalItem["modalBody"].appendChild(text);
    modalItem["modalBody"].appendChild(magicVolume);
    modalItem["modalBody"].appendChild(magicEndDate);
    modalItem["modalBody"].appendChild(applyBtn);

    modalItem["modalTeg"].style.display = "block";
}

export default getRequestForExhaustionModalWin;