class MagicDTO {
    constructor(data) {
        this.id = data.id;
        this.type = data.magicType;
        this.colour = data.magicColour;
        this.state = data.magicState;
        this.power = data.magicPower;
    }

    getMagicInfo(){
        return "Тип: " + this.type.name + " " +
            "Цвет: " + this.colour.name + " " +
            "Состояние: " + this.state.name + " " +
            "Мощность: " + this.power.name
    }
}

export default MagicDTO;