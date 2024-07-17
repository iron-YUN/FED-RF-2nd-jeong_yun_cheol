import React, { useState, useEffect } from 'react';
import "../../css/weather.scss";

function Weather2(props) {
  const [temp, setTemp] = useState("");
  const [desc, setDesc] = useState("");
  const [icon, setIcon] = useState("");
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");

  useEffect(() => {
    const cityName = "Seoul";
    const apiKey = "7fdf8fb74f3e2ed02bfb7e298a32df49";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    // fetch를 사용하여 데이터 조회하기
    fetch(url)
      .then((res) => res.json())
      .then((wdata) => {
        console.log(wdata, wdata.main.temp);
        setTemp(wdata.main.temp);
        setDesc(wdata.weather[0].description);
        setIcon(wdata.weather[0].icon);
        setLoading(false);
        setCity(cityName);
      })
      .catch((err) => console.log(err));
  }, []); 

  const isrc = `https://openweathermap.com/img/w/${icon}.png`;

  if (loading) {
    return <h4>Loading...</h4>;
  } else {
    const ctemp = (parseInt(temp) - 273.15).toFixed(1);
    return (
      <div className="weather-bx">
        <h4>Now Weather</h4>
        <h5>{city}</h5>
        <img src={isrc} alt="weather icon" />
        <p>{ctemp}℃</p>
        <p>{desc}</p>
      </div>
    );
  }
}

export default Weather2;