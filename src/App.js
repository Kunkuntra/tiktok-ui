import { useRef, useReducer } from 'react';
import './App.css';
// import Content from './Content.js';
// import Hello from './hello.js';

// var todoList = [];

  //init State
  const initState = {
    job:'',
    jobs: [],
  }
  //Actions
  const SET_JOB = 'set_job';
  const ADD_JOB = 'add_job';
  const DELETE_JOB = 'delete_job';

  const setJob = payload => {
    return {
      type: SET_JOB,
      payload
    }
  }
  const addJob = payload => {
    return {
      type: ADD_JOB,
      payload
    }
  }
  const deleteJob = payload => {
    return {
      type: DELETE_JOB,
      payload
    }
  }

  //Reducer
  const reducer = (state, action)=>{
      switch(action.type){
        case SET_JOB:
          return {
            ...state,
            job: action.payload
          }

        case ADD_JOB:
          return {
            ...state,
            jobs:[...state.jobs, action.payload]
          }
        
        case DELETE_JOB:
          const tg = [...state.jobs]
          tg.splice(action.payload,1)
          return {
            ...state,
            jobs:[...tg]
          } 
          
        default:
          throw new Error("Invalid action type: " + action.type)
      }
  }  

  

function App() {
  // const [countdown, setCountdown] = useState(60);
  // const timerId = useRef()
  // const state = useRef();
  // useEffect(()=>{
  //   state.current = countdown;
  //   console.log(`value: ${state.current}`);
  // },[countdown]);
  // const handleStart = () => {
  //   timerId.current = setInterval(() =>{
  //     setCountdown( prev => prev - 1);
  //   },1000)
  //   // console.log(`start: ${timerId.current}`);
  // }
  // const handleStop = () => {
  //   clearInterval( timerId.current);
  //   // console.log(`stop: ${timerId.current}`);
  // }
  const useForcus = useRef();
  const [state, dispatch] = useReducer(reducer, initState)
  const {job, jobs} = state 
  const handleAddJob = () =>{
    dispatch(addJob(job))
    dispatch(setJob(''))
    useForcus.current.focus();

  }
  return (

    <div style={{padding: '0 12px'}} className="App">
      {/* <h1>{countdown}</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <Hello /> */}


      <h1>Todo App</h1>
      <input 
        ref={useForcus}
        value={job}
        type="text" 
        placeholder='Enter todo...'
        onChange={e => {
          dispatch(setJob(e.target.value));
        }}
      />
      <button
        onClick={handleAddJob}
        >
          Add
      </button>
        <ul>
          {jobs.map((val,index) =>
            <li key={index}>{val}
              <span onClick ={()=>{
                dispatch(deleteJob(index))
              }} >&times;</span>
            </li>
          )}
        </ul>
    </div>
  );
}

export default App;
