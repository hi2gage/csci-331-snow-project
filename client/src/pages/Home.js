
import React from 'react';
import '../App.css';
import Cards from '../components/Cards/Cards';
import Footer from '../components/Footer/Footer';
import MainSection from '../components/MainSection/MainSection';


function Home(loggedinStatus){
    return(
        <>
         <MainSection/>
         <Cards />
         <Footer/>
        </>

    );
}


export default Home;