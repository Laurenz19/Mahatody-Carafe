export default class Carafe{
    #remainGallon
    #volume
    #className
    /**
     * Constructor
     */
    constructor(valueGallon, className){
        this.#remainGallon = 0
        this.#volume = valueGallon
        this.#className = className
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

    getClassName(){
        return this.#className
    }

    setClassName(className){
        this.#className = className
    }

    remplir(){
        this.#remainGallon = this.#volume
        console.log(`(Remplir)=> le Carafe ${this.#volume} est rempli`)
        let carafe = new Carafe(this.getVolume(), this.getClassName())
        carafe.setRemainGallon(this.getRemainGallon())
        return {type:"remplir", carafe:carafe}  
    }

    vider(){
        this.#remainGallon = 0
        console.log(`(Vider)=> le Carafe ${this.#volume} est vidé`)
        let carafe = new Carafe(this.getVolume(), this.getClassName())
        carafe.setRemainGallon(this.getRemainGallon())

        return {type:"vider", carafe:carafe}  
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
            carafe.setRemainGallon(carafe.getRemainGallon()-carafe.getRemainGallon())   
        }else{
            this.#remainGallon += (this.#volume - gallonsR)
            carafe.setRemainGallon(carafe.getRemainGallon()-( this.#volume- gallonsR))
        }
        
        console.log(`le carafe ${this.#volume}G = ${this.#remainGallon}G restant`)
        console.log(`le carafe ${carafe.getVolume()}G = ${carafe.getRemainGallon()}G restant`)
        
        let carafe1 = new Carafe(this.getVolume(), this.getClassName())
        carafe1.setRemainGallon(this.getRemainGallon())

        let carafe2 = new Carafe(carafe.getVolume(), carafe.getClassName())
        carafe2.setRemainGallon(carafe.getRemainGallon())
        return {type:"transvaser", carafe1:carafe1, carafe2: carafe2}  
    }
}