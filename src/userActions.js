let isFirstTime = true;
let isFirstTime_dotMenu = true;
let emptyItems;
let keyPadItems;
let user__level = [level, 'Evil'];
let user__size = boardSize;

const timer = document.getElementById('stopwatch');

var hr = 0;
var min = 0;
var sec = 0;
var stoptime = true;

function initActions() {

    if (isFirstTime) {
        let submitButton = document.querySelector('#header__submit > span')
        let body = document.querySelector('body')
        let startButton = document.querySelector('#start')
        let home__options = document.querySelectorAll('.selection .options span')

        submitButton.addEventListener('click', submitHandler)
        body.addEventListener('keyup', keyUpHandler)
        startButton.addEventListener('click', startHandler)
        home__options.forEach(x => x.addEventListener('click', homeOptionsHandler))

        isFirstTime = false;
    }

    let selection;

    function emptyItemHandler() {
        emptyItems.forEach(x => x.classList.remove('selected'))
        this.classList.add('selected')
    }

    function keyPadHandler(event) {
        event.stopPropagation()
        if (selection = document.querySelector('.selected')) {
            selection.textContent = this.textContent;
            let x = selection.id[0];
            let y = selection.id[1];
            board.board[x][y] = this.textContent == "" ? 0 : parseInt(this.textContent)
        }
    }

    function submitHandler(event) {
        event.stopPropagation();
        let validater = new Validate(board.board, boardSize)
        let isValid = validater.runTests();
        if (isValid) {
            //alert("You've Solved this. Awesome!!!")
            stopTimer();//stops the timer when the solutuin is found
            alert("You finished this in " + hr + " hours " + min + " minutes and " + sec + " seconds!"); //displays how fast it was done
            resetTimer(); // resets the timer 
        } else {
            alert("That's not correct. Keep trying.")
        }
    }

    function dotMenuHandler(e) {
        e.stopPropagation()
        dotMenuDiv = document.querySelector('#dotMenu')
        dotMenuDiv.classList.add('d-block')

        if (isFirstTime_dotMenu) {
            isFirstTime_dotMenu = false;

            //solver handlers
            solverStartButton.addEventListener('click', () => solverStartHandler())
            speedRangeButton.addEventListener('click', (event) => speedRangeHandler(event))
            solverStopButton.addEventListener('click', ()=> {
                dotMenuDiv.classList.remove('d-block');
                solver.requestStop = true;
            })

            //page reloadon clear ALl
            document.querySelector('#back').addEventListener('click', (event) => {
                event.stopPropagation()
                window.location.reload()
            })

            //clear user input
            document.querySelector('#clear').addEventListener('click', (event) => {
                event.stopPropagation()
                clearUserInput()
                dotMenuDiv.classList.remove('d-block')
            })

            //load new game, with same user inputs
            document.querySelector('#newGame').addEventListener('click', (event) => {
                event.stopPropagation()
                dotMenuDiv.classList.remove('d-block')
                startHandler()
            })

            document.querySelector('#solver').addEventListener('click', (event) => {
                event.stopPropagation()                
                solverMenu.classList.toggle('d-block')
            })
            
            //hide menu when clicking on div
            document.querySelector('body').addEventListener('click', () => {                
                dotMenuDiv.classList.remove('d-block')
                solverMenu.classList.remove('d-block')
            })
        }

    }

    function keyUpHandler(event) {
        if (selection = document.querySelector('.selected')) {
            let k = event.keyCode;
            if (((k < 46 || k > 57) && (k < 96 || k > 105)) || k == 47) {
                //not a number        
            } else {
                selection.textContent = event.keyCode == 46 ? "" : event.key;
                let x = selection.id[0];
                let y = selection.id[1];
                board.board[x][y] = event.keyCode == 46 ? 0 : parseInt(event.key)
            }
        }

    }

    //starts here: after user clicks on start game button
    function startHandler() {
        let home = document.querySelector('#home')
        let main__container = document.querySelector('#main__container')
        home.style.display = "none";
        main__container.style.display = "block";
        newGame(user__size, user__level[0])
        declareBoardElements()
        startTimer()
    }

    function homeOptionsHandler(event) {
        event.stopPropagation()
        let remaining = this.parentNode;
        remaining = remaining.querySelectorAll('span');
        if (this.parentNode.parentNode.id == "selection__level") {
            remaining.forEach(x => {
                x.style.background = "none"
                x.style.color = "black"
            })
            this.style.color = "white";
            this.style.background = "#0097e6";
            user__level[0] = parseInt(this.dataset["level"])
            user__level[1] = this.textContent;

        } else if (this.parentNode.parentNode.id == "selection__size") {
            remaining.forEach(x => x.style.color = "black")
            this.style.color = "#0097e6";
            user__size = parseInt(this.dataset["size"])
        }
    }

    function solverStartHandler() {     
        dotMenuDiv.classList.remove('d-block')   
        solver = new Solver(board.board)
        solver.watch = solverWatchButton.checked;
        solver.requestStop = false;
        solver.speed = 250 - parseInt(speedRangeButton.value) + 50;
        solver.startSolving()
    }

    function speedRangeHandler(event){
        event.stopPropagation();
        
    }

    function declareBoardElements() {
        emptyItems = document.querySelectorAll('.emptyItem')
        keyPadItems = document.querySelectorAll('.keypad__item')
        dotMenuButton = document.querySelector('#dotMenuSpan')
        solverMenu = document.querySelector('#solverMenu')
        solverStartButton = document.querySelector('#solverStart')
        solverWatchButton = document.querySelector('#solverWatchCbox')
        solverStopButton = document.querySelector('#solverStop')
        speedRangeButton = document.querySelector('#speedRange')

        emptyItems.forEach(x => x.addEventListener('click', emptyItemHandler))
        keyPadItems.forEach(x => x.addEventListener('click', keyPadHandler))
        dotMenuButton.addEventListener('click', (e) => dotMenuHandler(e))        
    }
}

function startTimer() { //when called check to see if timer is running and if it is then sets it to stop 
  if (stoptime == true) { 
        stoptime = false;
        timerCycle(); //calls timerCycle
    }
}
function stopTimer() { //checks to see if timer is running and stops it
  if (stoptime == false) {
    stoptime = true;
  }
}

function timerCycle() { // checks to see if the timer is running and then continously increases and outputs the seconds minutes and hours
    if (stoptime == false) {
    sec = parseInt(sec); //convert the current saved strings of sec min and hr to integers
    min = parseInt(min);
    hr = parseInt(hr);

    sec = sec + 1;

    if (sec == 60) { //once 60 seconds is ecliplesd reset the seconds and add to minutes. Same goes fot the hour
      min = min + 1;
      sec = 0;
    }
    if (min == 60) {
      hr = hr + 1;
      min = 0;
      sec = 0;
    }

    if (sec < 10 || sec == 0) { // createst the zero before the time for when the values only are in the ones place
      sec = '0' + sec;
    }
    if (min < 10 || min == 0) {
      min = '0' + min;
    }
    if (hr < 10 || hr == 0) {
      hr = '0' + hr;
    }

    timer.innerHTML = hr + ':' + min + ':' + sec; // collects the times into a string

    setTimeout("timerCycle()", 1000); //outputs the time every 1000ms or 1 second
  }
}


function resetTimer() {
    timer.innerHTML = "00:00:00";
    stoptime = true;
    hr = 0;
    sec = 0;
    min = 0;
}