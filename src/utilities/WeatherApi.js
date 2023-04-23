import React from 'react'

const API_KEY = "32a5bb7b9aa1126387e06acad817149e";
  const API_URL_CURRENT = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`;
  const API_URL_3HOURS = `https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}&units=metric`;

const WeatherApi = () => {
 

  // It calls the API from openweathermap
  
  // Get the TODAY data
 
  const getTodayData= async(city)=> {
      //Get the CURRENT data
      //console.log(API_URL_CURRENT + "&q=" + city);
      const result= await fetch(API_URL_CURRENT + "&q=" + city)
        .then(response => {
          return response.json();
        })
        .then(data => ({
          temp: parseInt(data.main.temp, 0),
          weatherDescription: data.weather[0].description,
          weatherIcon: getIconUrl(data.weather[0].icon),
          country: data.sys.country,
          timezone: data.timezone,
          time: formatDate(data.dt, data.timezone, "time"),
          weekday: formatDate(data.dt, data.timezone, "weekday"),
          city: data.name
        }))
        .catch(error => {
          return [];
        });

return result
}
  
    //Get the 3 hours data (forecast). The API sends 40 items on this array
 const get3HoursData=async(city)=> {
      //console.log(API_URL_3HOURS + "&q=" + city);
    const result=  await fetch(API_URL_3HOURS + "&q=" + city)
        .then(response => {
          return response.json();
        })
        .then(data =>
          //Get only the first 8 results
          data.list.map(list => ({
            max: parseInt(list.main.temp_max, 0),
            min: parseInt(list.main.temp_min, 0),
            time: formatDate(list.dt, data.city.timezone, "time"),
            weekday: formatDate(list.dt, data.city.timezone, "weekday"),
            weather_icon:getIconUrl(list.weather[0].icon)
          }))
        )
        .catch(error => {
          return [];
        });

        return result
    }
  
  
    const getWeeklyData=(forecastWeekly)=> {
      var uniqueDay = [];
  
      forecastWeekly.map(element=> {
        var isDuplicated = uniqueDay.hasOwnProperty(element.weekday);

        if (isDuplicated) {

          if (element.min < uniqueDay[element.weekday].min) {
            uniqueDay[element.weekday].min = element.min;
          }

          if (element.max > uniqueDay[element.weekday].max) {
            uniqueDay[element.weekday].max = element.max;
          }

        } else {
          uniqueDay[element.weekday] = element;
        }

      });
      //Return an array instead of object
      return Object.values(uniqueDay);
    }
  
   const formatDate=(utc, timezone, format)=> {
      
      const dt_timezone = new Date(utc * 1e3 + timezone * 1e3).toISOString();
      const dt = new Date(dt_timezone.substr(0, 19));
      if (format === "day") {
        return new dt.getDate();
      } else if (format === "time") {
        const hr = parseInt(dt_timezone.substr(11, 2), 0);
        if (hr === 12) {
          return "12pm";
        } else if (hr === 0) {
          return "12am";
        } else {
          return hr > 12 ? hr - 12 + "pm" : hr + "am";
        }
      } else if (format === "weekday") {
        return dt.toLocaleTimeString("en-us", { weekday: "long" }).split(" ")[0];
      }
    }
  
 const getIconUrl=(icon) =>{
      return `http://openweathermap.org/img/wn/${icon}@2x.png`;
    }

    return {
      getTodayData,
      get3HoursData,
      getWeeklyData,
      formatDate,
      getIconUrl
    }

  
}

export default WeatherApi
