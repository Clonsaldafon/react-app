import React, { useState } from 'react';
import styled, { css } from "styled-components"
import {TodoItemContainer} from './TodoItemContainer'
import {TodoItemCheckbox} from './TodoItemCheckbox';
import { useDeleteTodoItem } from '../../data/hooks/useData';
import { PriorityInput } from './PriorityInput';

const checkedCss = css`
  color: #B5B5BA;
  text-decoration: line-through;
`

const Title = styled.span(props => {
  return `
    width: 75%;
    overflow-wrap: break-word;
    font-size: 15px;
    ${props.checked ? checkedCss : ''};
  `;
})

const Delete = styled.span`
  display: inline-block;
  width: 13px;
  height: 13px;
  background-image: url(assets/images/png/delete.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 13px;
  cursor: pointer;
`;

export const TodoItem = ({id, title, checked, priority}) => {
  const [color, setColor] = useState(240 - 120 / priority);
  const {mutate} = useDeleteTodoItem();

  const onDeleteClicked = () => {
    const isConfirmed = window.confirm(`Вы уверены, что хотите удалить элемент ${title}?`);

    if (isConfirmed) {
      mutate({id});
    }
  };

  return (
    <TodoItemContainer style={{backgroundColor: `rgb(${color}, 0, 0)`}}>
      <TodoItemCheckbox id={id} disabled={false} checked={checked} priority={priority} />
      <PriorityInput id={id} checked={checked} priority={priority} setColor={setColor} />
      <Title checked={checked}>
        {title}
      </Title>
      <Delete onClick={onDeleteClicked}/>
    </TodoItemContainer>
  )
}
