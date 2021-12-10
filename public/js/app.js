// this file will run in browser

// fetch(`http://puzzle.mead.io/puzzle`)
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   });

const weatherForm = document.querySelector("form");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = document.querySelector("input").value;
  const errorPtag = document.querySelector("#error");
  const resultPtag = document.querySelector("#output");
  resultPtag.textContent = "it's loading...";
  fetch(`/weather?address=${value}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        errorPtag.textContent = data.error;
      } else {
        resultPtag.innerHTML = `The temperature in <b>${data.address}</b> is <b>${data.description}</b> and <b>${data.temperature}</b> degrees celsius`;
      }
    });
});
