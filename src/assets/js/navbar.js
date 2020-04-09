function navBarFunc() {
  var x = document.getElementById("meny");
  if (x.className === "meny") {
    x.className += "-responsive";
  } else {
    x.className = "meny";
  }
}
