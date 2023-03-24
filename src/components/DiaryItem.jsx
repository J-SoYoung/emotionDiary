import React from "react";
import { useNavigate } from "react-router-dom";
import { MyButton } from "./MyButton";

export const DiaryItem = ({ id, emotion, content, date }) => {
  const strDate = new Date(parseInt(date)).toLocaleDateString();
  const navigate = useNavigate();
  const goDetail = (id) => {
    navigate(`/diary/${id}`);
  };
  const goEdit = (id) => {
    navigate(`/edit/${id}`);
  };
  return (
    <div className="DiaryItem">
      <div
        onClick={goDetail}
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
      </div>
      <div
        className="info_wrapper"
        onClick={() => {
          goDetail(id);
        }}
      >
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div className=" btn_wrapper">
        <MyButton
          text={"수정하기"}
          onClick={() => {
            goEdit(id);
          }}
        />
      </div>
    </div>
  );
};
