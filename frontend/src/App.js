import Navbar from './components/navbar.js'
import Home from './pages/home.js'
import Committees from './pages/committees.js'
import UNSC from './pages/comms/unsc.js'
import UNHRC from './pages/comms/unhrc.js'
import DISEC from './pages/comms/disec.js'
import LokSabha from './pages/comms/lok_sabha.js'
import IPC from './pages/comms/ipc.js'
import CommitteeX from './pages/comms/committee_x.js'
import CCC from './pages/comms/ccc.js'
import Secretariat from './pages/secretariat.js'
import Registration from './pages/registration.js'
import IndividualRegistration from './pages/registrations/individual.js'
import DelegationRegistration from './pages/registrations/delegation.js'
import Resources from './pages/resources.js'
import LoginPage from './pages/login.js'
import ThankYou from './pages/thank_you.js'
import NotFound from './pages/not_found.js'

import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route exact path='/' Component={Home}/>
                <Route exact path='/committees' Component={Committees}/>
                <Route exact path='/committees/unsc' Component={UNSC}/>
                <Route exact path='/committees/unhrc' Component={UNHRC}/>
                <Route exact path='/committees/disec' Component={DISEC}/>
                <Route exact path='/committees/lok-sabha' Component={LokSabha}/>
                <Route exact path='/committees/ipc' Component={IPC}/>
                <Route exact path='/committees/committee-x' Component={CommitteeX}/>
                <Route exact path='/committees/ccc' Component={CCC}/>
                <Route exact path='/secretariat' Component={Secretariat}/>
                <Route exact path='/registration' Component={Registration}/>
                {/* <Route exact path='/registration/individual' Component={IndividualRegistration}/> */}
                {/* <Route exact path='/registration/delegation' Component={DelegationRegistration}/> */}
                <Route exact path='/resources' Component={Resources}/>
                <Route exact path='/login' Component={LoginPage}/>
                <Route exact path='/thank-you' Component={ThankYou}/>
                <Route path='*' Component={NotFound}/>
            </Routes>
        </BrowserRouter>
    )
}

// ReactDOM.render(
//     <App/>,
//     document.getElementById("root")
// )

export default App;
