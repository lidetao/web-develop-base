function changeImage() {
    element = document.getElementById('myimage')
    if (element.src.match("bulbon")) {
        element.src = "/i/eg_bulboff.gif";
    } else {
        element.src = "/i/eg_bulbon.gif";
    }
}
