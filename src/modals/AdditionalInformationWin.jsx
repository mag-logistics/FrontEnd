import ModalWindowManager from "../ModalWindowManager.jsx";
import apiService from "../api/api-services.js";
import showMessage from "../utils/MessageWindow.js";
import autoResizeTextarea from "../utils/ResizeFunc.js";

async function responseCall(user_role, modalItem) {
    let callFunc = null;
    let appId = modalItem['content']['number']
    switch (user_role) {
        case "HUNTER":
            callFunc = null;
            break;
        case "EXTRACTOR":
            callFunc = apiService.extractor.processExtractionApplication(appId);
            break;
        case "STOREKEEPER":
            callFunc = apiService.storekeeper.processMagicApplication(
                sessionStorage.getItem('user_id'),
                appId,
                {
                    date: new Date().toISOString().split("T")[0],
                }
            )
            break;
    }
    callFunc?.then(() => {
        modalItem["modalTeg"].dispatchEvent(new CustomEvent("close_event"));
    }).catch((err) => console.log('Err ' + err));
}


async function storekeeperCall(appId, reqBtn, resp_btn) {
    let checkMagic = await apiService.storekeeper.checkMagicAvailability(appId);
    if (checkMagic?.data === true) {
        resp_btn.disabled = false;
        resp_btn.className = "save-btn";
    } else {
        showMessage('Требуемой магии нет, необходимо подать заявку на высасывание', false)
        reqBtn.disabled = false;
        reqBtn.className = "save-btn";
    }

}

async function extractorCall(appId, reqBtn, resp_btn) {
    let checkAnimal = await apiService.extractor.checkMagicAnimalAvailability(appId);
    if (checkAnimal?.data === true) {
        resp_btn.disabled = false;
        resp_btn.className = "save-btn";
    } else {
        showMessage('Требуемых животных нет, необходимо подать заявку на охоту', false)
        reqBtn.disabled = false;
        reqBtn.className = "save-btn";
    }
}

function AdditionalInformationWin(modalItem) {
    let req = null;
    let user_role = sessionStorage.getItem('role');
    let appId = modalItem['content']['number'];
    let modal_create = () => {
        modalItem["modalTeg"].dispatchEvent(new CustomEvent('close_event'));
        ModalWindowManager(req, modalItem['content'])
    }

    modalItem['modalTitle'].textContent = "Информация о заявке";
    let text = document.createElement("p");

    let requestNumber = document.createElement("textarea");
    requestNumber.textContent = "Номер: " + modalItem['content']['number'];
    requestNumber.readOnly = true;
    requestNumber.style.resize = "none"; // Запретить изменение размера
    requestNumber.style.whiteSpace = "pre-wrap"; // Сохранять переносы строк
    requestNumber.style.overflow = "hidden";

    let requestData = document.createElement("textarea");
    requestData.textContent = "Дата: " + modalItem['content']['date'];
    requestData.readOnly = true;
    requestData.style.resize = "none"; // Запретить изменение размера
    requestData.style.whiteSpace = "pre-wrap"; // Сохранять переносы строк
    requestData.style.overflow = "hidden";

    let requestStatus = document.createElement("textarea");
    requestStatus.textContent = "Статус: " + modalItem['content']['status'];
    requestStatus.readOnly = true;
    requestStatus.style.resize = "none"; // Запретить изменение размера
    requestStatus.style.whiteSpace = "pre-wrap"; // Сохранять переносы строк
    requestStatus.style.overflow = "hidden";

    let requestAdditionalInform = document.createElement("textarea");
    requestAdditionalInform.readOnly = true;
    requestAdditionalInform.style.resize = "none"; // Запретить изменение размера
    requestAdditionalInform.style.whiteSpace = "pre-wrap"; // Сохранять переносы строк
    requestAdditionalInform.style.overflow = "hidden";
    requestAdditionalInform.textContent = "Подробные характеристики: " + (modalItem['content']?.details ?? "Значение не указано");
    setTimeout(() => autoResizeTextarea(requestAdditionalInform), 0);

    let btn_div = document.createElement("div");

    let requst_btn = document.createElement("button");
    requst_btn.id = "requst_btn";
    requst_btn.className = "disable-btn";
    requst_btn.disabled = true;
    requst_btn.addEventListener("click", () => {
        modal_create();
    })

    let resp_btn = document.createElement("button");
    resp_btn.id = "resp_btn";
    resp_btn.className = "disable-btn";
    resp_btn.disabled = true;
    resp_btn.addEventListener("click",
        async () => responseCall(user_role, modalItem));


    let apply_btn = document.createElement("button");
    apply_btn.textContent = "Подать заявку";
    apply_btn.className = "save-btn";

    switch (user_role) {
        case 'HUNTER':
            apply_btn.style.display = "none";
            resp_btn.style.display = "none";
            requst_btn.textContent = "Внести информацию о магическом животном";
            requst_btn.className = "save-btn";
            requst_btn.disabled = false;
            req = 'get_magic_animal';
            break;
        case 'EXTRACTOR':
            apply_btn.textContent = "Проверить наличие требуемых существ";
            apply_btn.addEventListener("click",
                async() => extractorCall(appId, requst_btn, resp_btn))
            requst_btn.textContent = "Подать заявку на магическое существо";
            resp_btn.textContent = "Выполнить высасывание"
            req = "request_hunting";
            break;
        case 'STOREKEEPER':
            apply_btn.textContent = "Проверить наличие требуемой магии";
            apply_btn.addEventListener("click",
                async  () => storekeeperCall(appId, requst_btn, resp_btn));
            requst_btn.textContent = "Подать заявку на высасывание";
            resp_btn.textContent = "Выдать магию"
            req = "get_request_for_exhaustion"
            break;
        case 'MAGICIAN':
            requst_btn.style.display = "none";
            resp_btn.style.display = "none";
            break;
    }

    btn_div.appendChild(apply_btn);
    btn_div.appendChild(resp_btn);
    btn_div.appendChild(requst_btn);

    modalItem["modalBody"].appendChild(text);
    modalItem["modalBody"].appendChild(requestNumber);
    modalItem["modalBody"].appendChild(requestData);
    modalItem["modalBody"].appendChild(requestStatus);
    modalItem["modalBody"].appendChild(requestAdditionalInform);
    if (modalItem.content.status !== 'DONE' && modalItem['content']['role'] !== 'MAGICIAN') {
        modalItem["modalBody"].appendChild(btn_div);
    }

    modalItem["modalTeg"].style.display = "block";
}

export default AdditionalInformationWin;