import React, { useEffect, useState } from "react";
import "./WeeklyData.css";
import WeatherApi from "../../utilities/WeatherApi";

// Get the weekly data, it creates a timeline per:
//    - week day, icon, max and min temp
const WeeklyData = (props) => {
  const{forecastWeekly}=props
const data=WeatherApi()
const [res, setres] = useState()
  
    
const setData=()=>{
    console.log("calling ",forecastWeekly)
   const result= data.getWeeklyData(forecastWeekly)
   console.log("something ",result)
   setres(result)
}

  useEffect(()=>{
    setData()
  },[])

    return (
      <div className="row rowWeeklyData">
        <div className="table-responsive">
          <table className="table table-borderless">
            <tbody>
              <tr>
                {res?.map(forecast => {
                  return <td key={forecast.weekday}>{forecast.weekday}</td>;
                })}
              </tr>
              <tr>
                {res?.map(forecast => {
                  return (
                    <td key={forecast.weekday} className="weeklyData">
                      <img src={forecast.weather_icon} alt="" />
                    </td>
                  );
                })}
              </tr>
              <tr>
                {res?.map(forecast => {
                  return (
                    <td key={forecast.weekday} className="weeklyData">
                      {forecast.max}° | {forecast.min}°
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  
}

export default WeeklyData;
