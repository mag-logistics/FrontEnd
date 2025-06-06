import api from "../utils/api.js"
import React, {useEffect, useState} from "react";
import InfoTableConstruction from "../utils/InfoTableConstruction.jsx";
import InfoPageHeader from "../utils/InfoPageHeader.jsx";

function CreateStorekeeperPage() {
    let [app, setApp] = useState([]);

    useEffect(() => {
        const fetchExhaustionData = async () => {
            const response = await fetch(`http://localhost:8080/api/storer/orders`);  //todo
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
            <InfoPageHeader req_name={''}
                            btn_name={'Подать заявку на магическое существо'}
                            hunter_btn={null}
            />
            <h1>Заявки на магию</h1>
            <InfoTableConstruction title={'get_additional_info'} applications={app} role={'storekeeper'}/>
        </div>
    )
}

export default CreateStorekeeperPage;