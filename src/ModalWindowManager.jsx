import openMagicGetModalWin from "./modals/MagicGetModalWin.jsx";
import enteringStorageDataModalWin from "./modals/EnteringStorageDataModalWin.jsx";
import getRequestForExhaustionModalWin from "./modals/GetRequestForExhaustionModalWin.jsx";
import AdditionalInformationWin from "./modals/AdditionalInformationWin.jsx";
import {captureOwnerStack} from "react";

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
    //     todo request to update date
    }

    window.addEventListener("click", (event) => {
        if (event.target === windowItemDict['modalTeg']){
            console.log('close')
            closeModal();
        }
    })

    console.log(title)

    if (title === 'get_magic_req') {
        openMagicGetModalWin(windowItemDict);
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

    windowItemDict['modalTeg'].addEventListener('change', () => {
        // closeModal();
        console.log('change');
    })
}

export default ModalWindowManager;