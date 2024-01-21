const baseURL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll(".country-select select");
const btn = document.querySelector("form button");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const showConverter = document.querySelector(".converter-info .btn");
const container = document.querySelector(".container");
const converterInfo = document.querySelector(".converter-info");
const closeBtn = document.querySelector(".hideBtn");
const changeIcon = document.querySelector(".country-select i");

showConverter.addEventListener("click", (e) => {
  e.preventDefault();
  container.classList.remove("hide");
  container.classList.add("show");
  converterInfo.classList.add("hide");
});

closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  container.classList.add("hide");
  converterInfo.classList.remove("hide");
  window.location.reload();
});

// accessing all select and getting their value from countryList
for (let select of dropdowns) {
  for (currencyCode in countryList) {
    let newOptions = document.createElement("option");
    newOptions.innerText = currencyCode;
    newOptions.value = currencyCode;
    if (select.id === "from" && currencyCode === "USD") {
      newOptions.selected = "selected";
    } else if (select.id === "to" && currencyCode === "INR") {
      newOptions.selected = "selected";
    }
    select.append(newOptions);
  }
  select.addEventListener("change", (event) => {
    changeFlag(event.target);
  });
}

//function for changing flag based on the value of select element
const changeFlag = (element) => {
  let currencyCode = element.value;
  let countryCode = countryList[currencyCode];
  let flagSource = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let imgSource = element.parentElement.querySelector("img");
  imgSource.src = flagSource;
};

let resultMessage = document.querySelector(".result");

//event listener on button for getting the exchange rate and updating the result
btn.addEventListener("click", async (event) => {
  event.preventDefault();
  let amount = document.querySelector(".amount input");
  let amountValue = amount.value;
  if (amountValue === "" || amountValue < 1) {
    alert("Amount should not be less than 1");
    resultMessage.style.display = "none";
  } else {
    changeIcon.classList.add("rotate");
    setTimeout(() => {
      resultMessage.style.display = "block";
    }, 500);
  }

  //fetching data from API
  const URL = `${baseURL}/${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let dataDate = await data.date;
  let conversionRate = data[toCurrency.value.toLowerCase()];
  let conversedRate = amountValue * conversionRate;
  resultMessage.innerText = `${amountValue} ${fromCurrency.value} = ${conversedRate} ${toCurrency.value} \n as of ${dataDate}`;
});
