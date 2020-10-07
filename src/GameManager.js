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
  abilities: [
    /*
    {
      type: 'free',
      state: true,
      id: 10123
    },
    {
      type: 'grow',
      state: true,
      id: 37193
    },
    {
      type: 'four tile',
      state: true,
      id: 2123
    },
    {
      type: 'four tile',
      state: true,
      id: 2123
    },
    
    {
      type: 'divide',
      state: true,
      id: 5365876
    },
    {
      type: 'multiply',
      state: true,
      id: 2636354
    }*/
  ],
  powers: [
    { 
      type: 'multiply',
      count: 1,
      color: '#6ED475'
    },
    { 
      type: 'divide',
      count: 1,
      color:'#E26369'
    },
    { 
      type: 'four tile',
      count: 0,
      color: '#e6eaf0'
    },
    {
      type: 'two tile',
      count: 2,
      color: '#92DAB4'
    },
    {
      type: 'freeze',
      count: 0,
      color: '#7AB5D5'
    },
    {
      type: 'grow',
      count: 0,
      color: '#58AD9C'
    }
  ],
  currentAbility: '',
  currentAbilityId: '',
  abilityTile: null,
  combo: 0,
  comboBlocks: [],
  bestCombo: 0,
  powersModeOn: false,
  choosePowers: false,
  powerSelection: null,
  currentPower: 1,
  powersCount: 0,
  currentPowerTile: 0,
  navPowerTiles: false,
  tooltip: '',
  newGame: false,
  gameType: ''
};

export default GameManager;