console.log('My first serverside javascript');


 let weather=document.querySelector('form')
 let search=document.querySelector('input')
 let one=document.getElementById('one')
 let two=document.getElementById('two')
 weather.addEventListener('submit',(event)=>{event.preventDefault()
    let x=search.value
     one.textContent='Loading'
     two.textContent=''
    fetch(`/weather?address=${x}`)
.then((response)=>{
    
    response.json().then((data)=>{if(data.errormessage){
       return( one.textContent=data.errormessage)
        //console.log(data.error))
    }
    else{
        console.log(data);
        one.textContent=data.location
        two.textContent=data.temp
        console.log(data.location);
        console.log(data.temp);
    }
})

})
    console.log(x)})   
   // 'http://api.weatherstack.com/current?access_key=3e83a365c87b915edc890b868794cc7e&query=${lat},${long}')