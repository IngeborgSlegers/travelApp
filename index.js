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
const tableData = document.querySelector('table');

let city;
let countryCode;
let tempRow = '';
let convert = 'Celsius';
let tempInfo = '';

// ? Fetch my random city and country
let cityFetch = (e) => {
  let randomPage = Math.floor((Math.random() * 26) + 1);
  
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
      // console.log(jsondata);
      displayWeather(jsondata);
    })
}

async function displayWeather(data) {
  console.log(data);
  while (weatherDiv.firstChild) {
    weatherDiv.removeChild(weatherDiv.firstChild); //1
  }

  // let errormessage = document.createElement('h1');
  // let weatherCard = document.createElement('div');

  if(data.cod == 404) {
    console.log("City is not in database")
    let errormessage = document.createElement('h1');
    errormessage.innerHTML = 'This city is not in our database.';
    errormessage.id = 'error';

    weatherDiv.appendChild(errormessage);
    section.appendChild(weatherDiv);

  } else {
    console.log("WeatherResults", data); 
    let tempInfo = data;
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
      console.log('convert button has been pushed!', e)
      console.log(convert)
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
      console.log(wIcon);
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
  }
}

goBtn.addEventListener('click', cityFetch);