import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todoItem: Todo;
  @ViewChild('inputFisico') txtInputFisico: ElementRef;

  chkCompletado: FormControl;
  txtInput: FormControl
  editando:boolean = false;

  constructor(private _store: Store<AppState>) { }

  terminarEdicion(){
    this.editando= false;
    if (this.txtInput.invalid) {return}
    if (this.txtInput.value === this.todoItem.texto) {return }
    this._store.dispatch(actions.editar({
      id: this.todoItem.id,
      texto: this.txtInput.value
    }));
  }
  borrar(){
    this._store.dispatch(actions.borrar({id: this.todoItem.id}));
  }

  editar(){
    this.editando= true;
    this.txtInput.setValue(this.todoItem.texto);
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1);
  }
  ngOnInit(): void {
    // console.log(this.todoItem)
    // this.todoItem.completado = false;
    this.chkCompletado = new FormControl(this.todoItem.completado);
    this.txtInput = new FormControl(this.todoItem.texto, Validators.required);
    this.chkCompletado.valueChanges
      .subscribe(valor =>{
        this._store.dispatch(actions.toggle({id: this.todoItem.id}))
        
    })
  }

}
