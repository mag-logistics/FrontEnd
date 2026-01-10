import ModalWindowManager from "../ModalWindowManager.jsx";
import {LoginOut} from "../LoginPage.jsx";
import React from "react";
import EmployeePage from "../infoPages/EmployeePage.jsx";
import {useNavigate} from "react-router-dom";

function InfoPageHeader({main_page = true}) {
    let user_role = sessionStorage.getItem('role');
    const navigate = useNavigate();

    return (
        <div className={`InfoPageHeader ${main_page ? '' : 'solo'}`}>
            {/*todo переписать блок ниже для каждой user_role*/}
            {/*{*/}
            {/*    req_name !== null && (*/}
            {/*        <button*/}
            {/*            onClick={() => ModalWindowManager(req_name, null)}*/}
            {/*            className="info_button"*/}
            {/*        >*/}
            {/*            { btn_name }*/}
            {/*        </button>*/}
            {/*    )*/}
            {/*}*/}
            {
                user_role === 'magician' && main_page && (
                    <>
                        <button
                            onClick={() => ModalWindowManager('get_magic_req', null)}
                            className="info_button"
                        >
                            Создать заявку на магию
                        </button>
                        <button onClick={() => ModalWindowManager('add_new_user', null)}
                                className="info_button">
                            Добавить нового пользователя
                        </button>
                        <button onClick={() => navigate("/worker_manager")}
                                className="info_button">
                            Список сотрудников
                        </button>
                    </>
                )
            }
            {/*{*/}
            {/*    user_role === 'storekeeper' && !main_page && (*/}
            {/*        */}
            {/*    )*/}
            {/*}*/}
            {
                user_role === 'magician' && !main_page && (
                    <button onClick={() => navigate(`/${user_role}`)}
                            className="info_button">
                        Назад
                    </button>
                )
            }

            {/*{*/}
            {/*    hunter_btn !== null && hunter_btn === 'set_animal_storage_info' && (*/}
            {/*        <button onClick={() => ModalWindowManager(hunter_btn, null)}*/}
            {/*                className="info_button">*/}
            {/*            Добавить информацию по магическому существу*/}
            {/*        </button>*/}
            {/*    )*/}
            {/*}*/}
            <button
                onClick={() => LoginOut()}
                className="info_button"
            >
                Выйти
            </button>
        </div>
    )
}

export default InfoPageHeader;