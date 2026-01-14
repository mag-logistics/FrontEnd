import React, {useEffect, useRef, useState} from "react";
import InfoTableConstruction from "../utils/InfoTableConstruction.jsx";
import InfoPageHeader from "../utils/InfoPageHeader.jsx";
import apiService from "../api/api-services.js";
import applicationToRightDict from "../DTO/MagicianDTO/Application.js";

function CreateStorekeeperPage() {
    let [app, setApp] = useState([]);
    let [currentApp, setCurrentApp] = useState([]);
    let containerRef = useRef(null);

    const fetchExhaustionData = async () => {
        apiService.storekeeper.getAllMagicApp()
            .then((data) => {
                setApp(applicationToRightDict(data.data));
            })
            .catch((err) => console.log(err));
        apiService.storekeeper.getAllMagicAppByStorekeeper(sessionStorage.getItem('user_id'))
            .then((data) => {
                setCurrentApp(applicationToRightDict(data.data));
            })
            .catch((err) => console.log(err));
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
                        <h1>Все заявки на магию</h1>
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

export default CreateStorekeeperPage;