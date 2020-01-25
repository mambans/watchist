import styled from "styled-components";
import { ic_delete } from "react-icons-kit/md/ic_delete";
import { ic_drag_handle } from "react-icons-kit/md/ic_drag_handle";
import Icon from "react-icons-kit";
import { Form, Alert } from "react-bootstrap";
import { search } from "react-icons-kit/icomoon/search";
import { arrowUp } from "react-icons-kit/fa/arrowUp";

const DeleteIcon = styled(Icon).attrs({ icon: ic_delete, size: 24 })`
  color: darkred;
  margin: 5px;
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 0;
  opacity: 0.7;
  z-index: 10;
  transition: all 300ms;

  &:hover {
    color: red;
    opacity: 1;
  }
`;

const MoveIcon = styled(Icon).attrs({ icon: ic_drag_handle, size: 30 })`
  color: white;
  margin-right: 15px;
  cursor: move;
  opacity: 0.7;
`;

const StyledContainer = styled.div`
  color: rgb(240, 240, 240);
  width: 100%;
  padding-left: 10px;
  height: 100%;
  padding-right: 1px;

  h1 {
    text-align: center;
    margin: 0;
    padding: 10px;
  }
`;

const StyledSimpleListItem = styled.li`
  position: relative;
  font-size: 1.2rem;
  height: 50px;
  align-items: center;
  display: flex;
  padding: 10px;
`;

const StyledListItem = styled.li`
  position: relative;
  /* border-bottom: 1px solid rgba(100, 100, 100, 0.5); */
  list-style: none;
  height: 165px;
  display: grid;

  grid-template-areas: "poster raitings title" "poster raitings details" "poster raitings actors" "poster raitings plot" "poster raitings awards";
  grid-template-columns: 109px 120px auto;
  grid-template-rows: 25% 12% 12% auto 12%;

  #poster {
    height: 100%;
    grid-area: poster;
    /* padding: 2px 0; */
    cursor: move;
    object-fit: cover;
    max-width: 109px;
    padding-bottom: 2px;
    padding-top: 4px;
  }

  .details {
    font-size: 0.75rem;
    opacity: 0.7;
    text-align: center;
    margin: 0;
  }

  #title {
    grid-area: title;
    text-align: center;
    font-size: 1.3rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    align-self: center;
  }

  #details {
    grid-area: details;
  }

  #actors {
    grid-area: actors;
  }

  #plot {
    grid-area: plot;
    font-size: 0.85rem;
    overflow: hidden;
    padding-right: 10px;
    opacity: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #awards {
    grid-area: awards;
  }

  #raitings {
    display: flex;
    grid-area: raitings;
    flex-flow: column;
    max-height: 165px;
    flex-wrap: wrap;
    padding: 5px;
    font-size: 0.8rem;

    div {
      display: flex;
      flex-flow: column;
      text-align: center;
      height: 50%;
      width: 50%;
    }

    a {
      max-height: 50%;
      object-fit: contain;

      img {
        max-height: 100%;
      }
    }

    #internetmoviedatabase {
      p {
        margin: 0;
        opacity: 0.7;
        font-size: 0.95em;
      }
    }
  }

  #seasons {
    grid-area: title-start;
    position: absolute;
    margin-left: -55px;
    margin-bottom: 0;
    font-size: 0.8rem;
    opacity: 0.7;
    height: 100%;
    align-items: center;
    display: flex;
  }

  #boxoffice {
    grid-area: title-end;
    position: absolute;
    font-size: 0.8rem;
    margin-bottom: 0;
    opacity: 0.7;
    height: 100%;
    align-items: center;
    display: flex;
    right: 0;
  }
`;

const SearchIcon = styled(Icon).attrs({ icon: search, size: 20 })`
  color: white;
  height: 20px;
  display: flex !important;
  justify-content: center;
  align-content: center;
`;

const StyledAddForm = styled(Form)`
  display: grid;
  grid-template-areas: "error error error error" "sort input button search";
  /* grid-template-columns: 5% 78% 10%;
  grid-gap: 2%; */
  grid-template-columns: 18% 70% 5% 4%;
  grid-gap: 1%;
  margin-bottom: 20px;

  .form-group {
    grid-area: input;
    margin: 0;
  }

  button[type="submit"] {
    grid-area: button;
    padding: 0;
  }

  button#searchBtn {
    grid-area: search;
    padding: 0;
  }
`;

const StyledList = styled.ul`
  padding: 0;
  overflow-y: scroll;
  max-height: calc(100vh - 165px);
  margin: 0;
  scrollbar-color: rgb(33, 53, 66) rgb(5, 8, 10) !important;
  scrollbar-width: thin !important;

  padding: 5px;
  list-style: none;
  scrollbar-color: rgb(54, 54, 54) rgb(24, 24, 24) !important;
  scrollbar-width: thin !important;
  height: ${props => props.height - 172 || 800 - 165}px;
  padding-left: 0;

  @media screen and (max-width: 1920px) {
    max-height: calc((100vh - 13%) - 168px);
  }

  li {
    box-shadow: 0px 2px 0px #ffffff70;
  }
`;

const StyledErrorPlaceholder = styled.p`
  /* margin-bottom: 10px; */
  height: 42px;
  margin: 0;
`;

const StyledAlert = styled(Alert)`
  width: 50%;
  justify-self: center;
  padding: 5px;
  text-align: center;
  font-weight: bold;
  grid-area: error;
  margin-bottom: 5px;
  height: 37px;

  button {
    padding: 0 !important;
    width: 24px;

    span {
      height: 17px !important;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const StyledTextArea = styled.textarea`
  margin-top: 10px;
  overflow-y: auto;
  resize: none;
  background: #212020;
  color: rgb(240, 240, 240);
  font-size: 1.1rem;
  border: none;
  box-shadow: 0px 0px 5px #524e4e;
  padding: 7px;
  width: 100%;
  height: 100%;
  scrollbar-color: rgb(33, 53, 66) rgb(5, 8, 10) !important;
  scrollbar-width: thin !important;
`;

const StyledSearchSuggestionList = styled.ul`
  height: ${props => props.height || "unset"};
  color: black;
  position: absolute;
  margin-top: 79px;
  width: calc((100% - 220px) * 0.7 - 0.7px);
  overflow: hidden;
  z-index: 5;
  background: white;
  padding: 10px 15px;
  list-style: none;
  border-radius: 0 0 10px 10px;
  margin-left: calc((100% - 220px) * 0.19);

  li {
    cursor: pointer;
    height: 50px;
    border-bottom: thin solid #80808054;
    padding: 2px;

    &:hover {
      background: #bebebe85;
    }

    img {
      height: 100%;
      padding-right: 5px;
    }
  }
`;

const ModalBackdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  cursor: default;
  transition: all 200ms;
`;

const ScrollToTopIcon = styled(Icon).attrs({ icon: arrowUp, size: 70 })``;

const ScrollToTopIconSmaller = styled(Icon).attrs({ icon: arrowUp, size: 30 })``;

const StyledScollToTop = styled.div`
  height: ${props => props.height || 38 + 150}px;
  /* height: calc(5% + 150px); */
  display: grid;
  grid-template-areas: "arrow gap text";
  grid-template-columns: ${props => props.gridCol || "109px 120px auto"};
  cursor: pointer;
  color: #6d6d6d;

  &:hover {
    color: #8c8c8c;
  }

  i {
    display: flex !important;
    align-items: center;
    justify-content: center;
    grid-area: arrow;
  }

  p {
    grid-area: text;
    margin: 0;
    height: 100%;
    justify-content: center;
    display: flex;
    align-items: center;
    font-size: ${props => props.fontSize};
  }
`;

export {
  StyledContainer,
  DeleteIcon,
  StyledAddForm,
  StyledListItem,
  StyledSimpleListItem,
  StyledList,
  StyledAlert,
  StyledErrorPlaceholder,
  MoveIcon,
  StyledTextArea,
  StyledSearchSuggestionList,
  SearchIcon,
  ModalBackdrop,
  ScrollToTopIcon,
  StyledScollToTop,
  // StyledScollToTopSmaller,
  ScrollToTopIconSmaller,
};
