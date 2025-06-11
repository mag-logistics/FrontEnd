import ModalWindowManager from "../ModalWindowManager.jsx";

function infoTableConstruction({title, applications, role}) {
    let btn_name = role === 'magician' ? 'Информация' : 'Обработать'

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

            {applications.map((app, index) => (
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
                            role: role,
                        })} className="btn">
                            { app.status == "DONE" ? "Информация" : btn_name }
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default infoTableConstruction;