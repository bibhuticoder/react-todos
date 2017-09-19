import React, { Component } from 'react';
import './App.css';
import Todo from '../Todo/Todo.js'

class App extends Component {

    constructor(){
        super();
        this.state = {
            todos: [
                {title: "Shopping", list: ["chicken", "sausages", "kitchen stuffs"]}
            ]
        }
        this.addToTodoList = this.addToTodoList.bind(this);
        this.eachTodo = this.eachTodo.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.updateTodoList = this.updateTodoList.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.updateTitle = this.updateTitle.bind(this);
        this.cleanTodoLists = this.cleanTodoLists.bind(this);
    }

    addToTodoList(index, listItem){
        var arr = this.state.todos;
        arr[index].list.push(listItem);
        this.setState({todos: arr});
    }

    updateTodoList(indexM, indexS, value){
        var arr = this.state.todos;
        arr[indexM].list[indexS] = value;
        this.setState({todos: arr});
    }

    cleanTodoLists(index){
        var arr = this.state.todos;
        for(var i=0; i<arr[index].list.length; i++){
            if(arr[index].list[i] === "") arr[index].list.splice(i, 1);
        }
        this.setState({todos: arr});
    }

    updateTitle(index, title){
        console.log(index + title);
        var arr = this.state.todos;
        arr[index].title = title;
        this.setState({todos: arr});
    }

    addTodo(){
        var title = "New Todo";
        var arr = this.state.todos;
        arr.push({title: title, list: ["todos here..."]});
        this.setState({todos: arr});
    }

    removeTodo(index){
        var arr = this.state.todos;
        arr.splice(index, 1);
        this.setState({todos: arr});
    }

    eachTodo(item, i){
        return <Todo key={i}
                     index={i}
                     title={item.title}
                     list={item.list}
                     addListFunc={this.addToTodoList}
                     updateListFunc={this.updateTodoList}
                     updateTitleFunc={this.updateTitle}
                     removeTodoFunc={this.removeTodo}
                     cleanTodoListFunc={this.cleanTodoLists}

        ></Todo>;
    }

    render() {
      return (
          <div className="App">
              <nav className="navbar navbar-inverse">
                  <div className="container-fluid">
                      <div className="navbar-header">
                          <a className="navbar-brand" href="jsx-a11y/href-no-hash">
                              React-Todos
                          </a>
                      </div>
                      <button onClick={this.addTodo} className="pull-right btn btn-success">
                          <span className="glyphicon glyphicon-list-alt"></span>
                          &nbsp;&nbsp; New Todo
                      </button>
                  </div>
              </nav>



              <div className="container">
                  {this.state.todos.map(this.eachTodo)}
              </div>
          </div>
      );
  }


}

export default App;
