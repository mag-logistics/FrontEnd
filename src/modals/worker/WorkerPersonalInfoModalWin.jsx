import RewardOrPenaltyModalWin from "./RewardOrPenaltyModalWin.jsx";

function WorkerPersonalInfoModalWin(modalItem) {
    let context = modalItem['content'];
    modalItem['modalTitle'].textContent = 'Профиль сотрудника';
    let workerFIO = document.createElement("p");
    workerFIO.className = 'modal_text';
    workerFIO.textContent = `ФИО: ${context['surname']} ${context['name']} ${context['patronymic']}`;

    let workerRole = document.createElement("p");
    workerRole.className = 'modal_text';
    workerRole.textContent = `Должность: ${context['role']}`;

    let workerRewardPoints = document.createElement("p");
    workerRewardPoints.className = 'modal_text';
    workerRewardPoints.textContent = `Поощрительные баллы: ${context['rewardPoints']}`;

    let workerPenaltyPoints = document.createElement("p");
    workerPenaltyPoints.className = 'modal_text';
    workerPenaltyPoints.textContent = `Поджопники: ${context['penaltyPoints']}`;

    let rewardBtn = document.createElement("button");
    rewardBtn.className = "info_button";
    rewardBtn.textContent = 'Поощрить'
    rewardBtn.addEventListener("click", () => {
        modalItem['modalBody'].replaceChildren();
        RewardOrPenaltyModalWin(modalItem);
    })

    let penaltyBtn = document.createElement("button");
    penaltyBtn.className = "info_button";
    penaltyBtn.textContent = 'Дать поджопник';
    penaltyBtn.addEventListener("click", () => {
        modalItem['modalBody'].replaceChildren();
        RewardOrPenaltyModalWin(modalItem, false);
    })

    modalItem["modalBody"].appendChild(workerFIO);
    modalItem["modalBody"].appendChild(workerRole);
    modalItem["modalBody"].appendChild(workerRewardPoints);
    modalItem["modalBody"].appendChild(workerPenaltyPoints);
    modalItem["modalBody"].appendChild(rewardBtn);
    modalItem["modalBody"].appendChild(penaltyBtn);

    modalItem["modalTeg"].style.display = "block";
}

export default WorkerPersonalInfoModalWin;