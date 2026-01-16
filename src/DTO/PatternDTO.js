import MagicDTO from "./MagicDTO.js";

class PatternDTO{
    constructor(data){
        this.id = data.id;
        this.volume = data.volume;
        this.deadline = data.deadline.split('T')[0];
        this.magic = new MagicDTO(data.magic);
    }

    getPatternInfo(){
        return `Объем: ${this.volume} ${this.magic.getMagicInfo()}`;
    }
}
export default PatternDTO;