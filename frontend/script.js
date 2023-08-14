let selectedCountry;
let newCountry;
let largestArea;
let historyPrev = []
let historyNext = []
let lang;
let input;
let i = 0;
let j;
let asia = []
let africa = []
let europe = []
let oceania = []
let americas = []
let antartica = []
function changeInfo(insert) {
    if (insert) {
        console.log(insert)
        selectedCountry = insert
        document.querySelector("#all").value = insert.name.common
        document.querySelector("#country").innerHTML = `
      <img src="${insert.flags.png}" alt="${insert.name.common} flag">
      <h1>${insert.name.common}</h1>
      <h2>${insert.region}</h2>
      <h3>${insert.subregion}</h3>
      <h4>${insert.capital}</h4>
      `;
    }
    document.querySelector("#toolbar").style.display = ""
    document.querySelector("#ctrybttn").style.display = "none"
    document.querySelector("#country").style.display = ""
}

function regions() {
    countries.forEach(country => {
        if (country.region == "Asia") {
            asia.push(country)
        }
        if (country.region == "Americas") {
            americas.push(country)
        }
        if (country.region == "Oceania") {
            oceania.push(country)
        }
        if (country.region == "Europe") {
            europe.push(country)
        }
        if (country.region == "Africa") {
            africa.push(country)
        }
        if (country.region == "Antarctic") {
            antartica.push(country)  
        }
    })
    // console.log(africa)
    // console.log(asia)
    // console.log(americas)
    // console.log(oceania)
    // console.log(europe)
    // console.log(antartica)
}

function allNames() {
    let names = [];
    countries.forEach(country => {
        names.push(country.name.common);
    });
    names.sort();
    document.querySelector("#all").innerHTML = `<option id="empty">-Select a country-</option> ${names.map(name => `<option id = ${name}>${name}</option>`).join("")}`;
}


function map() {
    document.querySelector("#trans").style.visibility = "visible"
    // document.querySelector("#all").querySelector("#empty").disabled = true
    selectedCountry = countries.find(country => country.name.common === document.querySelector("#all").value);
    console.log(selectedCountry)
    changeInfo(selectedCountry)
    historyPrev.push(selectedCountry)
    input = selectedCountry
    allTrans()
}

function popButton() {
    allTrans()
    document.querySelector("#trans").style.visibility = "visible"
    let neighbours = []
    countries.forEach(country => {
        if (selectedCountry.borders !== undefined) {

            if (selectedCountry.borders.includes(country.cca3)) {
                neighbours.push(country)
            }
            // document.querySelector("#all").innerHTML = newCountry.name.common
        }
        
    })
    newCountry = neighbours[0]
    neighbours.forEach(neighbour => {

        if (neighbour.population > newCountry.population) {
            newCountry = neighbour
        }
    })

    changeInfo(newCountry)
    input = newCountry
    historyPrev.push(newCountry)
}
///

function areaButton() {
    allTrans()
    document.querySelector("#trans").style.visibility = "visible"
    let neighbours = []
    countries.forEach(country => {
        if (selectedCountry.borders !== undefined) {

            if (selectedCountry.borders.includes(country.cca3)) {
                neighbours.push(country)
            }
            // document.querySelector("#all").innerHTML = newCountry.name.common
        }
    })
    largestArea = neighbours[0]
    neighbours.forEach(neighbour => {

        if (neighbour.area > largestArea.area) {
            largestArea = neighbour
        }
    })
    changeInfo(largestArea)
    input = largestArea
    historyPrev.push(largestArea)
}

function prevBttn() {
    allTrans()
    document.querySelector("#trans").style.visibility = "visible"
    if (historyPrev.length > 1) {
        historyNext.push(historyPrev.pop())
        changeInfo(historyPrev[historyPrev.length - 1], lang)
        input = historyPrev[historyPrev.length - 1]
    }
}

function nextBttn() {
    allTrans()
    document.querySelector("#trans").style.visibility = "visible"
    if (historyNext.length > 0) {
        changeInfo(historyNext[historyNext.length - 1], lang)
        historyPrev.push(historyNext.pop())
        console.log(historyNext)
        input = historyNext[historyNext.length - 1]
    }
}

function buttons(country){
    document.querySelector("#antartic").style.top = "116.5px"
    document.querySelector("#ctrybttn").style.display = ""
    document.querySelector("#toolbar").style.display = "none"
    document.querySelector("#country").style.display = "none"
    document.querySelector("#ctrybttn").insertAdjacentHTML("beforeend", `<button id="${country.name.common}" class = "country2" style = " display: inline-block; align-items:center; justify-content: center;  left:${k}px; z-index: 0;" >${country.name.common}</button>`)
}

function regionButtons() {
    document.querySelector(".row").addEventListener("click", (event) => {
        if (event.target.id == "africa") {
            document.querySelector("#ctrybttn").innerHTML = ''
            africa.forEach(country => {
                buttons(country)

            })
        }
        if (event.target.id == "europa") {
            document.querySelector("#ctrybttn").innerHTML = ''
            europe.forEach(country => {
                buttons(country)

            })
        }
        if (event.target.id == "america-do-norte" || event.target.id == "america-do-sul") {
            document.querySelector("#ctrybttn").innerHTML = ''
            americas.forEach(country => {
                buttons(country)

            })
        }
        if (event.target.id == "oceania") {
            document.querySelector("#ctrybttn").innerHTML = ''
            oceania.forEach(country => {
                buttons(country)

            })
        }
        if (event.target.id == "asia") {
            document.querySelector("#ctrybttn").innerHTML = ''
            asia.forEach(country => {
                buttons(country)
            })
        }
        if (event.target.id == "antartic") {
            document.querySelector("#ctrybttn").innerHTML = ''
            antartica.forEach(country => {
                buttons(country)

            })
        }
    })
}

function countryButtons() {
    document.querySelector("#ctrybttn").addEventListener("click", (event) => {
        countries.forEach(country => {
            if(event.target.id == country.name.common)
            changeInfo(country)
            input = country
        })
        historyPrev.push(country)
        document.querySelector("#antartic").style.top = "40.5px"
        allTrans()
    })
}


function allTrans() {
    console.log(input, 1)
    let trans = [];
    if (input) {
        document.querySelector("#trans").style.visibility = "visible"
        for (let tran in input.translations) {
            trans.push(tran)
        }

        trans.sort();
    }
    document.querySelector("#trans").innerHTML = `<option>eng</option>` + trans.map(tran => `<option >${tran}</option>`).join("");
    console.log(input, 1)
    document.querySelector("#trans").addEventListener("change", () => {
        if (document.querySelector("#trans").value == "eng") {
            document.querySelector("#country").innerHTML = `
    <img src="${selectedCountry.flags.png}" alt="${selectedCountry.name.common} flag">
      <h1>${input.name.common}</h1>
      <h2>${input.region}</h2>
      <h3>${input.subregion}</h3>
      <h4>${input.capital}</h4>
      `;
        } else {
            document.querySelector("#country").innerHTML = `
    <img src="${selectedCountry.flags.png}" alt="${selectedCountry.name.common} flag">
      <h1>${input.translations[document.querySelector("#trans").value].common}</h1>
      <h2>${input.region}</h2>
      <h3>${input.subregion}</h3>
      <h4>${input.capital}</h4>
      `;
        }
    })
}
let k = 55


const loadEvent = () => {
    document.querySelector("#all").addEventListener("change", map)
    document.querySelector("#population").addEventListener("click", popButton)
    document.querySelector("#area").addEventListener("click", areaButton)
    document.querySelector("#prev").addEventListener("click", prevBttn)
    document.querySelector("#next").addEventListener("click", nextBttn)
    allNames()
    regions()
    countryButtons()
    regionButtons()
}

window.addEventListener("load", loadEvent)