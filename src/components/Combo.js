import React, { Component } from 'react';
import GameManager from '../GameManager';
import Details from './Details';

class Combo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blocks: []
        }
    }
    getComboScore(length){
        /*
        Every tile type merged is recorded and used for current combo

        the total numbers in the combo are merged 

        
       if (length <= 4){
           return 2;

       } else if (length <= 8 ){
            return 4;
       } else if (length <= 16) {
           return 8;
       }*/
    }

    render (){
        let comboContainerStyle = {
            height: 28,
            width: 410,
            margin: '5px auto'            
        }
        let blocksContainerStyle = {
            width: 380,
            height: 32,
            margin: 'auto',
            display: 'inline-block'
        }
        let textStyle = {
            width: 30,
            height: 20,
            padding: '0px 0px',
            fontSize: '1.7em',
            fontWeight: 'bold',
            display: 'inline-block',
            float: 'right',
            marginTop: '-9px',
            color: '#E4DCDE' //dark text '#775e65'
        }


        return (
            <div className='combo-container' style={comboContainerStyle}>
                <div className='blocks' style={blocksContainerStyle}>
                    {
                        GameManager.comboBlocks.map((ele, i)=> {
                            if (i < 5) {
                                var color;

                                if (GameManager.comboBlocks.length > 4){
                                    color = 'yellow';

                                    if ((GameManager.comboBlocks.length + 1) % 5 === 0) {
                                        color = '#FC7F7F'
                                    } else if ((GameManager.comboBlocks.length + 2) % 5 === 0){
                                        color = 'orange'
                                    } else {
                                        color = 'yellow'
                                    }
                                } else {
                                    color = '#cab212';
                                }
                                
                                return <Block key={i} color={color}/>;
                            }
                            
                        } )
                    }
                </div>
                <div style={textStyle}>
                    {this.props.comboLength}                    
                </div>
                
            </div>
        )
    }
}

class Block extends Component {
    constructor(props) {
        super(props);
    }
    render (){
        let style = {
            height: 10,
            width: 55,
            margin: '0px 3px',
            display: 'inline-block',
            background: this.props.color,
            borderRadius: 4
        }

        return (
            <div className={'combo-block'} style={style}></div>
        )
    }
}

export default Combo;