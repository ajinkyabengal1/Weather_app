
import SearchBar from '../SearchBar/SearchBar';
import WeatherApi from '../../utilities/WeatherApi';
import './App.css';

function App() {
  return (
    <div className="App">
     <h1>Weather</h1>
     <SearchBar/>
     <WeatherApi/>
    </div>
  );
}

export default App;
