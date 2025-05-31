import {useEffect} from 'react'
import './App.css'
import api from "./utils/api.js";

function App() {
  const getData = async () => {
    const req = await api.get("/");
    console.log(req.data);
    //updateTable(req.data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
      <>
        <div className="container">
          <div id="myModal" className="modal">
            <div id={"modalContext"} className="modal-context">
              <h2 id="modalTitle"/>
              <div id="modalBody"/>
            </div>
          </div>
          <div id="tablePlace"/>
        </div>
      </>
  )
}

export default App
