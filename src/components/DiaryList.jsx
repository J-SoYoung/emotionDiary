import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryItem } from "./DiaryItem";
import { MyButton } from "./MyButton";

const optionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];
const emotionList = [
  { value: "all", name: "전체 감정" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "나쁜 감정만" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

export const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();

  const [sortType, setSortType] = useState("latest");
  const [emotionType, setEmotionType] = useState("all");

  const getProcessedDiaryList = () => {
    const filterCallback = (item) => {
      if (emotionType === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    // 시간순 정렬
    const copyList = JSON.parse(JSON.stringify(diaryList));
    // emotion 정렬
    const filterList =
      emotionType === "all"
        ? copyList
        : copyList.filter((it) => filterCallback(it));

    const sortedList = filterList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={optionList}
          />
          <ControlMenu
            value={emotionType}
            onChange={setEmotionType}
            optionList={emotionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            text={"새 일기쓰기"}
            type="positive"
            onClick={() => navigate("/new")}
          ></MyButton>
        </div>
      </div>

      <div>
        {getProcessedDiaryList().map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};
DiaryList.defaultProps = {
  diaryList: [],
};
