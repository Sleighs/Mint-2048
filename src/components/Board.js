import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GameManager from '../GameManager';

//render board
class Board extends Component {
    render() {
        let boardStyle = {
            width: 410,
            height: 410,
            margin: 'auto',
            padding: '2px',
            borderRadius: 4,
            backgroundColor: '#bbada0'
        };

        return (
            <div className='board' style={boardStyle}>
                {                    
                    this.props.board.map((tile, i)=>{
                        return <Tile number={!tile.num ? null : tile.num } key={i}/>
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
                backgroundColor = '#eee4da';//#ECEEEB';//'#E6EEDA';//'#EAEEDA';//'#EAF4F2';//'#EFF9F5';//'#DAEEE5';
                textColor = '#775e65';//'#646D64';//'#657468';//'#556C59';//'#5E7762';//'#626077';//#775E65 ';
                break;
            case 4:
                backgroundColor = '#FC7F7F';//'#F97676';//'#C9EABC';//'#CEEABC';//'#BEEEB8';//'#D3EDAC';//'#C2E58C';//'#CFF0C9';
                textColor = '#F4FEF9';//'#556C59';//'#5E7762';//'#1C3B47 ';
                break;
            case 8:
                backgroundColor = '#8DCB9F';
                textColor = '#F4FEF9';
                break;
            case 16:
                backgroundColor = '#2EA075';//'#258F67';//'#68AD81';//'#65AB79';
                textColor = '#F4FEF9';
                break;
            case 32:
                backgroundColor = '#43B19B'; //'#5CB2A6';//'#66CCB9';// '#67C8B6';//'#69B7C1';//'#066298';//'#72C6CE ';
                textColor = '#F4FEF9';
                break;
            case 64:
                backgroundColor = '#248E78';//'#58AD9C';//'#43A4B1';//'#579CA5';
                textColor = '#F4FEF9';
                break;
            case 128:
            case 256:
            case 512:
            case 1024:
                //backgroundColor = '#FC7F7F'; 
                backgroundColor = '#98E7BD';
                textColor = '#F4FEF9';
                break;
            case 2048:
            case 4096:
                backgroundColor = '#98E7BD'; 
                textColor = '#F4FEF9';
                break;
            case 8192:
                backgroundColor = '#385B78';
                break;
            case 16384:
                backgroundColor = 'gold'
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

    render (){
        let tileStyle = {
            height: ((408 / GameManager.size) * .85),
            width: ((408 / GameManager.size) * .85),
            borderRadius: 9,
            margin: this.getTileMargin(GameManager.size),
            display: 'inline-block',
            userSelect: 'none',
            backgroundColor: this.getColor('background'),
            color: this.getColor('text')
        }

        return (
            <div className={'tile'} style={tileStyle}>
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
                fontSize = '3em';
                
                if (number > 100 && number < 1000) {
                    fontSize = '2.4em';
                } else if (number > 1000 && number < 10000) {
                    fontSize = '2.2em';
                } else if (number > 10000 && number < 100000) {
                    fontSize = '1.66em';
                } else if (number > 100000 && number < 1000000) {
                    fontSize = '1.25em';
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
                margin = '21.1%';
                break;
            case 1024:
            case 2048:
            case 4096:
            case 8192:
                margin = '20%';
            case 16384:
            case 32768:
            case 65536:
                margin = '20%';
            case 131072:
                margin = '24%';
        }
        return margin;
    }

    render (){
        let numStyle = {
            fontFamily: 'arial',
            fontSize: this.getFontSize(GameManager.size, this.props.number),
            fontWeight: 'bold',
            textShadow: this.props.number !== null ? '.5px .5px .5px #bbada0' : '0px 0px 0px #cdc1b4',
            width: '90%',
            height: '50%',
            margin: 'auto',
            textAlign: 'center',
            marginTop: this.getMargin(this.props.number),// this.props.number < 100 ? '11%' : '22%'
            marginBottom: 0
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