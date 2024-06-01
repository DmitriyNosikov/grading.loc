import { ProductNamespace, UserNamespace } from './namespace';
import { State } from './state';

export type UserStateNamespace = Pick<State, UserNamespace>;
export type ProductStateNamespace = Pick<State, ProductNamespace>;
