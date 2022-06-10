export default class Event{
    #firstCarafe
    #secondCarafe
    #remainGallon
    #splitted_event
    #open
    #close

    constructor(carafe1, carafe2, remainGallon){
        this.#firstCarafe = carafe1
        this.#secondCarafe = carafe2
        this.#remainGallon = remainGallon
        this.#splitted_event = []
        this.#open = []
        this.#close = []
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
                    if(this.#firstCarafe.getRemainGallon() > this.#remainGallon){
                        this.#splitted_event.push(this.#firstCarafe.vider())
                    }
                }
    
                if(this.#secondCarafe.estVide()){
                    if(this.#firstCarafe.getRemainGallon() != this.#remainGallon){
                        this.#splitted_event.push(this.#secondCarafe.remplir())
                    }
                   
                }
    
            }while(this.#firstCarafe.getRemainGallon() != this.#remainGallon);
        }
    }

    start2(){
        let carafe1 = this.#firstCarafe
        let carafe2 = this.#secondCarafe
       
        let initial_state = {
            previous: null,
            info:null,
            state:{
                carafe1: carafe1,
                carafe2: carafe2
            },
            treated: false
        }

        this.#open.push(initial_state)

        do{
            console.log(this.#open)
            this.traiter(this.#open, this.#close)
          
            
        }while(this.#open.length >0 && this.#open[0].state.carafe1.getRemainGallon() != this.#remainGallon)
        

        let processes = []
       
        this.#open.forEach( branch => {
            if(branch.state.carafe1.getRemainGallon() == this.#remainGallon){
                processes.push(branch)
            }else{

            }
        });

        if(processes.length>1){
            let nbRandom = Math.floor(Math.random()*(processes.length))
            console.log(nbRandom)
        
           
            this.sortEvent(processes[nbRandom], [])
        }else if(processes.length == 1){
            this.sortEvent(processes[0], [])
        }else{

        }
        console.log(this.#open)
        
        console.log(this.#close)
        console.log(this.#splitted_event) 

    }
   /*  chooseRoot(tab){
        let root = null
        if(tab)
    } */
    traiter(open, close){
        
        let racine = open[0]   
          

        if(racine != null){
            if(racine.state.carafe1.estVide()){
                let carafe =  this.initCarafe(racine.state.carafe1);
                let info= carafe.remplir()
                
                console.log(carafe)
                let sommet = {
                    previous: racine,
                    info: info,
                    state:{
                        carafe1: info.carafe,
                        carafe2: racine.state.carafe2
                    },
                    treated: false
                }
               
                if(this.verifyTable(open, close, sommet)==false){
                    open.push(sommet)
                }
                
            }

            if(racine.state.carafe2.estVide()){
                let carafe =  this.initCarafe(racine.state.carafe2);
                let info = carafe.remplir()
                console.log(carafe)
                let sommet = {
                    previous: racine,
                    info: info,
                    state:{
                        carafe1: racine.state.carafe1,
                        carafe2: info.carafe
                    },
                    treated: false
                }
                
                if(this.verifyTable(open, close, sommet) ==false){
                    open.push(sommet)
                }
            }

            if(racine.state.carafe1.estPlein()){
                if(racine.state.carafe2.estVide()){
                    let _carafe1 =  this.initCarafe(racine.state.carafe1);
                    let _carafe2 =  this.initCarafe(racine.state.carafe2);
                    console.log(_carafe1, _carafe2)
                    let info = _carafe2.transvaser(_carafe1)
                    let sommet = {
                        previous: racine,
                        info: info,
                        state:{
                            carafe1: info.carafe2,
                            carafe2: info.carafe1
                        },
                        treated: false,
                    }
                   
                    if(this.verifyTable(open, close, sommet) ==false){
                        open.push(sommet)
                    }
                }

                if(racine.state.carafe2.getRemainGallon() < racine.state.carafe2.getVolume()){
                    let _carafe1 =  this.initCarafe(racine.state.carafe1);
                    let _carafe2 =  this.initCarafe(racine.state.carafe2);
                    console.log(_carafe1, _carafe2)
                    let info1 = _carafe2.transvaser(_carafe1)
                    let sommet1 = {
                        previous: racine,
                        info: info1,
                        state:{
                            carafe1: info1.carafe2,
                            carafe2: info1.carafe1
                        },
                        treated: false,
                    }

                    let carafe =  this.initCarafe(racine.state.carafe1);
                    let info2 =  carafe.vider();
                    console.log(carafe)
                    let sommet2 = {
                        previous: racine,
                        info: info2,
                        state:{
                            carafe1: info2.carafe,
                            carafe2: racine.state.carafe2
                        },
                        treated: false,
                    }
                   
                    if(this.verifyTable(open, close, sommet1) ==false){
                        open.push(sommet1)
                    }

                    if(this.verifyTable(open, close, sommet2) ==false){
                        open.push(sommet2)
                    }


                }

                if(racine.state.carafe2.estPlein()){
                    let carafe =  this.initCarafe(racine.state.carafe1);
                    let info =  carafe.vider();
                    console.log(carafe)
                    let sommet = {
                        previous: racine,
                        info: info,
                        state:{
                            carafe1: info.carafe,
                            carafe2: racine.state.carafe2
                        },
                        treated: false,
                    }
                    
                    if(this.verifyTable(open, close, sommet) ==false){
                        open.push(sommet)
                    }
                }
               
            }


            if(racine.state.carafe2.estPlein()){
                if(racine.state.carafe1.estVide()){
                    let _carafe1 =  this.initCarafe(racine.state.carafe1);
                    let _carafe2 =  this.initCarafe(racine.state.carafe2);
                    console.log(_carafe1, _carafe2)
                    let info = _carafe1.transvaser(_carafe2)
                    let sommet = {
                        previous: racine,
                        info: info,
                        state:{
                            carafe1: info.carafe1,
                            carafe2: info.carafe2
                        },
                        treated: false,
                    }
                    
                    if(this.verifyTable(open, close, sommet) ==false){
                        open.push(sommet)
                    }
                }

                if(racine.state.carafe1.getRemainGallon() < racine.state.carafe1.getVolume()){
                    let _carafe1 =  this.initCarafe(racine.state.carafe1);
                    let _carafe2 =  this.initCarafe(racine.state.carafe2);
                    console.log(_carafe1, _carafe2)
                    let info1 = _carafe1.transvaser(_carafe2)
                    let sommet1 = {
                        previous: racine,
                        info: info1,
                        state:{
                            carafe1: info1.carafe1,
                            carafe2: info1.carafe2
                        },
                        treated: false,
                    }

                    let carafe =  this.initCarafe(racine.state.carafe2);
                    let info2 =  carafe.vider();
                    console.log(carafe)
                    let sommet2 = {
                        previous: racine,
                        info: info2,
                        state:{
                            carafe1: racine.state.carafe1,
                            carafe2: info2.carafe
                        },
                        treated: false,
                    }
                   
                    if(this.verifyTable(open, close, sommet1) ==false){
                        open.push(sommet1)
                    }

                    if(this.verifyTable(open, close, sommet2) ==false){
                        open.push(sommet2)
                    }


                }

                if(racine.state.carafe1.estPlein()){
                    let carafe =  this.initCarafe(racine.state.carafe2);
                    let info = carafe.vider()
                    console.log(carafe)
                    let sommet = {
                        previous: racine,
                        info: info,
                        state:{
                            carafe1: racine.state.carafe1,
                            carafe2: info.carafe
                        },
                        treated: false,
                    }
                   
                    if(this.verifyTable(open, close, sommet)==false){
                        open.push(sommet)
                    }
                }
               
            }
            
            if(racine.state.carafe1.getRemainGallon() < racine.state.carafe1.getVolume()){
                let _carafe1 =  this.initCarafe(racine.state.carafe1);
                    let _carafe2 =  this.initCarafe(racine.state.carafe2);
                    console.log(_carafe1, _carafe2)
                    let info = _carafe2.transvaser(_carafe1)
                    let sommet = {
                        previous: racine,
                        info: info,
                        state:{
                            carafe1: info.carafe2,
                            carafe2: info.carafe1
                        },
                        treated: false,
                    }
                   
                    if(this.verifyTable(open, close, sommet) ==false){
                        open.push(sommet)
                    }

                }
            }

            if(racine.state.carafe2.getRemainGallon() < racine.state.carafe2.getVolume()){
                let _carafe1 =  this.initCarafe(racine.state.carafe1);
                    let _carafe2 =  this.initCarafe(racine.state.carafe2);
                    console.log(_carafe1, _carafe2)
                    let info = _carafe1.transvaser(_carafe2)
                    let sommet = {
                        previous: racine,
                        info: info,
                        state:{
                            carafe1: info.carafe1,
                            carafe2: info.carafe2
                        },
                        treated: false,
                    }
                    
                    if(this.verifyTable(open, close, sommet) ==false){
                        open.push(sommet)
                    }

            }
            racine.treated = true

            let new_open = []
                this.#open.forEach(data => {
                    if(data.treated == false){
                        new_open.push(data)
                    }
        
                    if(data.treated == true){
                        this.#close.push(data)
                    }
                });
            this.#open =new_open    
            
          
 }

    initCarafe(_carafe){
      
        let carafe = _carafe.clone()

        /************************************************************/
            carafe.setRemainGallon(_carafe.getRemainGallon())
            carafe.setClassName(_carafe.getClassName())
            carafe.setVolume(_carafe.getVolume())
        /************************************************************/
       
        return carafe
    }

    verifyTable(open, close, sommet){
        let exist = false
        open.forEach(data => {
            if(data.state.carafe1.getRemainGallon() == sommet.state.carafe1.getRemainGallon() && data.state.carafe2.getRemainGallon() == sommet.state.carafe2.getRemainGallon()){
                exist = true
            }
        });

        close.forEach(data => {
            if(data.state.carafe1.getRemainGallon() == sommet.state.carafe1.getRemainGallon() && data.state.carafe2.getRemainGallon() == sommet.state.carafe2.getRemainGallon()){
                exist = true
            }
        });
        console.log(exist)
        return exist
    }

    sortEvent(data, tab){
       
     tab.push(data.info)
     
     if(data.previous != null){
         this.sortEvent(data.previous, tab)
     }else{
         this.#splitted_event = []
         console.log("eto", data, tab)
         console.log(tab.length)
        for (let i = tab.length-1; i >= 0; i--) {
            let event_info = tab[i];
            console.log(i,event_info)
            if(event_info != null){
               this.#splitted_event.push(event_info)
            }
        }
     }
     
     
    }
}