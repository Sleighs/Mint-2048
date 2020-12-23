var GameManager = {
  size: 4,
  mode: '',
  startNewGame: false,
  undo: false,
  canUndo: true,
  undoCount: 0,
  undoNodes: [],
  direction: '',
  showMenu: false,
  colorScheme: 'mint',
  moved: false,
  winGame: false,
  winCount: 0,
  gameOver: false,
  showWinScreen: false,
  showLoseScreen: false,
  abilities: [],
  gameType: 'mint',
  powers: [
    { 
      type: 'multiply',
      count: 0,
      color: 'rgb(110, 212, 117)'//''#6ED475'
    },
    { 
      type: 'divide',
      count: 0,
      color:'#E26369' //rgb(226,99,105)
    },
    { 
      type: 'four tile',
      count: 0,
      color: '#e6eaf0' //rgb(230,234,240)
    },
    {
      type: 'two tile',
      count: 0,
      color: '#92DAB4' //rgb(146,218,180)
    },
    {
      type: 'freeze',
      count: 0,
      color: '#7AB5D5'
    },
    {
      type: 'grow',
      count: 0,
      color: '#58AD9C' //rgb(88, 173, 156)
    }
  ],
  currentAbility: '',
  currentAbilityId: '',
  abilityTile: null,
  combo: 0,
  comboBlocks: [],
  bestCombo: 0,
  powersModeOn: true,
  choosePowers: false,
  powerSelection: null,
  currentPower: 1,
  powersCount: 0,
  currentPowerTile: 0,
  activePower: null,
  navPowerTiles: false,
  tooltip: '',
  newGame: false
};

export default GameManager;