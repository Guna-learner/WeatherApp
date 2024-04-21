import { useEffect, useState } from 'react'
import '../css/App.css'
import clearsky from '../assets/clearSky.jpg'
import clearskynight from '../assets/clearSkynight.jpg'
import fewclouds from '../assets/fewclouds.jpg'
import fewcloudsnight from '../assets/fewCloutsnight.jpg'
import scatteredclouds from '../assets/scatteredclouds.jpg'
import scatterednight from '../assets/scatterednight.jpg'
import brokenclouds from '../assets/brokenclouds.jpg'
import brokencloudsnight from '../assets/brokencloudsnight.jpg'
import raniyday from '../assets/rainyday.jpg'
import rainynight from '../assets/rainynight.jpg'
import snowday from '../assets/snowday.jpg'
import snownight from '../assets/snownight.jpg'
import mist from '../assets/mist.webp'
import { AiOutlineSearch } from "react-icons/ai";
import WeatherDetail from './WeatherDetail';



function App() {
 


  const [text,setText]=useState("Search City");
  const [temp,setTemp]=useState(0);
  const [city,setCity]=useState("");
  const [country,setCountry]=useState("");
  const [lat,setLat]=useState(0);
  const [lon,setLon]=useState(0);
  const [today,setToday] = useState({day:"",hour:"",min:"",clock:""});
  const [citynotfound,setCityNotFount]=useState(false);
  const [loading,setLoading]=useState(false);




  const weatherImage ={
    "01d":clearsky,
    "01n":clearskynight,
    "02d":fewclouds,
    "02n":fewcloudsnight,
    "03d":scatteredclouds,
    "03n":scatterednight,
    "04d":brokenclouds,
    "04n":brokencloudsnight,
    "10d":raniyday,
    "10n":rainynight,
    "13d":snowday ,
    "13n":snownight,
    "50d":mist
    
  }

  const search=  async ()=>
  {

    

    try{
      setLoading(true)
      setCityNotFount(false)
      const apikey= "5ab25b767377b01c1042fb38c3b05e7a"
      const url =  `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apikey}&units=Metric`
  
  
      const DT_apikey ="pJDSxRtEJeZAfkrBOakOIw==uNRAq7RsyL8kuPEH";
      const DT_url = `https://api.api-ninjas.com/v1/worldtime?city=${text}`

     
      const  data = await fetch(url);
      const res =  await data .json()



      if(res.cod === "404")
      {
        setLoading(false);
        setCityNotFount(true)
        return
      }
      
    setCity(res.name)
    setTemp(res.main.temp)
    setCountry(res.sys.country)
    setLat(res.coord.lat)
    setLon(res.coord.lon)
    const bg_data = weatherImage[res.weather[0].icon] ;
    document.getElementsByTagName("body")[0].style.backgroundImage=`url(${bg_data})`

    const DT_data = await fetch(DT_url,{
      method: 'GET',
      headers: { 'X-Api-Key': DT_apikey},
      contentType: 'application/json'
    });
    const DT_res = await DT_data.json()

    let hour = DT_res.hour === 0 ? 12 : DT_res.hour > 12 ? DT_res.hour - 12 : DT_res.hour; 

        let clock = DT_res.hour >= 12? "PM" : "AM";
    setToday({
        day:DT_res.day_of_week,
        hour: hour,
        min:DT_res.minute,
        clock:clock
      })
      

    }
    catch(err){
          console.log(err);
      
    }
    finally{
     setLoading(false);
    }

    
  }
    

  const inputText = (e)=>{
          setText(e.target.value);
  }
  const handleEnter =(e)=>{
   if(e.key === "Enter"){
    search();
   }
  }

  useEffect(()=>{
    search();
  },[])


  

  return (
     <>
     <div className='container'>
            <div className='input'>
              <input type="text" className="input-box" placeholder='Enter City' value={text} onChange={inputText} onKeyDown={handleEnter}/>
              <AiOutlineSearch className='icon' onClick={()=> search()}/>
            </div>

           {loading && <div className='loading'>Loading...</div>}
          {citynotfound && <div className='notfound'>City Not Found</div>}

       {!loading && !citynotfound && <WeatherDetail  temp={temp} city={city} country={country} lat={lat} lon={lon} today={today}/>}
     </div>
     </>
  )
}

export default App
