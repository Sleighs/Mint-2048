import React, { Component } from 'react';
import GameManager from '../GameManager';
import { useMediaQuery } from 'react-responsive';

class Powers extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.getMediaQuery = this.getMediaQuery.bind(this)
    }

    getMediaQuery(){
        return useMediaQuery({ query: `(max-width: 760px)` })
    }

    getAbilityColor(type) {
        var color;

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
        }

        return color;
    }

    render(){
        let powersWrapperStyle = {
            display: 'block',
            width: this.getMediaQuery ? '100%' : 386,
            //maxWidth: this.getMediaQuery ? '85vw' : '100%',
            height: 12,
            margin: '0 auto',
        }
        let powersContainerStyle = {
            width: this.getMediaQuery ? '95%' : 390,
            //height: 20,
            margin: 'auto',
            //background: '#bbada0',
            padding: 0,
        }
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
                        /*this.props.powers.map((ele, i) => (
                            <PowerItem type={ele.type} id={ele.id} index={i} useAbility={this.props.useAbility} color={this.getAbilityColor(ele.type)} ele={ele} key={i}/>
                        ))*/
                    }

                    <PowerItem type={'multiply'} index={0}  key={0} count={GameManager.powers[0].count} useAbility={this.props.useAbility}/>
                    <PowerItem type={'divide'} index={1} key={1} count={GameManager.powers[1].count} useAbility={this.props.useAbility}/>
                    <PowerItem type={'four tile'} index={2} key={2} count={GameManager.powers[2].count} useAbility={this.props.useAbility}/>
                    <PowerItem type={'two tile'} index={3} key={3} count={GameManager.powers[3].count} useAbility={this.props.useAbility}/>
                    
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

    showStats(key){
        console.log('stats', key);
        
    }

    tooltip(state, type){
        if (state === false){
            GameManager.tooltip = '';
            GameManager.tooltip2 = '';
        } else 
        if (state === true) {
            switch(type){
                case 'divide':
                    GameManager.tooltip = 'Divide';
                    GameManager.tooltip2 = 'Split a tile\'s value in half';
                    break;
                case 'freeze':
                    GameManager.tooltip = 'Freeze';
                    GameManager.tooltip2 ='Prevent a tile from merging';
                    break;
                case 'multiply':
                    GameManager.tooltip = 'Multiply';
                    GameManager.tooltip2 = 'Double a tile\'s value';
                    break;
                case 'four tile':
                    GameManager.tooltip = '4 Tile';
                    GameManager.tooltip2 = 'Create new 4 tile';
                    break;
                case 'two tile':
                    GameManager.tooltip = '2 Tile';
                    GameManager.tooltip2 = 'Create new 2 tile';
                    break;
                case 'grow':
                    GameManager.tooltip = 'Growth';
                    GameManager.tooltip2 = 'Set a tile to grow';
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

    getBackgroundColor(){
        var color = '#F4FEF9';

        switch(this.props.type){
            case 'multiply':
                color = '#6ED475';
                break;
            case 'divide':
                color = '#E26369';
                break;
            case 'four tile':
                color = GameManager.powers[2].color;//'#58AD9C';
                break;
            case 'two tile':
                color = GameManager.powers[3].color;//'#92DAB4';
                break;
        }

        return color;
    }

    getBoxShadow(){
        var prop = '';

        if (this.props.count > 0){  
            prop = '2px 2px 2px 2px yellow'
        }
        return prop;
    }
    getOpacity(){
        var level = .1;

        if (this.props.count > 0 ){
            level = 1;
        }
        return level;
    }
    getBorder(){
        var prop = '';
        if (this.props.count > 0){
            prop = 'solid 2pt yellow'
        }
        return prop;
    }
    
    render() {
        let powerStyle = {
            display: 'inline-block',
            color: '#cdc1b4',
            borderRadius: 2,
            background: this.getBackgroundColor(),
            width: '25%',
            height: 10,
            textAlign: 'center',
            margin: '0 auto',
            opacity: this.getOpacity(),
            //boxShadow: this.getBoxShadow(),
            //border: this.getBorder()
        }

        let numStyle = {
            display: 'none',
            borderRadius: '50%',
            height: 15,
            width: 15,
            margin: 'auto',
            border: 'solid 1pt blue',
            fontSize: '.5em'
        }


        return (
            <div className={'power ' + String(this.props.type)} style={powerStyle} 
                onClick={()=>{/*this.props.useAbility(this.props.type, this.props.id)*/}} 
                onMouseEnter={()=>{this.tooltip(true, this.props.type)}} 
                onMouseLeave={()=>{this.tooltip(false, this.props.type)}}
            >
                <div style={numStyle}>{this.props.count}</div>
            </div>
        )
    }
}


export default Powers;