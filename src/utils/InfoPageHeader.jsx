import ModalWindowManager from "../ModalWindowManager.jsx";
import {LoginOut} from "../LoginPage.jsx";
import React from "react";

function InfoPageHeader({req_name, btn_name, hunter_btn }) {
    return (
        <div id="InfoPageHeader">
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
                hunter_btn !== null && hunter_btn === 'set_animal_storage_info' && (
                    <button onClick={() => ModalWindowManager(hunter_btn, null)}
                            className="info_button">
                        Добавить информацию по магическому существу
                    </button>
                )
            }
            {
                hunter_btn !== null && hunter_btn === 'add_new_user' && (
                    <button onClick={() => ModalWindowManager(hunter_btn, null)}
                            className="info_button">
                        Добавить нового пользователя
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