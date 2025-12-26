import {useState} from "react";

function WorkerFilter({ onSearch }) {
    const [filters, setFilters] = useState({
        surname: "",
        name: "",
        patronymic: "",
        role: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSearch = () => {
        onSearch(filters);
    };

    return (
        <div className="filter-widget">
            <input
                name="surname"
                placeholder="Фамилия"
                value={filters.surname}
                onChange={handleChange}
            />
            <input
                name="name"
                placeholder="Имя"
                value={filters.name}
                onChange={handleChange}
            />
            <input
                name="patronymic"
                placeholder="Отчество"
                value={filters.patronymic}
                onChange={handleChange}
            />
            <input
                name="role"
                placeholder="Должность"
                value={filters.role}
                onChange={handleChange}
            />
            <button className={'info_button'}
                onClick={handleSearch}>
                Найти
            </button>
        </div>
    );
}

export default WorkerFilter;