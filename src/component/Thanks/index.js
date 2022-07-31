/** @jsxImportSource @emotion/react */
import React from "react";
import {css} from '@emotion/react';
import {useNavigate} from "react-router-dom";

function Thanks() {
  const navigate = useNavigate();

  const clickHandler = () => {
    localStorage.removeItem('judy');
    navigate("/");
  };

  return (
    <div css={css`
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-flow: column;
    `}>
      <div css={css`
      margin-bottom: 30px;
      font-size: 30px;
    `}>응답해주셔서 고오맙습니다아!</div>
      <div>
        <img src="./judyhi.gif" alt="thanks" css={css`
          width: 100%;
          max-width: 500px;
        `}/>
      </div>
      <div css={css`
        margin: 30px;
        font-size: 30px;
      `}>
        ~~ 곧 봐요오 ~~
      </div>
      <input type="button" value={"다시 제출하기"} onClick={clickHandler} css={css`
        width: 300px;
        background: #f7d1ec;
        font-weight: 700;
        border: none;
        height: 48px;
        margin-top: 10px;
      `}/>
    </div>
  );
}

export default Thanks;
