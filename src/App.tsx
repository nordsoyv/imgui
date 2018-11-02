import * as React from 'react';
import './App.css';
import {FlowChart} from "./flowChart";
// import {ImGuiTest} from './ImGuiTest';

class App extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div className="App">
        <FlowChart/>
      </div>
    );
  }
}

export default App;
