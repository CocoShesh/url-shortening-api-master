var generateBtn = document.querySelector(".generate");
var copyBtn = document.querySelector(".copy");
var inputLink = document.querySelector(".inputLink");
var shorterLink = document.querySelector(".shorted-link");
var result = document.querySelector(".result");
var originalLink = document.querySelector(".original-link");
var errorMessage = document.querySelector(".error-message");
var errorDiv = document.querySelector(".error");
generateBtn.addEventListener("click", shorterUrl);

function shorterUrl() {
  let url = inputLink.value;
  fetch(`https://cleanuri.com/api/v1/shorten?url=${url}`)
    .then(data => data.json())
    .then(obj => {
      if (inputLink.value === "") {
        errorDiv.style.display = "block";
        errorMessage.innerHTML = "Please add a link";
        result.style.display = "none";
        inputLink.style.border = "3px solid red";
      } else {
        errorMessage.innerHTML = "";
        inputLink.style.border = "";
        result.style.display = "flex";
        originalLink.innerHTML = url;
        shorterLink.innerHTML = obj.result.full_short_link;
        shorterLink.classList.add("shorter-link");
      }
    })
    .catch(error => {
      console.log("something went wrong");
    });
}

copyBtn.addEventListener("click", copyUrl);

function copyUrl() {
  let copyText = shorterLink.innerHTML;
  navigator.clipboard.writeText(copyText);

  if (copyBtn.innerHTML === "Copy") {
    copyBtn.innerHTML = "Copied";
    copyBtn.classList.add("copied");
  } else {
    copyBtn.innerHTML = "Copy";
    copyBtn.classList.remove("copied");
  }
}
