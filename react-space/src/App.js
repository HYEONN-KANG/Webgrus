import React from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/")
      .then((res) => res.json())
      .then((data) => this.setState({ title: data.title }));
    // 아래로 하면 /notice/create_process에게서 data를 받아옵니다.
    // fetch("http://localhost:3001/notice/create_process")
    //   .then((res) => res.json())
    //   .then((data) =>
    //     this.setState({
    //       title: data.title,
    //     })
    //   );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            {this.state.title ? (
              <h1>{this.state.title}</h1>
            ) : (
              <h1>loading...</h1>
            )}
          </div>
        </header>
        <div>
          <form action="/notice/create_process" method="post">
            <p>
              title:
              <input type="text" name="title" />
            </p>
            <p>
              desc:
              <input type="text" name="desc" />
            </p>
            <p>
              author:
              <input type="text" name="author" />
            </p>
            <p>
              <input type="submit" />
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
