// import {useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import ProtectedRoute from "./ProtectedRoute.jsx";

// import api from "./utils/api.js";

function App() {

  // todo create page and all logic
  // const getData = async () => {
  //   const req = await api.get("/");
  //   console.log(req.data);
  //   //updateTable(req.data);
  // }
  //
  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route
          path="/magician"
          element={
            <ProtectedRoute role="magician">
              <MagicianPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exhaustion"
          element={
            <ProtectedRoute role="exhaustion">
              <ExhaustionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hunter"
          element={
            <ProtectedRoute role="hunter">
              <HunterPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App
