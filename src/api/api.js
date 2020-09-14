async function getInfoWeather(city, callback) {
  /* urlW = urlWeather | urlC = urlCoord */
  let response, status;

  const urlC = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dd642cc8464847b38990dcb83b564535`;
  let responseC = await fetch(urlC, { mode: 'cors' });
  ({ status } = responseC);
  
  const dataC = await responseC.json();

  if (status === 404) {
    response = dataC.cod;
  } else {
    const { lon, lat } = dataC.coord;
    const urlW = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=dd642cc8464847b38990dcb83b564535&units=metric&lang=es`;
    const responseW = await fetch(urlW, { mode: 'cors' });
    response = await responseW.json();
  }

  callback(status, response);
}

export default getInfoWeather;
