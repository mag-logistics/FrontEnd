import apiClient from "../api/api-client.js";
import ModalWindowManager from "../ModalWindowManager.jsx";
import {node} from "globals";
import apiService from "../api/api-services.js";
import showMessage from "../utils/MessageWindow.js";

async function storekeeperCall(appId, reqBtn) {
    let checkMagic = await apiService.storekeeper.checkMagicAvailability(appId);
    if (checkMagic?.data === true) {
        apiService.storekeeper.processMagicApplication(
            localStorage.getItem('user_id'),
            appId,
            {
                date: new Date().toISOString().split('T')[0],
            }
        ).then((result) => {
            console.log('Результат обработки заявки: ' + result.data);
        }).catch((err) => console.log(err));
    } else {
        showMessage('Требуемой магии нет, необходимо подать заявку на высасывание', false)
        reqBtn.disabled = false;
        reqBtn.className = "save-btn";
    }

}

function AdditionalInformationWin(modalItem) {
    let req = null;
    let user_role = sessionStorage.getItem('role');
    let appId = modalItem['content']['number'];
    let modal_create = () => {
        // console.log('create')
        let event = new CustomEvent('close_event');
        modalItem["modalTeg"].dispatchEvent(event);
        ModalWindowManager(req, modalItem['content'])
    }

    console.log(modalItem);
    modalItem['modalTitle'].textContent = "Информация о заявке";
    let text = document.createElement("p");

    let requestNumber = document.createElement("textarea");
    requestNumber.textContent = "Номер: " + modalItem['content']['number'];
    requestNumber.readOnly = true;

    let requestData = document.createElement("textarea");
    requestData.textContent = "Дата: " + modalItem['content']['date'];
    requestData.readOnly = true;

    let requestStatus = document.createElement("textarea");
    requestStatus.textContent = "Статус: " + modalItem['content']['status'];
    requestStatus.readOnly = true;

    let requestAdditionalInform = document.createElement("textarea");

    requestAdditionalInform.textContent = "Подробные характеристики: " + (modalItem['content']?.details ?? "Значение не указано");
    requestAdditionalInform.style.height = 140 + "px";
    requestAdditionalInform.readOnly = true;

    let btn_div = document.createElement("div");

    let requst_btn = document.createElement("button");
    requst_btn.id = "requst_btn";
    requst_btn.className = "disable-btn";
    requst_btn.disabled = true;
    requst_btn.addEventListener("click", () => {
        modal_create();
    })

    let apply_btn = document.createElement("button");
    apply_btn.textContent = "Подать заявку";
    apply_btn.className = "save-btn";
    apply_btn.addEventListener("click", () => {
        let callFunc = null;
        switch (user_role) {
            case 'storekeeper':
                callFunc = apiService.storekeeper.checkMagicAvailability(modalItem['content']['number']);
                break;
        }
        callFunc?.then((result) => {
            if (result.data === true){

            } else {

            }
        }).catch((err) => {console.log(err)});
    })

    switch (user_role) {
        case 'hunter':
            apply_btn.textContent = "Проверить наличие магического существа на складе";
            requst_btn.textContent = "Подача заявки на высасывание магии";
            req = 'get_magic_animal';
            break;
        case 'exhaustion':
            apply_btn.style.display = "none";
            requst_btn.className = "save-btn";
            requst_btn.disabled = false;
            requst_btn.textContent = "Внести данные о высосанной магии";
            req = "add_exhaustion_result";
            break;
        case 'storekeeper':
            apply_btn.textContent = "Проверить наличие требуемой магии";
            apply_btn.addEventListener("click", async  () => storekeeperCall(appId, requst_btn));
            requst_btn.textContent = "Подать заявку на высасывание";
            req = "get_request_for_exhaustion"
            break;
        case 'magic':
            requst_btn.style.display = "none";
            break;
    }

    btn_div.appendChild(apply_btn);
    btn_div.appendChild(requst_btn);

    modalItem["modalBody"].appendChild(text);
    modalItem["modalBody"].appendChild(requestNumber);
    modalItem["modalBody"].appendChild(requestData);
    modalItem["modalBody"].appendChild(requestStatus);
    modalItem["modalBody"].appendChild(requestAdditionalInform);
    if (modalItem.content.status !== 'DONE' && modalItem['content']['role'] !== 'magician') {
        modalItem["modalBody"].appendChild(btn_div);
    }

    modalItem["modalTeg"].style.display = "block";
}

export default AdditionalInformationWin;