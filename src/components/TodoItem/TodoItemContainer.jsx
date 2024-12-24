import styled from 'styled-components';

const Root = styled.div `
  display: flex;
  gap: 9px;
  align-items: center;
  padding: 8px 0px 8px 8px;
  border-radius: 16px;
`;

export const TodoItemContainer = ({children, style}) => {
  return <Root style={style}>{children}</Root>;
};