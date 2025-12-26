import ModalWindowManager from "../ModalWindowManager.jsx";

function infoTableConstruction({title, applications, worker = false}) {
    let user_role = localStorage.getItem("role");

    if (worker){
        return (
            <div>
                <div>
                    <div className="table-header">
                        <div>Фамилия</div>
                        <div>Имя</div>
                        <div>Отчество</div>
                        <div>Должность</div>
                        <div></div>
                    </div>
                    <div id="application-list"></div>
                </div>

                {applications?.map((app, index) => (
                    <div className="row" key={index}>
                        <div>{app.surname}</div>
                        <div>{app.name}</div>
                        <div>{app.patronymic}</div>
                        <div>{app.role}</div>
                        <div>
                            <button onClick={() => ModalWindowManager(title, {
                                worker_id: app.id,
                                surname: app.surname,
                                name: app.name,
                                patronymic: app.patronymic,
                                role: app.role,
                                rewardPoints: app.rewardPoints,
                                penaltyPoints: app.penaltyPoints
                            })} className="btn">
                                Обработать
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
    else {
        let btn_name = user_role === 'magician' ? 'Информация' : 'Обработать'
        return (
            <div>
                <div>
                    <div className="table-header">
                        <div>Номер</div>
                        <div>Дата</div>
                        <div>Статус</div>
                        <div>Подробные характеристики</div>
                        <div></div>
                    </div>
                    <div id="application-list"></div>
                </div>

                {applications?.map((app, index) => (
                    <div className="row" key={index}>
                        <div>{app.id}</div>
                        <div>{app.deadline}</div>
                        <div>{app.status}</div>
                        <div>{app.title}</div>
                        <div>
                            <button onClick={() => ModalWindowManager(title, {
                                number: app.id,
                                date: app.deadline,
                                status: app.status,
                                details: app.title,
                                role: user_role,
                            })} className="btn">
                                {app.status === "DONE" ? "Информация" : btn_name}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default infoTableConstruction;