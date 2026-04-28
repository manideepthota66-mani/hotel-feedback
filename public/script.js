const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("full-name").value;

  console.log("Form submitted");
  console.log("Name:", name);
});