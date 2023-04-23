import React, { useState} from "react";
import TodayData from "../CurrentData/TodayData";
import SearchBar from '../SearchBar/SearchBar';
import WeatherApi from '../../utilities/WeatherApi';
import './App.css';

function App() {
  
  const data=WeatherApi()
  
  const [weeklyData, setweeklyData] = useState({})

 const [state, setState] = useState({
  firstTime: true,
        city: "",
        weekday: "",
        temp: "",
        weatherDescription: "",
        weatherIcon: "",
        country: "",
        timezone: "",
        time: "",
        forecast3hrs: [],
        forecastWeekly: []
 });


  
    //Update today data as sync mode
  const  updateTodayState = (arg) => {
console.log("updatestate",arg)

      setState({...arg,firstTime:false});

    };
  
    //Update weekly data as sync mode
    const updateWeeklyState = (arg) => {
      const payload={
        forecastWeekly: arg,
        forecast3hrs: arg.slice(0, 8)
      }
      setweeklyData({...payload});
      console.log("week report",weeklyData)
    };



    
  
    //Search the weather based on the city
   const search =async(term)=> {
      //Get today data
      const res =await data.getTodayData(term)
      updateTodayState(res)
    
    //Show the forecast for the next 24 hours, each 3 hours
    const weekData=await data.get3HoursData(term)
    updateWeeklyState(weekData)

    }
  
  const  warningBanner=()=> {
      if (state.firstTime) {
        return null;
      }
  
      return (
        <div className="warningBanner">
          We couldn’t find any results. Try checking your spelling.
        </div>
      );
    }
  
    //Identify if there is data to display
   const displayResult=()=> {
      if ((typeof state.city === "undefined") | (state.city === "")) {
        return false;
      } else {
        return true;
      }
    }
  
    
      return (
        <div className="main">
          <div className="navbar-main">
            <h1>Weather</h1>
          </div>
          <SearchBar onSearch={search}  />
          {displayResult() ? (
            <TodayData
             
             weekReport={weeklyData}
              state={state}
            />
          ) : (
            warningBanner()
          )}
        </div>
      );
    
  
}

export default App;
