import { IMouseInfo} from '../types';
import * as React from 'react';
import {drawFlowChart} from './draw';

export class FlowChart extends React.Component {
  private canvas = React.createRef<HTMLCanvasElement>();
  private mouseInfo: IMouseInfo = {
    leftButton: false,
    rightButton: false,
    xPos: 0,
    yPos: 0,
  };

  public componentDidMount() {
    if (this.canvas.current) {
      this.canvas.current.addEventListener('mousemove', this.getMousePos);
      this.canvas.current.addEventListener('mousedown', this.getMouseButtonDown);
      this.canvas.current.addEventListener('mouseup', this.getMouseButtonUp);
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
        drawFlowChart(ctx, this.mouseInfo);
      }
      requestAnimationFrame(this.renderFrame);
    }
  };
}
