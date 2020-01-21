import styled from "styled-components";
import { ic_delete } from "react-icons-kit/md/ic_delete";
import { ic_drag_handle } from "react-icons-kit/md/ic_drag_handle";
import { Icon } from "react-icons-kit";
import { Form, Alert } from "react-bootstrap";

// const StyledListContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   background-color: rgb(24, 24, 24);
//   min-height: 100vh;
// `;

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

const ListDeleteIcon = styled(Icon).attrs({ icon: ic_delete, size: 18 })`
  color: darkred;
  cursor: pointer;
  position: absolute;
  left: 0;
  opacity: 0;
  z-index: 10;
  margin-left: 3px;
  height: inherit;
  align-items: center;
  display: flex !important;
  transition: all 300ms;

  &:hover {
    color: red;
    opacity: 1;
  }
`;

const MoveIcon = styled(Icon).attrs({ icon: ic_drag_handle, size: 30 })`
  color: white;
  margin-right: 15px;
  cursor: pointer;
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

    /* #rottentomatoes {
      grid-area: rotten;
    } */

    #internetmoviedatabase {
      /* grid-area: imdb; */
      /* object-fit: cover; */

      p {
        margin: 0;
        opacity: 0.7;
        font-size: 0.95em;
      }
    }

    /* #metacritic {
      grid-area: meta;
    } */
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

const StyledAddForm = styled(Form)`
  display: grid;
  grid-template-areas: "error error error" "sort input button";
  /* grid-template-columns: 5% 78% 10%;
  grid-gap: 2%; */
  grid-template-columns: 18% 70% 10%;
  grid-gap: 1%;
  margin-bottom: 20px;

  /* ul {
    color: white;
    position: absolute;
    margin-top: 76px;
    width: 598px;
    overflow: hidden;
    z-index: 5;
    padding-top: 10px;
    padding-left: 0px;
    list-style: none;
    font-weight: bold;
    color: #676767;

    li {
      height: calc(1.5em + 0.75rem + 2px);
      padding: 0.375rem 0.75rem;
      border-bottom: 1px solid #d5d5d5;
    }
  } */

  .form-group {
    grid-area: input;
    margin: 0;
  }

  button[type="submit"] {
    grid-area: button;
  }
`;

// const StyledSearchSuggestionList = styled.ul`
//   color: red;
//   position: absolute;
//   margin-top: 76px;
//   width: 600px;
//   overflow: hidden;
//   z-index: 5;

//   li {
//     cursor: pointer;
//   }
// `;

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

  button {
    padding: 0 !important;
  }
`;

const StyledLoadingContainer = styled.div`
  justify-content: center;
  display: grid;
  transition: all 2s ease-in;
  justify-items: center;

  h1 {
    color: ${props => props.color || "grey"};
    text-align: center;
    font-size: ${props => props.fontSize || "2.5rem"};
  }
`;

const StyledCenterContainer = styled.div`
  width: 100vw;
  height: 100vh;
  justify-content: center;
  display: flex;
  align-items: center;
  /* margin-top: -100px; */
`;

const StyledSidebar = styled.ul`
  color: rgb(240, 240, 240);
  padding: 0;
  list-style: none;
  text-align: center;
  /* margin-top: calc(68px + 42px); */
  box-shadow: 2px 0px 4px #64646452;
  grid-area: sidebar;
  margin: 0;
  height: ${props => props.height - 110}px;

  @media screen and (max-width: 1920px) {
    max-height: 81%;
  }

  #sidebarHeader {
    font-weight: bold;
    /* border-bottom: 2px solid black; */
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    margin-bottom: 20px;
    font-size: 1.1rem;
    /* box-shadow: 0px 2px 3px black; */
    /* box-shadow: 1px 1px 1px #ffffff70; */
    border-bottom: 1px solid #6b6b6b70;

    i {
      padding-right: 5px;
    }
  }
`;

const StyledSidarbarAddList = styled.li`
  /* padding: 10px 10px; */
  transition: all 300ms;
  box-shadow: 0px 2px 0px #ffffff70;
  font-weight: bold;
  cursor: pointer;
  /* color: rgb(220, 220, 220); */
  color: ${props => (props.active ? "white" : "rgb(220, 220, 220)")};

  min-height: 50px;
  align-content: center;
  display: grid;

  /* display: flex;
  align-items: center;
  justify-content: center; */

  i {
    color: inherit;
  }

  select {
    margin-bottom: 10px;
    text-transform: capitalize;

    option {
      text-transform: capitalize;
    }
  }

  label {
    font-size: 0.85rem;
  }

  button#toggleAdd {
    padding: 12px 10px;
    background: none;
    border: none;
    color: white;
    outline: none;
    font-size: 0.85rem;
  }

  button#submit {
    margin-bottom: 5px;
    width: 50%;
  }

  &:hover {
    /* background: rgb(35, 35, 35); */
    /* padding: 15px 10px; */
    font-size: 1.05rem;
    box-shadow: 0px 2px 0px #c0c0c0;
    color: white;
  }
`;

const StyledSidarbarItem = styled.li`
  /* padding: 13px 10px; */
  transition: all 300ms;
  box-shadow: 0px 2px 0px #ffffff70;
  font-weight: bold;
  cursor: pointer;
  /* color: rgb(220, 220, 220); */
  color: ${props => (props.active ? "white" : "rgb(220, 220, 220)")};

  height: 50px;
  align-content: center;
  display: grid;

  /* display: flex;
  align-items: center;
  justify-content: center; */

  i.arrow {
    padding-left: ${props => (props.active ? "25px" : "5px")};
    transition: all 200ms;
    position: absolute;
    color: inherit;
  }

  input {
    width: 100%;
  }

  &:hover {
    /* background: rgb(35, 35, 35); */
    /* padding: 15px 10px; */
    font-size: 1.05rem;
    box-shadow: 0px 2px 0px #c0c0c0;
    color: white;

    i.delete {
      opacity: 0.5;
    }
  }
`;

const StyledMainContainer = styled.div`
  background: rgb(24, 24, 24);
  width: ${props => props.width || 1000}px;
  height: ${props => props.height || 800}px;
  border-radius: 10px;
  display: grid;
  /* grid-template-areas: "sidebar list";
  grid-template-columns: 200px auto;
  padding-right: 10px; */

  grid-template-areas: "logo list" "sidebar list";
  grid-template-columns: 200px auto;
  grid-template-rows: calc(68px + 42px) auto;
  padding-right: 10px;
  max-height: calc(88%);

  top: 7%;
  position: absolute;

  @media screen and (max-width: 1920px) {
    top: 5%;
  }

  #logo {
    grid-area: logo;
    margin: 0;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      /* width: 96px; */
      height: 90px;
      /* border-radius: 50%; */
    }
  }
`;

const StyledRightListContainer = styled.div`
  height: ${props => props.height || 800 - 10}px;
  overflow: hidden;
  /* transition: all 1s; */
  grid-area: list;

  @media screen and (max-width: 1920px) {
    max-height: calc(100vh - 13%);
  }

  /* ul {
    padding: 5px;
    list-style: none;
    scrollbar-color: rgb(54, 54, 54) rgb(24, 24, 24) !important;
    scrollbar-width: thin !important;
    height: ${props => props.height - 170 || 800 - 165}px;
    padding-left: 0;

    @media screen and (max-width: 1920px) {
      max-height: calc((100vh - 13%) - 168px);
    }

    li {
      box-shadow: 0px 2px 0px #ffffff70;
    }
  } */
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

  width: calc((1200px - 220px) * 0.18);

  li {
    border-top: 1px solid #b7b7b7;
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

export {
  // StyledListContainer,
  StyledContainer,
  DeleteIcon,
  StyledAddForm,
  StyledListItem,
  StyledSimpleListItem,
  // StyledSearchSuggestionList,
  StyledList,
  StyledAlert,
  StyledErrorPlaceholder,
  MoveIcon,
  StyledLoadingContainer,
  StyledSidebar,
  StyledCenterContainer,
  StyledMainContainer,
  StyledRightListContainer,
  StyledSidarbarItem,
  StyledSortDropdown,
  ListDeleteIcon,
  StyledSidarbarAddList,
  StyledTextArea,
};
