import Carafe from './models/carafe.js'
import Event from './models/event.js'

let carafe1 = new Carafe(4, "");
let carafe2 = new Carafe(3, "");
let nb = 2;
let event = new Event(carafe1, carafe2, nb)

let event_info_template = $("#template-event-info")
let event_info_temlate_html = event_info_template.html()
let event_info = ""
//event.start()


function init(){
    let Gallon_Carafe1 = parseInt($("#carafe1").val());
    let Gallon_Carafe2 = parseInt($("#carafe2").val());
    let gallons = parseInt($("#gallons").val());

    $('.carafe1').removeClass(carafe1.getClassName())
    $('.carafe2').removeClass(carafe2.getClassName())
    if(isNaN(Gallon_Carafe1) || isNaN(Gallon_Carafe2) || isNaN(gallons)){
        console.log("veuillez remplir correctement tous les champs!")
    }else{
        if(gallons > Gallon_Carafe1){
            console.log("Le nombre de Gallons à abtenir dans le carafe 1 est supérieur par rapport à son volume maximal")
        }else{
            console.log(Gallon_Carafe1, Gallon_Carafe2, gallons)
            
            carafe1 = new Carafe(Gallon_Carafe1, `${Gallon_Carafe1}Gallons`)
            $('.carafe1').addClass(carafe1.getClassName())
            
            carafe2 = new Carafe(Gallon_Carafe2, `${Gallon_Carafe2}Gallons`)
            $('.carafe2').addClass(carafe2.getClassName())
            
            nb = gallons
                    
            event = new Event(carafe1, carafe2, nb)

            renderAllInfo()
            event.start()
            check(event.getEventSplitted(), 0)
        }
        
    }
   
}

function renderAllInfo(){
    event_info =""
    event_info += event_info_temlate_html.replace(/{{Carafe1_NbGallons}}/g, carafe1.getVolume())
    .replace(/{{Carafe2_NbGallons}}/g, carafe2.getVolume())
    .replace(/{{nb}}/g, event.getRemainGallonGoal()) 

    $(".info").html(event_info)
                               
}

function transvaser(){
    $(".carafe2").removeClass("transvaser-in")
    $(".carafe2").removeClass("transvaser-out")
    $(".carafe2").addClass("transvaser-in")
    setTimeout(()=>{
        $(".carafe2").addClass("transvaser-out")
    }, 2000)  
}

function check(data, nb){
    var temps = setTimeout(()=>{
        console.log(data[nb])
        if(data[nb].type == "transvaser"){
            transvaser()
        }
       
        nb++
        if(nb<data.length){
            check(data, nb)
        }
    }, 3000)
    console.log(temps)
}

$("#test").on("click", ()=>{
    transvaser()
})


$("#start").on('click', ()=>{
    init()
})







