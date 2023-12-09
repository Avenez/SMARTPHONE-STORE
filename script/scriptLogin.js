// --------------------------- chech admin-------------------

let functionId = function () {
  let id = new URLSearchParams(window.location.search);
  let prodId = id.get("resourceId");

  console.log("1");
  let user = document.getElementById("user");
  let pass = document.getElementById("pass");
  if (user.value === "admin" && pass.value === "admin") {
    console.log("2");
    // if (prodId) {
    console.log("3");
    window.location.assign("./backoffice.html?resourceId=" + prodId);
  }
  // else {
  //   console.log("4");
  //   window.location.assign("./backoffice.html");
  // }
  //   }
  else {
    console.log("5");
    alert("User e Password errate");
    user.value = "";
    pass.value = "";
  }
};

window.onload = () => {
  let Buttons = document.querySelectorAll(".btn");
  let buttonsArr = Array.from(Buttons);
  buttonsArr[1].addEventListener("click", functionId);
};
