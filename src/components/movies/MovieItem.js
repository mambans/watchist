import React from "react";

import { DeleteIcon, StyledListItem } from "./../home/StyledComponents";

export default ({ item, removeItem, idx, onDragStart, onDragOver, onDragEnd }) => {
  if (item && item.Title) {
    return (
      <StyledListItem
        // key={item.Title}
        title={`${item.Title}`}
        onDragOver={e => onDragOver(e, idx)}>
        <img
          id='poster'
          src={item.Poster}
          alt=''
          draggable
          onDragStart={e => onDragStart(e, idx)}
          onDragEnd={e => {
            onDragEnd(e);
          }}
        />
        <p id='title'>{`${item.Title} (${item.Year})`}</p>
        <p id='desc'>{item.Plot}</p>
        <div id='raitings'>
          <div>
            <a href={`https://www.imdb.com/title/${item.imdbID}`} id='rottentomatoes'>
              <img src={`${process.env.PUBLIC_URL}/logos/rottentomatoes.png`} alt=''></img>
            </a>
            {item.Ratings[1].Value}
          </div>
          <div>
            <a href={`https://www.imdb.com/title/${item.imdbID}`} id='imdb'>
              <img
                // onClick={() => {
                //   window.open(`https://www.imdb.com/title/${item.imdbID}`);
                // }}
                // id='imdb'
                src={`${process.env.PUBLIC_URL}/logos/imdb.png`}
                alt=''></img>
            </a>
            {item.Ratings[0].Value}
          </div>
          <div>
            <a href={`https://www.imdb.com/title/${item.imdbID}`} id='metacritic'>
              <img src={`${process.env.PUBLIC_URL}/logos/metacritic.png`} alt=''></img>
            </a>
            {item.Ratings[2].Value}
          </div>
        </div>

        <DeleteIcon
          onClick={() => {
            removeItem(item.Title);
          }}
        />
      </StyledListItem>
    );
  } else {
    return <p>Loading...</p>;
  }
};
