
function animalToRightDict(animals) {
    if (animals) {
        return  animals.map(
            app => {
                return {
                    id: app.id,
                    name: app.name,
                    volume: app.magicVolume,
                    magic: app.magic,
                    magic_info: "Содержит:\n" +
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

export default animalToRightDict;