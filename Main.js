let searchDiv = document.querySelector('#searchDiv');
let mainCity = document.querySelector('#city');
let tempMain = document.querySelector('#tempMain');
let desci = document.querySelector('#descript')
let symbTempLet = document.querySelector('#symbTemp')
let dateHeader = document.querySelector('#date');

searchDiv.addEventListener('input', () => {
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchDiv.value}&appid=795e7bad3e1444c04b31f7e50e79892f&units=metric`)
    .then(response => {
        if (!response.ok) throw new ('problem');
        return response.json();
        })
        .then(data => {
            console.log(data);
            // назва міста та країни
            const cityAndCountry = data.name + ", " + data.sys.country;
            mainCity.textContent = cityAndCountry;

            // дата від час запиту про прогноз погоди
            let dataa = new Date();
            dateHeader.textContent = dataa.toLocaleDateString();

            // температура
            const temp = data.main.temp;
            tempMain.innerHTML = `${Math.round(temp)}`;
            symbTempLet.textContent = `°C`

            // опис з детальнішим описом
            const description = data.weather;
            desci.textContent = description[0].main;

            // іконка погоди
            let icon = data.weather[0].icon;
            document.querySelector('#imgWeather').src = `./assets/animated/${icon}.svg`;

            //відображення першого блоку
            document.querySelector('#one').style.display = 'flex'

            //відображення другого блоку
            document.querySelector('#two').style.display = 'flex'

            // блок видимості
            if(data.visibility >= 1000) document.querySelector('#visDiv').textContent = "Max"
            else document.querySelector('#visDiv').textContent = data.visibility
            document.querySelector('#fellDiv').textContent = data.main.feels_like.toFixed(0) + " °C"
            document.querySelector('#humDiv').textContent = data.main.humidity + "%"
            document.querySelector('#windDiv').textContent = Math.trunc(data.wind.speed*3600/1000) + " km/h"
        })
        .catch(error => {
            console.log("problem");
        });
});

