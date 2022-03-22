export default class Event{
    #firstCarafe
    #secondCarafe
    #remainGallon
    #splitted_event

    constructor(carafe1, carafe2, remainGallon){
        this.#firstCarafe = carafe1
        this.#secondCarafe = carafe2
        this.#remainGallon = remainGallon
        this.#splitted_event = []
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

    getEventSplitted(){
        return this.#splitted_event
    }

    setRemainGallon(gallon){
        this.#remainGallon = gallon
    }

    start(){

        this.#splitted_event.push(this.#secondCarafe.remplir())
        if(this.#secondCarafe.getVolume() == this.#remainGallon){
            this.#splitted_event.push(this.#firstCarafe.transvaser(this.#secondCarafe))
            this.#splitted_event.push(this.#secondCarafe.vider())
        }else if(this.#secondCarafe.getVolume() != this.#remainGallon){

            do{
                this.#splitted_event.push(this.#firstCarafe.transvaser(this.#secondCarafe))
    
                if(this.#firstCarafe.estPlein()){
                    this.#splitted_event.push(this.#firstCarafe.vider())
                }
    
                if(this.#secondCarafe.estVide()){
                    this.#splitted_event.push(this.#secondCarafe.remplir())
                }
    
            }while(this.#secondCarafe.getRemainGallon() != this.#remainGallon);
        }

        this.#splitted_event.push(this.#firstCarafe.transvaser(this.#secondCarafe))

    }
}