/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();

const generate = document.getElementById("generate");
const zip = document.getElementById("zip");
const content = document.getElementById("content");
const feeling = document.getElementById("feelings");

const baseApiUrl =
  "http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=";
// const baseApiUrl = "http://api.openweathermap.org/data/2.5/forecast?zip=";
const apiKey = "&appid=cd1b984a8cc578e85ef671fc7b3dea87";

const getFetch = async (url = "") => {
  //   debugger;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error: ", error);
    return "error";
  }
};

const postFetch = async (url = "", data) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const finalData = await res.json();
    return finalData;
  } catch (error) {
    console.log("Error: ", error);
  }
};

const updateUi = async (err = "") => {
  // debugger;
  // define variables that contole showing result whether successful or failed
  const resultElement = document.querySelector(".holder.entry");
  const errElement = document.getElementById("error-msg");
  if (err) {
    resultElement.style.display = "none";
    errElement.style.display = "block";
    errElement.innerHTML = err;
  } else {
    // const res = await getFetch("http://localhost:3000/all");
    errElement.style.display = "none";
    resultElement.style.display = "block";
    const res = await getFetch("/all");
    try {
      // const d = await res.json(); // error
      const d = await res;

      document.getElementById("date").innerHTML = `date: ${newDate}`;

      document.getElementById("temp").innerHTML = `Temp ${d.temp} °F`;
      document.getElementById(
        "content"
      ).innerHTML = `You're feeling ${d.feelings}`;
    } catch (error) {
      console.log("Error:", error);
    }

    // another way to use promises ( if I had sent parameter d without making a new request)

    // getFetch("/all").then((d) => {
    //   document.getElementById("date").innerHTML = `date: ${d.date}`;
    //   document.getElementById("temp").innerHTML = d.temp;
    //   document.getElementById("content").innerHTML = d.feelings;
    // });
  }
};

const applyTask = async () => {
  if (zip.value) {
    getFetch(baseApiUrl + zip.value + apiKey)
      .then((data) => {
        console.log("1:", data);
        // debugger;
        console.log(d, data.main.temp, feelings.value);
        postFetch("http://localhost:3000/add", {
          date: d,
          temp: data.main.temp,
          feelings: feelings.value,
        }).then((d) => {
          console.log("after come from post", d);
          // debugger;
          updateUi();
        });
      })
      .catch((err) =>
        updateUi("something went wrong, make sure you entered correct ZIP code")
      );
  } else {
    updateUi("Enter ZIP code");
  }
};

generate.addEventListener("click", applyTask);
