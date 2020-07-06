import React, { Component } from 'react';
import GameManager from '../GameManager';

class Powers extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    getAbilityColor(type){
        var color;

<<<<<<< HEAD
        switch(type){
            case 'divide':
                color = '#E26369';
                break;
            case 'freeze':
                color = '#7AB5D5';
                break;
            case 'multiply':
                color = '#6ED475';
                break;
            case 'four tile':
            case 'two tile':
                color = '#e6eaf0';
                break;
            case 'grow':
                color = '#d7e376';
                break;
            default:
                color = '#bbada0';
=======
>>>>>>> parent of 0097cc6... Added undo mode
=======
>>>>>>> parent of 0097cc6... Added undo mode
=======
>>>>>>> parent of 0097cc6... Added undo mode
=======
>>>>>>> parent of 0097cc6... Added undo mode
        }
    }
    componentDidMount(){

    }

    render(){
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        let powersWrapperStyle = {
            display: 'none',
            width: 410,
            height: 90,
            margin: 'auto',
            borderRadius: 6
        }
=======
>>>>>>> parent of 0097cc6... Added undo mode
=======
>>>>>>> parent of 0097cc6... Added undo mode
=======
>>>>>>> parent of 0097cc6... Added undo mode
=======
>>>>>>> parent of 0097cc6... Added undo mode
        let powersContainerStyle = {
            width: 410,
            height: 50,
            margin: 'auto',
            borderRadius: 5,
            background: '#bbada0',
            padding: '7px 5px'
        }
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        let powersTooltip = {
            margin: 'auto',
            borderRadius: 5,
            background: '#000000',
            color: '#eb00aa',
            padding: '0px 5px'
        }

        return(
            <div className='powers-wrapper' style={powersWrapperStyle}>
                <div className='powers-container' style={powersContainerStyle}>
                    {
                        this.props.powers.map((ele, i) => (
                            <PowerItem type={ele.type} id={ele.id} index={i} useAbility={this.props.useAbility} color={this.getAbilityColor(ele.type)} ele={ele} key={i}/>
                        ))
                    }
                </div>
                <div className="powers-tooltip" style={powersTooltip} >
                    {this.state.powersTooltipMsg}
                </div>
            </div>
        )
    }
}

class PowerItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            powersTooltipMsg: ''
        }
    }

    tooltip(state, type){
        if (state === false){
            //console.log('goodbye', type);
            GameManager.tooltip = '';
        } else 
        if (state === true) {
            //console.log('hello', type);

            switch(type){
                case 'divide':
                    GameManager.tooltip = 'Divide';
                    console.log('Use BOMB to split a tile\'s value in half');
                    break;
                case 'freeze':
                    GameManager.tooltip = 'Freeze';
                    console.log('Use FREEZE to prevent a tile from merging');
                    break;
                case 'multiply':
                    GameManager.tooltip = 'Multiply';
                    console.log('Use MUTATE to double a tile\'s value');
                    break;
                case 'four tile':
                    GameManager.tooltip = '4 Tile';
                    console.log('Use NEW TILE to create a new 4 tile');
                    break;
                case 'two tile':
                    GameManager.tooltip = '2 Tile';
                    console.log('Use NEW TILE to create a new 4 tile');
                    break;
                case 'grow':
                    GameManager.tooltip = 'Add growthto  a tile';
                    console.log('Use GROW to set a tile to grow');
                    break;
            }
        }
        
        
    }
    getShadow() {
        var shadow = '';
        if (GameManager.choosePowers === true){
            if (GameManager.currentPower === (this.props.index + 1)){
                shadow = '1px 1px 3px 8px rgba(238,245,37,0.4)';
            }
        }
        
        return shadow;
    }
    
    render() {
=======
>>>>>>> parent of 0097cc6... Added undo mode
=======
>>>>>>> parent of 0097cc6... Added undo mode
=======
>>>>>>> parent of 0097cc6... Added undo mode
=======
>>>>>>> parent of 0097cc6... Added undo mode
        let powerStyle = {
            display: 'inline-block',
            color: '#F4FEF9',
            borderRadius: 4,
            background: '#cdc1b4',
            width: 123,
            height: 36,
            textAlign: 'center',
            margin: '0 5px'
        }
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD


        return (
            <div className={'power', this.props.type} style={powerStyle} 
                onClick={()=>{this.props.useAbility(this.props.type, this.props.id)}} 
                onMouseEnter={()=>{this.tooltip(true, this.props.type)}} 
                onMouseLeave={()=>{this.tooltip(false, this.props.type)}}
            >
=======
=======
>>>>>>> parent of 0097cc6... Added undo mode
=======
>>>>>>> parent of 0097cc6... Added undo mode
=======
>>>>>>> parent of 0097cc6... Added undo mode
        
        return(
            <div className={'powers'} style={powersContainerStyle}>
                <div className={'power1'} style={powerStyle}>{''}</div>
                <div className={'power2'} style={powerStyle}>{''}</div>
                <div className={'power3'} style={powerStyle}>{''}</div>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> parent of 0097cc6... Added undo mode
=======
>>>>>>> parent of 0097cc6... Added undo mode
=======
>>>>>>> parent of 0097cc6... Added undo mode
=======
>>>>>>> parent of 0097cc6... Added undo mode
            </div>
        )
    }
}


export default Powers;