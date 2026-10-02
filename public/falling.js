let socket = io();

//find the clicked leaf, tell it to change classes
let leaves = document.querySelectorAll('.leaf');
// console.log(clickedLeaf.classList[1]);
leaves.forEach(leaf => {
    leaf.addEventListener('click', function(e) {
        //only send to socket if it hasn't been activated
        if (leaf.classList[1] == "dormant") {
            socket.emit("activeClass", leaf.id);
        }
        else {
            console.log("That's already fallen, silly!")
        }
    })
}); 

// {
//     clickedLead.addEventListener('click', function(e) {
//         // console.log(this.classList[1]);
//         socket.emit("activeClass", this.id);
//     });
// }


socket.on('classResponse', (data) => {
    // const idNew = '#' + data;
    document.querySelector('#' + data).classList.replace('dormant', 'active');
    console.log('a user turned #' + data + ' active');
});