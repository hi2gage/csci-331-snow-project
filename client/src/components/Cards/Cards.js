import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}


function Cards() {
  const token = getToken();

  return (
    <div className='cards'>
      {(token) ?
        (
          <><h1>Check out these skiresorts you could ski at!</h1><div className='cards__container'>
            <div className='cards__wrapper'>
              <ul className='cards__items'>
                <CardItem
                  src='images/whitefish-ski.jpg'
                  text='Pick a time for powder at Whitefish'
                  label='Whitefish'
                  path='/api' />

              </ul>
            </div>
          </div></>
        ) : (<><h1>Check out these skiresorts you could ski at!</h1><div className='cards__container'>
          <div className='cards__wrapper'>
            <ul className='cards__items'>
              <CardItem
                src='images/whitefish-ski.jpg'
                text='Pick a time for powder at Whitefish'
                label='Whitefish'
                path='/login' />

            </ul>
          </div>
        </div></>)
      }

    </div>
  );
}

export default Cards;
