function Player(name) {
  this.name = name;
  this.move = 0;
  this.selectedMagicSquares = {};
  this.remainingWinnableCombos = [
    '276', '951', '438',
    '294', '753', '618',
    '258', '654'
  ];
}
