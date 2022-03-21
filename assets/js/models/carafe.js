export default class Carafe{
    #remainGallon
    #volume

    /**
     * Constructor
     */
    constructor(valueGallon){
        this.#remainGallon = 0
        this.#volume = valueGallon
    }

    //Getters and setters
    getRemainGallon(){
        return this.#remainGallon
    }

    setRemainGallon(valueGallon){
        this.#remainGallon = valueGallon
    }

    getVolume(){
        return this.#volume
    }

    setVolume(valueGallon){
        this.#volume = valueGallon 
    }

    remplir(){
        this.#remainGallon = this.#volume
        console.log(`(Remplir)=> le Carafe ${this.#volume} est rempli`)
    }

    vider(){
        this.#remainGallon = 0
        console.log(`(Vider)=> le Carafe ${this.#volume} est vidé`)
    }

    estVide(){
        if(this.#remainGallon <= 0){
            return true
        }
        return false
    }

    estPlein(){
        if(this.#remainGallon >= this.#volume){
            return true
        }
        return false
    }

    transvaser(carafe){
        const gallonsR = this.#remainGallon
        console.log(`(transvaser)=> Le carafe avec ${carafe.getVolume()}G transvasé dans le carafe ${this.#volume}G`)
        
        if((carafe.getRemainGallon() + this.#remainGallon) < this.#volume){
            this.#remainGallon +=  carafe.getRemainGallon()
            carafe.vider()
        }else{
            this.#remainGallon += (this.#volume - gallonsR)
            carafe.setRemainGallon(carafe.getRemainGallon()-( this.#volume- gallonsR))
        }
        
        console.log(`le carafe ${this.#volume}G = ${this.#remainGallon}G restant`)
        console.log(`le carafe ${carafe.getVolume()}G = ${carafe.getRemainGallon()}G restant`)
    }
}