import React, {useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleCheck, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  //            Tasks (ToDo List) State
  const [toDo, setToDo] = useState([]);
  const [holdtoDo, setHold] = useState(toDo);
  const [sortTag, setTag] = useState('Task ID');

  // DATE
  const [date1, setDate] = useState('');
  const dateInputRef = useRef(null);

  const handleChange = (e) => {
    var temp = convertDate(e.target.value);
    setDate(temp);
};
function convertDate(dateN){
  const mon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var m = mon[parseInt(dateN.substring(5,7))+1];
  var final = m +" "+ dateN.substring(8,10) + ", " + dateN.substring(0,4);
  return final;
};
// DATE END
  //                Temp State
  const [newTask, setNewTask] = useState('');
  //const [newFilt, setFilt] = useState('');
  const [updateData, setUpdateData] = useState('');

  //                Add task 
  const addTask = () => {
    if(newTask) {
      let num = toDo.length + 1; 
      let newEntry = {id: num, title: newTask, date: date1,status: false}
      setToDo([...toDo, newEntry]);
      setHold([...toDo, newEntry]);
      setNewTask('');
    }
  }
  
  //              Filter tasks
  const filterTask = () => {
    var newTodo = holdtoDo.filter(function (a) {
      return a.title.toUpperCase().includes(newTask.toUpperCase());
    });
    setToDo(newTodo);
  }
  const filterTaskA = () => {
    setToDo(holdtoDo);
  }
  const filterTaskD = () => {
    var newTodo = holdtoDo.filter(function (a) {
      return a.status===true;
    });
    setToDo(newTodo);
  }
  const filterTaskP = () => {
    var newTodo = holdtoDo.filter(function (a) {
      return a.status===false;
    });
    setToDo(newTodo);
  }
  const sortNum = () => {
    var newTodo = [];
    Object.assign(newTodo, toDo);
    newTodo.sort((a, b) => a.id > b.id ? 1 : -1)
    setToDo(newTodo);
    setTag('Task ID');
  }

  const sortTask = () => {
    var newTodo = [];
    Object.assign(newTodo, toDo);
    newTodo.sort((a, b) => a.title > b.title ? 1 : -1)
    setToDo(newTodo);
    setTag('Task Title');
  }

  const sortDate = (sort) => {
    var newTodo = [];
    Object.assign(newTodo, toDo);
    newTodo.sort((a, b) => a.date > b.date ? 1 : -1)
    setToDo(newTodo);
    setTag('Task Date');
  }

  const deleteTask = (id) => {
    let newTasks = toDo.filter((task) => task.id !== id);
    setToDo(newTasks);
    setHold(newTasks);
  }

  //          Mark Task done or pending

  const setDone = (id) => {
    const newTasks = toDo.map((task) => {
      if (task.id === id){
        return ({ ...task, status: !task.status })
      }
      return task;
    });
    setToDo(newTasks);
    setHold(newTasks);
  }

  const cancelUpdate = () => {
    setUpdateData('');
  }

  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      date: date1,
      status: updateData.status ? true : false
    }
    setUpdateData(newEntry);
  }

//                  EDIT/UPDATE TASK

  const updateTask = () => {
    let filterRecords = [...toDo].filter( task=>task.id !== updateData.id);
    let updatedObject = [...filterRecords, updateData];
    setToDo(updatedObject);
    setHold(updatedObject);
    setUpdateData('');
  }
  const backStyle = {
        color: 'maroon'
    };
  
  return (
    <div className="container App">
      
      <br /><br />
      <h2>Appointments</h2>
      <br /><br />
      
      {updateData && updateData ? (
        <>
          <div className="row">
            <div className="col-lg">
              <input 
                value={updateData && updateData.title}
                onChange={ (e) => changeTask(e) } 
                className="form-control form-control-lg" 
              />
            </div>
            <div className="col-auto">
            <input
                type="date"
                onChange={handleChange}
                ref={dateInputRef}
                className="form-control form-control-lg" 
              />
              <p>Selected Date: {date1}</p>
            </div>
            <div className="col-auto">
              <button 
                className="btn btn-lg btn-success mr-20" 
                // onClick={updateTask}
                onClick={() => { if (window.confirm('Save changes?')) updateTask() } }
              >Update</button>
              <button 
                className="btn btn-lg btn-warning" 
                onClick={cancelUpdate}
              >Cancel</button>
            </div>
          </div>
          <br />
        </>
      ) : (
        <>
          <div className="row">
            <div className="col-lg">
              <input 
                value={newTask} 
                onChange={e => setNewTask(e.target.value)} 
                className="form-control form-control-lg" 
              />
            </div>
            <div className="col-auto">
              <input
                type="date"
                onChange={handleChange}
                ref={dateInputRef}
                className="form-control form-control-lg" 
              />
              <p>Selected Date: {date1}</p>
            </div>
            <div className="col-auto">
              <button 
                className="btn btn-lg btn-success mr-20" 
                onClick={addTask}
              >Add Task</button>
              <button className="btn btn-lg btn-success" onClick={filterTask}>
                <span title="Filter tasks">
                  Filter
                </span>
                </button>
            </div>
          </div>
          <br />
        </>
      )}
      <div className="headerBg">
        <div className="col-auto">
        <button 
            className="btn btn-lg btn-success mr-20" 
            onClick={() => sortNum()}
          >
            Sort by #
          </button>
          <button 
            className="btn btn-lg btn-success mr-20" 
            onClick={() =>sortTask()}
          >
            Sort by Task Name
          </button>
          <button 
            className="btn btn-lg btn-success mr-20" 
            onClick={() => sortDate()}
          >
            Sort by Date
          </button>
          <button 
            className="btn btn-lg btn-success mr-20"
            onClick={() => filterTaskD()}
          >
            Show Done
          </button>
          <button
            className="btn btn-lg btn-success mr-20"
            onClick={() => filterTaskP()}
          >
            Show Pending
          </button>
          <button
            className="btn btn-lg btn-success"
            onClick={() => filterTaskA()}
          >
            Show All
          </button>
        </div>
      </div>

      {/* If there are no to dos in state, display a message   */}
      {toDo && toDo.length ? '' : ("You have no appointments. Click \"Add Task\" to add a new one.")}
      
      {/* Show to dos   */}
      {/* {srt.tag === "id" ? <h1>{srt.tag}</h1>: <h1>asedas</h1>} */}
      {toDo && toDo.length ? (<p>Currently sorted by {sortTag}</p>) : ''}
      
      {toDo && toDo.map( (task, index) => {
        return(
          <React.Fragment key={task.id}>
          
            <div className="col taskBg">
              
              <div 
                // if task status is true, add class to this div named as done
                className={ task.status ? 'done' : '' }
              >
                {/* Show number of task */}
                <span className="taskNumber">{task.id}</span> 
                <span className="taskText">{task.title + '  :  ' + task.date}</span>
              </div>

              <div className="iconsWrap">
                {task.status ? null : (
                  <span
                    title="Edit"
                    onClick={ () => setUpdateData({ id: task.id, title: task.title, date: date1, status: task.status ? true : false }) }
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </span>
                )}
                <span 
                  // onClick={() => deleteTask(task.id)}
                  onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteTask(task.id) } }
                  title="Delete"
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </span>
                <span
                  onClick={(e) => setDone(task.id)}
                  title="Status"
                >
                  {task.status ? (<FontAwesomeIcon icon={faCircleCheck} />):(<FontAwesomeIcon icon={faCircle} />)}  
                </span>


              </div>

            </div>
                     
        </React.Fragment>
        );
      })}
      {/* SIGN OUT BUTTON */}
      <div className="Back">
          <Link style={backStyle}  to='/'>Sign Out</Link>
        </div>
    </div>
  );
}

export default App;
