import "./App.css";
import React, { useReducer, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage, DiaryPage, EditPage, NewPage } from "./pages/index";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      console.log(newState);
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDiapatchContext = React.createContext();

const dummy = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의 일기1",
    date: 1679658758353,
  },
  {
    id: 2,
    emotion: 2,
    content: "오늘의 일기2",
    date: 1679658758356,
  },
  {
    id: 3,
    emotion: 3,
    content: "오늘의 일기3",
    date: 1679658758358,
  },
  {
    id: 4,
    emotion: 4,
    content: "오늘의 일기4",
    date: 1679658758360,
  },
  {
    id: 5,
    emotion: 5,
    content: "오늘의 일기5",
    date: 1679658758363,
  },
];

function App() {
  const [data, dispatch] = useReducer(reducer, dummy);
  const dataId = useRef(0);

  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  // REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };
  // EIDT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDiapatchContext.Provider
        value={{
          onCreate,
          onEdit,
          onRemove,
        }}
      >
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/new" element={<NewPage />} />
            <Route path="/edit/:id" element={<EditPage />} />
            <Route path="/diary/:id" element={<DiaryPage />} />
          </Routes>
        </div>
      </DiaryDiapatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
