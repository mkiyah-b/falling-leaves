let socket = io();
// let day = true;

//find the clicked leaf, tell it to change classes
let leaves = document.querySelectorAll('.leaf');
// console.log(clickedLeaf.classList[1]);
leaves.forEach(leaf => {
    leaf.addEventListener('click', function() {
        //only send to socket if it hasn't been activated
        if (leaf.classList[1] == "dormant") {
            socket.emit("activeClass", leaf.id);
        }
        else {
            console.log("That's already fallen, silly!")
        }
    })
}); 

socket.on('classResponse', (data) => {
    // const idNew = '#' + data;
    document.querySelector('#' + data).classList.replace('dormant', 'active');
    console.log('a user turned #' + data + ' active');
});

// when you click the pumpkin:
///  it turns on as a jack-o-lantern
///  the sky turns to night (stars?)
///  the leaves reset
///  eyes shine in the hole
let pumpkin = document.querySelector('#pumpkin');
pumpkin.addEventListener('click', function() {
    // day = !day;
    // console.log(day);
    socket.emit("pumpkin");
});

socket.on('pumpkinToggle', (data) => {
    // day = data;
    if (data == false) {
        console.log("It's night!");
        document.querySelectorAll('#face').forEach(faceJack => {
            faceJack.style.backgroundColor = "yellow";
        });
        document.querySelector('#background').style.background = "-webkit-linear-gradient(bottom, rgb(128, 0, 106), rgb(28, 3, 54))";
        document.querySelectorAll('#eye').forEach(eye => {
            eye.style.backgroundColor = "yellowgreen";
        });
    }
    else {
        console.log("It's day!");
        document.querySelectorAll('#face').forEach(faceJack => {
            faceJack.style.backgroundColor = "black";
        });
        document.querySelector('#background').style.background = "-webkit-linear-gradient(bottom, skyblue, rgb(130, 130, 255))";
        document.querySelectorAll('#eye').forEach(eye => {
            eye.style.backgroundColor = "black";
        });
        leaves.forEach(leaf => {
            leaf.classList.replace('active', 'dormant');
        })
    }
});