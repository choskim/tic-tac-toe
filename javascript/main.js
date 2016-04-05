document.addEventListener('DOMContentLoaded', function() {
  window.TicTacToe.initialize(new Game());
});

window.TicTacToe = {
  game: 0,
  currentGame: null,
  hasGameEnded: false,
  stats: {
    'x': 0,
    'draw': 0,
    'o': 0
  },
  initialize: function(game) {
    var board = document.getElementById('game-board');
    this.currentGame = game;
    this.game++;

    board.addEventListener('click', function(event) {
      var clickedMagicSquare = event.target;
      var clickedMagicValue;

      if (window.TicTacToe.hasGameEnded) {
        window.TicTacToe.start(new Game());
        return;
      }

      if (clickedMagicSquare.innerHTML === "") {
        clickedMagicValue = clickedMagicSquare.getAttribute('data-magic-square');
        clickedMagicSquare.innerHTML = window.TicTacToe.currentGame.currentPlayer.name;
        window.TicTacToe.currentGame.processTurn(clickedMagicValue);
      }
    });
  },
  start: function(game) {
    this.game++;
    this.hasGameEnded = false;
    this.currentGame = game;

    var magicSquares = document.querySelectorAll('[data-magic-square]');
    var i      = 0;
    var length = magicSquares.length;

    for (i, length; i < length; i++) {
      magicSquares[i].innerHTML = "";
    }
  }
};
