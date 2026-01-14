import apiService from "../api/api-services.js";
import React, {useEffect, useRef, useState} from "react";
import InfoTableConstruction from "../utils/InfoTableConstruction.jsx";
import InfoPageHeader from "../utils/InfoPageHeader.jsx";
import applicationToRightDict from "../DTO/MagicianDTO/Application.js";

function CreateMagicianPage() {
    let [applications, setApplications] = useState([]);
    let containerRef = useRef(null);

    useEffect(() => {
        const fetchMagicianData = async () => {
            apiService.magician.getAllOrders(sessionStorage.getItem('user_id'))
                .then((data) => {
                    setApplications(applicationToRightDict(data.data));
                })
                .catch(error => {
                    console.error(error);
                });
        };

        let container = containerRef.current;
        container.addEventListener("UpdatePage", () => {
            console.log('Magic UpdatePage');
            fetchMagicianData()
        })
        fetchMagicianData();
    }, [])

    return (
        <div id='container' ref={containerRef}>
            <InfoPageHeader />
            {
                applications.length > 0 && (
                    <>
                        <h1>Заявки на магию</h1>
                        <InfoTableConstruction title={'get_additional_info'} applications={applications} />
                    </>
                )
            }
            {
                applications.length === 0 && (
                    <h1>Заявок в системе нет</h1>
                )
            }
        </div>
    )
}

export default CreateMagicianPage;