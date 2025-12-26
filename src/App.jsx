import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './styles/App.css'
import LoginPage from "./LoginPage.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import CreateMagicianPage from "./infoPages/CreateMagicianPage.jsx";
import CreateExhaustionPage from "./infoPages/CreateExhaustionPage.jsx";
import CreateHunterPage from "./infoPages/CreateHunterPage.jsx";
import CreateStorekeeperPage from "./infoPages/CreateStorekeeperPage.jsx";
import Header from "./header/PageHeader.jsx";
import EmployeePage from "./infoPages/EmployeePage.jsx";

// import apiClient from "./utils/api-client.js";

function App() {
    // todo исправить кнопки в таблицах с info

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
                        path='/worker_manager'
                        element={
                            <ProtectedRoute role="magician">
                                <EmployeePage/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/storekeeper"
                        element={
                            <ProtectedRoute role="storekeeper">
                                <CreateStorekeeperPage/>
                            </ProtectedRoute>
                        }
                    />
                    {/*<Route*/}
                    {/*    path="/hunter"*/}
                    {/*    element={*/}
                    {/*        <ProtectedRoute role="hunter">*/}
                    {/*            <CreateHunterPage/>*/}
                    {/*        </ProtectedRoute>*/}
                    {/*    }*/}
                    {/*/>*/}
                </Routes>
            </div>
        </div>
    );
}

export default App
