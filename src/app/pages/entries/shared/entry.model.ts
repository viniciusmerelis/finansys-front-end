import { Category } from "../../categories/shared/category.model";

export type EntryType = 'despesa' | 'receita';

export interface Entry {
  id: number;
  nome: string;
  descricao: string;
  tipoLancamento: EntryType;
  valor: string;
  data: string;
  status: boolean;
  categoria: Category
}
