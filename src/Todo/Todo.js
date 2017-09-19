import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {

    constructor(){
        super();
        this.addToList = this.addToList.bind(this);
        this.switchEditMode = this.switchEditMode.bind(this);
        this.updateList = this.updateList.bind(this);
        this.eachListEditing = this.eachListEditing.bind(this);

        this.state = {
            editing: false
        }

    }

    addToList(e){
        if(e.keyCode === 13){
            this.props.addListFunc(this.props.index, this.refs.listItem.value);
            this.refs.listItem.value = "";
        }
    }

    updateList(i){
        this.props.updateListFunc(this.props.index, i, this.refs["list-input"+i].value);
    }

    eachListNormal(item, i){
        return <li key={i}><input type="checkbox" id={ "todo-item" + i} /><label htmlFor={"todo-item" + i}>{item}</label></li>
    }

    eachListEditing(item, i){
        return <li key={i}><input type="text" ref={"list-input"+i} className="todo-input" onKeyUp={()=>this.updateList(i)} defaultValue={item} /></li>
    }

    switchEditMode(){
        if(this.state.editing){
            this.props.cleanTodoListFunc(this.props.index);
            this.setState({editing: false});
        }
        else this.setState({editing: true});
    }

    renderNormal(){
        return (
            <div className="todo">
                <h3> {this.props.title}</h3>
                <ul>
                    {this.props.list.map(this.eachListNormal)}
                    <li><input type="text" ref="listItem" className="todo-input" onKeyDown={(e)=>this.addToList(e)}/> </li>
                </ul>
                <button onClick={this.switchEditMode} className="btn btn-info pull-right btn-sm">
                    <span className="glyphicon glyphicon-pencil"></span>
                </button>
                <button onClick={()=>this.props.removeTodoFunc(this.props.index)} className="btn btn-danger pull-left btn-sm">
                    <span className="glyphicon glyphicon-trash"></span>
                </button>
            </div>
        );
    }

    renderEditing(){
        return (
            <div className="todo">
                <input type="text" ref="todoTitle" defaultValue={this.props.title} onKeyUp={()=>this.props.updateTitleFunc(this.props.index, this.refs.todoTitle.value)} />
                <ul>
                    {this.props.list.map(this.eachListEditing)}
                </ul>
                <button onClick={this.switchEditMode}>Save</button>
            </div>
        );
    }


    render() {
        if(this.state.editing) return this.renderEditing();
        else return this.renderNormal();
    }
}

export default Todo;
