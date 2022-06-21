import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import useCollapse from 'react-collapsed';

function App() {
  const [getMessage, setGetMessage] = useState({})

  useEffect(()=>{
    axios.get('http://localhost:5000/flask/hello').then(response => {
      console.log("SUCCESS", response)
      setGetMessage(response)
    }).catch(error => {
      console.log(error)
    })

  }, [])
  return (
    <div className="App">
      <script src="https://kit.fontawesome.com/ea8bc4d19f.js" crossOrigin="anonymous"></script>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossOrigin="anonymous"></link>
          <div className="container1">
        <header className="text-center text-light  my-4">
            <h1 className="mb-4">Todo List</h1>
                <input type="text" className="form-control m-auto" name="start" placeholder="start" />
                <input type="text" className="form-control m-auto" name="end" placeholder="end" />
            <button type="button" className="btn btn-warning  btn-lg mt-3">-------GO--------</button>
        </header>
        <div className="routeList  d-none">
        </div>
    </div>
    <div className="container2 my-5 mx-auto">

        <h1 className="text-center my-4 text-light">Weather</h1>
        <form className="change-location my-4 text-center text-light" id="weatherForm">
            <label htmlFor="city" className="mb-4">Enter a city for weather information</label>
            <input type="text" name="city" className="form-control p-4"></input>
        </form>
        <div className="card shadow-lg rounded d-none">
            <img src="https://via.placeholder.com/400x300" className="time card-img-top"></img>
            <div className="icon bg-light mx-auto text-center">
                <img src="" alt=""></img>
            </div>
            <div className="text-muted text-uppercase text-center details">
                <h5 className="my-3">city name</h5>
                <div className="my-3">Weather condition</div>
                <div className="display-4 my-4">
                    <span>temp</span>
                    <span>&deg;</span>
                </div>
            </div>
        </div>
      </div>
      <script src="weatherapi.js"></script>
      <script src="weatherInteractive.js"></script>
      <script src="searchbox.js"></script>
  </div>
  );
}

function Collapsible() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
return (
    <div className="collapsible">
        <div className="header" {...getToggleProps()}>
            {isExpanded ? 'Collapse' : 'Expand'}
        </div>
        <div {...getCollapseProps()}>
            <div className="content">
                Now you can see the hidden content. <br/><br/>
                Click again to hide...
            </div>
        </div>
    </div>
    );
}

export default App;