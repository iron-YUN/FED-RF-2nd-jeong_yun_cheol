import logo from './logo.svg';
import './App.css';
import $ from "jquery";
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    $(".App-header span").hover(
      (e) => { // 오버시
        $(e.currentTarget)
        .stop().animate(
          {
            scale: 1.4,
          },
          500
        );
      },
      (e) => { // 아웃시
        $(e.currentTarget)
        .stop().animate(
          {
            scale: 1,
          },
          500
        );
      }
    );
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <span>
        <img src="https://wimg.mk.co.kr/news/cms/202301/03/news-p.v1.20230103.300a5890ce7e4021a8bcf87a59c72c60_P1.jpg" className="App-logo" alt="logo" />
        </span>
        <p>
         리액트 내꺼임
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
