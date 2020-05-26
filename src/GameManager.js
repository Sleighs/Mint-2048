var GameManager = {
  size: 4,
  startNewGame: false,
  undo: false,
  undoCount: 0,
  direction: '',
  showMenu: false,
  colorScheme: 'mint',
  moved: false,
  winGame: false,
  winCount: 0,
  gameOver: false,
  showWinScreen: false,
  showLoseScreen: false
};

export default GameManager;