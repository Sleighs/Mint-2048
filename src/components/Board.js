import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
            color: this.getColor()
        }   
    }

    getColor(ele){
        var backgroundColor = '#cdc1b4';
        var textColor = 'white';

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
        }

        if (ele === 'background') {
            return backgroundColor;
        } else if (ele === 'text'){
            return textColor;
        }
    }

    render (){
        let tileStyle = {
            height: '87px',
            width: '87px',
            borderRadius: 9,
            margin: '7px',
            display: 'inline-block',
            userSelect: 'none',
            backgroundColor: this.getColor('background'),
            color: this.getColor('text')
        }

        return (
        <div className='tile' style={tileStyle}>
            <Number number={this.props.number !== null ? this.props.number : null} color={this.state.color}/>
        </div>
        )
    } 
}

class Number extends Component {
    render (){
        let numStyle = {
            fontFamily: 'arial',
            fontSize: '3em',
            fontWeight: 'bold',
            textShadow: this.props.number !== null ? '.6px .5px .5px #bbada0' : '0px 0px 0px #cdc1b4',
            width: '80px',
            height: '40px',
            margin: 'auto',
            textAlign: 'center',
            marginTop: '10px'
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