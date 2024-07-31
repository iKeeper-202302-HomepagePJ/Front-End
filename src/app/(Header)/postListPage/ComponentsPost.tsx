'use client';
import "../../css/todo.css";
import axios, { all } from 'axios';

import { useState, useEffect } from "react";

interface postData {                     // json으로 받는 객체 타입 정의
    id: number;
    catetory: number;
    user: string;
    title: string;
    headline: string;
    timestamp: string;
    rewriteTimestamp: string;
    postRewriteTimestamp: string;
    postComments: number;
    postContent: string;
}