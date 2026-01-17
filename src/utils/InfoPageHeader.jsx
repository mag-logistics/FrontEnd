import ModalWindowManager from "../ModalWindowManager.jsx";
import {LoginOut} from "../LoginPage.jsx";
import React from "react";
import {useNavigate} from "react-router-dom";

function InfoPageHeader({main_page = true}) {
    let user_role = sessionStorage.getItem('role');
    const navigate = useNavigate();

    return (
        <div className={`InfoPageHeader ${main_page ? '' : 'solo'}`}>
            {
                user_role === 'MAGICIAN' && main_page && (
                    <>
                        <button
                            onClick={() => ModalWindowManager('get_magic_req', null)}
                            className="info_button"
                        >
                            Создать заявку на магию
                        </button>
                        {/*<button onClick={() => ModalWindowManager('add_new_user', null)}*/}
                        {/*        className="info_button">*/}
                        {/*    Добавить нового пользователя*/}
                        {/*</button>*/}
                        <button onClick={() => navigate("/worker_manager")}
                                className="info_button">
                            Список сотрудников
                        </button>
                    </>
                )
            }
            {
                user_role === 'MAGICIAN' && !main_page && (
                    <button onClick={() => navigate(`/${user_role}`)}
                            className="info_button">
                        Назад
                    </button>
                )
            }
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