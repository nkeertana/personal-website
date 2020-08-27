
var desc = ["a UCLA student.", "an aspiring product manager.","a mental health advocate.", "an avid front-end developer.", "a musical theater enthusiast."];
var index = 0;

function changeText() {
    var text = document.getElementById("who");
    text.innerHTML= desc[index];
    console.log("1");
    if (index < (desc.length - 1)) {
        index++;
        console.log("2");
    } else {
        index = 0;
        console.log("3");
    } 
};

setInterval(changeText, 2000);