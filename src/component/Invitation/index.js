/** @jsxImportSource @emotion/react */

import React, { useEffect } from "react";
import useInput from "../../hook/useInput";
import axios from "axios";

import TextField from "../TextField";
import {css} from '@emotion/react';
import {useNavigate} from "react-router-dom";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "farewell-judy.firebaseapp.com",
  projectId: "farewell-judy",
  storageBucket: "farewell-judy.appspot.com",
  messagingSenderId: "670214980728",
  appId: "1:670214980728:web:7139bfea5587dae72d198d",
  measurementId: "G-J0VGPDBSDZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Invitaion() {
  const [firstName, onChangeFirstName] = useInput('');
  const [lastName, onChangeLastName] = useInput('');
  const [number, onChangeNumber] = useInput('');
  const [time, onChangeTime] = useInput('');
  const [invitation, onChangeInvitation] = useInput('');
  const [message, onChangeMessage] = useInput('');


  const notionKey = process.env.REACT_APP_NOTION_KEY;
  const notionDatabaseKey = process.env.REACT_APP_NOTION_DATABASE_KEY;

  const navgiate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    postData();

    localStorage.setItem("judy","true")
    navgiate("/thanks");
  };

  const isSubmitted = localStorage.getItem("judy");

  async function postData() {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        firstName, lastName, number, time, invitation, message
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      return navgiate("/thanks");
    }
  }, [isSubmitted, navgiate]);

  // async function postData() {
  //   try {
  //     const result = await axios.post(
  //       "https://cors-anywhere.herokuapp.com/https://api.notion.com/v1/pages/",
  //       {
  //         "parent": { "database_id": notionDatabaseKey},
  //         "properties": {
  //           "이름": {
  //             "title": [
  //               {
  //                 "text": {
  //                   "content": lastName + firstName
  //                 }
  //               }
  //             ]
  //           },
  //           "Number": {
  //             "rich_text": [
  //               {
  //                 "type": "text",
  //                 "text": {
  //                   "content": number
  //                 }
  //               }
  //             ]
  //           },
  //           "Time": {
  //             "rich_text": [
  //               {
  //                 "type": "text",
  //                 "text": {
  //                   "content": time
  //                 }
  //               }
  //             ]
  //           },
  //           "Invitation": {
  //             "rich_text": [
  //               {
  //                 "type": "text",
  //                 "text": {
  //                   "content": invitation
  //                 }
  //               }
  //             ]
  //           },
  //           "Message": {
  //             "rich_text": [
  //               {
  //                 "type": "text",
  //                 "text": {
  //                   "content": message
  //                 }
  //               }
  //             ]
  //           },
  //         }
  //       },
  //       {
  //         headers: {
  //           "Authorization": `Bearer ${notionKey}`,
  //           "Notion-Version": "2021-08-16"
  //         }
  //       }
  //     );
  //     console.log(result)
  //     return result;
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error();
  //   }
  // };

  return (
    <div
        css={css`
          background: #fff480;
          padding-bottom: 30px;
        `}>
      <img src="./invitation.jpeg" alt="invi"
        css={
          css`
            width: 100%;
          `
        }
      />
      <div css={css`
        margin-top: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
      `}>
        <form name="fr" onSubmit={submitHandler}>
          <div>
            <TextField name="Name" type="text" placeholder="First Name" onChange={onChangeFirstName} />
            <input name="LastName" type="text" placeholder="Last Name" onChange={onChangeLastName} required css={css`
              background: #F2F2F2;
              border: none;
              width: 110px;
              height: 50px;
              padding-left: 10px;
              margin: 10px;
          `}/>
          </div>
          <TextField name= "Number" type="text" placeholder="Phone Number" onChange={onChangeNumber} />
          <TextField name="참석 가능 시간" type="text" placeholder="날짜 및 시간" onChange={onChangeTime} />
          <TextField name="소정의 비용이 발생할 수 있습니다. 그래도 참석하시겠습니까??" type="text" placeholder="No Buja Sorry..." onChange={onChangeInvitation} />
          <TextField name="Message to Judy" type="text" placeholder="익명 아님 실명임" onChange={onChangeMessage} />
          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 10px;
            `}
          >
            <input type="submit" value={"제출하기"} css={css`
              width: 100%;
              background: #f7d1ec;
              font-weight: 700;
              border: none;
              height: 48px;
              margin-top: 10px;
            `}/>
          </div>
        </form>
      </div>
    </div>);
}
