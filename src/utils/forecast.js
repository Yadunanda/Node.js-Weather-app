let request=require('request')
let forecast=(lat,long,callBack)=>{
    let url=`http://api.weatherstack.com/current?access_key=3e83a365c87b915edc890b868794cc7e&query=${lat},${long}`
    request({url,json:true},(error,response)=>{
        let{current,error:errors}=response.body
        if(error){
            callBack('Network problem', undefined)
        }
        else if(errors){
            callBack('unable to find the location',undefined)

        }
        else{
            callBack(undefined,`${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees out`)
        }
    })

}
module.exports=forecast