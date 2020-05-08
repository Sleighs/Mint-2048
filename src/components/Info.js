import React, { Component } from 'react';
import PropTypes from 'prop-types';

//render game info
class Info extends Component {
    render (){
        let infoStyle = {
            height: 112,
            width: 412,
            padding: 5,
            margin: 'auto',
            display: 'block',
            fontSize: '2em',
            userSelect: 'none',
            fontFamily: 'Kanit'
            //border: '1pt solid red'
        }
        let gameTitleStyle = {
            fontFamily: 'arial', //'Bitter',
            display: 'block',
            float: 'left',
            fontWeight: 'bold',
            textShadow: '1px 1px 1px #bbada0',
            width: 120,
            height: 70,
            padding: '-10px 0 0 0',
            fontSize: '1.75em',
            //border: '1pt solid gold',
            color: '#775e65'
        }
        var infoContainerStyle = {
            display: 'block',
            //border: '1pt solid',
            height: 70,
            width: 405

        }

        return (
        <div className='info' style={infoStyle}>
            <Time minutes={this.props.minutes} seconds={this.props.seconds} milisec={this.props.milisec}/>
            <div className="info-container" style={infoContainerStyle}>
                <div className='game-title' style={gameTitleStyle}>
                    {"2049"}
                </div>
                <Score score={this.props.score} bestScore={this.props.bestScore}/>
            </div>
            
        </div>
        )
    } 
}

class Time extends Component {
    render (){
        let timeStyle = {
            display: 'block',
            fontFamily: 'arial',
            //border: '1pt solid blue',
            height: 35,
            width: 403,
            margin: '-19px 0 0 0',
            fontSize: '.7em',
            textShadow: '.3px .3px .3px silver',
            color: '#777e65'
        }
        let digitStyle = {
            //border: 'solid 1pt gold',
            textAlign: 'center',
            width: '100%',
            margin: 'auto'
        }

        return (
            <div className='time' style={timeStyle}>
                <div className='time-digits' style={digitStyle}>
                    {this.props.hours !== 0 ? this.props.hours : ' '}
                    {this.props.minutes < 10 ? "0" + this.props.minutes : this.props.minutes}
                    {this.props.seconds < 10 ? ":0" + this.props.seconds : ":" + this.props.seconds}
                    {/*this.props.milisec < 100 ? ".0" + (this.props.milisec < 10 ? "0" + this.props.milisec : this.props.milisec) : "." + this.props.milisec*/}
                </div>
            </div>
        )
    } 
}

class Score extends Component {
    render (){
        let scoreBoxStyle = {
            display: 'inline-block',
            textAlign: 'center',
            textShadow: '.1px .1px .1px #776e65',
            float: 'right',
            minWidth: 210,
            height: 75,
            padding: '5px 0',
            margin: 'auto',
            color: 'white',
            fontFamily: 'arial'
        }
        let scoreStyle = {
            fontSize: '.7em',
            height: 25
        }
        let titleStyle = {
            fontSize: '.5em',
            height: 22
        }
        let scoreContainerStyle = {
            display: 'inline-block',
            borderRadius: 4,
            padding: '4px 15px',
            height: 55,
            minWidth: 85,
            backgroundColor: '#bbada0',
            color: '#f5f6f5',
            margin: 'auto'
        }
        let bestScoreContainerStyle = {
            display: 'inline-block',
            borderRadius: 4,
            padding: '4px 15px',
            height: 55,
            minWidth: 85,
            backgroundColor: '#bbada0',
            color: '#f5f6f5',
            float: 'right'            
        }
        
        return (
            <div className='score' style={scoreBoxStyle}>
                <div className="score-container" style={scoreContainerStyle}>
                    <div className='score' style={scoreStyle}>
                        {this.props.score}      
                    </div>
                    <div className='score-title' style={titleStyle}>
                        {"Score"}
                    </div>
                </div>

                <div className="best-container" style={bestScoreContainerStyle}>
                    <div className='best-score' style={scoreStyle}>
                        {this.props.bestScore}      
                    </div>
                    <div className='best-title' style={titleStyle}>
                        {"Best"}
                    </div>
                </div>  
            </div>
        )
    } 
}

Info.propTypes = {
    score: PropTypes.number.isRequired
}

export default Info; 