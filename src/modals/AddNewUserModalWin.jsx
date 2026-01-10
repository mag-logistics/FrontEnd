import apiClient from "../api/api-client.js";
import apiService from "../api/api-services.js";

function AdditionalInformationWin(modalItem) {
    let userRoleList = [
        'MAGE',
        'HUNTER',
        'EXHAUSTION',
        'STORER'
    ]

    let sexList = [
        'МУЖ',
        'ЖЕН'
    ]

    modalItem['modalTitle'].textContent = "Добавление нового пользователя";
    let newUserRoleSelected = null;
    let userSexSelected = null;

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

    let userSex = document.createElement('select');
    let userSexPlaceholder = document.createElement("option");
    userSexPlaceholder.text = "Пол пользователя";
    userSexPlaceholder.value = '';
    userSexPlaceholder.disabled = true;
    userSexPlaceholder.selected = true;
    userSex.appendChild(userSexPlaceholder);
    for (let [index, value] of sexList.entries()) {
        let option = document.createElement("option");
        option.text = value;
        option.value = index.toString();
        userSex.appendChild(option);
    }
    userSex.addEventListener('change', (event) => {
        userSexSelected = event.target.value;
    })

    let newUserPassword = document.createElement("input");
    newUserPassword.placeholder = "Пароль нового пользователя";
    newUserPassword.type = "password";

    let newUserRole = document.createElement("select");
    let newUserRolePlaceholder = document.createElement("option");
    newUserRolePlaceholder.value = "";
    newUserRolePlaceholder.text = "Роль пользователя";
    newUserRolePlaceholder.disabled = true;
    newUserRolePlaceholder.selected = true;
    newUserRole.appendChild(newUserRolePlaceholder);
    for (let i = 0; i < userRoleList.length; i++) {
        let option = document.createElement("option");
        option.value = userRoleList[i];
        option.text = userRoleList[i];
        newUserRole.appendChild(option);
    }
    newUserRole.addEventListener("change", (event) => {
        newUserRoleSelected = event.target.value;
    })

    let userBD = document.createElement("input");
    userBD.placeholder = "Дата рождения пользователя";
    userBD.type = "date";

    let userAddBtn = document.createElement("button");
    userAddBtn.textContent = "Сохранить данные";
    userAddBtn.className = 'info_button';
    userAddBtn.addEventListener("click", () =>  {
        if (newUserRoleSelected === null) {
            console.log("Не заполнены поля!");
        }
        else {
            apiService.magician.createNewUser(localStorage.getItem('user_id'),{
                email: newUserEmail.value,
                password: newUserPassword.value,
                surname: newUserSurname.value,
                firstName: newUserName.value,
                patronymic: newUserPatronymic.value,
                role: newUserRole,
            }).then(res => {
                console.log(res.data);
                console.log("Заявка подана!");
                modalItem["modalTeg"].dispatchEvent(new Event("custom-change"));
            }).catch(err => console.log(err));
        }
    })

    modalItem["modalBody"].appendChild(text);
    modalItem["modalBody"].appendChild(newUserName);
    modalItem["modalBody"].appendChild(newUserSurname);
    modalItem["modalBody"].appendChild(newUserPatronymic);
    modalItem["modalBody"].appendChild(userSex);
    modalItem["modalBody"].appendChild(userBD);
    modalItem["modalBody"].appendChild(newUserPassword);
    modalItem["modalBody"].appendChild(newUserEmail);
    modalItem["modalBody"].appendChild(newUserRole);
    modalItem["modalBody"].appendChild(userAddBtn);
    modalItem["modalTeg"].style.display = "block";
}

export default AdditionalInformationWin;