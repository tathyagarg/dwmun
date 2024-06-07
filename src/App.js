import Home from './pages/home';

import Committees from './pages/committees';
import UNSC from './pages/comms/unsc';
import UNHRC from './pages/comms/unhrc';
import DISEC from './pages/comms/disec';
import LokSabha from './pages/comms/lok_sabha';
import IPC from './pages/comms/ipc';
import SSCI from './pages/comms/ssci';
import CCC from './pages/comms/ccc';

import Secretariat from './pages/secretariat';
import Registration from './pages/registration';

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom"
import Navbar from './components/navbar';

function App() {
    return (
        <Router>
            <Navbar></Navbar>
            <Routes>
                <Route exact path="/dwmun" element={<Home/>}/>
                <Route path="/committees" element={<Committees/>}/>
                <Route path="/committees/unsc" element={<UNSC/>}/>
                <Route path="/committees/unhrc" element={<UNHRC/>}/>
                <Route path="/committees/disec" element={<DISEC/>}/>
                <Route path="/committees/lok-sabha" element={<LokSabha/>}/>
                <Route path="/committees/ipc" element={<IPC/>}/>
                <Route path="/committees/ssci" element={<SSCI/>}/>
                <Route path="/committees/ccc" element={<CCC/>}/>
                <Route path="/secretariat" element={<Secretariat/>}/>
                <Route path="/registration" element={<Registration/>}/>
            </Routes>
        </Router>
    )
}

export default App;
