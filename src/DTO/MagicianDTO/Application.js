function applicationToRightDict(application) {
    if (application) {
        return  application.map(
            app => {
                return {
                    id: app.id,
                    deadline: app.deadline,
                    status: app.status,
                    details: "Объем: " + app.volume + "\n" +
                        "Магия:\n" +
                        "Тип: " + app?.magic?.magicType?.name + "\n" +
                        "Цвет: " + app?.magic?.magicColour?.name + "\n" +
                        "Состояние: " + app?.magic?.magicState?.name + "\n" +
                        "Мощность: " + app?.magic?.magicPower?.name
                }
            }
        );
    }
    return null
}

export default applicationToRightDict;