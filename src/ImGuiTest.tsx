import * as React from 'react';
import {IKeyInfo, IMouseInfo} from './types';
import {drawUi} from './imGUI';

export class ImGuiTest extends React.Component {
  private canvas = React.createRef<HTMLCanvasElement>();
  private mouseInfo: IMouseInfo = {
    leftButton: false,
    rightButton: false,
    xPos: 0,
    yPos: 0,
  };
  private keyInfo: IKeyInfo = {
    alt: false,
    ctrl: false,
    key: '',
    shift: false,
  };

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
      this.canvas.current.addEventListener('contextmenu', e => e.preventDefault());
      requestAnimationFrame(this.renderFrame);
    }
  }
  public render() {
    return (
      <div className="App">
        <canvas
          className="Canvas"
          id="canvas"
          width={1200}
          height={800}
          ref={this.canvas}
          tabIndex={1}
          onContextMenu={() => false}
        />
      </div>
    );
  }

  private getKeyPressed = (evt: KeyboardEvent) => {
    this.keyInfo.key = evt.key;
    this.keyInfo.shift = evt.shiftKey;
    this.keyInfo.alt = evt.altKey;
    this.keyInfo.ctrl = evt.ctrlKey;
  };

  private getKeyDown = (evt: KeyboardEvent) => {
    // tslint:disable-next-line
    //          console.log(evt)

    if (
      evt.key === 'Tab' ||
      evt.key === 'ArrowUp' ||
      evt.key === 'ArrowDown' ||
      evt.key === 'ArrowLeft' ||
      evt.key === 'ArrowRight'
    ) {
      this.keyInfo.key = evt.key;
      this.keyInfo.shift = evt.shiftKey;
      this.keyInfo.alt = evt.altKey;
      this.keyInfo.ctrl = evt.ctrlKey;
    }
  };

  private getKeyUp = (evt: KeyboardEvent) => {
    if (
      evt.key === 'Tab' ||
      evt.key === 'ArrowUp' ||
      evt.key === 'ArrowDown' ||
      evt.key === 'ArrowLeft' ||
      evt.key === 'ArrowRight'
    ) {
      this.keyInfo.key = '';
      this.keyInfo.shift = evt.shiftKey;
      this.keyInfo.alt = evt.altKey;
      this.keyInfo.ctrl = evt.ctrlKey;
    }
  };

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
      evt.preventDefault();
    }
  };

  private getMouseButtonUp = (evt: MouseEvent) => {
    const button = evt.button;
    if (button === 0) {
      this.mouseInfo.leftButton = false;
    }
    if (button === 2) {
      this.mouseInfo.rightButton = false;
      evt.preventDefault();
    }
  };

  private renderFrame = () => {
    if (this.canvas.current) {
      const ctx = this.canvas.current.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'grey';
        ctx.fillRect(0, 0, 1200, 800);
        drawUi(ctx, this.mouseInfo, this.keyInfo);
      }
      this.keyInfo.key = '';
      requestAnimationFrame(this.renderFrame);
    }
  };
}
