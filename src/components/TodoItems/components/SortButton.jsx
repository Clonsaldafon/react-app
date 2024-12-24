import React from "react";
import styled from "styled-components";

const Button = styled.button`
    background-color: #08457E;
    color: white;
    font-weight: bold;
    padding: 8px;
    border-radius: 16px;
`;

export const SortButton = ({onClick}) => {
    return <Button onClick={onClick}>Сортировать</Button>;
};