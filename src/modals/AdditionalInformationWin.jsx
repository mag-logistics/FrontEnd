import ModalWindowManager from "../ModalWindowManager.jsx";
import apiService from "../api/api-services.js";
import showMessage from "../utils/MessageWindow.js";

async function storekeeperCall(appId, reqBtn, modalItem) {
    let checkMagic = await apiService.storekeeper.checkMagicAvailability(appId);
    if (checkMagic?.data === true) {
        apiService.storekeeper.processMagicApplication(
            sessionStorage.getItem('user_id'),
            appId,
            {
                date: new Date().toISOString().split('T')[0],
            }
        ).then((result) => {
            console.log(result);
            console.log('Результат обработки заявки: ' + result.data);
            modalItem["modalTeg"].dispatchEvent(new CustomEvent("close_event"));
        }).catch((err) => console.log('Err ' + err));
    } else {
        showMessage('Требуемой магии нет, необходимо подать заявку на высасывание', false)
        reqBtn.disabled = false;
        reqBtn.className = "save-btn";
    }

}

async function extractorCall(reqBtn, modalItem) {
    let checkAnimal = await apiService.extractor.checkMagicAnimalAvailability();
    if (checkAnimal?.data === true) {
        apiService.extractor.processExtractionApplication()
            .then((result) => {
                console.log('Результат обработки заявки: ' + result.data);
                modalItem["modalTeg"].dispatchEvent(new CustomEvent("close_event"));
            })
            .catch((err) => console.log('Err ' + err));
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
        // console.log('create')
        let event = new CustomEvent('close_event');
        modalItem["modalTeg"].dispatchEvent(event);
        console.log(req)
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

    switch (user_role) {
        case 'HUNTER':
            apply_btn.style.display = "none";
            requst_btn.textContent = "Внести информацию о магичесом животном";
            requst_btn.className = "save-btn";
            requst_btn.disabled = false;
            req = 'get_magic_animal';
            break;
        case 'EXTRACTOR':
            apply_btn.textContent = "Проверить наличие магического существа на складе";
            apply_btn.addEventListener("click",
                async() => extractorCall(requst_btn, modalItem))
            requst_btn.textContent = "Подать заявку на магическое существо";
            req = "request_hunting";
            break;
        case 'STOREKEEPER':
            apply_btn.textContent = "Проверить наличие требуемой магии";
            apply_btn.addEventListener("click",
                async  () => storekeeperCall(appId, requst_btn, modalItem));
            requst_btn.textContent = "Подать заявку на высасывание";
            req = "get_request_for_exhaustion"
            break;
        case 'MAGICIAN':
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