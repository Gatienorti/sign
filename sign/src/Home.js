import React from 'react'
import {Link} from 'react-router-dom'
import home from "./img/signBckg.PNG"

function Home (){
    return(
        <div className="home">
            <div className="header">
                <h1>Welcome to My project</h1>
            </div>
            <div className="textFlex">
                <div className='textHome'>
                    <h3>Sign Language project</h3>
                    <h4>this Project still in Progress</h4>
                    <p>My goal is to able people that are mute and/or deaf to be able to use zoom and other telecommunication services.</p>
                    <p>My project translate sign laguage to word.</p>
                    <p>I am currently working on a 18 sign recognition.</p>
                    <p>My other objectif is to add an AI voice that will read each word that are sign.</p>
                    <p>This project use ASL "American Sign Language".</p>  
                    <div className="secondPara"></div>               
                    <p>For this project i use Python with Jupyter notebook, openCV, Tensorflow, ImgLabel.</p>
                    <p>This first Application was train with  only 25 picture of each sign only from me.</p>
                    <p>My second Application will involve 200 image from different personne.</p>
                    <p>It will be created using different method that the first one for my own purpose of learning different way to work.</p>
                    <p>I will use Ibm Cloud Anotation and  Google Colab pro. </p>
                </div>
                <div className="secondPage">
                    <div className="imgHome"><img src={home} alt="example"/></div>
                    <Link className="Link" to='./cam'>
                    <p>Click to Try</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Home