import api from "../utils/api.js";
import React, {useEffect, useRef, useState} from "react";
import { LoginOut } from "../LoginPage.jsx";
import InfoTableConstruction from "../utils/InfoTableConstruction.jsx";
import ModalWindowManager from "../ModalWindowManager.jsx";
import InfoPageHeader from "../utils/InfoPageHeader.jsx";

function CreateMagicianPage() {
    let [applications, setApplications] = useState([]);
    let containerRef = useRef(null);

    const fetchMagicianData = async () => {
        const response = await api.get('mage/my-orders');
        if (response.status === 200) {
            const result = await response.data;
            setApplications(result);
        } else {
            const result = await response.data;
            console.error("Ошибка сети: " + result);
        }
    };

    useEffect(() => {
        let container = containerRef.current;
        container.addEventListener("UpdatePage", () => {
            console.log('Magic UpdatePage');
            fetchMagicianData()
        })
        fetchMagicianData();
    }, [])

    return (
        <div className="conteiner" id='container' ref={containerRef}>
            <InfoPageHeader  req_name={'get_magic_req'} btn_name={'Создать заявку на магию'} hunter_btn={'add_new_user'}/>
            <h1>Заявки на магию</h1>
            <InfoTableConstruction title={'get_additional_info'} applications={applications} role={'magician'} />
        </div>
    )
}

export default CreateMagicianPage;