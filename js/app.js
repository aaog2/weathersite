// UI

weathercontainer = document.querySelector('.weather-container');
citycontainer = document.querySelector('.city-container');

// start page one
const town = document.getElementById('town');
const dayel = document.getElementById('day');
const dateel = document.getElementById('date');
const temp = document.getElementById('temp');
const weather = document.getElementById('weather');
const weathericon = document.getElementById('weathericon');

const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// end page one

// start page two
// UI
const locationbtn = document.querySelector(".location");
const locationbox = document.querySelector('.location-box');
const city = document.getElementById('cityname');
const formel = document.querySelector('.forms');
const gocity = document.getElementById('gocity');
const cancel = document.getElementById('cancel');
const pressure = document.getElementById('pressure'),
    humidity = document.getElementById('humidity'),
    wind = document.getElementById('wind');



locationbtn.addEventListener("click",()=>{
    // console.log("hey");
    weathercontainer.style.display = "none";
    citycontainer.style.display = "block";
});

cancel.addEventListener('click',()=>{
    citycontainer.style.display = "none";
    weathercontainer.style.display = "block";
})

formel.addEventListener('keydown',(e)=>{
    if(e.key === "Enter"){
        // console.log("hey");
        e.preventDefault();
        getcityname();
    }
});

// formel.addEventListener('submit',()=>{
//     getcityname();
// })



gocity.addEventListener('click',(e)=>{
    e.preventDefault();
    getcityname();
});

function getcityname(){
    // console.log("hey");
    // console.log(city.value);

    if(city.value === ""){
        console.log("hey");

        showalert();


    }

    else {
        getdata(`${city.value.toLowerCase()}`);
        citycontainer.style.display = "none";
        weathercontainer.style.display = "block";
    }


}

function showalert(){
    let alert = document.createElement('div');
    alert.className = "alert alert-danger text-muted text-center";
    alert.innerText = 'Please enter your location';
    document.querySelector('.alert-box').appendChild(alert);

    setTimeout(()=>alert.remove(),2000);
}


// end page two

async function getdata(city){

    const res =await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=956ee2664ef6b5e5221b4b95d0b02c37`);
    // console.log(res);

    const data = await res.json();
    console.log(data);
    // console.log(data.weather[0]);
    // console.log(data.weather[0].main);

    const k = data.main.temp;
    const c = k - 273.15;
    // console.log(c);

    let date = new Date();
    let day = date.getDay();
    let month = date.getMonth();
    let year = date.getFullYear();

    const getdate = days[day];
    const getmonth = months[month];

    let weaicon = data.weather[0].id;
    // console.log(weaicon);



    dayel.innerText = `${getdate}`;
    dateel.innerText = `${day} / ${getmonth} / ${year}`;
    town.innerText = data.name;
    temp.innerText = Math.floor(c);
    weather.innerText = data.weather[0].main;
    weathericon.className = `owf owf-${weaicon}`;
    pressure.innerText = `${data.main.pressure} hPa`;
    humidity.innerText = `${data.main.humidity} %`;
    wind.innerText = `${data.wind.speed} km/h`;
}

getdata("yangon");

