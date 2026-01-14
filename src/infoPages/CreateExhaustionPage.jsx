import React, {useEffect, useRef, useState} from "react";
import InfoTableConstruction from "../utils/InfoTableConstruction.jsx";
import InfoPageHeader from "../utils/InfoPageHeader.jsx";
import apiService from "../api/api-services.js";
import applicationToRightDict from "../DTO/MagicianDTO/Application.js";

function CreateExhaustionPage() {
    let [app, setApp] = useState([]);
    let [currentApp, setCurrentApp] = useState([]);
    let containerRef = useRef(null);

    const fetchExhaustionData = async () => {
         apiService.extractor.getAllApplications()
            .then(orders => {
                setApp(applicationToRightDict(orders.data));
            })
            .catch((err) => {
                console.error('Err: ' + err);
            });
         apiService.extractor.getAllAppByExtractor()
             .then(apps => {
                 setCurrentApp(applicationToRightDict(apps.data));
             })
             .catch((err) => {
                 console.error('Err: ' + err);
             })
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
        <div id='container' ref={containerRef}>
            <InfoPageHeader main_page={false}/>
            {
                currentApp.length > 0 && (
                    <>
                        <h1>Мои заявки на магию</h1>
                        <InfoTableConstruction title={'get_additional_info'} applications={currentApp}/>
                    </>
                )
            }
            {
                app.length > 0 && (
                    <>
                        <h1>Все заявки на высасывание магии</h1>
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

export default CreateExhaustionPage;