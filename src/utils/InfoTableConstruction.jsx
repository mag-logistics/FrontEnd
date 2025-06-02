import ModalWindowManager from "../ModalWindowManager.jsx";

function infoTableConstruction({title, applications}) {
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
                    <div>{app.number}</div>
                    <div>{app.date}</div>
                    <div>{app.status}</div>
                    <div>{app.details}</div>
                    <div><button onClick={() => ModalWindowManager(title, {
                        number: app.number,
                        date: app.date,
                        status: app.status,
                        details: app.details
                    })} className="btn">Обработать</button></div>
                </div>
            ))}
        </div>
    )
}

export default infoTableConstruction;