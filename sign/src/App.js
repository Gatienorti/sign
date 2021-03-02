import React from 'react'
import Cam from './Cam'
import {Route, Switch} from 'react-router-dom'
import Home from './Home'
import './App.css'

function App (){
    return(
        <div className="App">
        <Switch>
            <Route exact path='/'>
                <Home />
            </Route>
            <Route exact path='/cam'>
                <Cam />
            </Route>
        </Switch>
        </div>
    )
}
export default App