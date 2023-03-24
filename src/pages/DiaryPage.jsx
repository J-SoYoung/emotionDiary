import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import { MyButton } from "../components/MyButton";
import { MyHeader } from "../components/MyHeader";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotionList";

export const DiaryPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState("");

  useEffect(() => {
    if (diaryList.length > 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert("없는 페이지입니다");
        navigate("/", { replace: true });
      }
    }
  }, [diaryList, id]);

  const curEmotionData = emotionList.filter(
    (it) => parseInt(it.emotion_id) === parseInt(data.id)
  );

  if (!data) {
    return <div>로딩중입니다...</div>;
  }
  return (
    <div className="DiaryPage">
      <MyHeader
        headText={`${getStringDate(new Date(data.date))} 기록`}
        leftChild={
          <MyButton
            text={"< 뒤로가기"}
            onClick={() => {
              navigate(-1);
            }}
          />
        }
        rightChild={
          <MyButton
            text={"수정하기"}
            onClick={() => {
              navigate(`/edit/${data.id}`);
            }}
          />
        }
      />
      <article>
        <section>
          <h4>오늘의 감정</h4>
          <div
            className={[
              "diary_img_wrapper",
              `diary_img_wrapper_${data.emotion}`,
            ].join(" ")}
          >
            <img src={curEmotionData[0].emotion_img} />
            <div className="emotion_desc">
              {curEmotionData[0].emotion_descript}
            </div>
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="diary_content_wrapper">
            <p>{data.content}</p>
          </div>
        </section>
      </article>
    </div>
  );
};
