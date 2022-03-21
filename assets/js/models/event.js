export default class Event{
    #firstCarafe
    #secondCarafe
    #remainGallon

    constructor(carafe1, carafe2, remainGallon){
        this.#firstCarafe = carafe1
        this.#secondCarafe = carafe2
        this.#remainGallon = remainGallon
    }

    //Getters & Setters
    getFirstCarafe(){
        return this.#firstCarafe
    }

    setFirstCarafe(carafe){
        this.#firstCarafe = carafe
    }

    getSecondCarafe(){
        return this.#secondCarafe
    }

    setSecondCarafe(carafe){
        this.#secondCarafe = carafe
    }

    getRemainGallonGoal(){
        return this.#remainGallon
    }

    setRemainGallon(gallon){
        this.#remainGallon = gallon
    }

    start(){
        this.#secondCarafe.remplir()
        if(this.#secondCarafe.getVolume() == this.#remainGallon){
            this.#firstCarafe.transvaser(this.#secondCarafe);
            this.#secondCarafe.vider()
        }else if(this.#secondCarafe.getVolume() != this.#remainGallon){

            do{
                this.#firstCarafe.transvaser(this.#secondCarafe);
    
                if(this.#firstCarafe.estPlein()){
                    this.#firstCarafe.vider()
                }
    
                if(this.#secondCarafe.estVide()){
                    this.#secondCarafe.remplir();
                }
    
            }while(this.#secondCarafe.getRemainGallon() != this.#remainGallon);
        }

        this.#firstCarafe.transvaser(this.#secondCarafe);


    }
}