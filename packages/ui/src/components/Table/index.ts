import type { DefineComponent, Ref } from 'vue';
import Table from './Table.vue';
import type { TableInstance, TableProps } from './Table.types';
import { withInstall } from '~/_utils';

export * from './hooks';
export * from './Table.types';

export type TableRef = Ref<TableInstance>;

export const LTable = withInstall(Table);

export default LTable as unknown as DefineComponent<TableProps>;
