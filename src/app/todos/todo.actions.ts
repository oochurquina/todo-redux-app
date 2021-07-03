
import { createAction, props } from "@ngrx/store";

export const limpiarTodos = createAction(
    '[TODO] Limpiar Todo'
)
export const crear = createAction(
                            '[TODO] Crea todo',
                            props<{texto: string}>()
);
export const toggle = createAction(
    '[TODO] Toggle todo',
    props<{id: number}>()
);

export const toggleAll = createAction(
    '[TODO] Toggle TodoAll',
    props<{completado: boolean}>()
);

export const editar = createAction(
    '[TODO] Editar todo',
    props<{id: number, texto: string}>()
);

export const borrar = createAction(
    '[TODO] Borrar todo',
    props<{id: number}>()
);