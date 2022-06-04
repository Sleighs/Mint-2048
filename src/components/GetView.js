import React, { Component, useLayoutEffect, useState, useEffect } from 'react';
import Game from './Game';
import GameManager from '../GameManager';
import { useMediaQuery } from 'react-responsive';

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

/*
class GetView extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
        //this.viewRef = React.createRef()
        this.getMediaQuery = this.getMediaQuery.bind(this)
    }

    getMediaQuery(){
        return useMediaQuery({ query: `(max-width: 760px)` })
    }

    componentDidMount(){
       console.log('window dimension', useWindowDimensions())
    }

    render() {
        let viewStyle = {
            height: 705,
            //width: this.getMediaQuery ? '95vw': null,
            margin: this.getMediaQuery ? 0 : 0,
        }
        let footerStyle = {
            textAlign: 'center',
            width: this.getMediaQuery ? '85vw' : 400,
            marginTop: this.getMediaQuery ? 25 : 20,
            margin: '5% auto',
            color: '#C6BABD',
        }

        return (
            <div className="view" 
                style={viewStyle} 
                ref={ref => !this.state.viewRef && this.setState({ viewRef: ref })}
            >
                <Game size={GameManager.size} viewRef={this.state.viewRef}/> 
            
                <div style={footerStyle}>
                    <p style={{fontSize: '.75em'}}>                       
                        <span>By Samuel Wright</span>
                        &nbsp; &nbsp; &nbsp;
                        <a href='https://github.com/Sleighs/Mint-2048' style={{color: '#C6BABD'}}>GitHub</a>
                    </p>
                </div>
                
            </div>
                      
        );
    }   
}
*/

const GetView = (props) => {
    const [windowWidth, windowHeight] = useWindowSize();

    useEffect(() => {
        GameManager.windowWidth = windowWidth;
        GameManager.windowHeight = windowHeight;
    })

    let viewStyle = {
        height: 705,
        width: '95vw',
        margin: 0,
    }
    let footerStyle = {
        textAlign: 'center',
        width: '85vw',
        margin: '5% auto',

        marginTop: 25,
        color: '#C6BABD',
    }

    return (
        <div className="view" style={viewStyle}>
            <Game 
                size={GameManager.size} 
                windowHeight={windowHeight}
                windowWidth={windowWidth}
            /> 
            
            <div style={footerStyle}>
                <p style={{fontSize: '.75em'}}>                       
                    <span>By Samuel Wright</span>
                    &nbsp; &nbsp; &nbsp;
                    <a href='https://github.com/Sleighs/Mint-2048' style={{color: '#C6BABD'}}>GitHub</a>
                </p>
            </div>      
        </div>         
    );
}

export default GetView; 