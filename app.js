var array = [];
var array1 = [];
var arraycontrol1 =[];
var arraycontrol2 =[];
var previousSelected = "";
var counter = 0;

function quiztest(){
    //ARRAYS OF OBJECTS
    const actors = [
    {name: "Arnold", sex: "M", image: "arnold.jpg"}, {name: "Stallone", sex: "M", image: "stallone.jpg"},
    {name: "Meryl", sex: "F", image: "meryl.jpg"}, {name: "Sophia", sex: "F", image:"sophia.jpg"},
    {name: "Hulk Hogan", sex: "M", image:"hulk hogan.jpg"}, {name: "Tom Cruise", sex: "M", image:"tom cruise.jpg"}];


    //TIMEOUT prova 1
    /*var timeleft = 5;
    var timer = document.getElementById("idtimer");
    var downloadTimer = setInterval(function(){
        document.getElementById("idtimer").innerHTML = timeleft;
        timeleft --;
        if (timeleft === 0){
            clearInterval(downloadTimer);
            document.getElementById("idtimer").innerHTML = "Time's up!";
            quiztest();
            listdiv.remove();
            document.querySelector(".picture").remove();
            document.getElementById("idcounter").remove();
            document.getElementById("idtimer").remove();
        }
    }, 1000);

    //TIMEOUT prova 2
    var timeLeft = 5;
    var tempofinale = setInterval(function() {
    document.getElementById("idtimer").innerHTML = timeLeft;
    timeLeft--;
    if(timeLeft === 0) {
        stopInterval()
        document.getElementById("idtimer").remove();
    }
    }, 1000);*/


    //To remove the "previous" counter when the next question/actor appears
    if (document.contains(document.getElementById("idcounter"))){
        document.getElementById("idcounter").remove();
    }

    //VARIABLES
    var buttonstart = document.getElementById("buttonstart");

    //START BUTTON DISAPPEARING
    buttonstart.classList.add("invisible");

    //CREATING THE RANDOM NUMBER, CHECKINg THAT IMAGES NEVER REPEAT TWICE IN A ROW
    for (let i = 0; i < 4; i++) {
        var randomnumber2 = (Math.floor(Math.random() * ((actors.length - 1) - 0 + 1)) + 0);
        var selected = actors.splice(randomnumber2, 1);// Splice modifies each loop the original array, cutting 1 ele at the time
        if (i == 0){
            if (previousSelected != selected[0].name){
                array1.push(selected);
            }
            else{
                i--
            }
        }
        else {
            array1.push(selected);
        }
    }
    var flatarray = array1.flat();
    previousSelected = flatarray[0].name;

    //CREATING THE IMAGE AND APPENDING IT
    var picture = document.createElement("img");
    picture.setAttribute("id", flatarray[0].name);
    arraycontrol1.push(flatarray[0].name);
    picture.src = flatarray[0].image;
    picture.classList.add("picture");
    document.getElementById("picturespace").appendChild(picture);


    //CREATING THE ANSWER OPTIONS and the Div that contains them////////////////////////////
    var listmenu = document.getElementById("listmenu");//dove attaccare i "li"
    var listdiv = document.createElement("div");
    listdiv.setAttribute("id", "listdiv");

    ///SHUFFLE FUNCTION START///
    // This function prevent the correct name of the image to be the first in the Li results,
    // this because the program start creating the image at flatarray[0]
    // which is also where we start counting our LIs
    function shuffle(array) {
        let currentIndex = array.length;
        let randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
    }
    shuffle(flatarray);
    /////////////////////////////////////////////////////////////////// SHUFFLE FUNCTION ENDS

    //// FUNCTION TO CREATES LIs START
    for (let i = 0; i < 4; i++) {
        var textnode = document.createTextNode(flatarray[i].name);
        var listelement = document.createElement("li");
        listelement.appendChild(textnode);
        listelement.setAttribute("id", flatarray[i].name);
        listdiv.appendChild(listelement);
        listmenu.appendChild(listdiv);

        listelement.onclick = function (){
            if (this.id === document.querySelector(".picture").id){
                alert("hai vinto!");
                counter++;
                counternumber.innerHTML = counter;
            }
            else{
                alert("hai sbagliato!");
                counter --;
                counternumber.innerHTML = counter;
            }
        listdiv.setAttribute("class", "clicked");
        array1 = [];
        setTimeout(() => {listdiv.remove(), document.querySelector(".picture").remove();}, 1000);
        setTimeout(() => {quiztest()}, 1000);

        }//ONCLICK FUNCTION ENDING

    }//FOR LOOP "LIs" ENDING

    //CREATING THE COUNTER NUMBER
    var counternumber = document.createElement("div");
    counternumber.setAttribute("id", "idcounter");
    listmenu.appendChild(counternumber);
    counternumber.innerHTML = "Your current score is : " + counter;

} // MAIN FUNCTION ENDS

