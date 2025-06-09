import api from "../utils/api.js"
import React, {useEffect, useRef, useState} from "react";
import InfoTableConstruction from "../utils/InfoTableConstruction.jsx";
import InfoPageHeader from "../utils/InfoPageHeader.jsx";

function CreateHunterPage() {
    let [app, setApp] = useState([]);
    let containerRef = useRef(null);

    const fetchHunterData = async () => {
        const response = await api.get('/hunter/orders');
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
            console.log('Hunter UpdatePage');
            fetchHunterData();
        })
        fetchHunterData();
    }, [])


    return (
        <div className="container" id='container' ref={containerRef}>
            <InfoPageHeader req_name={null}
                            btn_name={null}
                            hunter_btn={'set_animal_storage_info'}/>
            <h1>Заявки на магическое существо</h1>
            <InfoTableConstruction title={'get_additional_info'} applications={app} role={'hunter'}/>
        </div>
    )
}

export default CreateHunterPage;