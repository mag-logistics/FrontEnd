import apiService from "../api/api-services.js";
import React, {useEffect, useRef, useState} from "react";
import InfoTableConstruction from "../utils/InfoTableConstruction.jsx";
import InfoPageHeader from "../utils/InfoPageHeader.jsx";

function CreateMagicianPage() {
    let [applications, setApplications] = useState([]);
    let containerRef = useRef(null);

    useEffect(() => {
        const fetchMagicianData = async () => {
            try {
                const response = await apiService.magician.getAllOrders(1);
                setApplications(response.data);
            } catch (error) {
                console.error(error);
            }
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
            <h1>Заявки на магию</h1>
            <InfoTableConstruction title={'get_additional_info'} applications={applications} />
        </div>
    )
}

export default CreateMagicianPage;