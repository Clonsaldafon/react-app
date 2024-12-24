import React, {useEffect, useState} from 'react';
import {TodoItemsContainer} from './TodoItemsContainer';
import {NewTodoItem} from '../TodoItem/NewTodoItem';
import {TodoItem} from '../TodoItem/TodoItem';
import {useData} from '../../data/hooks/useData';
import {SearchInput} from './components/SearchInput';
import { SortButton } from './components/SortButton';

export const TodoItems = () => {
  const [searchValue, setSearchValue] = useState('');
  const [sortedItems, setSortedItems] = useState(null);

  const {data: todoItems, isLoading} = useData();

  useEffect(() => {
    if (sortedItems) {
      const filteredBySearchItems = todoItems.filter((todoItem) => {
        const clearedTodoItemTitle = todoItem.title.replaceAll(' ', '').toLowerCase();
        const clearedSearchValue = searchValue.replaceAll(' ', '').toLowerCase();
    
        const isSearched = clearedTodoItemTitle.indexOf(clearedSearchValue) !== -1;
        
        return isSearched;
      });

      setSortedItems(filteredBySearchItems.sort((a, b) => a.priority - b.priority));
    }
  }, [todoItems]);

  if (!todoItems || isLoading) {
    return (
      <TodoItemsContainer>
        Загрузка данных...
      </TodoItemsContainer>
    );
  }

  const filteredBySearchItems = todoItems.filter((todoItem) => {
    const clearedTodoItemTitle = todoItem.title.replaceAll(' ', '').toLowerCase();
    const clearedSearchValue = searchValue.replaceAll(' ', '').toLowerCase();

    const isSearched = clearedTodoItemTitle.indexOf(clearedSearchValue) !== -1;
    
    return isSearched;
  });

  const onSortByPriorityClicked = () => {
    setSortedItems(filteredBySearchItems.sort((a, b) => a.priority - b.priority));
  };

  const todoItemsElements = sortedItems ? sortedItems.map((item, index) => {
    return <TodoItem key={item.id} id={item.id} title={item.title} checked={item.isDone} priority={item.priority} />;
  }) : filteredBySearchItems.map((item, index) => {
    return <TodoItem key={item.id} id={item.id} title={item.title} checked={item.isDone} priority={item.priority} />;
  });

  return (
    <TodoItemsContainer>
      <SearchInput value={searchValue} setValue={setSearchValue} setSortedItems={setSortedItems}/>
      {todoItemsElements.length > 1 ? <SortButton onClick={onSortByPriorityClicked} /> : ''}
      {todoItemsElements}
      <NewTodoItem />
    </TodoItemsContainer>
  );
};