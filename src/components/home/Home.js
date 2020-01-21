"use trict";
import { ic_chevron_right } from "react-icons-kit/md/ic_chevron_right";
import { ic_list } from "react-icons-kit/md/ic_list";
import axios from "axios";
import Icon from "react-icons-kit";
import React, { useState, useEffect } from "react";
import { ic_playlist_add } from "react-icons-kit/md/ic_playlist_add";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Button, Form } from "react-bootstrap";

import "./../transitions.scss";
import Loading from "./Loading";
import MoviesList from "./../movies/MoviesList";
import SeriesList from "./../series/SeriesList";
import DefaultList from "./../default/DefaultList";
import FreeText from "./../freeText/FreeText";
import {
  StyledSidebar,
  StyledCenterContainer,
  StyledMainContainer,
  StyledRightListContainer,
  StyledSidarbarItem,
  ListDeleteIcon,
  StyledSidarbarAddList,
} from "./../home/StyledComponents";

export default () => {
  document.title = "Watchist | Lists";
  const [listName, setListName] = useState("Movies");
  const [showAddInput, setShowAddInput] = useState(false);
  const [allLists, setAllLists] = useState();

  const listComponents = {
    default: list => {
      return <DefaultList list={list} listName={listName} />;
    },
    movie: list => {
      return <MoviesList list={list} listName={listName} />;
    },
    serie: list => {
      return <SeriesList list={list} listName={listName} />;
    },
    freetext: list => {
      return <FreeText list={list} listName={listName} />;
    },
  };

  const RenderList = (type, list) => {
    return listComponents[type || "default"](list);
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
  const { value: type, bind: bindType, reset: reseType } = useInput("");

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
        listItems: { type: type || "default", items: type === "freetext" ? "" : [] },
        listName: item,
      })
      .catch(e => {
        console.log("TCL: e", e);
      });
  };

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
                          onClick={() => {
                            setListName(name);
                          }}
                          style={{
                            width: "90%",
                            marginLeft: "10%",
                            textAlign: "left",
                            paddingLeft: "40px",
                          }}>
                          {name}
                          <Icon className='arrow' icon={ic_chevron_right} size={24}></Icon>
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
              <Icon
                style={{ position: "relative", paddingLeft: "5px" }}
                icon={ic_playlist_add}
                size={24}></Icon>
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
                {/* <input type='text' name='type' {...bindType} autoComplete='off' />
                 */}
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
        <StyledRightListContainer height={950}>
          {allLists ? (
            RenderList(allLists[listName].type, allLists[listName].items)
          ) : (
            <Loading text={"Fetching data from server.."} fontSize={"1.5rem"} />
          )}
        </StyledRightListContainer>
      </StyledMainContainer>
    </StyledCenterContainer>
  );
};
