import './App.css';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import React, { useState } from 'react'
import { format } from 'date-fns'
import pt from 'date-fns/locale/pt'

const todos = []
const App = () => {

  const [startDate, setStartDate] = useState(new Date());
  const [form, setForm] = useState({
      nomeTodo: null,
      dataTodo: format(startDate, 'dd/MM/yyyy'),
  });
  
  const submitAddTodo = (form) => {
      if(!!form){
        console.log(form)
        todos.push(form);
        localStorage.setItem('todos', JSON.stringify(todos));
      }
  }
  
  const todoList = JSON.parse(localStorage.getItem('todos'));
 
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
                  {!!todoList.length && todoList.map((todo, key) => (
                      <tr key={key}> 
                          <td> { todo.nomeTodo}  </td> 
                          <td> { todo.dataTodo} </td> 
                          <td style={{ textAlign:'center' }}> 
                            <button type="button" className="btn btn-primary"> X </button> 
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
