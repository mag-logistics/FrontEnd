import ModalWindowManager from "../ModalWindowManager.jsx";
import {LoginOut} from "../LoginPage.jsx";
import React from "react";

function InfoPageHeader({req_name, btn_name, hunter_btn}) {
    console.log(req_name);
    return (
        <div>
            {
                req_name !== null && (
                    <button
                        onClick={() => ModalWindowManager(req_name, null)}
                    >
                        { btn_name }
                    </button>
                )
            }
            {
                hunter_btn !== null && (
                    <button onClick={() => ModalWindowManager(hunter_btn, null)}>
                        Добавить информацию по магическому существу
                    </button>
                )
            }
            <button
                onClick={() => LoginOut()}
            >
                Выйти
            </button>
        </div>
    )
}

export default InfoPageHeader;