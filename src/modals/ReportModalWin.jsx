import apiService from "../api/api-services.js";
import showMessage from "../utils/MessageWindow.js";
import downloadReport from "../utils/DownloadReport.js";

function ReportModalWin(modalItem){
    let reportType = null;
    switch (sessionStorage.getItem("role")) {
        case 'MAGICIAN':
            reportType = "Magic";
            break;
        case 'EXTRACTOR':
            reportType = "Hunter";
            break;
        case 'STOREKEEPER':
            reportType = "Extraction";
            break;
        case 'HUNTER':
            reportType = "Hunter1";
            break;
    }

    let user_id = sessionStorage.getItem("user_id");
    let appId= modalItem.content?.number ?? '';

    let reportTypeList = [
        'Универсальный',
        'Магический'
    ]

    modalItem['modalTitle'].textContent = 'Генерация отчета'
    let reportTypeSelected = null;

    let reportTypeSelector = document.createElement("select");
    let reportTypePlaceholder  = document.createElement("option");

    reportTypePlaceholder.text = 'Тип шаблона';
    reportTypePlaceholder.value = '';
    reportTypePlaceholder.disabled = true;
    reportTypePlaceholder.selected = true;
    reportTypeSelector.appendChild(reportTypePlaceholder);

    for (let type of reportTypeList) {
        let option = document.createElement("option");
        option.value = type;
        option.text = type;
        reportTypeSelector.appendChild(option);
    }

    reportTypeSelector.addEventListener("change", (event) => {
        reportTypeSelected = event.target.value;
    })

    let closeBtn = document.createElement("button");
    closeBtn.textContent = 'Отмена'
    closeBtn.className = 'info_button';
    closeBtn.addEventListener("click", () => {
        modalItem["modalTeg"].dispatchEvent(new Event("close_event"));
    })

    let generateReportBtn = document.createElement("button");
    generateReportBtn.textContent = 'Сгенерировать отчет'
    generateReportBtn.className = 'info_button';
    generateReportBtn.addEventListener("click", () => {
        let callFunc = null;
        switch (reportTypeSelected) {
            case 'Универсальный':
                callFunc = apiService.general.generateFirstReport(user_id, appId, reportType);
                break;
            case 'Магический':
                callFunc = apiService.general.generateSecondReport(user_id, appId, reportType);
                break;
            default:
                showMessage('Не выбран тип отчета');
                break;
        }

        callFunc?.then(res => {
            downloadReport(res)
            modalItem.modalTeg.dispatchEvent(new CustomEvent('close_event'));
        }).catch(err => console.log(err));
    })

    modalItem["modalBody"].appendChild(reportTypeSelector);
    modalItem["modalBody"].appendChild(closeBtn);
    modalItem["modalBody"].appendChild(generateReportBtn);

    modalItem["modalTeg"].style.display = "block";
}

export default ReportModalWin;