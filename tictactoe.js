//<<Variables>>

let boardGame = new Array(9); // aca esta el estado interno del tablero, es la informacion que tiene adentro el tablero (parte logica)
let turn = "x";
let itsATie = false;
let winner;
let squares = document.getElementsByClassName("cell");
let resetButton = document.getElementById("reset");
resetButton.addEventListener("click", function () {
  resetGame();
  render();
});
let turnElement = document.getElementById("turn");
let winnerBox = document.getElementById("winner");

//<<Funciones>>

const moves = [
  // enlista las combinaciones posibles de jugadas
  [3, 4, 5],
  [0, 1, 2],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];
let whoWins = () => {
  //recorre el array de jugadas verificando si hay jugada ganadora comparando los valores del tablero contra las posibles jugadas. Si los valores son iguales (son todos 'x' o todos 'o'), setea al ganador con ese valor.Para evitar que se haga el chequeo ni bien empieza el juego (donde todos los valores son undefined),se establece la condicion de que si el primer casillero es undefined, salte a la proxima iteracion.
  moves.forEach((m) => {
    if (boardGame[m[0]] == undefined) {
      return;
    }

    if (
      boardGame[m[0]] == boardGame[m[1]] &&
      boardGame[m[1]] == boardGame[m[2]]
    ) {
      winner = boardGame[m[0]]; //winner toma el valor que tiene el tablero ('x' u 'o')
    }
  });
};
//tie chequea que si nadie gano
let tie = () => {
  let keepPlaying = false;
  if (winner == undefined) {
    moves.forEach((m) => {
      let row = [boardGame[m[0]], boardGame[m[1]], boardGame[m[2]]];
      if (row.find((v) => v == "x") && !row.find((v) => v == "o")) {
        keepPlaying = true;
      }
    });
  }

  itsATie = !keepPlaying;
};

let render = () => {
  // muestra la informacion del tablero a los jugadores.
  for (let i = 0; i < squares.length; i++) {
    /*    if (!boardGame[i]) {
      continue;
    } */
    squares[i].textContent = getEmoji(boardGame[i]);
  }

  if (!winner && itsATie) {
    winnerBox.textContent = "Empate";
    return;
  }

  if (!winner) {
    turnElement.textContent = `Juega : ${getEmoji(turn)}`;
    winnerBox.textContent = "";
  } else {
    winnerBox.textContent = `Ganador:${getEmoji(winner)}`;
  }
};

let getEmoji = (player) => {
  if (!player) {
    return null;
  }
  if (player == "x") {
    return "🎃";
  } else {
    return "🤖";
  }
};

function plays(position) {
  // rellena el casillero con el valor de turno,llamo a la funcion whoWins para chequear si hubo jugada ganadora,cambia el valor de turno y llama a render
  boardGame[position] = turn;
  whoWins();
  tie();
  if (turn == "x") {
    turn = "o";
  } else {
    turn = "x";
  }
  render();
}

function resetGame() {
  boardGame = new Array(9);
  turn = "x";
  winner = undefined;
  itsATie = false;
}
