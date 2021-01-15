import React from 'react'
import yes from "./img/yes.jpg"
import no from "./img/no.jpg"
import hello from "./img/hello.png"
import de from "./img/de.png"
import ily from "./img/ily.jpg"

function Band (){

    return(
        <div className='wait'>
            <h1>Instruction:</h1>
            <div>
                <ul className='waitingDiv'>
                    <li className="waitingImg">I Love You<img src={ily}/></li>
                    <li className="waitingImg">yes<img src={yes}/></li>
                    <li className="waitingImg">No<img src={no}/></li>
                    <li className="waitingImg">hello<img src={hello}/></li>
                    <li className="waitingImg">Thank You<img src={de}/></li>
                </ul>
            </div>
            <p>Click anywhere on the instruction to go away</p>
        </div>
    )
}

export default Band