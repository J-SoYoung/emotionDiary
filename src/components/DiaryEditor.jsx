import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DiaryDiapatchContext } from "../App";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotionList";
import { EmotionItem } from "./EmotionItem";
import { MyButton } from "./MyButton";
import { MyHeader } from "./MyHeader";

export const DiaryEditor = ({ isEdit, originData }) => {
  const navigate = useNavigate();
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3);

  useEffect(() => {
    if (isEdit) {
      setContent(originData.content);
      setDate(getStringDate(new Date(originData.date)));
      setEmotion(originData.emotion);
    }
  }, [isEdit, originData]);

  const handleEmotion = (emotion_id) => {
    setEmotion(emotion_id);
  };

  const { onCreate, onEdit } = useContext(DiaryDiapatchContext);
  const handleSubmit = () => {
    if (content < 1) {
      contentRef.current.focus();
      return;
    }
    if (!isEdit) {
      onCreate(date, content, emotion);
      console.log("작성", date, content, emotion);
    } else {
      onEdit(originData.id, date, content, emotion);
      console.log(originData.id, date, content, emotion, "수정");
    }
    navigate("/", { replace: true });
  };

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새로운 일기쓰기"}
        leftChild={
          <MyButton
            text={"< 뒤로가기"}
            onClick={() => {
              navigate(-1);
            }}
          />
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              value={date || ""}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleEmotion}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요"
              value={content}
              ref={contentRef}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text={"취소하기"} onClick={() => navigate(-1)} />

            <MyButton
              text={isEdit ? "수정완료" : "작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};
