import React, { Component,  useEffect } from 'react';
import Info from './Info';
import Board from './Board';
import GameManager from '../GameManager';

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
            lastDirection: null,
            score: 0,
            bestScore: 0,
            undo: false,
            canUndo: false,
            undoScore: 0,
            
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
        this.handleClick = this.handleClick.bind(this);
        this.undoMove = this.undoMove.bind(this);
        this.newGame = this.newGame.bind(this);
        this.actuate = this.actuate.bind(this);
    }
    componentDidMount() {
        document.addEventListener('keydown', this.handleInput);
        
        this.initGame();
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleInput);
    }
    initGame() {
        this.getBoard(null);
        this.startTime();        
    }
    getBoard(data) {
        var board = [];
        var cells = [];

        //If no previous game is found, create new board
        if ((!this.state.board.pop(-1) && this.state.board.length < (this.props.size * this.props.size) ) || GameManager.startNewGame === true) {
            var tileType;
            var startTile1 = Math.floor(Math.random() * 16 + 1);
            var startTile2 = Math.floor(Math.random() * 16 + 1);

            //Select two beginning tile locations at random
            while (startTile1 === startTile2) {
                startTile2 = Math.floor(Math.random() * 16 + 1);
            }
            //Create new board
            var counter = 0;
            for (var x = 0; x < this.props.size; x++){
                var row = [];
                for (var y = 0; y < this.props.size; y++){
                    //Add random tiles
                    counter++;
                    if (counter === startTile1 || counter === startTile2) {
                        tileType = true;
                    } else {
                        tileType = false;
                    }   

                    //Add tile to board
                    board.push(this.newTile(x, y, tileType));
                    row.push(this.newTile(x, y, tileType));
                }
                cells.push(row);
            }

            var prevBoards = [];
            prevBoards.push(board);

            this.setState({
                board: board,
                cells: cells,
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
    /*prevBoards(board) {
        var prevBoards = [];
        
        if (this.state.previousBoards.length > 0) {
            for (var a = 0; a < this.state.previousBoards.length; a++){
                prevBoards.push(this.state.previousBoards[a]);  
            }
        }

        //is grid is different than before add
        if (prevBoards[prevBoards.length] !== board) {
            prevBoards.push(board);
        }

        console.log('prev boards', prevBoards);

        this.setState({
            previousBoards: prevBoards
        });
    }*/
    startTime(type){
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
    actuate(){
        if (GameManager.startNewGame === true){
            this.getBoard(null);

            this.stopTime();

            this.setState({
                hr: 0,
                min: 0,
                sec: 0,
                ms: 0,
                timeBegan: new Date()
            });
            
            this.startTime();
            GameManager.startNewGame = false;
        }

        if (GameManager.undo === true && this.state.canUndo === true) {
            // Get previous board list, remove most recent, update grid to previous board
            if (this.state.previousBoards.length >= 2){
                var boards = [];

                for (var i = 0; i < this.state.previousBoards.length; i++){
                    boards.push(this.state.previousBoards[i]);
                }

                boards.pop();

                //var board = boards[boards.length-1];
                var board = this.state.previousBoard;

                this.setState({
                    board: board,
                    previousBoards: boards,
                    cells: this.grid(board),
                    canUndo: false,
                    score: this.state.undoScore
                });
            }

            GameManager.undo = false;
        }
    }
    newGame(){
        console.log('New Game!!!');

        if (GameManager.startNewGame !== true){
            GameManager.startNewGame = true;
        }
        
        this.actuate();
    }
    undoMove(){
        console.log("UNDO!!");

        if (GameManager.undo  !== true){
            GameManager.undo = true;
        }

        this.actuate();
    }
    handleClick(event){
        event.preventDefault();
        if (event){
            //console.log('e', event);
        }
    }
    handleInput(event) {
        this.setState({
            lastDirection: this.state.direction
        });

        if (event.keyCode === 13) {
          console.log('enter pressed');
        }

        if (event.keyCode === 38) {
            // up arrow
            console.log("up arrow pressed");
            this.setState({
                direction: 0
            });
            this.move(this.state.direction);
        }
        else if (event.keyCode === 40) {
            // down arrow
            console.log("down");
            this.setState({
                direction: 2
            });
            this.move(this.state.direction);
        }
        else if (event.keyCode === 37) {
            // left arrow
            console.log("left");
            this.setState({
                direction: 3
            });
            this.move(this.state.direction);
        }
        else if (event.keyCode === 39) {
            // right arrow
            console.log("right");
            this.setState({
                direction: 1
            });
            this.move(this.state.direction);
        }
    }
    newTile (x, y, type, num, mergedFrom, previousPosition) {
        var randomNum = Math.floor(Math.random() * 100 + 1);  
        var tile = {
            x: x,
            y: y,
            type: !type ? false : type,
            num: !num ? null : num,
            mergedFrom: !mergedFrom ? null : mergedFrom,
            previousPosition: !previousPosition ? null : previousPosition
        };
    
        if (tile.type === true){
            if (randomNum < 11){
                tile.num = 4;
            } else {
                tile.num = 2;
            }
        } 

        tile.type = false;

        return tile;
    }
    prepareTiles(){
        var data = this.state.cells;
        var board = [];
        var cells = []

        for (var x = 0; x < this.props.size; x++){
            var row = [];
            for (var y = 0; y < this.props.size; y++){ 
                //Add tile to board
                board.push(this.newTile(data[x][y].x, data[x][y].y, false, data[x][y].num, null, { x: data[x][y].x, y: data[x][y].y }));
                row.push(this.newTile(data[x][y].x, data[x][y].y, false, data[x][y].num, null, { x: data[x][y].x, y: data[x][y].y }));
            }
            cells.push(row);
        }
        
        this.setState({
            board: board,
            cells: cells,
            
            //for undo
            previousBoard: board, 
            canUndo: true
        });            
    }
    move () {
        //Move start
        var moved;

        this.setState({
            vector: this.getVector(this.state.direction)
        });

        var traversals = this.traversals(this.state.vector); 
        this.setState({
            traversals: traversals,
            undoScore: this.state.score
        });

         //traverse grid
        var cell;
        var tile;
   
        this.prepareTiles();

        //console.log('Traversing grid');
        traversals.x.forEach((x) => {
            traversals.y.forEach((y) => {
                var next;

                cell = { x: x, y: y };
                tile = this.cellContent(cell);

                if (tile){
                    var positions = this.findFarthestPosition(cell, this.state.vector);
                    next = this.cellContent(positions.next);
                    
                    //merge with next tile
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
                    } else {
                        if (this.cellAvailable(positions.farthest)){
                            this.moveTile(tile, positions.farthest); 
                        }   
                        
                        this.setState({
                            cells:this.grid(this.state.board)
                        })
                    } 
                } 
                
                if (!this.positionsEqual(cell, positions.farthest)) {
                    moved = true;
                    //console.log (cell, positions.farthest, moved);
                }
            });
        });
        
        console.log(moved);
        if (moved) {
            //add randomm tile if possible
            this.addRandomTile();

            //Update high score
            if (this.state.bestScore < this.state.score) {
                this.setState({
                    bestScore: this.state.score
                });
            }

            var prevBoards = [];
            for (var m = 0; m < this.state.previousBoards.length; m++) {
                prevBoards.push(this.state.previousBoards[m]);
            }
            prevBoards.push(this.state.board);
            this.setState({
                previousBoards: prevBoards
            });
        }

        this.setState({
            canUndo: true,
            moveCounter: !this.state.counter ? 1 : this.state.counter + 1
        })
        /*console.log('++++++++++++ move ', this.state.moveCounter,' +++++++++++++')
        console.log('moves available', this.movesAvailable());
        console.log('board after move', this.state.board);
        console.log('prev boards', this.state.previousBoards);*/ 
    }
    getVector(direction) {
        var map = {
            0: { x: -1, y: 0 }, // Up
            1: { x: 0,  y: 1 },  // Right
            2: { x: 1,  y: 0 },  // Down
            3: { x: 0,  y: -1 }   // Left
        };

        return map[direction];
    }
    findFarthestPosition(cell, vector) {
        var previous;        

        do {
            previous = cell;
            cell = {x: previous.x + vector.x, y: previous.y + vector.y };
        } while (
            //check to see if tile location exists in bounds and unoccupied
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
    cellOccupied(cell) { 
        return !!this.cellContent(cell);
    }
      
    cellContent(coordinate) {
        if (this.withinBounds(coordinate)) {
          return this.state.cells[coordinate.x][coordinate.y];
        } else {
          return null;
        }
    }
    traversals (vector) {
        //create object for each tile
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
        //get board array from current grid
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
            //create grid from board
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
            //create grid from grid
            for (var x = 0; x < this.props.size; x++){
                var row = [];
                for (var y = 0; y < this.props.size; y++){ 
                    row.push(this.newTile(board[x][y].x, board[x][y].y, false, board[x][y].num));
                }
                cells.push(row);
            }
        } else {
            //create grid from state
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
        //Remove previous tile
        this.removeTile(tile);
        //Add new tile
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
                cells.push({x: x, y: y });
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

        var tile;

        for (var a = 0; a < this.props.size; a++){
            for (var b = 0; b < this.props.size; b++){
                tile = this.cellContent({x: a, y: b});

                for (var direction = 0; direction < 4; direction++){
                    var vector = this.getVector(direction);
                    var cell = { x: a + vector.x, y: b + vector.y };

                    var otherTile = this.cellContent(cell);

                    if (otherTile && otherTile.num === tile.num) {
                        return true
                    }
                }         
            }
        }    
    }
    movesAvailable() {
        return (!!this.tileMatchesAvailable() && !!this.availableCells())
    }

    render() {
        let style = {
            fontFamily: 'Karla',   
            height: '620px',
            width: '440px',
            borderRadius: '9px',
            padding: '12px',
            backgroundColor: '#faf8ef'
        }

        return (
            <div className= 'game' style={style} onChange={this.handleInput}>
                <Info newGame={this.newGame} undo={this.undoMove} hours={this.state.hr} minutes={this.state.min} seconds={this.state.sec} milisec={this.state.ms} score={this.state.score} bestScore={this.state.bestScore} />
                <Board board={this.state.board} userID='user'/>
            </div>
        );
    }   
}

export default Game; 