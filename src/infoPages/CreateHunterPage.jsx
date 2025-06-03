import api from "../utils/api.js"
import React, {useEffect, useState} from "react";
import InfoTableConstruction from "../utils/InfoTableConstruction.jsx";
import InfoPageHeader from "../utils/InfoPageHeader.jsx";

function CreateHunterPage() {
    let [app, setApp] = useState([]);

    useEffect(() => {
        async function fetchHunterData() {
            const hunterPageData = api.get('hunter/orders');
            const data = [
                { number: '№1234', date: '10.02.2002', status: 'Новая', details: 'Подробные характери...' },
                { number: '№5678', date: '11.02.2002', status: 'В обработке', details: 'Ещё данные...' },
            ];
            setApp(data);
        }
        fetchHunterData();
    }, [])

    return (
        <div className="container">
            <InfoPageHeader req_name={'get_request_for_exhaustion'}
                            btn_name={'Добавить новую информацию по магическому существу'}
                            hunter_btn={'set_animal_storage_info'}/>
            <h1>Заявки на магическое существо</h1>
            <InfoTableConstruction title={'get_additional_info'} applications={app} role={'hunter'}/>
        </div>
    )
}

export default CreateHunterPage;