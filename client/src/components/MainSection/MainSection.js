import React from 'react'
import { Button } from '../Button/Button'
import '../../App.css'
import './MainSection.css'

function MainSection() {
    return (
        <div className='main-container'>
            <video src="/videos/snowvid.mp4" autoPlay loop muted />
            <h1>SHREDDING POW</h1>
            <p>Start waking up in time to ski</p>
            <div className='main-btns'>
                <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large'>GET STARTED</Button>
            </div>
        </div>
    )
}

export default MainSection
