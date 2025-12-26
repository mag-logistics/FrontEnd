import apiService from "../../api/api-services.js";

function RewardOrPenaltyModalWin(modalItem, is_reward = true) {
    let content = modalItem['content'];

    const handleReward = (modalItem, reward) => {
        console.log(`Начисление ${is_reward} бонусов сотруднику ${content['surname']} ${content['worker_id']}`);
        apiService.magician.assignMagicalReward(content['worker_id'], reward)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handlePenalty = (modalItem, penalty) => {
        console.log(`Начисление ${penalty} поджопников сотруднику ${content['surname']} ${content['worker_id']}`);
        apiService.magician.assignMagicalPenalty(content['worker_id'], penalty)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    modalItem['modalTitle'].textContent = `Назначение ${is_reward ? 'магического поощрения' : 'поджопника'}`;

    let worker = document.createElement("p");
    worker.className = 'modal_text';
    worker.textContent = `Сотрудник: ${content['surname']} ${content['name']} ${content['patronymic']}`;

    let inputValue = document.createElement("input");
    inputValue.placeholder = "Количество баллов";
    inputValue.type = "number";
    inputValue.min = "0";

    let handleButton = document.createElement("button");
    handleButton.className = 'btn';
    handleButton.textContent = 'Назначить';
    handleButton.addEventListener("click", async () => {
        if (is_reward)
            await handleReward(content, inputValue.value);
        else
            await handlePenalty(content, inputValue.value);
        let event = new CustomEvent("close_event");
        modalItem["modalTeg"].dispatchEvent(event);
    })

    modalItem["modalBody"].appendChild(worker);
    modalItem["modalBody"].appendChild(inputValue);
    modalItem["modalBody"].appendChild(handleButton);

    modalItem["modalTeg"].style.display = "block";
}

export default RewardOrPenaltyModalWin;