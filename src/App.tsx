import * as React from 'react';
import './App.css';
import { drawUi } from './imGUI';
import { IKeyInfo,IMouseInfo } from './types';

class App extends React.Component {

  private canvas = React.createRef<HTMLCanvasElement>();
  private mouseInfo: IMouseInfo = {
    leftButton: false,
    rightButton: false,
    xPos: 0,
    yPos: 0,
  };
  private keyInfo : IKeyInfo = {
    alt : false,
    ctrl : false,
    key : '',
    shift : false,
  };
  private ctx: CanvasRenderingContext2D | null;


  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    if (this.canvas.current) {
      this.canvas.current.addEventListener('mousemove', this.getMousePos);
      this.canvas.current.addEventListener('mousedown', this.getMouseButtonDown);
      this.canvas.current.addEventListener('mouseup', this.getMouseButtonUp);
      this.canvas.current.addEventListener('keypress', this.getKeyPressed);
      this.canvas.current.addEventListener('keydown', this.getKeyDown);
      this.canvas.current.addEventListener('keyup', this.getKeyUp);
      requestAnimationFrame(this.renderFrame);
    }
  }
  public render() {
    return (
      <div className="App">
        <canvas className="Canvas" id="canvas" width={1200} height={800} ref={this.canvas} tabIndex={1} />
      </div>
    );
  }

  private getKeyPressed = (evt: KeyboardEvent) => {
      this.keyInfo.key = evt.key;
      this.keyInfo.shift = evt.shiftKey;
  }

  private getKeyDown = (evt: KeyboardEvent) => {
          // tslint:disable-next-line 
//          console.log(evt)

    if(evt.key ==='Tab' || evt.key === 'ArrowUp'|| evt.key === 'ArrowDown'|| evt.key === 'ArrowLeft'|| evt.key === 'ArrowRight'){
      this.keyInfo.key = evt.key;
      this.keyInfo.shift = evt.shiftKey;
    }
  }

  private getKeyUp = (evt: KeyboardEvent) => {
    if(evt.key ==='Tab' || evt.key === 'ArrowUp'|| evt.key === 'ArrowDown'|| evt.key === 'ArrowLeft'|| evt.key === 'ArrowRight'){
      this.keyInfo.key = '';
      this.keyInfo.shift = evt.shiftKey;
    }
  }

  private getMousePos = (evt: MouseEvent) => {
    const node = this.canvas.current;
    if (node) {
      const rect = node.getBoundingClientRect();
      this.mouseInfo.xPos = evt.clientX - rect.left;
      this.mouseInfo.yPos = evt.clientY - rect.top;
    }
  };

  private getMouseButtonDown = (evt: MouseEvent) => {
    const button = evt.button;
    if (button === 0) {
      this.mouseInfo.leftButton = true;
    }
    if (button === 2) {
      this.mouseInfo.rightButton = true;
    }
  };

  private getMouseButtonUp = (evt: MouseEvent) => {
    const button = evt.button;
    if (button === 0) {
      this.mouseInfo.leftButton = false;
    }
    if (button === 2) {
      this.mouseInfo.rightButton = false;
    }
  };

  private clearCanvas() {
    if (this.ctx) {
      this.ctx.fillStyle = 'grey';
      this.ctx.fillRect(0, 0, 1200, 800);
    }
  }

  private renderFrame = () => {
    if (this.canvas.current) {
      this.ctx = this.canvas.current.getContext('2d');
      if (this.ctx) {
        this.clearCanvas();
        drawUi(this.ctx, this.mouseInfo, this.keyInfo);
      }
      this.keyInfo.key = '';
      requestAnimationFrame(this.renderFrame);

    }
  }
}

export default App;
