import ModalWindowManager from "../ModalWindowManager.jsx";
import apiService from "../api/api-services.js";

function takeApp(appId){
    let currentCall = null;
    let user_role = sessionStorage.getItem("role");
    let user_id = sessionStorage.getItem("user_id");
    console.log(appId);
    switch (user_role){
        case "storekeeper":
            currentCall = apiService.storekeeper.takeMagicApp(user_id, appId);
            break;
        case "hunter":
            console.log('Для охотника пока ничего нет!')
            break;
        case "extractor":
            console.log('Для высасывателя пока ничего нет!')
            break;
    }
    currentCall?.then((data) => {
        console.log('Role: ' + user_role + '\n' + data.data);
        document.getElementById("container").dispatchEvent(new CustomEvent('UpdatePage'));
    }).catch((err) => console.log(err));
}

function infoTableConstruction({title, applications, worker = false}) {
    let user_role = sessionStorage.getItem("role");

    if (worker){
        return (
            <div>
                <div className="table-container">
                    <div className="table-header">
                        <div>Фамилия</div>
                        <div>Имя</div>
                        <div>Отчество</div>
                        <div>Должность</div>
                        <div></div>
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
            </div>
        )
    } else {
        let btn_name = user_role === 'magician' ? 'Информация' : 'Обработать'
        if (applications.length > 0) {
            return (
                <div className="table-container">
                    <div className="table-header">
                        <div>Номер</div>
                        <div>Дата</div>
                        <div>Статус</div>
                        <div>Подробные характеристики</div>
                        <div></div>
                    </div>
                    {applications?.map((app, index) => (
                        <div className="row" key={index}>
                            <div>{app.id}</div>
                            <div>{app.deadline.split('T')[0]}</div>
                            <div>{app.status}</div>
                            <div>{app.details}</div>
                            <div>
                                {
                                    app.status === 'CREATED' && user_role !== 'magician' && (
                                        <button onClick={async () => takeApp(app.id)} className="btn">
                                            Принять заявку
                                        </button>)
                                }
                                {
                                    (app.status === 'WORKED' || (user_role === 'magician' && app.status !== 'FINISHED')) && (
                                        <button onClick={() => ModalWindowManager(title, {
                                            number: app.id,
                                            date: app.deadline.split('T')[0],
                                            status: app.status,
                                            details: app.details,
                                            applications: app,
                                            role: user_role,
                                        })} className="btn">
                                            {btn_name}
                                        </button>
                                    )
                                }
                                {
                                    app.status === 'FINISHED' && (
                                        <button onClick={() => {
                                            console.log('Данного метода еще нет!')
                                        }} className="btn">
                                            Сформировать отчет
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    ))}
                </div>
            )
        } else {
            return (
                <></>
            )
        }
    }
}

export default infoTableConstruction;