import React from 'react';
import Div100vh from 'react-div-100vh';
import classes from './Main.module.scss';
import TopBar from '../TopBar';
import BottomBar from '../BottomBar';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
    // useful for click/touch position detection
    this.canvasPositionLeft = 0;
    this.canvasPositionTop = 0;
  }

  componentDidMount() {
    this.refreshCanvasSize();
    window.addEventListener('resize', this.updateCanvasSize);
  }

  updateCanvasSize = () => {
    // because the height of outer wrapper is set on load and resize,
    // we have to delay detection of canvas size

    setTimeout(() => {
      const canvas = this.canvasRef.current;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width;
      canvas.height = rect.height;
      this.canvasPositionLeft = rect.left;
      this.canvasPositionTop = rect.top;
    }, 1);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateCanvasSize);
  }

  render() {
    return (
      <Div100vh>
        <div className={classes.mainLayout}>
          <TopBar />
          <canvas className={classes.canvas} ref={this.canvasRef}>
          </canvas>
          <BottomBar />
        </div>
      </Div100vh>
    );
  }
}

export default Main;
