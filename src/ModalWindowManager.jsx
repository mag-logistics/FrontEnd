import getRequestForExhaustionModalWin from "./modals/storekeeper/GetRequestForExhaustionModalWin.jsx";
import AdditionalInformationWin from "./modals/AdditionalInformationWin.jsx";
import AddNewUserModalWin from "./modals/magician/AddNewUserModalWin.jsx";
import GetMagicAnimalModalWin from "./modals/hunter/GetMagicAnimalModalWin.jsx";
import WorkerPersonalInfoModalWin from "./modals/worker/WorkerPersonalInfoModalWin.jsx";
import OpenMagicGetModalWin from "./modals/magician/MagicGetModalWin.jsx";
import ReportModalWin from "./modals/ReportModalWin.jsx";
import AddHuntingRequestWin from "./modals/extractor/AddHuntingRequestWin.js";

function ModalWindowManager(title, content) {
    let windowItemDict = {
        'modalTeg': document.getElementById("myModal"),
        'modalTitle': document.getElementById("modalTitle"),
        'modalBody': document.getElementById("modalBody"),
        'content': content
    }

    function closeModal() {
        while (windowItemDict['modalTitle'].firstChild)
            windowItemDict['modalTitle'].removeChild(windowItemDict['modalTitle'].firstChild);
        while (windowItemDict['modalBody'].firstChild)
            windowItemDict['modalBody'].removeChild(windowItemDict['modalBody'].firstChild);
        windowItemDict['modalTeg'].style.display = "none";
        let container_div = document.getElementById("container");
        container_div.dispatchEvent(new CustomEvent('UpdatePage'));
    }

    window.addEventListener("click", (event) => {
        if (event.target === windowItemDict['modalTeg']){
            closeModal();
        }
    })
    switch (title) {
        case 'get_magic_req':
            OpenMagicGetModalWin(windowItemDict);
            break;
        case 'get_magic_animal':
            GetMagicAnimalModalWin(windowItemDict);
            break;
        case 'get_request_for_exhaustion':
            getRequestForExhaustionModalWin(windowItemDict);
            break;
        case 'get_additional_info':
            AdditionalInformationWin(windowItemDict);
            break;
        case 'add_new_user':
            AddNewUserModalWin(windowItemDict);
            break;
        case 'request_hunting':
            AddHuntingRequestWin(windowItemDict)
            break
        case 'get_personal_info':
            WorkerPersonalInfoModalWin(windowItemDict);
            break;
        case 'download_report':
            ReportModalWin(windowItemDict);
            break;
        default:
            console.log(`This title ${title} don't work`);
    }

    windowItemDict['modalTeg'].addEventListener('close_event', () => {
        closeModal();
    })
}

export default ModalWindowManager;