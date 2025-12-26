import apiClient from "../api/api-client.js";

function GetMagicAnimalModalWin(modalItem) {
    let magicAnimalNames = [
        'Саня',
        'Ваня',
        'Владос'
    ]  // todo apiClient.get('') animal names

    modalItem['modalTitle'].textContent = "Подача заявки на магическое существо";

    let text = document.createElement("p");

    let magicAnimalNameSelected = null;
    let magicAnimalName = document.createElement("select");
    let magicAnimalNamePlaceholder = document.createElement("option");
    let magicEndDate = document.createElement("input");
    magicEndDate.placeholder = "Срок";
    magicEndDate.type = "date";
    magicAnimalNamePlaceholder.value = "";
    magicAnimalNamePlaceholder.text = "Название магической твари"
    magicAnimalNamePlaceholder.disabled = true;
    magicAnimalNamePlaceholder.selected = true;
    magicAnimalName.appendChild(magicAnimalNamePlaceholder)
    for (let i = 0; i < magicAnimalNames.length; i++) {
        let option = document.createElement("option");
        option.textContent = magicAnimalNames[i];
        option.value = magicAnimalNames[i];
        magicAnimalName.appendChild(option);
    }
    magicAnimalName.addEventListener("change", (event) => {
        magicAnimalNameSelected = event.target.value;
    })

    let magicAnimaCount = document.createElement("input");
    magicAnimaCount.type = "number";
    magicAnimaCount.placeholder = "Количество магических тварей";
    magicAnimaCount.min = "1";

    let apply_btn = document.createElement("button");
    apply_btn.textContent = "Подать заявку";
    apply_btn.addEventListener("click", () =>  {
        console.log("Заявка подана!");
        apiClient.post(`/storer/order/create?orderId=${modalItem.content.number}`, {
            name: magicAnimalName.value,
            title: "Описание туши",
            deadline: magicEndDate.value,
            quantity: magicAnimaCount.value
        }).then(res => {
            let event = new CustomEvent("close_event");
            modalItem["modalTeg"].dispatchEvent(event);
        })
        let event = new CustomEvent("close_event");
        modalItem["modalTeg"].dispatchEvent(event);
    })

    modalItem["modalBody"].appendChild(text);
    modalItem["modalBody"].appendChild(magicAnimalName);
    modalItem["modalBody"].appendChild(magicAnimaCount);
    modalItem["modalBody"].appendChild(magicEndDate);
    modalItem["modalBody"].appendChild(apply_btn);

    modalItem["modalTeg"].style.display = "block";
}

export default GetMagicAnimalModalWin;