import api from "../utils/api.js"
import React, {useEffect, useState} from "react";
import InfoTableConstruction from "../utils/InfoTableConstruction.jsx";
import InfoPageHeader from "../utils/InfoPageHeader.jsx";

function CreateExhaustionPage() {
    let [app, setApp] = useState([]);

    async function fetchExhaustionData() {
        const exhaustionPageData = api.get('exhaustion/orders');
        const data = [
            { number: '№1234', date: '10.02.2002', status: 'Новая', details: 'Подробные характери...' },
            { number: '№5678', date: '11.02.2002', status: 'В обработке', details: 'Ещё данные...' },
        ];
        setApp(data);
    }

    useEffect(() => {
        fetchExhaustionData();
    }, [])

    // window.addEventListener("", fetchExhaustionData);

    return (
        <div className="container">
            <InfoPageHeader req_name={null}
                            btn_name={'Создать заявку на магическое существо'}
                            hunter_btn={null}
            />
            <h1>Заявки на высасывание магии</h1>
            <InfoTableConstruction title={'get_additional_info'} applications={app} role={'exhaustion'}/>
        </div>
    )
}

export default CreateExhaustionPage;