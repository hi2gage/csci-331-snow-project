import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out these skiresorts you could ski at!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/whitefish-ski.jpg'
              text='Pick a time for powder at Whitefish'
              label='Whitefish'
              path='/services'
            />
            <CardItem
              src='images/bridger-ski.jpg'
              text='Pick a time for powder at Bridger'
              label='Bridger Bowl'
              path='/services'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
