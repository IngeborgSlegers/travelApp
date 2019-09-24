let cityUrl = "https://api.openaq.org/v1/cities?";
let coordinatesUrl = "https://api.openaq.org/v1/measurements"; //add city
let weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
let weatherAPI = "fd1e0f9cb7c1e3691424e0190d6ba6a5"
let travelUrl = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/{country}/{currency}/{locale}/";
let restaurantUrl = ""; //zomato
// restaurant api key = 487b1cac0bd9dc6ad2bee4caa85af047;
let timeUrl = "";
//bring in a map with the coordinates passed into it?


const goBtn = document.querySelector('#letsgo');
const section = document.querySelector('section');
const weatherDiv = document.querySelector('#weather');
const travelDiv = document.querySelector('#travel');
const tableData = document.querySelector('table');

let city;
let countryCode;
let latData;
let lonData;
let userLat;
let userLon;
let tempRow = '';
let convert = 'Celsius';
let tempInfo = '';

// ? Fetch my random city and country
function cityFetch  (e) {
  let randomPage = Math.floor((Math.random() * 26) + 1);
  let newCityUrl = `${cityUrl}&page=${randomPage}`;
  // console.log('New Url', newCityUrl)

  fetch(newCityUrl)
    .then(
      (response) => {
        // console.log(response)
        return response.json();
    })
    .then(
      (jsondata) => {
        console.log(jsondata);
        displayData(jsondata, randomPage);
    })
}

// ? Display my random city and country
let displayData = (data, randomPage) => {
  while (section.firstChild) {
    section.removeChild(section.firstChild);
  }

  while (weatherDiv.firstChild) {
    weatherDiv.removeChild(weatherDiv.firstChild);
  }

  if(data.length === 0) {
  console.log("No results");
  } else {
    let randomCity;

    if(randomPage == 26){
      randomCity = Math.floor((Math.random() * 63));
      console.log('Random City Number if Random Page Number is 26', randomCity);
    } else {
      randomCity = Math.floor((Math.random() * 100));
      console.log('Random City Number', randomCity);
    };

    // console.log('Random City', randomCity);

    console.log("DisplayResults", data.results[randomCity]); 
    let info = data.results[randomCity];

    let infoCard = document.createElement('div');
    city = document.createElement('h2'); 
    countryCode = document.createElement('h3');

    city.innerHTML = info.city;
    countryCode.innerHTML = info.country;

    infoCard.appendChild(city);
    infoCard.appendChild(countryCode);
    section.appendChild(infoCard);

    let weatherButton = document.createElement('button');
    weatherButton.innerText = 'Weather';
    weatherDiv.appendChild(weatherButton);
    section.appendChild(weatherDiv);
    weatherButton.addEventListener('click', weatherFetch);

    return city, countryCode;
  };
}


// ? Once random city and country are displayed, display a navbar that then displays new fetches.

let weatherFetch = () => {
  let cityArray = city.innerText.split('');
  let newCity = [];
  cityArray.forEach((r, i) => {
    if(r != ' '){
      newCity.push(r);
    } else {
      cityArray.splice(i, 0);
    }
  })
  city = newCity.join('');
  countryCode = countryCode.innerText;
  let specificWeather = weatherUrl+`?q=${city},${countryCode}&APPID=${weatherAPI}`;


  fetch(specificWeather)
    .then(
      (response) => {
      return response.json();
    })
    .then(
      (jsondata) => {
        displayWeather(jsondata);
    })
    // .then(
    //   (moredata) => {
    //     console.log('flightfetch()')
    //     flightFetch(moredata);
    //   }
    // )
    .catch(e => { console.log('Hit the .catch'), cityFetch(e) });
}

function displayWeather(data) {
  while (weatherDiv.firstChild) {
    weatherDiv.removeChild(weatherDiv.firstChild); //1
  }

  console.log("WeatherResults", data); 
  let tempInfo = data;
  latData = data.coord.lat;
  lonData = data.coord.lon;
  console.log(latData, lonData);
  // console.log(tempInfo);

  // * Temperature Table
  let tempTable = document.createElement('table');
  let tempDiv = document.createElement('div');
  let tempTitle = document.createElement('h2');
  let tempHeaders = document.createElement('tr');
  let tempRow = document.createElement('tr');
  let highTemp = document.createElement('td'); 
  let lowTemp = document.createElement('td');
  let currentTemp = document.createElement('td');
  let maxTemp = document.createElement('th'); 
  let minTemp = document.createElement('th');
  let temp = document.createElement('th');
  let convert = document.createElement('button');

  tempDiv.id = 'tempDiv';
  tempTitle.innerHTML = 'Temperature';
  tempTitle.id = 'tempTitle';
  minTemp.innerHTML = 'Min Temp';
  maxTemp.innerHTML = 'Max Temp';
  temp.innerHTML = 'Current Temp';
  convert.id = 'convertbtn';
  convert.innerHTML = 'Celsius';
  
  let fCurrentTemp = tempInfo.main.temp;
  let fLowTemp = tempInfo.main.temp_min;
  let fHighTemp = tempInfo.main.temp_max;

  fCurrentTemp = ((fCurrentTemp-273.15)*1.8)+32;
  fLowTemp = ((fLowTemp-273.15)*1.8)+32;
  fHighTemp = ((fHighTemp-273.15)*1.8)+32;

  currentTemp.innerHTML = fCurrentTemp.toFixed()+'&degF';
  highTemp.innerHTML = fHighTemp.toFixed()+'&degF';
  lowTemp.innerHTML = fLowTemp.toFixed()+'&degF';

  let convertDeg = (e) => {
    // console.log('convert button has been pushed!', e)
    // console.log(convert)
    if (convert.innerHTML == 'Celsius') {
      console.log('in the 1st if')
      // celsius conversion
      console.log('1', fLowTemp, fHighTemp, fCurrentTemp);
      fCurrentTemp = (fCurrentTemp-32)/1.8;
      fLowTemp = (fLowTemp-32)/1.8;
      fHighTemp = (fHighTemp-32)/1.8;
  
      currentTemp.innerHTML = fCurrentTemp.toFixed()+'&degC';
      lowTemp.innerHTML = fLowTemp.toFixed()+'&degC';
      highTemp.innerHTML = fHighTemp.toFixed()+'&degC';

      convert.innerHTML = 'Fahrenheit';
    } else if (convert.innerHTML == 'Fahrenheit') {
      console.log('In the 2nd if');
      console.log('1', fLowTemp, fHighTemp, fCurrentTemp);
      fCurrentTemp = ((fCurrentTemp*1.8)+32);
      fLowTemp = ((fLowTemp*1.8)+32);
      fHighTemp = ((fHighTemp*1.8)+32);
      console.log('2', fLowTemp, fHighTemp, fCurrentTemp)
  
      currentTemp.innerHTML = fCurrentTemp.toFixed()+'&degF';
      highTemp.innerHTML = fHighTemp.toFixed()+'&degF';
      lowTemp.innerHTML = fLowTemp.toFixed()+'&degF';
  
      convert.innerHTML = 'Celsius';
    }
  }
  
  tempHeaders.appendChild(temp);
  tempHeaders.appendChild(minTemp);
  tempHeaders.appendChild(maxTemp);
  tempRow.appendChild(currentTemp);
  tempRow.appendChild(lowTemp);
  tempRow.appendChild(highTemp);
  tempDiv.appendChild(tempTitle);
  tempDiv.appendChild(convert);
  tempTable.appendChild(tempDiv);
  tempTable.appendChild(tempHeaders);
  tempTable.appendChild(tempRow);
  weatherDiv.appendChild(tempTable);
  section.appendChild(weatherDiv);
  
  // * Weather Card
  let wCard = document.createElement('div');
  wCard.id = 'wCard';
  let wIcon = document.createElement('img');
  wIcon.id = 'wIcon';
  let descr = document.createElement('p');
  let hum = document.createElement('p');
  
  if(tempInfo.weather[0].icon != '') {
    wIcon.src = 'http://openweathermap.org/img/w/' + tempInfo.weather[0].icon + '.png';
  }
  descr.innerHTML = tempInfo.weather[0].main;
  hum.innerHTML = 'Humidity: ' + tempInfo.main.humidity + '%';
  
  wCard.appendChild(wIcon);
  wCard.appendChild(descr);
  wCard.appendChild(hum);
  weatherDiv.appendChild(wCard);
  section.appendChild(weatherDiv);

  convert.addEventListener('click', convertDeg);

  let travelButton = document.createElement('button');
  travelButton.innerText = 'Travel';
  section.appendChild(travelButton);
    // section.appendChild(weatherDiv);
  travelButton.addEventListener('click', flightFetch);

  return latData, lonData
}

let flightFetch = () => {
  console.log(`I've hit flightFetch`);
  console.log(latData, lonData);
  // fetch('https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/SFO/JFK/2019-09-01', {
  //   headers: new Headers({
  //     'X-RapidAPI-Key': 'cd2504da29msh8320057dd046b54p15d1a6jsn08a7a1bdf7a1'
  //   })
  // })
  // .then(
  //   (response) => {
  //     console.log(response);
  //     return response.json();
  //   })
  // .then(
  //   (jsondata) => {
  //   console.log(jsondata);
  // })

  let fKey = '1ad327-3b3fb3'
  let destUrl = `http://aviation-edge.com/v2/public/nearby?key=${fKey}&lat=${latData}&lng=${lonData}&distance=100`;
  let localUrl = `http://aviation-edge.com/v2/public/nearby?key=${fKey}&lat=${userLat}&lng=${userLon}&distance=100`;
  console.log(destUrl);
  console.log(localUrl);
  fetch(destUrl)
    .then(
      (response) => {
      // console.log(response)
      return response.json();
    })
    .then(
      (jsondata) => {
      // console.log(jsondata);
      displayAirport(jsondata);
    })
  
  
}

let displayAirport = (json) => {
  while (travelDiv.firstChild) {
    travelDiv.removeChild(travelDiv.firstChild); //1
  }
  console.log(json);
  let airports = json;

  airports.forEach(airport => {
    let airCard = document.createElement('div');
    let airName = document.createElement('p');
    let airCode = document.createElement('p');
    let airDistance = document.createElement('p');

    let distance = airport.distance;
    
    airName.innerText = airport.nameAirport;
    airCode.innerText = airport.codeIataAirport;
    airDistance.innerText = Number(distance).toFixed(2) + 'km';

    airCard.appendChild(airName);
    airCard.appendChild(airCode);
    airCard.appendChild(airDistance);

    airCard.setAttribute('class', 'airCard');

    // airCard.style.border = '1px solid black';
    // airCard.style.borderRadius = '2.5em'
    // airCard.style.width = '20%'
    // airCard.style.display = 'inline-block';
    
    section.appendChild(airCard);
  })
  /*
  ICAO (International Civil Aviation Organization) is a UN-body which focusses on international harmonization of civil aviation regulations. ICAO codes are used for "official" purposes such as Air Traffic Control; E.g. flight plans use ICAO codes for airports and airline flight identification.

  IATA (International Air Transport Association) is a trade association that focusses on making air traffic businesses safe, secure, reliable and efficient. IATA codes are mainly used for ticketing. E.g. travel itineraries use IATA codes for airports and IATA flight numbers.
  */
}


function getLocation() {
  if (navigator.geolocation) {
    console.log(navigator.geolocation.getCurrentPosition(showPosition));
  } else { 
    console.log("Geolocation is not supported by this browser.");
  }
}
function showPosition(position) {
  console.log("Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude);
  userLat = position.coords.latitude;
  userLon = position.coords.longitude;
  console.log(userLat, userLon)
  return userLat, userLon;
}

// getLocation();

goBtn.addEventListener('click', cityFetch);