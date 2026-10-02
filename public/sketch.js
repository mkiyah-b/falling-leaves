let socket = io();

// find slider, output input val, do something with it input
let rotationSlider = document.querySelector('#rotSlider');
// console.log(rotationSlider);
rotationSlider.addEventListener("input", function (e) {
    // console.log(this.value);
    socket.emit("rotation", this.value);
});

socket.on('rotResponse', (data) => {
    document.querySelector('#square').style.transform = 'rotate(' + data + 'deg';
    console.log("someone changed the rotation to " + data);
});

