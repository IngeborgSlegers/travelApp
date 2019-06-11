let cityUrl = "https://api.openaq.org/v1/cities?";
let coordinatesUrl = "https://api.openaq.org/v1/measurements"; //add city
let weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
let travelUrl = "http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/{country}/{currency}/{locale}/{originPlace}/{destinationPlace}/{outboundPartialDate}/{inboundPartialDate}?apiKey={apiKey}";
let timeUrl = "";

const goBtn = document.querySelector('button');
const section = document.querySelector('section');

let city;
let countryCode;

// ? Fetch my random city and country
let cityFetch = (e) => {
  let randomPage = Math.floor((Math.random() * 26) + 1);
  // console.log('Random Page Number', randomPage);
  
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
    section.appendChild(infoCard);;;

    console.log('Second run: city', city, 'countrycode', countryCode)
    return city, countryCode;
  };

}
console.log('First run: city', city, 'countrycode', countryCode)

// ? Once random city and country are displayed, display a navbar that then displays new fetches.

let weatherFetch = () => {
  console.log('weatherFetch has been triggered')
  console.log('Third run: city', city, 'countrycode', countryCode)
  // e.preventDefault();
  console.log('CITY', city.innerText)
  console.log('Fourth run: city', city.innerText, 'countrycode', countryCode.innerText)
  city = city.innerText;
  console.log('City Here', city)
  countryCode = countryCode.innerText;
  let specificWeather = weatherUrl+`?q=${city},${countryCode}`;
  console.log('specificWeather', specificWeather);

  // fetch(weatherUrl)

}

goBtn.addEventListener('click', cityFetch);
