import api from "../utils/api.js";

function AdditionalInformationWin(modalItem) {
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

    let apply_btn = document.createElement("button");
    apply_btn.textContent = "Подать заявку";
    apply_btn.className = "save-btn";
    apply_btn.addEventListener("click", () =>  {
        // todo add logic
    })

    modalItem["modalBody"].appendChild(text);
    modalItem["modalBody"].appendChild(requestNumber);
    modalItem["modalBody"].appendChild(requestData);
    modalItem["modalBody"].appendChild(requestStatus);
    modalItem["modalBody"].appendChild(requestAdditionalInform);
    modalItem["modalBody"].appendChild(apply_btn);

    modalItem["modalTeg"].style.display = "block";
}

export default AdditionalInformationWin;