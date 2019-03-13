window.addEventListener("keydown",function(event){
    if (event.which == 49)
        window.location.href = "../trail";
    
    if(event.which==51)
        window.location.href= "../topten";
    
    if(event.which==52){ 
        document.getElementByID("textSound").innerHTML= "Turn Sound OFF";
    
    }
});