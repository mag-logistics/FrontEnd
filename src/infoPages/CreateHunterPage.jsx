import React, {useEffect, useRef, useState} from "react";
import InfoTableConstruction from "../utils/InfoTableConstruction.jsx";
import InfoPageHeader from "../utils/InfoPageHeader.jsx";
import apiService from "../api/api-services.js";
import hunterApplicationToRightDict from "../DTO/MagicianDTO/HunterApp.js";

function CreateHunterPage() {
    let [app, setApp] = useState([]);
    let [currentApp, setCurrentApp] = useState([]);
    let containerRef = useRef(null);

    const fetchHunterData = async () => {
        apiService.hunter.getAllApplications()
            .then((response) => {
                setApp(hunterApplicationToRightDict(response.data));
            }).catch((error) => console.error(error))

        apiService.hunter.getAllAppByHunter()
            .then((response) => {
                setCurrentApp(hunterApplicationToRightDict(response.data));
            }).catch((error) => console.error(error))

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
        <div id='container' ref={containerRef}>
            <InfoPageHeader main_page={false}/>
            {
                currentApp.length > 0 && (
                    <>
                        <h1>Мои заявки на магических зверей</h1>
                        <InfoTableConstruction title={'get_additional_info'} applications={currentApp}/>
                    </>
                )
            }
            {
                app.length > 0 && (
                    <>
                        <h1>Все заявки на магических зверей</h1>
                        <InfoTableConstruction title={''} applications={app}/>
                    </>
                )
            }
            {
                app.length === 0 && (
                    <h1>Заявок в системе нет</h1>
                )
            }
        </div>
    )
}

export default CreateHunterPage;