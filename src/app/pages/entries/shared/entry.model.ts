import { Category } from "../../categories/shared/category.model";

export type EntryType = 'DESPESA' | 'RECEITA';

export interface Entry {
  id?: number;
  nome?: string;
  descricao?: string;
  tipoLancamento?: EntryType;
  valor?: string;
  dataLancamento?: string;
  statusLancamento?: boolean;
  categoria?: Category
}
