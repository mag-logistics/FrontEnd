import api from "../utils/api.js"
import React, {useEffect, useState} from "react";
import InfoTableConstruction from "../utils/InfoTableConstruction.jsx";
import InfoPageHeader from "../utils/InfoPageHeader.jsx";

function CreateHunterPage() {
    let [app, setApp] = useState([]);

    useEffect(() => {
        const fetchHunterData = async () => {
            const response = await fetch(`http://localhost:8080/api/hunter/orders`);
            if (response.ok) {
                const result = await response.json();
                setApp(result);
            } else {
                const result = await response.json();
                console.error("Ошибка сети: " + result);
            }
        };
        fetchHunterData();
    }, [])


    return (
        <div className="container">
            <InfoPageHeader req_name={null}
                            btn_name={null}
                            hunter_btn={'set_animal_storage_info'}/>
            <h1>Заявки на магическое существо</h1>
            <InfoTableConstruction title={'get_additional_info'} applications={app} role={'hunter'}/>
        </div>
    )
}

export default CreateHunterPage;