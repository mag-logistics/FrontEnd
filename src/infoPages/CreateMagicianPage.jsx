import api from "../utils/api.js";
import React, {useEffect, useState} from "react";
import { LoginOut } from "../LoginPage.jsx";
import InfoTableConstruction from "../utils/InfoTableConstruction.jsx";
import ModalWindowManager from "../ModalWindowManager.jsx";
import InfoPageHeader from "../utils/InfoPageHeader.jsx";

function CreateMagicianPage() {
    let [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchMagicianData = async () => {
            const response = await fetch(`http://localhost:8080/api/mage/orders`);  //todo
            if (response.ok) {
                const result = await response.json();
                setApplications(result);
            } else {
                const result = await response.json();
                console.error("Ошибка сети: " + result);
            }
        };
        fetchMagicianData();
    }, [])

    return (
        <div className="conteiner">
            <InfoPageHeader  req_name={'get_magic_req'} btn_name={'Создать заявку на магию'} hunter_btn={'add_new_user'}/>
            <h1>Заявки на магию</h1>
            <InfoTableConstruction title={'get_additional_info'} applications={applications} />
        </div>
    )
}

export default CreateMagicianPage;