import openMagicGetModalWin from "./modals/MagicGetModalWin.jsx";
import enteringStorageDataModalWin from "./modals/EnteringStorageDataModalWin.jsx";
import getRequestForExhaustionModalWin from "./modals/GetRequestForExhaustionModalWin.jsx";

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
            closeModal();
        }
    })

    if (title === 'get_magic_req') {
        openMagicGetModalWin(windowItemDict);
    }
    else if (title === 'set_animal_storage_info') {
        enteringStorageDataModalWin(windowItemDict);
    }
    else {
        getRequestForExhaustionModalWin(windowItemDict);
    }

    windowItemDict['modalTeg'].addEventListener('change', () => {
        closeModal();
    })
}

export default ModalWindowManager;