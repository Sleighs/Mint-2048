import React, { Component } from 'react';
import Info from './Info';
import Board from './Board';
import Menu from './Menu';
import EndGame from './EndGame';
import Powers from './Powers';
import GameManager from '../GameManager';
import Swipe from 'react-easy-swipe';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //Game
            board: [],
            previousBoards: [],
            cells: [],
            savedGame: false,
            turnCount: 0,
            score: 0,
            bestScore: 0,
            menuVisible: false,
            undo: false,
            canUndo: false,
            undoScore: 0,
            margeAnim: false,
            moveCounter: 0,
            
            //Timer
            hr: 0,
            min: 0,
            sec: 0,
            ms: 0,
            timeStarted: false,
            timeBeganMaster: null,
            timeBegan: null, 
            timeStopped: null,
            stoppedDuration: 0, 
            masterTime: null,
            started: null,
            timeState: "new",
            interval: null
        }
        this.initGame = this.initGame.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.direction = this.direction.bind(this);
        this.openMenu = this.openMenu.bind(this);
        this.undoMove = this.undoMove.bind(this);
        this.newGame = this.newGame.bind(this);
        this.actuate = this.actuate.bind(this);
    }
    componentDidMount() {
        document.addEventListener('keyup', this.handleInput);
        
        this.initGame();
    }
    componentWillUnmount() {
        document.removeEventListener('keyup', this.handleInput);
    }


    //Keyboard Handles
    handleInput(event) {
        if (event.keyCode === 13) {
           //console.log('enter pressed');
        }

        // Get Move Direction
        if (event.keyCode === 38) {
            // Up arrow
            console.log("up arrow pressed");
            this.setState({
                direction: 0
            });
            this.move();
        }
        else if (event.keyCode === 40) {
            // Down arrow
            console.log("down");
            this.setState({
                direction: 2
            });
            this.move();
        }
        else if (event.keyCode === 37) {
            // Left arrow
            console.log("left");
            this.setState({
                direction: 3
            });
            this.move();
        }
        else if (event.keyCode === 39) {
            // Right arrow
            console.log("right");
            this.setState({
                direction: 1
            });
            this.move();
        }
    }


    // Swipe Handles
    onSwipeStart(event) {
        console.log('Start swiping...', event);
    }
    onSwipeMove(position, event) {
        console.log(`Moved ${position.x} pixels horizontally`, event);
        console.log(`Moved ${position.y} pixels vertically`, event);
    }
    onSwipeEnd(event) {
        console.log('End swiping...', event);
    }
    onSwipeUp(event){
        console.log(event);
    }
    onSwipeDown(event){
        console.log(event);
    }
    onSwipeLeft(event){
        console.log(event);
    }
    onSwipeRight(event){
        console.log(event);
    }
    direction(dir){
        if (dir){
            switch(dir){
                case 'up':
                    this.setState({
                        direction: 0
                    });
                    break;
                case 'down':
                    this.setState({
                        direction: 2
                    });
                    break;
                case 'right':
                    this.setState({
                        direction: 1
                    });
                    break;
                case 'left':
                    this.setState({
                        direction: 3
                    });
                    break;
            }

            this.move();
        }
        
        this.setState(prevState => ({ mergeAnim: !prevState.mergeAnim }));

        console.log('direction:', dir, this.state.direction);
    }


    // Game Initializion
    initGame() {
        // If no previous game
        GameManager.startNewGame = true;
        this.actuate('new game'); 
    }
    getBoard(data) {
        var board = [];
        var cells = [];
        var prevBoards = [];

        // If no previous game is found, create new board
        if ((!this.state.board.pop(-1) && this.state.board.length < (this.props.size * this.props.size) ) || GameManager.startNewGame === true || data == null) {
            var tileType;
            var startTile1 = Math.floor(Math.random() * 16 + 1);
            var startTile2 = Math.floor(Math.random() * 16 + 1);

            // Select two beginning tile locations at random
            while (startTile1 === startTile2) {
                startTile2 = Math.floor(Math.random() * 16 + 1);
            }
            // Create new board
            var counter = 0;
            for (var x = 0; x < this.props.size; x++){
                var row = [];
                for (var y = 0; y < this.props.size; y++){
                    // Add random tiles
                    counter++;
                    if (counter === startTile1 || counter === startTile2) {
                        tileType = true;
                    } else {
                        tileType = false;
                    }   

                    // Add tile to board
                    board.push(this.newTile(x, y, tileType));
                    row.push(this.newTile(x, y, tileType));
                }
                cells.push(row);
            }
            prevBoards.push(board);

            this.setState({
                board: board,
                cells: this.grid(board),
                previousBoards: prevBoards,
                score: 0
            }); 
        } else if (!data){
            this.getBoard(null);
        } else {
            for (var a = 0; a < this.props.size; a++){
                var row = [];
                for (var b = 0; b < this.props.size; b++){ 
                    //Add tile to board
                    board.push(data[a][b]);
                    row.push(data[a][b]);
                }
                cells.push(row);
            }
            this.setState({
                board: board,
                cells: cells
            });            
        }
    }
    startTime(){
        if (this.state.timeBegan === null) {
            this.setState({
                timeBegan: new Date(),
                timeBeganMaster: this.state.timeBegan
            });        
        }

        if (this.state.timestopped !== null) {
            this.setState({
                stoppedDuration: this.state.stoppedDuration + (new Date() - this.state.timeStopped)
            });
        }

        this.setState({
            timeState: 'running',
            timeStarted: true
        });

        GameManager.interval = setInterval(() => {this.clockRunning()}, 100); 
    }
    stopTime(){
        return clearInterval(GameManager.interval);
    }
    clockRunning(){
        var currentTime = new Date();
        var timeElapsed = new Date(currentTime - this.state.timeBegan);

        this.setState({
            hr: timeElapsed.getUTCHours(),
            min: timeElapsed.getUTCMinutes(),
            sec: timeElapsed.getUTCSeconds(),
            ms: timeElapsed.getUTCMilliseconds()
        });   
    }
    newTile (x, y, type, num, mergedFrom, previousPosition) {
        var randomNum = Math.floor(Math.random() * 100 + 1);  
        var tile = {
            x: x,
            y: y,
            type: false,
            num: !num ? null : num,
            mergedFrom: !mergedFrom ? null : mergedFrom,
            previousPosition: !previousPosition ? null : previousPosition
        };
    
        if (type === true){
            if (randomNum < 11){
                tile.num = 4;
            } else {
                tile.num = 2;
            }
        } 

        return tile;
    }
    

    // Move Tiles
    move () {
        var moved = false;
        GameManager.moved = false;
        GameManager.winGame = false;
        this.actuate();

        if (GameManager.gameOver === true){
            return;
        }

        this.setState({
            vector: this.getVector(this.state.direction)
        });

        var traversals = this.traversals(this.state.vector); 

        this.setState({
            traversals: traversals,
            undoScore: this.state.score,
            canUndo: true
        });
        
        var cell;
        var tile;
        
        this.prepareTiles();

        // Traverse Grid
        traversals.x.forEach((x) => {
            traversals.y.forEach((y) => {
                var next;

                cell = { x: x, y: y };
                tile = this.cellContent(cell);

                if (tile){
                    // Get position of farthest empty cell
                    var positions = this.findFarthestPosition(cell, this.state.vector);
                    next = this.cellContent(positions.next);
                    
                    // Merge with next tile if number is alike
                    if (next && next.num === tile.num && next.mergedFrom === null && (next.x !== tile.x || next.y !== tile.y)){
                        var newNum = Math.round(tile.num * 2);
                        var merged = {
                            x: next.x,
                            y: next.y,
                            type: false,
                            num: newNum,
                            mergedFrom: [tile, next],
                            previousPosition: cell
                        };

                        this.removeTile(cell);
                        this.updatePosition(merged, {x: next.x, y: next.y});

                        // Update the score
                        this.setState({ score: this.state.score + newNum });

                        // Animate

                        moved = true;

                        if (newNum === 2048 && GameManager.winCount === 0){
                            GameManager.winGame = true;
                            GameManager.score = this.state.score;
                            GameManager.time = (this.state.hr !== 0 ? this.state.hr : '') + ' ' + (this.state.min < 10 ? '0' + this.state.min : this.state.min) + ':' + (this.state.sec < 10 ? '0' + this.state.sec : this.state.sec);
                            GameManager.moves = this.state.moveCounter;

                            this.actuate();
                        }
                    } else {
                        // Move to farthest available position
                        this.moveTile(tile, positions.farthest);   
                        
                        this.setState({
                            cells: this.grid(this.state.board)
                        });
                    } 
                } 

                // Register move happened
                if (!this.positionsEqual(cell, positions.farthest) && tile.num !== null) {
                    moved = true;  
                }
            });
        });

        if (moved) {
            // Add randomm tile if possible
            this.addRandomTile();

            // Update high score
            if (this.state.bestScore < this.state.score) {
                this.setState({
                    bestScore: this.state.score
                });
            }

            // Update list of previous boards
            var prevBoards = [];
            for (var m = 0; m < this.state.previousBoards.length; m++) {
                prevBoards.push(this.state.previousBoards[m]);
            }
            if (prevBoards[prevBoards.length -1] !== this.state.board){
                prevBoards.push(this.state.board);
            }

            this.setState({
                previousBoards: prevBoards,
                canUndo: true
            });

            GameManager.moved = true;
            GameManager.undo = true;

            // Make undo available
            if (GameManager.undoCount === 0) {
                GameManager.undoCount = GameManager.undoCount + 1;
            }
        }
        this.setState({
            moveCounter: this.state.moveCounter + 1
        });

        if (!this.movesAvailable()){
            GameManager.gameOver = true;
            GameManager.score = this.state.score;
            GameManager.time = (this.state.hr !== 0 ? this.state.hr : '') + ' ' + (this.state.min < 10 ? '0' + this.state.min : this.state.min) + ':' + (this.state.sec < 10 ? '0' + this.state.sec : this.state.sec);
            GameManager.moves = this.state.moveCounter;
            this.actuate();
        }
    }
    prepareTiles(){
        var data = this.state.cells;
        var board = [];
        var cells = []

        for (var x = 0; x < this.props.size; x++){
            var row = [];
            for (var y = 0; y < this.props.size; y++){ 
                // Clear merged and store previous position
                board.push(this.newTile(data[x][y].x, data[x][y].y, false, data[x][y].num, null, { x: data[x][y].x, y: data[x][y].y }));
                row.push(this.newTile(data[x][y].x, data[x][y].y, false, data[x][y].num, null, { x: data[x][y].x, y: data[x][y].y }));
            }
            cells.push(row);
        }
        
        this.setState({
            board: board,
            cells: cells
        });            
    }
    getVector(direction) {
        var map = {
            0: { x: -1, y: 0 },  // Up
            1: { x: 0,  y: 1 },  // Right
            2: { x: 1,  y: 0 },  // Down
            3: { x: 0,  y: -1 }  // Left
        };

        return map[direction];
    }
    findFarthestPosition(cell, vector) {
        var previous;        

        do {
            previous = cell;
            cell = {x: previous.x + vector.x, y: previous.y + vector.y };
        } while (
            // Check if next tile location is in bounds and unoccupied
            this.withinBounds(cell) && this.cellAvailable(cell)
        );

        return {
            farthest: previous,
            next: cell
        }
    }
    withinBounds(position) {
        return position.x >= 0 && position.x < this.props.size &&
                position.y >= 0 && position.y < this.props.size;
    }
    cellAvailable(cell) {
        var tile = this.cellContent(cell);
        if (tile && tile.num !== null){
            return false;
        } else {
            return true;
        }
    }
    cellContent(coordinate) {
        if (this.withinBounds(coordinate)) {
          return this.state.cells[coordinate.x][coordinate.y];
        } else {
          return null;
        }
    }
    traversals (vector) {
        // Create object for each tile
        var traversals = { x: [], y: [] };

        for (var pos = 0; pos < this.props.size; pos++) {
            traversals.x.push(pos);
            traversals.y.push(pos);
        }

        if (vector.x === 1) {
            traversals.x = traversals.x.reverse()
        }
        if (vector.y === 1) {
            traversals.y = traversals.y.reverse();
        }       

        return traversals;
    }
    board(grid){
        // Get board array from current grid
        var board = [];

        if (grid && grid.length === this.props.size){
            for(var i = 0; i < this.props.size; i++){
                for(var j = 0; j < this.props.size; j++){
                    board.push(grid[i][j]);
                }
            }
        } else {
            for(var x = 0; x < this.props.size; x++){
                for(var y = 0; y < this.props.size; y++){
                    board.push(this.state.cells[x][y]);
                }
            }
        }
        
        return board;
    }
    grid(board){
        var cells = [];

        if ( board && board.length > this.props.size){
            // Create grid from board
            var index = 0;
            for (var x = 0; x < this.props.size; x++){
                var row = [];
                for (var y = 0; y < this.props.size; y++){
                    row.push(board[index]);
                    index++;
                }
                cells.push(row);
            }
        } else if (board && board.length === this.props.size) {
            // Create grid from grid
            for (var x = 0; x < this.props.size; x++){
                var row = [];
                for (var y = 0; y < this.props.size; y++){ 
                    row.push(this.newTile(board[x][y].x, board[x][y].y, false, board[x][y].num));
                }
                cells.push(row);
            }
        } else {
            // Create grid from state
            var data = this.state.cells;

            for (var x = 0; x < this.props.size; x++){
                var row = [];
                for (var y = 0; y < this.props.size; y++){ 
                    row.push(this.newTile(data[x][y].x, data[x][y].y, false, data[x][y].num));
                }
                cells.push(row);
            }
        }

        return cells;
    }
    updatePosition(tile, cell) {
        var cells = [];
        var grid = this.state.cells;

        for (var x = 0; x < this.props.size; x++){
            var row = [];
            for (var y = 0; y < this.props.size; y++){ 
                row.push(this.newTile(grid[x][y].x, grid[x][y].y, false, grid[x][y].num, grid[x][y].mergedFrom));
            }
            cells.push(row);
        }    

        cells[cell.x][cell.y] = this.newTile(cell.x, cell.y, false, tile.num, tile.mergedFrom, tile.previousPosition);

        this.setState({
            cells: cells,
            board: this.board(cells)
        });
    }
    moveTile(tile, cell) {
        // Remove previous tile
        this.removeTile(tile);
        // Add new tile
        this.updatePosition(tile, cell);
    }
    insertTile(tile, cell){
        var cells = [];
        var grid = this.state.cells;

        for (var x = 0; x < this.props.size; x++){
            var row = [];
            for (var y = 0; y < this.props.size; y++){ 
                row.push(this.newTile(grid[x][y].x, grid[x][y].y, false, grid[x][y].num, grid[x][y].mergedFrom));
            }
            cells.push(row);
        }

        cells[cell.x][cell.y] = tile;

        this.setState({
            cells: cells,
            board: this.board(cells)
        });
    }
    removeTile(tile){
        var cells = [];
        var grid = this.state.cells;

        for (var x = 0; x < this.props.size; x++){
            var row = [];
            for (var y = 0; y < this.props.size; y++){ 
                row.push(this.newTile(grid[x][y].x, grid[x][y].y, false, grid[x][y].num, grid[x][y].mergedFrom));
            }
            cells.push(row);
        }

        cells[tile.x][tile.y].num = null;
        cells[tile.x][tile.y].mergedFrom = null;

        this.setState({
            cells: cells,
            board: this.board(cells)
        });
    }

    eachCell(callback){
        for(var x = 0; x < this.props.size; x++){
            for(var y = 0; y < this.props.size; y++){
                callback(x, y, this.state.cells[x][y]);
            }
        }
    }
    availableCells(){
        var cells = [];

        this.eachCell(function (x, y, tile){
            if (tile.num === null){
                cells.push({x: x, y: y});
            }
        });

        return cells;
    }
    addRandomTile() {
        var availableCells = this.availableCells();

            if (availableCells.length > 0){
                var randomCell = Math.floor(Math.random() * availableCells.length);
                var randomTile = availableCells[randomCell];
                var newRandomTile = this.newTile(randomTile.x, randomTile.y, true, null, null, null, null);

                this.insertTile(newRandomTile, randomTile);
            }
    }
    positionsEqual(cell1, cell2) {
        return cell1.x === cell2.x && cell1.y === cell2.y;
    }
    tileMatchesAvailable() {
        var cells = [];
        var grid = this.state.cells;

        for (var x = 0; x < this.props.size; x++){
            var row = [];
            for (var y = 0; y < this.props.size; y++){ 
                row.push(this.newTile(grid[x][y].x, grid[x][y].y, false, grid[x][y].num, grid[x][y].mergedFrom));
            }
            cells.push(row);
        } 

        //Check if next tile is mergeable
        var tile;
        
        for (var a = 0; a < this.props.size; a++){
            for (var b = 0; b < this.props.size; b++){
                tile = this.cellContent({x: a, y: b});

                for (var direction = 0; direction < 3; direction++){
                    var vector = this.getVector(direction);
                    var cell = { x: a + vector.x, y: b + vector.y };

                    var otherTile = this.cellContent(cell);

                    if (otherTile && otherTile.num === tile.num) {
                        return true;
                    }
                }         
            }
        }    
    }
    movesAvailable() {
        var a = this.availableCells();
        
        if (!this.tileMatchesAvailable() && a.length === 0){
            return false;
        } else {
            return true;
        }
    }


    // Actuate Game
    actuate(type){
        // if game over
        if (GameManager.winGame === true){
            //show win screen 
            GameManager.showWinScreen = true;
            GameManager.winCount += 1;
        } else {
            GameManager.showWinScreen = false;
        }

        // if lose game
        if (GameManager.gameOver === true){
            //show lose screen
            GameManager.showLoseScreen = true;
        } else {
            GameManager.showLoseScreen = false;
        }

        // New Game
        if (type === 'new game' && GameManager.startNewGame === true){
            this.getBoard(null);

            this.stopTime();

            this.setState({
                hr: 0,
                min: 0,
                sec: 0,
                ms: 0,
                timeBegan: new Date(),
                moveCounter: 0,
                counter: 0
            });
            
            this.startTime();
            GameManager.startNewGame = false;

            GameManager.gameOver = false;
            GameManager.winCount = 0;
            GameManager.showWinScreen = false;
            GameManager.showLoseScreen = false;
        }

        // Undo Move
        if (type === 'undo' && GameManager.undo === true && this.state.canUndo === true && GameManager.undoCount > 0) {
            GameManager.showLoseScreen = false;
            // Get previous board list, remove most recent, update grid to previous board
            if (this.state.previousBoards.length >= 2){
                var boards = [];

                for (var i = 0; i < this.state.previousBoards.length; i++){
                    boards.push(this.state.previousBoards[i]);
                }
                
                boards.pop();

                var board = boards[boards.length - 1];

                this.setState({
                    board: board,
                    previousBoards: boards,
                    cells: this.grid(board),
                    canUndo: false,
                    score: this.state.undoScore
                });
            }

            GameManager.undo = false;
            GameManager.undoCount = GameManager.undoCount - 1;
            
            GameManager.gameOver = false;
            GameManager.showWinScreen = false;
            GameManager.showLoseScreen = false;
        }

        if (GameManager.showMenu === true) {
            this.setState({
                menuVisible: true
            });
            //pause time
        } else {
            this.setState({
                menuVisible: false
            });
        }
    }
    newGame(){
        if (GameManager.startNewGame !== true){
            GameManager.startNewGame = true;
            GameManager.gameOver = false;
        }

        this.actuate('new game');
    }
    undoMove(){
        if (GameManager.undo  !== true){
            GameManager.undo = true;
            GameManager.gameOver = false;
        }

        this.actuate('undo');
    }
    openMenu(){
        if (GameManager.showMenu !== true) {
            GameManager.showMenu = true;
        } else {
            GameManager.showMenu = false;
        }
        
        this.actuate();
    }


    // Render Game
    render() {
        let style = {
            fontFamily: 'Karla',   
            height: '620px',
            width: '440px',
            borderRadius: '9px',
            backgroundColor: '#faf8ef'
        }

        return (
            <div className= 'game' style={style} onChange={this.handleInput}>
                <Swipe 
                    onSwipeLeft={() => {this.direction('left')}} 
                    onSwipeRight={() => {this.direction('right')}}
                    onSwipeUp={() => {this.direction('up')}} 
                    onSwipeDown={() => {this.direction('down')}}
                > 
                    { GameManager.showMenu ? <Menu openMenu={this.openMenu}/> : null }
                    { !GameManager.showWinScreen ? null : <EndGame type={'win'} board={this.state.board}/> }
                    { !GameManager.showLoseScreen ? null : <EndGame type={'lose'} board={this.state.board} newGame={this.newGame} undo={this.undoMove}/> }
                    <Info newGame={this.newGame} undo={this.undoMove} hours={this.state.hr} minutes={this.state.min} seconds={this.state.sec} milisec={this.state.ms} score={this.state.score} bestScore={this.state.bestScore} openMenu={this.openMenu}/>
                    <Board board={this.state.board} userID='user'/>
                    {/*<Powers />*/}
                </Swipe>
            </div>
        )
    }
}

export default Game; 