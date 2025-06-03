import api from "../utils/api.js";
import ModalWindowManager from "../ModalWindowManager.jsx";
import {node} from "globals";

function AdditionalInformationWin(modalItem) {
    let req = null;
    let modal_create = () => {
        console.log('create')
        let event = new CustomEvent('close_event');
        modalItem["modalTeg"].dispatchEvent(event);
        ModalWindowManager(req, null)
    }

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
    requestAdditionalInform.textContent = "Подробные характеристики: " + modalItem['content']['details'];
    requestAdditionalInform.readOnly = true;

    let btn_div = document.createElement("div");

    let requst_btn = document.createElement("button");
    requst_btn.id = "requst_btn";
    requst_btn.className = "disable-btn";
    requst_btn.disabled = true;
    requst_btn.addEventListener("click", () =>  {
        modal_create();
    })

    let apply_btn = document.createElement("button");
    apply_btn.className = "save-btn";
    apply_btn.addEventListener("click", () => {
        // todo api check in storage
        // if (req === true) {
         document.getElementById('requst_btn').disabled = false;
         requst_btn.className = "save-btn";
        // }
    })

    if (modalItem['content']['role'] === 'hunter') {
        apply_btn.textContent = "Проверить наличие магии";
        requst_btn.textContent = "Подача заявки на высасывание магии";
        req = 'get_request_for_exhaustion';
    } else if (modalItem['content']['role'] === 'exhaustion') {
        apply_btn.style.display = "none";
        requst_btn.className = "save-btn";
        requst_btn.disabled = false;
        requst_btn.textContent = "Внести данные о высосанной магии";
        req = "add_exhaustion_result";
    } else if (modalItem['content']['role'] === 'storekeeper') {
        apply_btn.textContent = "Проверить наличие требуемой магии";
        requst_btn.textContent = "Подать заявку на магическое существо";
        req = "get_magic_animal"
    }

    btn_div.appendChild(apply_btn);

    btn_div.appendChild(requst_btn);

    modalItem["modalBody"].appendChild(text);
    modalItem["modalBody"].appendChild(requestNumber);
    modalItem["modalBody"].appendChild(requestData);
    modalItem["modalBody"].appendChild(requestStatus);
    modalItem["modalBody"].appendChild(requestAdditionalInform);
    modalItem["modalBody"].appendChild(btn_div);

    modalItem["modalTeg"].style.display = "block";
}

export default AdditionalInformationWin;