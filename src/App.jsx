import {Routes, Route} from 'react-router-dom'
import './styles/App.css'
import LoginPage from "./LoginPage.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import CreateMagicianPage from "./infoPages/CreateMagicianPage.jsx";
import CreateExhaustionPage from "./infoPages/CreateExhaustionPage.jsx";
import CreateHunterPage from "./infoPages/CreateHunterPage.jsx";
import CreateStorekeeperPage from "./infoPages/CreateStorekeeperPage.jsx";
import Header from "./header/PageHeader.jsx";
import EmployeePage from "./infoPages/EmployeePage.jsx";

function App() {
    return (
        <div>
            <Header/>
            <div id="toast" className="toast hidden"></div>
            <div className="container" id="body_container">
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
                            <ProtectedRoute role="MAGICIAN">
                                <CreateMagicianPage/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/extractor"
                        element={
                            <ProtectedRoute role="EXTRACTOR">
                                <CreateExhaustionPage/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/worker_manager'
                        element={
                            <ProtectedRoute role="MAGICIAN">
                                <EmployeePage/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/storekeeper"
                        element={
                            <ProtectedRoute role="STOREKEEPER">
                                <CreateStorekeeperPage/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/hunter"
                        element={
                            <ProtectedRoute role="HUNTER">
                                <CreateHunterPage/>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </div>
    );
}

export default App
