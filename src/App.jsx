// import {useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './styles/App.css'
import LoginPage from "./LoginPage.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import CreateMagicianPage from "./infoPages/CreateMagicianPage.jsx";
import CreateExhaustionPage from "./infoPages/CreateExhaustionPage.jsx";
import CreateHunterPage from "./infoPages/CreateHunterPage.jsx";
import CreateStorekeeperPage from "./infoPages/CreateStorekeeperPage.jsx";

// import api from "./utils/api.js";

function App() {
  // todo исправить кнопки в таблицах с info

  return (
      <div className="container">
          <div id="myModal" className="form-group">
              <div id={"modalContext"} className="modal-context">
                  <h2 id="modalTitle"/>
                  <div id="modalBody"/>
              </div>
          </div>
          <Routes>
              <Route path="/" element={<LoginPage/>}/>
              <Route
                  path="/magician"
                  element={
                      <ProtectedRoute role="magician">
                          <CreateMagicianPage/>
                      </ProtectedRoute>
                  }
              />
              <Route
                  path="/exhaustion"
                  element={
                      <ProtectedRoute role="exhaustion">
                          <CreateExhaustionPage/>
                      </ProtectedRoute>
                  }
              />
              <Route
                path="/storekeeper"
                element={
                  <ProtectedRoute role="storekeeper">
                      <CreateStorekeeperPage />
                  </ProtectedRoute>
                }
              />
              <Route
                  path="/hunter"
                  element={
                      <ProtectedRoute role="hunter">
                          <CreateHunterPage/>
                      </ProtectedRoute>
                  }
              />
          </Routes>
      </div>
  );
}

export default App
