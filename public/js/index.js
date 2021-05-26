console.log('client side javascript file is loaded')

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data.puzzle)
    })
})

var info=document.querySelector('#info')
var error=document.querySelector('#error')

const handleClick=(event)=>{
     var add=document.getElementById("address").value;
     info.textContent="Loading.."
     error.textContent=""
     fetch('/weather?address='+add).then((response)=>{   


    response.json().then((data)=>{   
        if(data.error){
            console.log(data.error)
            info.innerHTML=data.error
        }else{    
            console.log(data)
            info.textContent=data.city
            error.textContent+="Currently the temperature is "+(data.temp)+" Kelvin , "
            error.textContent+=data.description+","
            error.textContent+=" wind speed is "+data.wind+"."

        }
    })
})

     event.preventDefault();

}


