class View{

    createBoardHTML(size){
        this.changeGridCSS(size)

        //board
        let boardElement = document.querySelector('#board')
        let html = '';
        for(let i=0;i<size;i++){
            for(let j=0;j<size;j++){
                let id = String(i) + String(j);

                let setSize = parseInt(Math.sqrt(size));
                let set__row = (i+1)%(setSize) == 0  ? "set__row" : "";
                let set__col = (j+1)%(setSize) == 0  ? "set__col" : "";

                let item = `<div id='${id}' data-row='${i}' class="grid__item flex-col ${set__row} ${set__col}">${j+1}</div>`
                html += item;
            }
        }

        boardElement.innerHTML = html;

        //keypad
        let keypad = document.querySelector('#keypad')
        html = ''
        for(let i=0;i<size;i++){
          switch(i)
          //Sets the images to the keypad numbers, which are used to select which professor/number the user would like to input
              {
                case 0:
                  html += `<span class="flex-col keypad__item">1<img src="images/Dens.png" height=70px width=70px alt="1"></span>`;
                  break;
                case 1:
                  html += `<span class="flex-col keypad__item">2<img src="images/Lutch.png" height=70px width=70px alt="2"></span>`;
                  break;
                case 2:
                  html += `<span class="flex-col keypad__item">3<img src="images/Stormy.png" height=70px width=70px alt="3"></span>`;
                  break;
                case 3:
                  html += `<span class="flex-col keypad__item">4<img src="images/daddyb.png" height=70px width=70px alt="4"></span>`;
                  break;
                case 4:
                  html += `<span class="flex-col keypad__item">5<img src="images/Gutirrez.png" height=70px width=70px alt="5"></span>`;
                  break;
                case 5:
                  html += `<span class="flex-col keypad__item">6<img src="images/Pisano-for-web.png" height=70px width=70px alt="6"></span>`;
                  break;
                case 6:
                  html += `<span class="flex-col keypad__item">7<img src="images/Hauser.png" height=70px width=70px alt="7"></span>`;
                  break;
                case 7:
                  html += `<span class="flex-col keypad__item">8<img src="images/Farny.png" height=70px width=70px alt="8"></span>`;
                  break;
                case 8:
                  html += `<span class="flex-col keypad__item">9<img src="images/Ray.png" height=70px width=70px alt="9"></span>`;
                  break;
                }
              }
            html+=`<span class="flex-col keypad__item"><img src="images/trash-o.svg" height=50px width=50px alt=""></span>`;
            keypad.innerHTML = html;
        }

    printBoard(board){

        let size = board.length;
        for(let i=0;i<size;i++){
            for(let j=0; j<size;j++){
                let element = document.getElementById(`${i}${j}`);

                element.textContent = board[i][j] > 0 ? board[i][j] : " ";
                let given = board[i][j] > 0 ? "given " : "emptyItem ";
                element.style.backgroundImage = "";

                element.classList.add(given.replace(" ",''))

            }
        }
    }

    changeGridCSS(size){
        let temp = "auto ".repeat(size)
        let boardElement = document.querySelector('#board')
        boardElement.style.gridTemplateColumns = temp
        boardElement.style.gridTemplateRows = temp
        boardElement.style.fontSize = size == 4 ? "2.25rem" : "1rem";
    }
}
