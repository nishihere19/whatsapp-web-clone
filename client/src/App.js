import './App.css';
import Chatbox from "./components/chatbox/Chatbox"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
// import Home from "./Components/home.component";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { useSelector } from "react-redux"

function App(){
    const archiveOpen = useSelector(state => state.archive.archiveOpen)
    // const userInfo = useSelector(state => state.user)
    const value = useSelector(state => state.search.value)
    return(
    <Router>
        <Routes>
            <Route exact path = "/" element = {<Chatbox archiveOpen={archiveOpen} value={value} />} />
            <Route path = "/register" element = {<Register/>} />
            <Route path = "/login" element = {<Login/>} />
        </Routes>
    </Router>
    )
}

export default App;
