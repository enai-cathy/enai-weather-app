function searchCity(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let heading1 = document.querySelector("#city");
  heading1.innerHTML = searchInputElement.value;
  console.log(heading1);
}

let form = document.querySelector("form");
form.addEventListener("submit", searchCity);
