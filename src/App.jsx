import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  RecoilRoot,
  useRecoilValue,
  useSetRecoilState,
  useRecoilState,
  selector
} from 'recoil';
import { Routes, Route } from 'react-router-dom';
import { todoListState, todoListFilterState } from './atoms/atom.js'
import Weather from './query.jsx';
import MyModal from './MyModal.jsx';
////// 메인 ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㅇ
const TodoList = () => {
// ㅇㅁㄴㅇㅁㄴㅇㅁ
  const todoList = useRecoilValue(filteredTodoListState)
  
  return(
    <>
      <TodoListStats />
      <TodoListFilters />
      <TodoItemCreator />
      {todoList.map((todoItem)=>(
        <TodoItem key={todoItem.id} item={todoItem}/>
      ))}
    </>
)}
/////////
const filteredTodoListState = selector({
  key: 'filteredTodoListState',
  get: ({get}) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case 'Show Completed':
        return list.filter((item) => item.isComplete);
      case 'Show Uncompleted':
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});
////////
const TodoListFilters = () => {

  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const updateFilter = ({target: {value}}) => {
    setFilter(value)
  }

  return(
    <>
      filter:
      <select value={filter} onChange={updateFilter}>
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </select>
    </>
  )
}
////////
const todoListStatsState = selector({
  key: 'todoListStatsState',
  get: ({get}) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});
////////
function TodoListStats() {
  const {
    totalNum,
    totalCompletedNum,
    totalUncompletedNum,
    percentCompleted,
  } = useRecoilValue(todoListStatsState);

  const formattedPercentCompleted = Math.round(percentCompleted * 100);

  return (
    <ul>
      <li>Total items: {totalNum}</li>
      <li>Items completed: {totalCompletedNum}</li>
      <li>Items not completed: {totalUncompletedNum}</li>
      <li>Percent completed: {formattedPercentCompleted}</li>
    </ul>
  );
}
////////
const TodoItem = ({item}) => {
  const [todoList, setTodoList] = useRecoilState(todoListState)
  const index = todoList.findIndex((listItem) => listItem === item)
  console.log(todoList)
  const editItemText = ({target: {value}}) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: value,
    })
    setTodoList(newList)
  }

  const toggleItemCompleation = () =>{
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    })
    setTodoList(newList);
  }

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);
    setTodoList(newList);
  }

  return(
    <div>
      <input type="text" value={item.text} onChange={editItemText}/>
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={toggleItemCompleation}
      />
      <button onClick={deleteItem}>X</button>
    </div>
  )
};
//////////
const replaceItemAtIndex = (arr,index,newValue) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)]
}
///////////
function removeItemAtIndex(arr, index) {
  console.log(arr)
  console.log(...arr.slice(0, index))
  console.log(...arr.slice(index + 1))
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
//////////
const TodoItemCreator = () => {

  const [inputValue, setInputValue] = useState();
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue('');
  }

  return  (
    <div>
      <input type='text' value={inputValue || ""} onChange={(e)=>{
        setInputValue(e.target.value);
      }}/>
      <button onClick={addItem}>add</button>
    </div>
  );
}
/////////////
let id = 0;
function getId() {
  return id++;
}
////////////

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000, // 5 분마다 데이터를 다시 가져옴
      refetchOnWindowFocus: false, /// 사용자가 창에 초점을 맞출때 데이터를 가져오지 않음
    },
  },
});

function App() {
  console.log(queryClient);
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Routes>
          <Route path='/' element={<Weather/>}></Route>
          <Route path='/Todo' element={<TodoList/>}></Route>
          <Route path="/modal/:id" element={<MyModal/>} />
        </Routes>

      </RecoilRoot>
    </QueryClientProvider>
  );
}
export default App
