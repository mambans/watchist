import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import React, { useState, useRef } from "react";

import { sortFunctions, sortListFunc, SortButton } from "./../sort/Sort";
import MovieItem from "./MovieItem";
import {
  StyledContainer,
  StyledAddForm,
  StyledList,
  StyledAlert,
  StyledErrorPlaceholder,
  StyledSearchSuggestionList,
  SearchIcon,
  ModalBackdrop,
  ScrollToTopIcon,
  StyledScollToTop,
} from "./../StyledComponents";

export default ({ list, listName }) => {
  const [alert, setAlert] = useState();
  const [dragSelected, setDragSelected] = useState();
  const [thisList, setThisList] = useState(list);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortAs, setSortAs] = useState(false);
  const [suggestionsOpen, setSuggestionsOpen] = useState();
  const [suggestions, setSuggestions] = useState({});
  const postOrderTimer = useRef();
  const alertTimer = useRef();
  const formInput = useRef();
  const customOrder = useRef(thisList);
  const previousSearch = useRef();
  const newAddedRef = useRef();
  const topItemRef = useRef();

  const sortOptions = {
    Alphabetically: { name: "Alphabetically", func: sortFunctions.alphabetically },
    IMDB: { name: "Internet Movie Database", func: sortFunctions.score },
    RottenTomatoes: { name: "Rotten Tomatoes", func: sortFunctions.score },
    Metacritic: { name: "Metacritic", func: sortFunctions.score },
    Year: { name: "Year", func: sortFunctions.first },
    Runtime: { name: "Runtime", func: sortFunctions.first },
    Boxoffice: { name: "BoxOffice", func: sortFunctions.first },
  };

  const sortList = sortBy => {
    sortListFunc(sortBy, thisList, sortOptions, setThisList);
  };

  const useInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    return {
      value,
      setValue,
      reset: () => setValue(""),
      manualSet: {
        onClick: event => {
          setValue(event.target.textContent);
          setSuggestionsOpen(false);
        },
      },
      bind: {
        value,
        onChange: event => {
          setValue(event.target.value);
        },
      },
    };
  };

  const { value: item, bind: bindItem, reset: reseItem, manualSet } = useInput("");

  const handleSubmit = evt => {
    evt.preventDefault();
    // setAlert(null);
    addItem();
  };

  const removeItem = async p_item => {
    try {
      const newList = thisList.filter(item => {
        return item.Title.toLowerCase() !== p_item.toLowerCase();
      });

      setThisList([...newList]);

      clearTimeout(alertTimer.current);
      setAlert({ Error: "Removed: " + p_item, type: "warning" });
      alertTimer.current = setTimeout(() => {
        setAlert(null);
      }, 3000);

      await axios
        .put(`https://hqfxod3kld.execute-api.eu-north-1.amazonaws.com/Prod/list/update`, {
          username: "mambans",
          listItems: { type: "movie", items: newList },
          listName: listName,
        })
        .catch(e => {
          console.log("TCL: e", e);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSearchSuggestions = async search => {
    if (previousSearch.current !== search) {
      const year = item.substring(item.lastIndexOf("(") + 1, item.lastIndexOf(")")) || null;
      const res = await axios
        .get(
          `http://www.omdbapi.com/?apikey=235e2a1e&type=movie&s=${search.replace(
            ` (${year})`,
            ""
          )}${year ? `&y=${year}` : ""}`
        )
        .then(result => {
          previousSearch.current = search;
          return result;
        })
        .catch(e => {
          console.error(e);
        });

      if (res.data.Response !== "False") {
        setSuggestions(res.data.Search);
        setSuggestionsOpen(true);
      } else {
        setAlert({ ...res.data, type: "warning" });
      }
    } else {
      setSuggestionsOpen(true);
    }
  };

  const addItem = async () => {
    if (item && item.trim()) {
      if (thisList.find(movie => movie.Title.toLowerCase() === item.trim().toLowerCase())) {
        setAlert({ Response: "False", Error: "Movie already added", type: "warning" });
      } else {
        const year = item.substring(item.lastIndexOf("(") + 1, item.lastIndexOf(")")) || null;
        const res = await axios.get(
          `http://www.omdbapi.com/?apikey=235e2a1e&type=movie&t=${item.replace(` (${year})`, "")}${
            year ? `&y=${year}` : ""
          }`
        );
        if (res.data.Response !== "False") {
          thisList.push(res.data);

          setThisList([...thisList]);

          setTimeout(() => {
            newAddedRef.current.scrollIntoView({
              behavior: "smooth",
              block: "end",
              inline: "end",
            });
          }, 0);

          clearTimeout(alertTimer.current);
          setAlert({ Error: "Added: " + res.data.Title, type: "success" });
          alertTimer.current = setTimeout(() => {
            setAlert(null);
          }, 3000);
          reseItem();

          await axios
            .put(`https://hqfxod3kld.execute-api.eu-north-1.amazonaws.com/Prod/list/update`, {
              username: "mambans",
              listItems: { type: "movie", items: thisList },
              listName: listName,
            })
            .catch(e => {
              console.error(e);
            });
        } else {
          setAlert({ ...res.data, type: "warning" });
          await axios
            .get(
              `http://www.omdbapi.com/?apikey=235e2a1e&type=movie&s=${item.replace(
                ` (${year})`,
                ""
              )}${year ? `&y=${year}` : ""}`
            )
            .then(res => {
              setSuggestions(res.data.Search);
              setSuggestionsOpen(true);
            })
            .catch(e => {
              console.error(e);
            });
        }
      }
    }
  };

  const onDragStart = (e, index) => {
    clearTimeout(postOrderTimer.current);
    setDragSelected(thisList[index]);
    e.dataTransfer.effectAllowed = "move";
    e.target.parentNode.style.background = "rgb(80, 80, 80)";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 49, 75);
  };

  const onDragOver = (e, index) => {
    const draggedOverItem = thisList[index];

    if (dragSelected.Title === draggedOverItem.Title) {
      return;
    }

    let items = thisList.filter(item => item.Title !== dragSelected.Title);

    items.splice(index, 0, dragSelected);

    setThisList(items);
  };

  const onDragEnd = e => {
    // e.target.parentNode.style.background = "rgb(24,24,24)";
    e.target.parentNode.style.background = "inherit";

    postOrderTimer.current = setTimeout(async () => {
      await axios
        .put(`https://hqfxod3kld.execute-api.eu-north-1.amazonaws.com/Prod/list/update`, {
          username: "mambans",
          listItems: { type: "movie", items: thisList },
          listName: listName,
        })
        .catch(e => {
          console.error(e);
        });
    }, 5000);
  };

  return (
    <StyledContainer>
      <h1>{listName}</h1>
      <StyledAddForm onSubmit={handleSubmit}>
        {alert ? (
          <StyledAlert
            onClose={() => setAlert(false)}
            dismissible
            key={alert.Error}
            variant={alert.type || "warning"}>
            {alert.Error}
          </StyledAlert>
        ) : (
          <StyledErrorPlaceholder />
        )}
        <SortButton
          text={sortAs}
          open={sortOpen}
          setSortOpen={setSortOpen}
          customOrder={customOrder.current}
          sortOptions={sortOptions}
          setList={setThisList}
          setSortAs={setSortAs}
          sortList={sortList}
        />
        <Form.Group controlId='formGroupUserName'>
          {/* <Form.Label>Add movie</Form.Label> */}
          <Form.Control
            ref={formInput}
            type='text'
            placeholder='Lord of the rings...'
            {...bindItem}
            style={{
              borderRadius: suggestions && suggestionsOpen ? "0.25rem 0.25rem 0 0" : "0.25rem",
            }}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Add
        </Button>
        <Button
          id='searchBtn'
          onClick={() => {
            fetchSearchSuggestions(formInput.current.value.trim());
          }}>
          <SearchIcon />
        </Button>

        <CSSTransition
          key='StyledSearchSuggestionList'
          in={suggestions && suggestionsOpen}
          timeout={250}
          classNames='slideDown-250ms'
          unmountOnExit>
          <StyledSearchSuggestionList height={"520px"}>
            {Object.values(suggestions).map(item => {
              return (
                <li key={item.imdbID} {...manualSet}>
                  <img alt='' src={item.Poster}></img>
                  {`${item.Title} (${item.Year})`}
                </li>
              );
            })}
          </StyledSearchSuggestionList>
        </CSSTransition>
        {suggestions && suggestionsOpen ? (
          <ModalBackdrop
            onClick={() => {
              setSuggestionsOpen(false);
            }}
          />
        ) : null}
      </StyledAddForm>

      <StyledList height={950}>
        <div ref={topItemRef} style={{ height: "1px" }} />
        <TransitionGroup component={null}>
          {thisList.map((item, idx) => {
            return (
              <CSSTransition key={item.Title} timeout={1000} classNames='fadeDown-1s' unmountOnExit>
                <MovieItem
                  item={item}
                  removeItem={removeItem}
                  idx={idx}
                  onDragStart={onDragStart}
                  onDragOver={onDragOver}
                  onDragEnd={onDragEnd}
                />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
        <StyledScollToTop
          ref={newAddedRef}
          onClick={() => {
            topItemRef.current.scrollIntoView({
              behavior: "smooth",
              block: "end",
              inline: "end",
            });
          }}>
          <ScrollToTopIcon />
          <p>Scroll to top</p>
        </StyledScollToTop>
      </StyledList>
    </StyledContainer>
  );
};
