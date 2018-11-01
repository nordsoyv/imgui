import * as React from 'react';
import './App.css';
import {ImGuiTest} from "./ImGuiTest";

class App extends React.Component {


  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div className="App">
        <ImGuiTest/>
      </div>
    );
  }


}

export default App;
