import './App.css';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import React, { useState } from 'react'
import { format } from 'date-fns'
import pt from 'date-fns/locale/pt'

const App = () => {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')))
  const [startDate, setStartDate] = useState(new Date());
  const [form, setForm] = useState({
      nomeTodo: null,
      dataTodo: format(startDate, 'dd/MM/yyyy'),
  });
  
  const submitAddTodo = (form) => {
      if(!!form){
          if(!!todos){
            setTodos([...todos, form]);     
          }else{
            setTodos([form]);
          }

          saveTodosStorage();
      }
  }

  const saveTodosStorage = () => {
      localStorage.setItem('todos', JSON.stringify(todos))
  }

  const deleteTodoStorage = (indexTodo) => {
      todos.splice(indexTodo, 1);

      setTodos([...todos]);
      saveTodosStorage();
  }

  registerLocale("pt", pt);
  return (
    <>
    <div className="container"> 
        <h1> TODO List-React </h1>
    </div> 

    <div className="box">
        <div className="box-header">
             <p> Adicionar To-do </p>   
        </div>
        <div className="box-body">
          <form onSubmit={e => {
              e.preventDefault()

              submitAddTodo(form);

              setForm({
                ...form,
                nomeTodo:null,
              })
          }}> 
            <div className="form-group-horizontal">
                <label> 
                    Nome: 
                    <input 
                      name="name_todo" 
                      className="form-control" 
                      value={!!form.nomeTodo ? form.nomeTodo : ""}
                      onChange={e => {
                        setForm({
                          ...form,
                          nomeTodo: e.target.value,
                        })
                      }}
                    />
                </label>

                <label> 
                    Data To-do: 
                    <DatePicker 
                      locale="pt"
                      name="data_todo" 
                      className="form-control" 
                      startDate={startDate}
                      selected={startDate}
                      dateFormat="dd/MM/yyyy"
                      onSelect={date => {
                          setStartDate(date);

                          setForm({
                            ...form,
                            dataTodo: format(date, 'dd/MM/yyyy'),
                          })
                      }}
                    />
                </label>

                <button type="submit" className="btn btn-primary">  +  </button>
            </div>
          </form>
        </div>
    </div>

    <div className="box">
        <div className="box-header">
            <p> Lista To-do(s) </p>

            <p style={{ float:'right'}}> teste </p>
        </div>
        <div className="box-body">
          <table className="table"> 
              <thead>
                <tr> 
                  <th> Nome </th>
                  <th> Data  </th>
                  <th width="15%"> Ação </th>
                </tr>
              </thead>
              <tbody>
                {!!todos && todos.map((value, index) => (
                    <tr key={index}> 
                        <td> {value.nomeTodo} </td> 
                        <td> {value.dataTodo} </td> 
                        <td style={{ textAlign: 'center' }}> 
                          <button 
                              type="submit" 
                              className="btn btn-primary"
                              onClick={e => {
                                deleteTodoStorage(index);
                              }}
                          >  
                              X   
                          </button>   
                        </td> 
                    </tr>
                  ))
                }
              </tbody> 
          </table>
        </div>
    </div>
    </>
  );
}

export default App;
