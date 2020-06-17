import { Button } from 'react-bootstrap';
import { calendar } from 'react-icons-kit/icomoon/calendar';
import { clockO } from 'react-icons-kit/fa/clockO';
import { CSSTransition } from 'react-transition-group';
import { ic_attach_money } from 'react-icons-kit/md/ic_attach_money';
import { ic_sort } from 'react-icons-kit/md/ic_sort';
import { imdb } from 'react-icons-kit/fa/imdb';
import { sortAlphaAsc } from 'react-icons-kit/fa/sortAlphaAsc';
import Icon from 'react-icons-kit';
import React, { useRef } from 'react';
import styled from 'styled-components';

import { ModalBackdrop } from './../StyledComponents';

const sortIcons = {
  IMDB           : imdb,
  Year           : calendar,
  Runtime        : clockO,
  Boxoffice      : ic_attach_money,
  Alphabetically : sortAlphaAsc,
  // RottenTomatoes: ic_sort,
  // Metacritic: ic_sort,
  // Seasons: ic_sort,
};

const sortFunctions = {
  first          : (a, b, prop) => {
    return (
      (parseFloat(b[prop].replace('/min/g', '').replace('$', '').split(',').join('.')) || 0) -
      (parseFloat(a[prop].replace('$', '').split(',').join('.')) || 0)
    );
  },

  score          : (a, b, prop) => {
    return (
      parseFloat(
        b.Ratings.find((item) => {
          return item.Source === prop;
        }).Value,
      ) -
      parseFloat(
        a.Ratings.find((item) => {
          return item.Source === prop;
        }).Value,
      )
    );
  },

  alphabetically : (a, b, prop) => {
    const aText = a.Title ? a.Title.toLowerCase() : a.toLowerCase();
    const bText = b.Title ? b.Title.toLowerCase() : b.toLowerCase();
    return aText < bText ? -1 : aText > bText ? 1 : 0;
  },
};

const sortListFunc = (sortBy, list, sortOptions, listName, updateLists) => {
  const SortedList = Object.values(list).sort((a, b) => {
    return sortOptions[sortBy].func(a, b, sortOptions[sortBy].name);
  });

  updateLists(listName, SortedList);
};

const StyledSortButton = styled(Button).attrs({ variant: 'secondary' })`
  grid-area: sort;
  padding: 0;
  border: none;
  box-shadow: none !important;

  i {
    padding-right: 5px;
  }
`;

const StyledSortDropdown = styled.ul`
  color: white;
  /* background: rgb(56, 56, 56); */
  /* background: #5a6268; */
  background: inherit;
  height: max-content;
  width: min-content;
  margin: auto;
  border-radius: 0 0 10px 10px;
  position: absolute;
  z-index: 12;
  list-style: none;
  padding: 0;
  padding-top: 10px;
  /* border-top: 1px solid #b7b7b7; */
  margin-top: 5px;

  /* width: calc((1200px - 220px) * 0.18); */
  width: ${({ width }) => width || 250}px;

  li {
    border-top: thin solid rgba(218, 218, 218, 0.5);
    padding: 5px;
    transition: all 300ms;
    font-size: 0.95rem;

    i {
      padding-right: 5px;
    }

    &:hover {
      font-weight: bold;
    }
  }
`;

const SortButton = ({
  text,
  open,
  setSortOpen,
  customOrder,
  sortOptions,
  updateLists,
  setSortAs,
  listName,
  list,
}) => {
  const sortButtonRef = useRef();

  return (
    <StyledSortButton
      ref={sortButtonRef}
      onClick={() => {
        setSortOpen(!open);
      }}>
      <Icon icon={sortIcons[text] || ic_sort} />
      {text || 'Sort by'}

      {open ? (
        <ModalBackdrop
          onClick={() => {
            setSortOpen(false);
          }}
        />
      ) : null}
      <CSSTransition in={open} timeout={200} classNames='slideDown-200ms' unmountOnExit>
        <StyledSortDropdown width={sortButtonRef.current && sortButtonRef.current.clientWidth}>
          <li
            onClick={() => {
              setSortAs('Default');
              updateLists(listName, customOrder);
            }}>
            Default
          </li>
          {Object.keys(sortOptions).map((key) => {
            return (
              <li
                key={key}
                onClick={() => {
                  setSortAs(key);
                  sortListFunc(key, list, sortOptions, listName, updateLists);
                }}>
                <Icon icon={sortIcons[key] || ic_sort} />
                {key}
              </li>
            );
          })}
        </StyledSortDropdown>
      </CSSTransition>
    </StyledSortButton>
  );
};

export { sortFunctions, SortButton };
