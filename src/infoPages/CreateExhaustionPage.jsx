import api from "../utils/api.js"
import React, {useEffect, useRef, useState} from "react";
import InfoTableConstruction from "../utils/InfoTableConstruction.jsx";
import InfoPageHeader from "../utils/InfoPageHeader.jsx";

function CreateExhaustionPage() {
    let [app, setApp] = useState([]);
    let containerRef = useRef(null);

    const fetchExhaustionData = async () => {
        const response = await api.get('/exhaustion/orders');
        if (response.status === 200) {
            const result = await response.data;
            setApp(result);
        } else {
            const result = await response.data;
            console.error("Ошибка сети: " + result);
        }
    };

    useEffect(() => {
        let container = containerRef.current;
        container.addEventListener("UpdatePage", () => {
            console.log('get UpdatePage');
            fetchExhaustionData()
        })
        fetchExhaustionData();
    }, [])



    return (
        <div className="container" id='container' ref={containerRef}>
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