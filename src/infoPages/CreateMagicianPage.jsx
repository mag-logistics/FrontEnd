import api from "../utils/api.js";
import React, {useEffect, useState} from "react";
import { LoginOut } from "../LoginPage.jsx";
import InfoTableConstruction from "../utils/InfoTableConstruction.jsx";
import ModalWindowManager from "../ModalWindowManager.jsx";
import InfoPageHeader from "../utils/InfoPageHeader.jsx";

function CreateMagicianPage() {
    // let [applications, setApplications] = useState([]);
    //
    // useEffect(() => {
    //     async function fetchMagicianData() {
    //         //const magicianPageData = api.get('storer/orders');
    //         const data = [
    //             { number: '№1234', date: '10.02.2002', status: 'Новая', details: 'Подробные характери...' },
    //             { number: '№5678', date: '11.02.2002', status: 'В обработке', details: 'Ещё данные...' },
    //         ];
    //         setApplications(data);
    //     }
    //     fetchMagicianData();
    // }, [])

    return (
        <div className="conteiner">
            <InfoPageHeader  req_name={'get_magic_req'} btn_name={'Создать заявку на магию'} hunter_btn={'add_new_user'}/>
            {/*<h1>Заявки на магию</h1>*/}
            {/*<InfoTableConstruction title={'get_additional_info'} applications={applications} />*/}
        </div>
    )
}

export default CreateMagicianPage;