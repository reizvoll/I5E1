    $(document).ready(function () {
        let url = "https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=7ecb1eb66ae504b90a80a108c2a51a09&units=metric";
        fetch(url)
            .then(res => res.json())
            .then(data => {
                let temp = data['main']['temp'];
                $('#ondo').text(temp);
                let icon = data['weather'][0]['icon'];
                let iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
                $('#ondo-icon').html(`<img class="weather-icon" src="${iconUrl}" alt="Weather Icon">`);
            });
    });
