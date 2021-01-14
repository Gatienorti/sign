import React from 'react'
import {Link} from 'react-router-dom'

function Home (){
    return(
        <div className="home">
            <h1>Welcome to My project</h1>
            <div className='textHome'>
                <p>Project in Progress</p>
                <p>My goal with this project is to able people that are mute and/or deaf to be able to use zoom and other telecommunication services</p>
                <p>For the moment my project translate sign laguage to word, my second step will be to add an AI voice  to read each word that are sign  and to add more sign</p>
            </div>
            <Link className="Link" to='./cam'>
            <p>Click to Try</p>
            </Link>
        </div>
    )
}
export default Home