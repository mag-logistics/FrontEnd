import apiClient from "../api/api-client.js";

function AdditionalInformationWin(modalItem) {
    let userRoleList = [
        'MAGE',
        'HUNTER',
        'EXHAUSTION',
        'STORER'
    ]

    modalItem['modalTitle'].textContent = "Добавление нового пользователя";
    let newUserRoleSelected = null;

    let text = document.createElement("p");
    let newUserEmail = document.createElement("input");
    newUserEmail.placeholder = "Почта нового пользователя";
    newUserEmail.type = "email";

    let newUserName = document.createElement("input");
    newUserName.placeholder = "Имя нового пользователя";
    newUserName.type = "text";

    let newUserSurname = document.createElement("input");
    newUserSurname.placeholder = "Фамилия нового пользователя";
    newUserSurname.type = "text";

    let newUserPatronymic = document.createElement("input");
    newUserPatronymic.placeholder = "Отчество нового пользователя";
    newUserPatronymic.type = "text";

    let newUserPassword = document.createElement("input");
    newUserPassword.placeholder = "Пароль нового пользователя";
    newUserPassword.type = "password";

    let newUserRole = document.createElement("select");
    let newUserRolePlaceholder = document.createElement("option");
    newUserRolePlaceholder.value = "";
    newUserRolePlaceholder.text = "Роль пользователя";
    newUserRolePlaceholder.disabled = true;
    newUserRolePlaceholder.selected = true;
    for (let i = 0; i < userRoleList.length; i++) {
        let option = document.createElement("option");
        option.value = userRoleList[i];
        option.text = userRoleList[i];
        newUserRole.appendChild(option);
    }
    newUserRole.addEventListener("change", (event) => {
        newUserRoleSelected = event.target.value;
    })

    let userAddBtn = document.createElement("button");
    userAddBtn.textContent = "Сохранить данные";
    userAddBtn.className = 'info_button';
    userAddBtn.addEventListener("click", () =>  {
        if (newUserRoleSelected === null) {
            console.log("Не заполнены поля!");
        }
        else {
            apiClient.post("mage/user/create", {
                email: newUserEmail.value,
                password: newUserPassword.value,
                surname: newUserSurname.value,
                firstName: newUserName.value,
                patronymic: newUserPatronymic.value,
                role: newUserRole,
            }).then(res => {
                console.log(res.data);
            })
            console.log("Заявка подана!");
            modalItem["modalTeg"].dispatchEvent(new Event("custom-change"));
        }
    })

    modalItem["modalBody"].appendChild(text);
    modalItem["modalBody"].appendChild(newUserName);
    modalItem["modalBody"].appendChild(newUserSurname);
    modalItem["modalBody"].appendChild(newUserPatronymic);
    modalItem["modalBody"].appendChild(newUserPassword);
    modalItem["modalBody"].appendChild(newUserEmail);
    modalItem["modalBody"].appendChild(newUserRole);
    modalItem["modalBody"].appendChild(userAddBtn);
    modalItem["modalTeg"].style.display = "block";
}

export default AdditionalInformationWin;