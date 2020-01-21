import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import React, { useState, useRef } from "react";

import { sortFunctions, sortListFunc, SortButton } from "./../sort/Sort";
import {
  StyledContainer,
  StyledAddForm,
  StyledList,
  StyledAlert,
  StyledErrorPlaceholder,
} from "./../home/StyledComponents";
import DefaultItem from "./DefaultItem";

export default ({ list, listName }) => {
  const [thisList, setThisList] = useState(list);
  const [alert, setAlert] = useState();
  const [dragSelected, setDragSelected] = useState();
  const [sortOpen, setSortOpen] = useState(false);
  const [sortAs, setSortAs] = useState(false);
  const postOrderTimer = useRef();
  const alertTimer = useRef();
  const customOrder = useRef(thisList);

  const sortOptions = {
    Alphabetically: { name: "Alphabetically", func: sortFunctions.alphabetically },
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
    // setAlert(null);
    addItem();
  };

  const addItem = async () => {
    if (item && item.trim()) {
      if (thisList.find(listItem => listItem.toLowerCase() === item.trim().toLowerCase())) {
        setAlert({ Response: "False", Error: "Item already added", type: "warning" });
      } else {
        thisList.push(item.trim());
        setThisList([...thisList]);

        setAlert({ Error: "Added: " + item, type: "success" });
        alertTimer.current = setTimeout(() => {
          setAlert(null);
        }, 3000);

        reseItem();
        await axios
          .put(`https://hqfxod3kld.execute-api.eu-north-1.amazonaws.com/Prod/list/update`, {
            username: "mambans",
            listItems: { type: "default", items: thisList },
            listName: listName,
          })
          .catch(e => {
            console.log("TCL: e", e);
          });
      }
    }
  };

  const removeItem = async p_item => {
    try {
      const newList = thisList.filter(item => {
        return item.toLowerCase() !== p_item.toLowerCase();
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
          listItems: { type: "default", items: newList },
          listName: listName,
        })
        .catch(e => {
          console.log("TCL: e", e);
        });
    } catch (error) {
      console.log("TCL: error", error);
    }
  };

  const onDragStart = (e, index) => {
    clearTimeout(postOrderTimer.current);
    setDragSelected(thisList[index]);
    e.dataTransfer.effectAllowed = "move";
    e.target.parentNode.style.background = "rgb(80, 80, 80)";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 0, 25);
  };

  const onDragOver = (e, index) => {
    const draggedOverItem = thisList[index];

    if (dragSelected === draggedOverItem) {
      return;
    }

    let items = thisList.filter(item => item !== dragSelected);

    items.splice(index, 0, dragSelected);

    setThisList(items);
  };

  const onDragEnd = e => {
    // e.target.parentNode.style.background = "rgb(24,24,24)";
    e.target.parentNode.style.background = "inherit";
    localStorage.setItem("MovieData", JSON.stringify(thisList));

    postOrderTimer.current = setTimeout(async () => {
      await axios
        .put(`https://hqfxod3kld.execute-api.eu-north-1.amazonaws.com/Prod/list/update`, {
          username: "mambans",
          listItems: { type: "default", items: thisList },
          listName: listName,
        })
        .catch(e => {
          console.log("TCL: e", e);
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
          <Form.Control type='text' placeholder='Lord of the rings...' {...bindItem} />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Add
        </Button>
      </StyledAddForm>

      <StyledList height={950}>
        <TransitionGroup component={null}>
          {thisList.map((item, idx) => {
            return (
              <CSSTransition key={item} timeout={1000} classNames='fadeDown-small-1s' unmountOnExit>
                <DefaultItem
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
    </StyledContainer>
  );
};
