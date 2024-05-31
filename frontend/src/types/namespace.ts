import { Namespace } from '../../const';

export type Namespace = keyof [keyof typeof Namespace];
export type MainNamespace = typeof Namespace.MAIN;
export type ProductNamespace = typeof Namespace.PRODUCT;
export type UserNamespace = typeof Namespace.USER;
