import styled from 'styled-components';
import { ic_delete } from 'react-icons-kit/md/ic_delete';
import Icon from 'react-icons-kit';
import { Form } from 'react-bootstrap';

export const ListDeleteIcon = styled(Icon).attrs({ icon: ic_delete, size: 18 })`
  color: darkred;
  cursor: pointer;
  position: absolute;
  /* left: 0; */
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

export const StyledLoadingContainer = styled.div`
  justify-content: center;
  display: grid;
  transition: all 2s ease-in;
  justify-items: center;

  h1 {
    color: ${({ color }) => color || 'grey'};
    text-align: center;
    font-size: ${({ fontSize }) => fontSize || '2.5rem'};
  }
`;

export const StyledCenterContainer = styled.div`
  width: 100vw;
  height: 100vh;
  justify-content: center;
  display: flex;
  align-items: center;
  /* margin-top: -100px; */
`;

export const StyledSidebar = styled.ul`
  color: rgb(240, 240, 240);
  padding: 0;
  list-style: none;
  text-align: center;
  box-shadow: 2px 0px 4px #64646452;
  grid-area: sidebar;
  margin: 0;
  height: 100%;

  #sidebarUsername {
    font-weight: bold;
    height: calc(1.5em + 0.75rem + 2px);
    margin-bottom: 0;
    font-size: 1.1rem;
    border-bottom: 1px solid #6b6b6b70;
    background-image: linear-gradient(
      141deg,
      rgb(46, 62, 55) 0%,
      rgb(24, 91, 98) 51%,
      rgb(15, 71, 92) 75%
    );
    display: grid;
    grid-template-areas: "logout name padding";
    grid-template-columns: 10% auto 10%;
    align-items: center;

    &:hover {
      i#logout {
        opacity: 1;
      }
    }

    p {
      grid-area: "name";
      margin: 0;
    }

    i {
      padding-right: 5px;
      color: white;
    }

    i#logout {
      color: grey;
      cursor: pointer;
      opacity: 0.25;
      z-index: 10;
      margin-left: 3px;
      -webkit-transition: all 300ms;
      transition: all 300ms;
      grid-area: "logout";

      &:hover {
        color: white;
      }
    }
  }
  #sidebarHeader {
    margin-bottom: 0;
    font-size: 0.9rem;
    border-bottom: 1px solid #6b6b6b70;

    i {
      padding-right: 5px;
    }
  }
`;

export const StyledSidarbarAddListBackdrop = styled.div`
  height: calc(100% - ${({ nrLists }) => nrLists}px);
`;

export const StyledSidarbarAddList = styled.li`
  transition: all 300ms;
  box-shadow: 0px 2px 0px #ffffff70;
  font-weight: bold;
  cursor: pointer;
  color: ${({ active }) => (active ? 'white' : 'rgb(220, 220, 220)')};

  min-height: 50px;
  align-content: center;
  display: grid;

  i {
    color: inherit;
    position: relative;
    padding-left: 5px;
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

  button {
    transition: all 300ms;
  }

  button#toggleAdd {
    padding: 12px 10px;
    background: none;
    border: none;
    color: white;
    outline: none;
    font-size: 0.85rem;

    &:hover {
      font-weight: bold;
      color: white;
    }
  }

  button#submit {
    margin-bottom: 5px;
    width: 50%;
  }

  &:hover {
    font-weight: bold;
    box-shadow: 0px 2px 0px #c0c0c0;
    color: white;
  }
`;

export const StyledSidarbarItem = styled.li`
  transition: all 300ms;
  box-shadow: 0px 2px 0px #ffffff70;
  cursor: pointer;
  color: ${({ active }) => (active ? 'white' : 'rgb(220, 220, 220)')};
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  height: 50px;
  align-content: center;
  display: grid;

  #button {
    width: 90%;
    margin-left: 10%;
    text-align: left;
    padding-left: 40px;
    height: inherit;
    align-items: center;
    display: flex;
  }

  i.arrow {
    padding-left: ${({ active }) => (active ? '25px' : '5px')};
    transition: all 200ms;
    position: absolute;
    color: inherit;
  }

  input {
    width: 100%;
  }

  &:hover {
    font-weight: bold;
    box-shadow: 0px 2px 0px #c0c0c0;
    color: white;

    i.delete {
      opacity: 0.5;
    }
  }
`;

export const StyledMainContainer = styled.div`
  /* background: rgb(24, 24, 24); */
  background: var(--backgroundDark);
  width: ${({ width }) => width || 1200}px;
  max-width: 80%;
  height: ${({ height }) => height || '800px'};
  border-radius: 10px;
  display: grid;

  grid-template-areas: "logo list" "sidebar list";
  grid-template-columns: minmax(150px, 20%) auto;
  grid-template-rows: calc(68px + 42px) auto;
  padding-right: 10px;

  #logo {
    grid-area: logo;
    margin: 0;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      height: 90px;
    }
  }
`;

export const StyledRightListContainer = styled.div`
  height: 100%;
  overflow: hidden;
  /* transition: all 1s; */
  grid-area: list;

  color: rgb(240, 240, 240);
  padding-left: 10px;
  padding-right: 1px;

  h1 {
    text-align: center;
    margin: 0;
    padding: 10px;
    color: var(--color1);
  }
`;

export const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  flex-flow: column;
  height: 150px;

  div {
    text-align: center;
    height: 100%;
    width: 50%;
    margin: auto;
    margin-top: 110px;
  }

  label {
    color: white;
  }

  input {
    margin: 5px 0 10px 0;
  }
`;

export const NoListsAlert = styled.div`
  height: 202px;
  align-items: center;
  display: flex;
  justify-content: center;
  border-bottom: 2px solid #c98a18;

  h1 {
    font-size: 3.5rem;
    color: white;
    font-family: Verdana, Geneva, sans-serif;
    text-decoration: #c98a18 underline solid;
  }
`;

export const WelcomeMessage = styled.div`
  height: 200px;
  color: var(--color2);
  font-size: 1.4rem;
  text-align: center;

  h1 {
    color: var(--color1);
    height: 110px;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
