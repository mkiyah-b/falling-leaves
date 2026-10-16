let socket = io();
let clientCount = 0;
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


socket.on('clientCount', (data) => {
    clientCount = data;
})
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
        if (clientCount == 1) {
            document.querySelector('#ghost').style.display = "inline";
        } 
        else {
            document.querySelector('#ghost').style.display = "none";
        }
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
        });
        document.querySelector('#ghost').style.display = "none";
    }
});

// if eyes are clicked, they go away
// let eyes = document.querySelector('#eyes');
// console.log(eyes);
// eyes.addEventListener('click', function() {
//     console.log('EYES');
//     eyes.childNodes[0].style.backgroundColor = "black";
//     eyes.childNodes[1].style.backgroundColor = "black";
// });
    

// socket.on('bats', (data) => {
//     if (data) {
//         document.querySelector('#bats').style.display = "initial";
//     }
//     else {
//         document.querySelector('#bats').style.display = "none";
//     }
// });

// socket.on('skeleton', (data) => {
//     if (data) {
//         document.querySelector('#skeleton').style.display = "initial";
//     }
//     else {
//         document.querySelector('#skeleton').style.display = "none";
//     }
// });