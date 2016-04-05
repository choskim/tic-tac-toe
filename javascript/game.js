function Game() {
  if (window.TicTacToe.game % 2 === 0) {
    this.currentPlayer = new Player('x');
    this.otherPlayer   = new Player('o');
  } else {
    this.currentPlayer = new Player('o');
    this.otherPlayer   = new Player('x');
  }
}

Game.prototype.processTurn = function(clickedMagicValue) {
  this.updatePlayers(clickedMagicValue);
  this.canStopGame(clickedMagicValue) ? this.endGame() : this.changeTurn();
};

Game.prototype.updatePlayers = function (clickedMagicValue) {
  var remainingWinnableCombos = this.otherPlayer.remainingWinnableCombos;
  var len, i;

  // currentPlayer
  this.currentPlayer.move++;
  this.currentPlayer.selectedMagicSquares[clickedMagicValue] = true;

  // otherPlayer
  for (len = remainingWinnableCombos.length; len > 0; len--) {
    i = len -1;

    if (remainingWinnableCombos[i].indexOf(clickedMagicValue) !== -1) {
      remainingWinnableCombos.splice(i, 1);
    }
  }
};

Game.prototype.canStopGame = function(clickedMagicValue) {
  return this.hasDrawn() || this.hasWon(clickedMagicValue);
};

Game.prototype.hasWon = function(clickedMagicValue) {
  var remainingWinnableCombos = this.currentPlayer.remainingWinnableCombos;
  var i, length;
  var win;
  var j, comboLength;

  for (i = 0, length = remainingWinnableCombos.length; i < length; i++) {
    win = true;
    combo = remainingWinnableCombos[i];

    for (j = 0, comboLength = combo.length; j < comboLength; j++) {
      if (!this.currentPlayer.selectedMagicSquares[combo[j]]) {
        win = false;
      }
    }

    if (win) {
      window.TicTacToe.stats[this.currentPlayer.name]++;
      document.getElementById(this.currentPlayer.name).innerHTML = window.TicTacToe.stats[this.currentPlayer.name];

      return win;
    }

  }

  return false;
};

Game.prototype.hasDrawn = function() {
  var result = false;

  if (!this.currentPlayer.remainingWinnableCombos.length && !this.otherPlayer.remainingWinnableCombos.length) {
    console.log("Game ends in draw");
    window.TicTacToe.stats['draw']++;
    document.getElementById('draw').innerHTML = window.TicTacToe.stats['draw'];

    result = true;
  }

  return result;
};

Game.prototype.endGame = function() {
  window.TicTacToe.hasGameEnded = true;
};

Game.prototype.changeTurn = function() {
  var temp           = this.currentPlayer;
  this.currentPlayer = this.otherPlayer;
  this.otherPlayer   = temp;
};
