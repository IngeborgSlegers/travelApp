let cityUrl = "https://api.openaq.org/v1/cities?";
let coordinatesUrl = "https://api.openaq.org/v1/measurements"; //add city
let weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
let weatherAPI = "fd1e0f9cb7c1e3691424e0190d6ba6a5"
let travelUrl = "http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/{country}/{currency}/{locale}/{originPlace}/{destinationPlace}/{outboundPartialDate}/{inboundPartialDate}?apiKey={apiKey}";
let restaurantUrl = "";
// restaurant api key = 487b1cac0bd9dc6ad2bee4caa85af047;
let timeUrl = "";

const goBtn = document.querySelector('button');
const section = document.querySelector('section');
const weatherDiv = document.querySelector('#weather');
const tableData = document.querySelector('table');

let city;
let countryCode;
let tempRow = '';

// ? Fetch my random city and country
let cityFetch = (e) => {
  let randomPage = Math.floor((Math.random() * 26) + 1);
  console.log('Random Page Number', randomPage);
  
  e.preventDefault();
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
        // console.log(jsondata);
        displayData(jsondata, randomPage);
      })
    .then((data) => {
      weatherFetch(data)
    })
}

// ? Display my random city and country
let displayData = (data, randomPage) => {
  console.log('displayData has been triggered')
  while (section.firstChild) {
    section.removeChild(section.firstChild); //1
  }

  if(data.length === 0) {
  console.log("No results");
  } else {
    let randomCity;

    if(randomPage == 26){
      randomCity = Math.floor((Math.random() * 63) + 1);
      // console.log('Random City Number if Random Page Number is 26', randomCity);
    } else {
      randomCity = Math.floor((Math.random() * 100) + 1);
      // console.log('Random City Number', randomCity);
    };

    // console.log('Random City', randomCity);

    // console.log("DisplayResults", data.results[randomCity]); 
    let info = data.results[randomCity];

    let infoCard = document.createElement('div');
    city = document.createElement('h2'); 
    countryCode = document.createElement('h3');

    
    city.innerHTML = info.city;
    countryCode.innerHTML = info.country;

    infoCard.appendChild(city);
    infoCard.appendChild(countryCode);
    section.appendChild(infoCard);

    console.log('Second run: city', city, 'countrycode', countryCode)
    return city, countryCode;
  };

}
console.log('First run: city', city, 'countrycode', countryCode)

// ? Once random city and country are displayed, display a navbar that then displays new fetches.


let weatherFetch = () => {
  console.log('weatherFetch has been triggered')
  // console.log('Fourth run: city', city.innerText, 'countrycode', countryCode.innerText)
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
  console.log('specificWeather', specificWeather);

  fetch(specificWeather)
    .then(
      (response) => {
      return response.json();
    })
    .then(
      (jsondata) => {
      // console.log(jsondata);
      displayWeather(jsondata);
    })
}

let displayWeather = (data) => {
  // console.log(tempRow);
  while (tempRow.firstChild) {
    tempRow.removeChild(tempRow.firstChild); //1
  }

  let errormessage = document.createElement('h1');
  let weatherCard = document.createElement('div');

  if(data.cod == 404) {
    console.log("City is not in database")
    // let errormessage = document.createElement('h1');
    errormessage.innerHTML = data.message;

    weatherCard.appendChild(errormessage);
    section.appendChild(weatherCard);

  } else {
    console.log("WeatherResults", data); 
    let tempInfo = data.main;
    // console.log(tempInfo);

    let tempTable = document.createElement('table');
    let tempHeaders = document.createElement('tr');
    let tempRow = document.createElement('tr');
    let highTemp = document.createElement('td'); 
    let lowTemp = document.createElement('td');
    let currentTemp = document.createElement('td');
    let maxTemp = document.createElement('th'); 
    let minTemp = document.createElement('th');
    let temp = document.createElement('th');

    minTemp.innerHTML = 'Min Temp';
    maxTemp.innerHTML = 'Max Temp';
    temp.innerHTML = 'Current Temp';
    
    // fahrenheit conversion
    let fLowTemp = ((tempInfo.temp_min-273.15)*1.8)+32;
    let fHighTemp = ((tempInfo.temp_max-273.15)*1.8)+32;
    let fCurrentTemp = ((tempInfo.temp-273.15)*1.8)+32;

    lowTemp.innerHTML = fLowTemp.toFixed()+'&degF';
    highTemp.innerHTML = fHighTemp.toFixed()+'&degF';
    currentTemp.innerHTML = fCurrentTemp.toFixed()+'&degF';
    
    tempHeaders.appendChild(minTemp);
    tempHeaders.appendChild(maxTemp);
    tempHeaders.appendChild(temp);
    tempRow.appendChild(lowTemp);
    tempRow.appendChild(highTemp);
    tempRow.appendChild(currentTemp);
    tempTable.appendChild(tempHeaders);
    tempTable.appendChild(tempRow);
    weatherCard.appendChild(tempTable);
    section.appendChild(weatherCard);
  }
}

goBtn.addEventListener('click', cityFetch);
