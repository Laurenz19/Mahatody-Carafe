import Carafe from './models/carafe.js'
import Event from './models/event.js'

let carafe1 = new Carafe(4, "");
let carafe2 = new Carafe(3, "");
let nb = 2;
let event = new Event(carafe1, carafe2, nb)
let gallonEnPixel= 50; 

let event_info_template = $("#template-event-info")
let event_info_temlate_html = event_info_template.html()
let event_info = ""



function init(){
    let Gallon_Carafe1 = parseInt($("#carafe1").val());
    let Gallon_Carafe2 = parseInt($("#carafe2").val());
    let gallons = parseInt($("#gallons").val());

    $('.carafe1').removeClass(carafe1.getClassName())
    $('.carafe2').removeClass(carafe2.getClassName())
    if(isNaN(Gallon_Carafe1) || isNaN(Gallon_Carafe2) || isNaN(gallons)){
        console.log("veuillez remplir correctement tous les champs!")
        alert("Veuillez remplir correctement tous les champs!")
    }else{
        if(gallons > Gallon_Carafe1){
            console.log("Le nombre de Gallons à abtenir dans le carafe 1 est supérieur par rapport à son volume maximal")
            alert("Le nombre de Gallons à abtenir dans le carafe 1 est supérieur par rapport à son volume maximal")
        }else if(Gallon_Carafe1 == Gallon_Carafe2){
            console.log("Veuillez entrez deux carafes avec gallons différents")
            alert("Veuillez entrez deux carafes avec gallons différents")
        }else{
            console.log(Gallon_Carafe1, Gallon_Carafe2, gallons)
            
            carafe1 = new Carafe(Gallon_Carafe1, `${Gallon_Carafe1}Gallons`)
            $('.carafe1').addClass(carafe1.getClassName())
            $('.carafe1').html("")
            $('.carafe1').css({"height":`${gallonEnPixel*carafe1.getVolume()}`})
            $('.carafe1').prepend("<div></div>")
           
            
            
            carafe2 = new Carafe(Gallon_Carafe2, `${Gallon_Carafe2}Gallons`)
            $('.carafe2').addClass(carafe2.getClassName())
            $('.carafe2').html("")
            $('.carafe2').css({"height":`${gallonEnPixel*carafe2.getVolume()}`})
            $('.carafe2').prepend("<div></div>")
           
            
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

function transvaser(carafe1, carafe2){
    $(`.${carafe2.getClassName()}`).removeClass("transvaser-in")
    $(`.${carafe2.getClassName()}`).removeClass("transvaser-out")
    $(`.${carafe2.getClassName()}`).addClass("transvaser-in")
    console.log(carafe2.getRemainGallon())
    setTimeout(()=>{
        console.log("height",$(`.${carafe2.getClassName()}`).find("div").height())
    
       let val = gallonEnPixel*carafe2.getRemainGallon()
       
        $(`.${carafe2.getClassName()}`).find("div").removeAttr()
       
        $(`.${carafe2.getClassName()}`).find("div").css({"height":`${val}px`, "background-color":"rgba(19, 240, 240, 0.5)", "border-radius": "0 0 15px 15px", "position":"relative", "bottom":`-${$(`.${carafe2.getClassName()}`).height()-val}px`})
        
        $(`.${carafe2.getClassName()}`).addClass("transvaser-out")
    }, 2000) 

    setTimeout(()=>{
    
       let val = gallonEnPixel*carafe1.getRemainGallon()
        $(`.${carafe1.getClassName()}`).find("div").removeAttr()
        $(`.${carafe1.getClassName()}`).find("div").css({"height":`${val}px`, "background-color":"rgba(19, 240, 240, 0.5)", "border-radius": "0 0 15px 15px", "position":"relative", "bottom":`-${$(`.${carafe1.getClassName()}`).height()-val}px`})
    }, 2100)
}

function check(data, nb){
    var temps = setTimeout(()=>{
         console.log(data[nb])
        if(data[nb].type == "transvaser"){
            
            console.log(1, data[nb].type)
            transvaser(data[nb].carafe1, data[nb].carafe2)
        }

        if(data[nb].type == "remplir"){
            console.log(2, data[nb].type)
            $(`.${data[nb].carafe.getClassName()}`).find("div").removeAttr()
            $(`.${data[nb].carafe.getClassName()}`).find("div").css({"height":`${$(`.${data[nb].carafe.getClassName()}`).height()}px`, "background-color":"rgba(19, 240, 240, 0.5)", "border-radius": "0 0 15px 15px", "position":"relative", "bottom":"0px"})  
        }

        if(data[nb].type == "vider"){
            console.log(3, data[nb].type)
            $(`.${data[nb].carafe.getClassName()}`).find("div").css({"height":"0px", "background-color":"white", "border-radius": "0 0 15px 15px"})
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







