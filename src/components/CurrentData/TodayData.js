import React from "react";
import "./TodayData.css";
import WeeklyData from "../WeeklyData/WeeklyData";
import GetGraph from "../GraphPage/GetGraph";

// Get the information regarding the today's weather.
const TodayData = (props)=> {
 
const{state,weekReport}=props

console.log("data from todaydata",state)
console.log("week data from todaydata",weekReport)

    return (
      <div className="container weatherData w-75 border rounded">
        <div className="row currentCity justify-content-left">
          {state.city}, {state.country}
        </div>
        <div className="row currentDay">
          {state.weekday} {state.time}
        </div>
        <div className="row currentDesc justify-content-left">
          {state.weatherDescription}
        </div>
        <div className="row currentTemp justify-content-left">
          <img src={state.weatherIcon} alt="" />
          {state.temp}
          <span className="celsius">&#x2103;</span>
        </div>
        <GetGraph forecast3hrs={weekReport.forecast3hrs} />
        <WeeklyData forecastWeekly={weekReport.forecastWeekly} />
      </div>
    );
}

export default TodayData;