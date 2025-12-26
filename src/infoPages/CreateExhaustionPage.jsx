import apiClient from "../api/api-client.js"
import React, {useEffect, useRef, useState} from "react";
import InfoTableConstruction from "../utils/InfoTableConstruction.jsx";
import InfoPageHeader from "../utils/InfoPageHeader.jsx";
import apiService from "../api/api-services.js";

function CreateExhaustionPage() {
    let [app, setApp] = useState([]);
    let containerRef = useRef(null);

    const fetchExhaustionData = async () => {
        await apiService.extractor.getAllApplications('')
            .then(orders => {
                setApp(orders.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    useEffect(() => {
        let container = containerRef.current;
        container.addEventListener("UpdatePage", () => {
            console.log('get UpdatePage');
            // fetchExhaustionData()
        })
        // fetchExhaustionData();
    }, [])



    return (
        <div id='container' ref={containerRef}>
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