import { Form, Button } from "react-bootstrap";
import axios from "axios";
import React, { useState, useRef } from "react";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  StyledContainer,
  StyledAddForm,
  StyledList,
  StyledMovieNotFound,
  StyledErrorPlaceholder,
} from "./../home/StyledComponents";
import SerieItem from "./SerieItem";

export default ({ list, setList }) => {
  const [error, setError] = useState();
  const [dragSelected, setDragSelected] = useState();
  const postOrderTimer = useRef();

  const useInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    return {
      value,
      setValue,
      reset: () => setValue(""),
      bind: {
        value,
        onChange: event => {
          setValue(event.target.value);
        },
      },
    };
  };

  const { value: item, bind: bindItem, reset: reseItem } = useInput("");

  const handleSubmit = evt => {
    evt.preventDefault();
    setError(null);
    addItem();
  };

  const removeItem = async p_item => {
    try {
      const newList = list.filter(item => {
        return item.Title.toLowerCase() !== p_item.toLowerCase();
      });

      localStorage.setItem("SerieData", JSON.stringify(newList));

      setList([...newList]);

      await axios
        .put(`https://hqfxod3kld.execute-api.eu-north-1.amazonaws.com/Prod/list/update`, {
          username: "mambans",
          listItems: newList,
          listName: "Series",
        })
        .catch(e => {
          console.log("TCL: e", e);
        });
    } catch (error) {
      console.log("TCL: error", error);
    }
  };

  const addItem = async () => {
    if (item && item.trim()) {
      if (list.includes(item)) {
        setError({ Response: "False", Error: "Serie already added" });
      } else {
        const year = item.substring(item.lastIndexOf("(") + 1, item.lastIndexOf(")")) || null;
        const res = await axios.get(
          `http://www.omdbapi.com/?apikey=235e2a1e&type=series&t=${item.replace(` (${year})`, "")}${
            year ? `&y=${year}` : ""
          }`
        );

        if (res.data.Response !== "False") {
          list.push(res.data);
          localStorage.setItem("SerieData", JSON.stringify(list));
          setList([...list]);

          reseItem();

          await axios
            .put(`https://hqfxod3kld.execute-api.eu-north-1.amazonaws.com/Prod/list/update`, {
              username: "mambans",
              listItems: list,
              listName: "Series",
            })
            .catch(e => {
              console.log("TCL: e", e);
            });
        } else {
          setError(res.data);
          console.log("ERROR: ", res);
        }
      }
    }
  };

  const onDragStart = (e, index) => {
    clearTimeout(postOrderTimer.current);
    setDragSelected(list[index]);
    e.dataTransfer.effectAllowed = "move";
    e.target.parentNode.style.background = "rgb(45,45,45)";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 49, 75);
  };

  const onDragOver = (e, index) => {
    const draggedOverItem = list[index];

    if (dragSelected.Title === draggedOverItem.Title) {
      return;
    }

    let items = list.filter(item => item.Title !== dragSelected.Title);

    items.splice(index, 0, dragSelected);

    setList(items);
  };

  const onDragEnd = e => {
    e.target.parentNode.style.background = "rgb(24,24,24)";
    localStorage.setItem("SerieData", JSON.stringify(list));

    postOrderTimer.current = setTimeout(async () => {
      await axios
        .put(`https://hqfxod3kld.execute-api.eu-north-1.amazonaws.com/Prod/list/update`, {
          username: "mambans",
          listItems: list,
          listName: "Series",
        })
        .catch(e => {
          console.log("TCL: e", e);
        });
    }, 10000);
  };

  return (
    <StyledContainer>
      <h1>Tv series</h1>
      <StyledAddForm onSubmit={handleSubmit}>
        {error ? (
          <StyledMovieNotFound
            onClose={() => setError(false)}
            dismissible
            key={error.Error}
            variant='warning'>
            {error.Error}
          </StyledMovieNotFound>
        ) : (
          // <StyledMovieNotFound id='error'>{error.Error}</StyledMovieNotFound>
          <StyledErrorPlaceholder />
        )}
        <Form.Group controlId='formGroupUserName'>
          {/* <Form.Label>Add movie</Form.Label> */}
          <Form.Control type='text' placeholder='The Expanse...' {...bindItem} />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Add
        </Button>
      </StyledAddForm>
      {list ? (
        <StyledList>
          <TransitionGroup component={null}>
            {list.map((item, idx) => {
              return (
                <CSSTransition
                  key={item.Title}
                  timeout={1000}
                  classNames='fadeDown-1s'
                  unmountOnExit>
                  <SerieItem
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
        </StyledList>
      ) : (
        <p>Loading</p>
      )}
    </StyledContainer>
  );
};
