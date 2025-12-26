import React, {useEffect, useRef, useState} from "react";
import InfoTableConstruction from "../utils/InfoTableConstruction.jsx";
import InfoPageHeader from "../utils/InfoPageHeader.jsx";
import apiService from "../api/api-services.js";

function CreateStorekeeperPage() {
    let [app, setApp] = useState([]);
    let containerRef = useRef(null);

    const fetchExhaustionData = async () => {
        await apiService.storekeeper.getAllMagicAppByStorekeeper(1)
            .then((data) => {
                setApp(data.data);
            })
            .catch((err) => {
                console.error(err);
            })
    };

    useEffect(() => {
        let container = containerRef.current;
        container.addEventListener("UpdatePage", () => {
            console.log("Storer UpdatePage");
            fetchExhaustionData();
        })
        fetchExhaustionData();
    }, [])

    return (
        <div id='container' ref={containerRef}>
            <InfoPageHeader main_page={false}/>
            <h1>Заявки на магию</h1>
            <InfoTableConstruction title={'get_additional_info'} applications={app}/>
        </div>
    )
}

export default CreateStorekeeperPage;