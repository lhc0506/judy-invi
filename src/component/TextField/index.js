/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import React from 'react';

const TextField = React.forwardRef(
  ({name, placeholder, onChange, type = 'text'}, ref) => {
    return (
      <>
        <div
          css={css`
            width: 300px;
          `}
        >{name}</div>
        <input
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          required
          css={css`
            background: #F2F2F2;
            border: none;
            width: ${name === "Name" ? "160px" : "300px"};
            height: 50px;
            padding-left: 10px;
            margin: 10px;
          `}
        />
      </>
    )
  }
);

export default React.memo(TextField);