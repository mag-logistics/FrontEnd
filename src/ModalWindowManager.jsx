import openMagicGetModalWin from "./modals/MagicGetModalWin.jsx";
import enteringStorageDataModalWin from "./modals/EnteringStorageDataModalWin.jsx";
import getRequestForExhaustionModalWin from "./modals/GetRequestForExhaustionModalWin.jsx";
import AdditionalInformationWin from "./modals/AdditionalInformationWin.jsx";
import AddNewUserModalWin from "./modals/AddNewUserModalWin.jsx";
import GetMagicAnimalModalWin from "./modals/GetMagicAnimalModalWin.jsx";
import AddExhaustionResultModalWin from "./modals/AddExhaustionResultModalWin.jsx";

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
        console.log('raise UpdatePage')
        container_div.dispatchEvent(new CustomEvent('UpdatePage'));
    }

    window.addEventListener("click", (event) => {
        if (event.target === windowItemDict['modalTeg']){
            closeModal();
        }
    })

    if (title === 'get_magic_req') {
        openMagicGetModalWin(windowItemDict);
    }
    else if (title === 'get_magic_animal'){
        GetMagicAnimalModalWin(windowItemDict);
    }
    else if (title === 'set_animal_storage_info') {
        enteringStorageDataModalWin(windowItemDict);
    }
    else if (title === 'get_request_for_exhaustion') {
        getRequestForExhaustionModalWin(windowItemDict);
    }
    else if (title === 'get_additional_info') {
        AdditionalInformationWin(windowItemDict)
    }
    else if (title === 'add_new_user'){
        AddNewUserModalWin(windowItemDict)
    }
    else if (title === 'add_exhaustion_result') {
        AddExhaustionResultModalWin(windowItemDict)
    }

    windowItemDict['modalTeg'].addEventListener('close_event', () => {
        closeModal();
    })
}

export default ModalWindowManager;