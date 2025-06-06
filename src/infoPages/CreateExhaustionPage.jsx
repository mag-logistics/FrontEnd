import api from "../utils/api.js"
import React, {useEffect, useState} from "react";
import InfoTableConstruction from "../utils/InfoTableConstruction.jsx";
import InfoPageHeader from "../utils/InfoPageHeader.jsx";

function CreateExhaustionPage() {
    let [app, setApp] = useState([]);

    useEffect(() => {
        const fetchExhaustionData = async () => {
            const response = await fetch(`http://localhost:8080/api/exhaustion/orders`);
            if (response.ok) {
                const result = await response.json();
                setApp(result);
            } else {
                const result = await response.json();
                console.error("Ошибка сети: " + result);
            }
        };
        fetchExhaustionData();
    }, [])

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