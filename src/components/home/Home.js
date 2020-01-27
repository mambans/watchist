"use trict";
import { Button, Form } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { ic_list } from "react-icons-kit/md/ic_list";
import { ic_playlist_add } from "react-icons-kit/md/ic_playlist_add";
import axios from "axios";
import Icon from "react-icons-kit";
import React, { useState, useEffect } from "react";

import "./../transitions.scss";
import DefaultList from "./../default/DefaultList";
import FreeText from "./../freeText/FreeText";
import Loading from "./Loading";
import MoviesList from "./../movies/MoviesList";
import SeriesList from "./../series/SeriesList";
import useInput from "./../useInput";
import {
  ListDeleteIcon,
  StyledCenterContainer,
  StyledMainContainer,
  StyledRightListContainer,
  StyledSidarbarAddList,
  StyledSidarbarItem,
  StyledSidebar,
} from "./StyledComponents";

export default () => {
  document.title = "Watchist | Lists";
  const [allLists, setAllLists] = useState();
  const [listName, setListName] = useState("Movies");
  const [showAddInput, setShowAddInput] = useState(false);

  const listComponents = {
    default: list => {
      return (
        <DefaultList
          key={listName}
          list={list}
          listName={listName}
          updateLists={updateLists}
          addListItem={addListItem}
          removeListItem={removeListItem}
        />
      );
    },
    movie: list => {
      return (
        <MoviesList
          key={listName}
          list={list}
          listName={listName}
          updateLists={updateLists}
          addListItem={addListItem}
          removeListItem={removeListItem}
        />
      );
    },
    serie: list => {
      return (
        <SeriesList
          key={listName}
          list={list}
          listName={listName}
          updateLists={updateLists}
          addListItem={addListItem}
          removeListItem={removeListItem}
        />
      );
    },
    freetext: list => {
      return <FreeText key={listName} list={list} listName={listName} updateLists={updateLists} />;
    },
  };

  const RenderListComp = () => {
    if (allLists) {
      return listComponents[allLists[listName].type || "default"](allLists[listName].items);
    } else {
      return <Loading text={"Fetching data from server.."} fontSize={"1.5rem"} />;
    }
  };

  const updateLists = (listName, sortedList) => {
    const lists = { ...allLists };

    lists[listName].items = sortedList;

    setAllLists(lists);
  };

  const addListItem = async (listName, item, p_type) => {
    const lists = { ...allLists };
    lists[listName].items.push(item);

    setAllLists(lists);

    await axios
      .put(`https://hqfxod3kld.execute-api.eu-north-1.amazonaws.com/Prod/list/update`, {
        username: "mambans",
        listItems: { type: p_type, items: lists[listName].items },
        listName: listName,
      })
      .catch(e => {
        console.error(e);
      });
  };

  const removeListItem = async (listName, p_item, p_type) => {
    const lists = { ...allLists };
    const newList = lists[listName].items.filter(item => {
      return (item.Title || item).toLowerCase() !== p_item.toLowerCase();
    });
    lists[listName].items = newList;

    setAllLists(lists);

    await axios
      .put(`https://hqfxod3kld.execute-api.eu-north-1.amazonaws.com/Prod/list/update`, {
        username: "mambans",
        listItems: { type: p_type, items: newList },
        listName: listName,
      })
      .catch(e => {
        console.log("TCL: e", e);
      });
  };

  const fetchLists = async () => {
    await axios
      .get(`https://hqfxod3kld.execute-api.eu-north-1.amazonaws.com/Prod/list`, {
        params: {
          username: "mambans",
        },
      })
      .then(res => {
        const lists = res.data.Items[0];
        delete lists.Username;
        setAllLists(lists);

        localStorage.setItem("allLists", JSON.stringify(lists));
      })
      .catch(e => {
        console.error(e);
        if (localStorage.getItem("allLists")) {
          setAllLists(JSON.parse(localStorage.getItem("allLists")));
        }
      });
  };

  const { value: item, bind: bindItem, reset: reseItem } = useInput("");
  const { value: type, bind: bindType, reset: reseType } = useInput("");

  const deleteList = async p_list => {
    const confirm = window.confirm(`Delete ${p_list}`);
    if (confirm) {
      if (p_list === listName) {
        const index =
          Object.keys(allLists).indexOf(p_list) === 0
            ? 1
            : Object.keys(allLists).indexOf(p_list) - 1;

        setListName(Object.keys(allLists)[index]);
      }
      console.log("Deleted " + p_list);
      delete allLists[p_list];
      setAllLists({ ...allLists });

      await axios
        .put(`https://hqfxod3kld.execute-api.eu-north-1.amazonaws.com/Prod/list/remove`, {
          username: "mambans",
          listName: p_list,
        })
        .catch(e => {
          console.log("TCL: e", e);
        });
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();

    allLists[item] = { type: type || "default", items: [] };

    setAllLists(allLists);
    setListName(item);
    reseItem();
    reseType();
    setShowAddInput(false);

    await axios
      .put(`https://hqfxod3kld.execute-api.eu-north-1.amazonaws.com/Prod/list/update`, {
        username: "mambans",
        listItems: { type: type || "default", items: type === "freetext" ? "''" : [] },
        listName: item,
      })
      .catch(e => {
        console.log("TCL: e", e);
      });
  };

  useEffect(() => {
    // setAllLists(JSON.parse(localStorage.getItem("allLists")));
    fetchLists();
  }, []);

  return (
    <StyledCenterContainer>
      <StyledMainContainer height={950} width={1200}>
        <div id='logo'>
          <img src={`${process.env.PUBLIC_URL}/logo.png`} alt='' />
        </div>
        <StyledSidebar height={950}>
          <p id='sidebarHeader'>
            <Icon icon={ic_list} size={20}></Icon>Lists
          </p>
          <TransitionGroup component={null}>
            {allLists
              ? Object.keys(allLists).map(name => {
                  return (
                    <CSSTransition
                      key={name}
                      timeout={1000}
                      classNames='fadeDown-small-1s'
                      unmountOnExit>
                      <StyledSidarbarItem active={listName === name} key={name}>
                        <ListDeleteIcon
                          className='delete'
                          onClick={() => {
                            deleteList(name);
                          }}
                        />
                        <div
                          id='button'
                          onClick={() => {
                            setListName(name);
                          }}>
                          {name}
                        </div>
                      </StyledSidarbarItem>
                    </CSSTransition>
                  );
                })
              : null}
          </TransitionGroup>

          <StyledSidarbarAddList key={"add new list"}>
            <button
              id='toggleAdd'
              onClick={() => {
                setShowAddInput(!showAddInput);
              }}>
              Add list
              <Icon icon={ic_playlist_add} size={24}></Icon>
            </button>
            {showAddInput ? (
              <Form onSubmit={handleSubmit}>
                <Form.Control
                  type='text'
                  name='name'
                  placeholder='List name..'
                  {...bindItem}
                  autoComplete='off'
                />
                <Form.Label>Type</Form.Label>
                <Form.Control as='select' {...bindType} size='sm'>
                  {Object.keys(listComponents).map(item => {
                    return (
                      <option key={item} value={item}>
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </option>
                    );
                  })}
                </Form.Control>
                <Button type='submit' value='Submit' id='submit'>
                  Add
                </Button>
              </Form>
            ) : null}
          </StyledSidarbarAddList>
          {showAddInput ? (
            <div
              onClick={() => {
                setShowAddInput(false);
              }}
              style={{
                height: `${950 - (+270 + 110 + 50 * Object.keys(allLists).length)}px`,
              }}></div>
          ) : null}
        </StyledSidebar>
        <StyledRightListContainer height={950}>{RenderListComp()}</StyledRightListContainer>
      </StyledMainContainer>
    </StyledCenterContainer>
  );
};
