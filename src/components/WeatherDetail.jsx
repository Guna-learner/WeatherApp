import React from 'react'

const WeatherDetail = ({temp,city,country,lat,lon,today}) => {
  return (
    <>
    <div className='dayandtime'>
      <div className='day'>
      <label>Day</label>
      <span>{today.day}</span>
      </div>
     <div className='time'>
     <label>Time</label>
      <span>{today.hour}:{today.min} {today.clock}</span>
     </div>
    </div>
      <div className='temp'>{temp}°C</div>
      <div className='city'>{city}</div>
      <div className='country'>{country}</div>
      <div className='cord'>
        <span className='lat'>latitude:{lat}</span>
        <span className='lon'>longitude:{lon}</span>
      </div>
    </>
  )
}

export default WeatherDetail
