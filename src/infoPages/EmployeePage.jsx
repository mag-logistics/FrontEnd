import apiClient from "../api/api-client.js"
import React, {useEffect, useRef, useState} from "react";
import InfoTableConstruction from "../utils/InfoTableConstruction.jsx";
import InfoPageHeader from "../utils/InfoPageHeader.jsx";
import apiService from "../api/api-services.js";
import WorkerFilter from "../utils/WorkerFilter.jsx";

function EmployeePage() {
    let [app, setApp] = useState([]);
    let [search, setSearch] = useState([]);
    let containerRef = useRef(null);

    const fetchExhaustionData = async () => {
        await  apiService.magician.getAllEmployees()
            .then((data) => {
                setApp(data.data);
            })
            .catch((err) => {
                console.log(err);
            })
    };

    const handleSearch = (filters) => {
        const result = app.filter(app => {
            return (
                (!filters.surname || app.surname.toLowerCase().includes(filters.surname.toLowerCase())) &&
                (!filters.name  || app.name .toLowerCase().includes(filters.name .toLowerCase())) &&
                (!filters.patronymic  || app.patronymic .toLowerCase().includes(filters.patronymic .toLowerCase())) &&
                (!filters.role  || app.role .toLowerCase().includes(filters.role .toLowerCase()))
            )
        })
        setSearch(result);
    }

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
            <InfoPageHeader create_add_btn={false}/>
            <h1>Сотрудники организации</h1>
            <WorkerFilter onSearch={handleSearch}/>
            <InfoTableConstruction title={'get_personal_info'} applications={search.length ? search : app} worker={true}/>
        </div>
    )
}

export default EmployeePage;