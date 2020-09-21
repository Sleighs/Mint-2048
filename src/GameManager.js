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
      count: 1
    },
    { 
      type: 'divide',
      count: 1
    },
    { 
      type: 'four tile',
      count: 3
    },
    {
      type: 'two tile',
      count: 2
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
  currentPowerTile: 0,
  navPowerTiles: false,
  tooltip: ''
};

export default GameManager;