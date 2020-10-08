import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GameManager from '../GameManager';

//render board
class Board extends Component {
    render() {
        let boardStyle = {
            width: 386,
            height: 386,
            margin: '10px auto',
            padding: '2px',
            borderRadius: 5,
            backgroundColor: '#bbada0',
            //boxShadow: !GameManager.navPowerTiles ? '' : '1px 1px 5px 11px rgb(255,225,100,.5)'
        };

        return (
            <div className='board' style={boardStyle}>
                {                    
                    this.props.board.map((tile, i)=>{
                        return <Tile number={!tile.num ? null : tile.num } key={i} board={this.props.board} x={this.props.board[i].x} y={this.props.board[i].y} useAbility={this.props.useAbility} changeTile={this.props.changeTile}/>
                    })
                }
            </div>
        );
    }
}

class Tile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }   
    }

    getColor(ele){
        var backgroundColor = '#cdc1b4';
        var textColor = '#F4FEF9';

        //Mint Colors
        switch (this.props.number){
            case null:
                backgroundColor = '#cdc1b4';
                textColor = '#cdc1b4';
                break;
            case 2:
                backgroundColor = 'rgb(238,228,218, .9)';//'#eee4da';
                textColor = '#775e65';
                break;
            case 4:
                backgroundColor = 'rgb(252, 127, 127, .9)';//'#FC7F7F';
                textColor = '#F4FEF9';
                break;
            case 8:
                backgroundColor = 'rgb(141, 203, 149)'; //'#8DCB95';
                textColor = '#F4FEF9';
                break;
            case 16:
                backgroundColor = 'rgb(93, 180, 143)';//'#5DB48F';
                textColor = '#F4FEF9';
                break;
            case 32:
                backgroundColor = 'rgb(67, 177, 155)';//'#43B19B';
                textColor = '#F4FEF9';
                break;
            case 64:
                backgroundColor = 'rgb(36, 142, 120)';//'#248E78';
                textColor = '#F4FEF9';
                break;
            case 128:
                backgroundColor = 'rgb(102, 204, 185)';//'#66CCB9';
                textColor = '#F4FEF9';
                break;
            case 256:
            case 512:
            case 1024:
                backgroundColor = 'rgb(146, 218, 180)';//'#92DAB4';
                textColor = '#F4FEF9';
                break;
            case 2048:
            case 4096:
                backgroundColor = '#edcc61';
                textColor = '#F4FEF9';
                break;
            case 8192:
                backgroundColor = '#58AD9C';
                textColor = '#F4FEF9';
                break;
            case 16384:
                backgroundColor = '#58AD9C';
                textColor = '#F4FEF9';
                break;  
            default:
                backgroundColor = '#385B78';
                textColor = '#F4FEF9';
        }


    /*
        //Original 2048 colors
        switch (this.props.number){
            case null:
                backgroundColor = '#cdc1b4';
                textColor = '#cdc1b4';
                break;
            case 2:
                backgroundColor = '#eee4da';
                textColor = '#775e65';
                break;
            case 4:
                backgroundColor = '#ede0c8';
                textColor = '#775e65';
                break;
            case 8:
                backgroundColor = '#f2b179';
                textColor = 'white';
                break;
            case 16:
                backgroundColor = '#f59563';
                textColor = 'white';
                break;
            case 32:
                backgroundColor = '#f67c5f';
                textColor = 'white';
                break;
            case 64:
                backgroundColor = '#f65e3b';
                textColor = 'white';
                break;
            case 128:
                backgroundColor = '#edcf72';
                textColor = 'white';
                break;
            case 256:
            case 512:
            case 1028:
            case 2048:
                backgroundColor = '#edcc61';
                textColor = 'white';
                break;
            default:
                backgroundColor = 'darkgrey';
                textColor = '#cdc1b4';
        }*/

        if (ele === 'background') {
            return backgroundColor;
        } else if (ele === 'text'){
            return textColor;
        }
    }

    getTileMargin(size){
        var margin = '1px';

        switch(size){
            case 4:
                margin = '7px';
                break;
            case 5:
                margin = '5.8px';
                break;
            case 6:
                margin = '4.8px';
                break;
            case 7:
                margin = '2px';
                break;
        };

        return margin;
    }

    getPowerShadow(){
        //
        var powerColor = '';
        var tile = this.props.board[GameManager.currentPowerTile];

        if (GameManager.navPowerTiles === true){
            if (tile.x === this.props.x && tile.y === this.props.y){
                switch(GameManager.activePower.type) {
                    case 'multiply':
                        powerColor = '1px 1px 5px 11px ' + 'rgb(110, 212, 117, .5)';
                        break;
                    case 'divide':
                        powerColor = '1px 1px 5px 11px ' + 'rgb(226,99,105, .5)';
                        break;
                    case 'two tile':
                        powerColor = '1px 1px 5px 11px ' + 'rgb(146,218,180, .5)';
                        break;
                    case 'four tile':
                        powerColor = '1px 1px 5px 11px ' + 'rgb(230,234,240, .5)';
                        break;
                    case 'freeze':
                        powerColor = '1px 1px 5px 11px ' + 'rgb(146,218,180, .5)';
                        break;
                    default:
                        powerColor = ''

                }
            } 
        }
        return  powerColor;
    }

    render (){
        let tileStyle = {
            height: ((380 / GameManager.size) * .85),
            width: ((380 / GameManager.size) * .85),
            borderRadius: 7,
            margin: this.getTileMargin(GameManager.size),
            display: 'inline-block',
            userSelect: 'none',
            backgroundColor: this.getColor('background'),
            color: this.getColor('text'),
            boxShadow: !GameManager.navPowerTiles ? '' : this.getPowerShadow()
        }

        return (
            <div className={'tile'} style={tileStyle} onClick={()=>{
                if (GameManager.navPowerTiles){
                    //this.props.useAbility(GameManager.activePower.type, GameManager.activePower.count);
                    //this.props.changeTile(GameManager.activePower.type, GameManager.abilityTile.x, GameManager.abilityTile.y, GameManager.activePower.count)
                }
            }}>
                <Number number={this.props.number !== null ? this.props.number : null} color={this.state.color}/>
            </div>
        )
    }
}

class Number extends Component {
    constructor(props) {
        super(props); 
    }
    
    getFontSize(size, number){
        var fontSize = '1em';

        switch(size){
            case 1:
            case 2:
            case 3:
                fontSize = '3.5em';
                break;
            case 4:
                fontSize = '2.81em';
                
                if (number > 100 && number < 1000) {
                    fontSize = '2.15em';
                } else if (number > 1000 && number < 10000) {
                    fontSize = '1.85em';
                } else if (number > 10000 && number < 100000) {
                    fontSize = '1.05em';
                } else if (number > 100000 && number < 1000000) {
                    fontSize = '0.8em';
                }
                break;
            case 5:
                fontSize = '2em';
                break;
            case 6:
                fontSize = '1em';
                break;
        }

        return fontSize;
    }
    getMargin(num){
        var margin = '11%';
        switch(num){
            case 16:
            case 32:
            case 64:
                margin = '11%';
                break;
            case 128:
            case 256:
            case 512:
                margin = '23%';
                break;
            case 1024:
            case 2048:
            case 4096:
            case 8192:
                margin = '-16%';
                break;
            case 16384:
            case 32768:
            case 65536:
                margin = '4.5%';
                break;
            case 131072:
            case 262144:
                margin = '49%';
                break;
        }
        return margin;
    }
    getPadding(num){
        var padding = '';
        switch(num){
            case 1024:
            case 2048:
            case 4096:
            case 8192:
                padding = '45.5% 0px 0px 0px'
                break;
            case 16384:
            case 32768:
            case 65536:
                padding = '43% 0px 0px 0px';
                break;
            default:
                padding = '0 0 0 0';

        }

        return padding;
    }

    render (){
        let numStyle = {
            fontFamily: 'arial',
            fontSize: this.getFontSize(GameManager.size, this.props.number),
            fontWeight: 'bold',
            textShadow: this.props.number !== null ? '0px 0px 0px #bbada0' : '0px 0px 0px #cdc1b4',
            width: '90%',
            height: '90%',
            margin: 'auto',
            textAlign: 'center',
            marginTop: this.getMargin(this.props.number),
            padding: this.getPadding(this.props.number)

        }

        return (
            <div className='tile-num' style={numStyle}>
                {this.props.number !== null ? this.props.number : '0'}
            </div>
        )
    } 
}


Board.propTypes = {
    board: PropTypes.array.isRequired
}

export default Board; 