import React, { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import { DiaryList } from "../components/DiaryList";
import { MyButton } from "../components/MyButton";
import { MyHeader } from "../components/MyHeader";

export const HomePage = () => {
  // 전체 일기 데이터
  const diaryList = useContext(DiaryStateContext);
  // 현재 월에 해당하는 일기 데이터 state
  const [data, setData] = useState([]);

  // 현재 헤더에 보이는 년,월
  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  // 현재 월에 해당하는 일기 데이터 불러오기
  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();
      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0
      ).getTime();

      setData(
        diaryList.filter(
          (diary) => firstDay <= diary.date && diary.date <= lastDay
        )
      );
    }
  }, [curDate, diaryList]);

  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };
  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text="<" onClick={decreaseMonth} />}
        rightChild={<MyButton text=">" onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};
