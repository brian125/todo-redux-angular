import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { crear, toggle, editar, borrar, toggleAll, limpiarCompletados } from './todo.actions';

export const initialState: Todo[] = [
  new Todo('Tratar de conquistar al mundo'),
  new Todo('Vencer a Thannos'),
  new Todo('Comprar traje de IroMan'),
  new Todo('Robar el escudo del capitan ámerica'),

];

const _todoReducer = createReducer(
  initialState,
  on(crear, (state, { texto }) => [...state, new Todo(texto)] ),

  on( borrar, (state, { id }) => state.filter( todo => {
    return todo.id !== id
  })),

  on(limpiarCompletados, (state) => state.filter( todo => !todo.completado)),

  on(toggle, (state, { id }) => {

    return state.map( todo => {
      if (todo.id === id ){
        return {
          ...todo,
          completado: !todo.completado
        }
      } else {
        return todo
      }
    })
  }),

  on(toggleAll, (state) => {

    return state.map( todo => {

        return {
          ...todo,
          completado: !todo.completado
        }

    })
  }),

  on(editar, (state, { id, texto }) => {

    return state.map( todo => {
      if (todo.id === id ){
        return {
          ...todo,
          texto: texto
        }
      } else {
        return todo
      }
    })
  }),
);

export function todoReducer(state: any, action: any) {
  return _todoReducer(state, action);
}
