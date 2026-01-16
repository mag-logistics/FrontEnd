function hunterApplicationToRightDict(application) {
    if (application) {
        return  application.map(
            app => {
                return {
                    id: app.id,
                    deadline: app.deadline,
                    status: app.status,
                    animal: app?.animal,
                    count: app.animalCount,
                    details: "Требуемое животное: " + app.animal.name + "\n" +
                        "Количество: " + app.animalCount
                }
            }
        );
    }
    return null
}

export default hunterApplicationToRightDict;