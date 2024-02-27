import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './components/HomePage'
import NavBar from './components/NavBar'
import ApiWithService from './components/ApiWithService'
import ApiCatalogue from './components/ApiCatalogue'
import ApiInstrumentale from './components/ApiInstrumentale'
import ApiTest from './components/ApiTest'
import { Authentification } from './view/Authentification'
import { Logout } from './components/Logout'
import { ApiUserInstrumentale } from './components/ApiUserInstrumentale'
function App(){
  return (
    <div className='m-5'>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/apiwithservice" element={<ApiWithService/>} />
          <Route path="/apicatalogue" element={<ApiCatalogue/>} />
          <Route path="/api-instrumentale" element={<ApiInstrumentale/>} />
          <Route path="/api-test" element={<ApiTest/>} />
          <Route path="/login" element={<Authentification/>} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="/instrumentales" element={<ApiUserInstrumentale/>} />
        </Routes>
      </Router>
    </div>
  )
}
export default App