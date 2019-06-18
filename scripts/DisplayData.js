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