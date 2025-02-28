<template>
  <LConfigProvider>
    <LTable
      ref="tableInstance"
      :data-request="loadData"
      :columns="columns"
      row-key="id"
      header-title="测试表格"
      :scroll="{ x: 1144, y: 400 }"
      :show-refresh="true"
      :form-props="formProps"
      :is-select="true"
      :row-selection="{
        selectedRowKeys: [2],
      }"
      :extra-params="{
        aaaa: '123',
      }"
      :show-tool-bar="true"
      show-search-border
      @change="handleTableChange"
      @handle-click-row="handleClickRow"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'name'">
          {{ record.name }}
          <a>[测试]</a>
        </template>
      </template>
      <!-- <template #expandedRowRender="{ record }">
      <p>
        {{ record.date }}
      </p>
    </template> -->
      <template #toolbar="{ reload }">
        <a-button type="primary">新增</a-button>
        <a-button>导入</a-button>
        <a-button @click="reload">刷新</a-button>
      </template>
    </LTable>
    <Modal v-model:open="open" title="Basic Modal" @ok="handleOk">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  </LConfigProvider>
</template>

<script lang="tsx" setup>
import {
  type DataRequestFn,
  type FormProps,
  LConfigProvider,
  LTable,
  type TableColumn,
  type TableInstance,
} from '~@ssuperlilei-lib/ui';
import type { GetRowKey } from 'ant-design-vue/es/table/interface';
import { reactive, ref } from 'vue';
import { Modal, Tag } from 'ant-design-vue';
import { debounce } from '@ssuperlilei-lib/utils';

const open = ref<boolean>(false);

const names = ['王路飞asdasdasdasdasdasdasdasdasdasdasdads', '王大蛇', '李白', '刺客伍六七'];
const fetchStatusMapData = (keyword = '') => {
  const data = [
    {
      label: '已售罄',
      value: 0,
    },
    {
      label: '热卖中',
      value: 1,
    },
  ].filter((n) => n.label.includes(keyword));
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });
};
const getClothesByGender = (gender: number) => {
  if (gender === 1) {
    // 男
    return [
      {
        label: '西装',
        value: 1,
      },
      {
        label: '领带',
        value: 0,
      },
    ];
  } else if (gender === 0) {
    //女
    return [
      {
        label: '裙子',
        value: 1,
      },
      {
        label: '包包',
        value: 0,
      },
    ];
  }
  return [];
};
const tableData = Array.from({ length: 30 }).map((_, i) => {
  const gender = ~~(Math.random() * 2);
  return {
    id: i + 1,
    date: new Date().toLocaleString(),
    name: names[~~(Math.random() * 4)],
    clothes: getClothesByGender(gender)[~~(Math.random() * 2)].label,
    price: ~~(Math.random() * 1000),
    gender,
    status: ~~(Math.random() * 2),
  };
});

const columns: TableColumn[] = [
  {
    title: '姓姓名名',
    align: 'center',
    dataIndex: 'name',
    fixed: 'left',
    sorter: true,
    width: 300,
    resizable: true,
    formItemProps: {
      defaultValue: '李白',
      // colProps: {
      //   span: 12,
      // },
    },
  },
  {
    title: '性别',
    align: 'center',
    dataIndex: 'gender',
    width: 100,
    resizable: true,
    formItemProps: {
      component: 'Select',
      componentProps: ({ formInstance, formModel }) => ({
        options: [
          {
            label: '男',
            value: 1,
          },
          {
            label: '女',
            value: 0,
          },
        ],
        onChange() {
          // 根据当前选择的性别，更新衣服可选项
          formInstance?.updateSchema({
            field: 'clothes',
            componentProps: {
              options: getClothesByGender(formModel.gender),
            },
          });
          formModel['clothes'] = undefined;
        },
      }),
    },
    customRender: ({ record }) => ['女', '男'][record.gender],
  },
  {
    title: '衣服',
    align: 'center',
    // hideInSearch: true,
    dataIndex: 'clothes',
    formItemProps: {
      component: 'Select',
    },
  },
  {
    title: '价格',
    align: 'center',
    // hideInSearch: true,
    headerSearchComponent: 'Input',
    dataIndex: 'price',
    formItemProps: {
      component: 'Select',
    },
    customRender: ({ record }) => `${record.price}元`,
  },
  {
    title: '状态',
    align: 'center',
    // hideInSearch: true,
    dataIndex: 'status',
    formItemProps: {
      component: 'Select',
      componentProps: ({ formInstance, schema }) => ({
        showSearch: true,
        filterOption: false,
        request: () => {
          return fetchStatusMapData();
        },
        onSearch: debounce(async (keyword: string | undefined) => {
          schema.loading = true;
          const newSchema = {
            field: 'status',
            componentProps: {
              options: [] as any,
            },
          };
          formInstance?.updateSchema([newSchema]);
          console.log('onSearch keyword', keyword);
          const result = await fetchStatusMapData(keyword).finally(() => (schema.loading = false));
          newSchema.componentProps.options = result;
          formInstance?.updateSchema([newSchema]);
        }, 500),
        onChange(value: string) {
          console.log('onChange', value);
        },
      }),
    },
    customRender: ({ record }) => (
      <Tag color={record.status == 1 ? 'red' : 'default'}>
        {['已售罄', '热卖中'][record.status]}
      </Tag>
    ),
  },
  // {
  //   title: '操作',
  //   align: 'center',
  //   key: 'ACTION',
  //   actions: (params, action) => [
  //     {
  //       label: '编辑',
  //       onClick: ({ record }) => {
  //         console.log('编辑', params, action);
  //         console.log('编辑', record);
  //       },
  //     },
  //     {
  //       label: '删除',
  //       onClick: ({ record }) => {
  //         console.log('删除', record);
  //       },
  //     },
  //   ],
  // },
  {
    title: '操作',
    align: 'left',
    key: 'ACTION',
    fixed: 'right',
    width: 250,
    actions: ({ record }) => [
      {
        label: '编辑',
        ifShow: Math.random() > 0.5,
        // code: '120100001000002', // 权限码传入code 会自动 使用 configProvider 的 llProps 中的 hasPermission 方法判断是否有权限
        onClick: () => {
          console.log('编辑', record);
        },
      },
      {
        label: '查看',
        onClick: () => {
          console.log('查看', record);
        },
      },
      {
        label: '删除',
        ifShow: Math.random() > 0.5,
        danger: true,
        onClick: () => {
          console.log('删除', record);
        },
      },
      {
        label: '查看详情',
        onClick: () => {
          console.log('查看详情', record);
        },
      },
      {
        label: '删除2',
        danger: true,
        onClick: () => {
          console.log('删除', record);
        },
      },
    ],
  },
];

const handleOk = () => {
  open.value = false;
};
const tableInstance = ref<TableInstance>();

const formProps = reactive<Partial<FormProps>>({
  actionColOptions: {
    // span: 6,
  },
  baseColProps: {
    span: 8,
  },
  showAdvancedButton: true,
  showAdvancedButtonBadge: true,
  advancedBadgeCount: 2,
});

const loadData: DataRequestFn = async (params, onChangeParams): Promise<any> => {
  console.log('params', params);
  console.log('onChangeParams', onChangeParams);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          list: tableData,
          total: 30,
          pageNum: 1,
        },
        ...params,
      });
      // tableInstance.value?.updatePagination?.({
      //   total: 30,
      // });
      // 手动设置搜索表单的搜索项
      tableInstance.value?.getQueryFormRef()?.updateSchema?.([
        {
          field: 'price',
          componentProps: {
            options: [
              {
                label: '0-199',
                value: '0-199',
              },
              {
                label: '200-999',
                value: '200-999',
              },
            ],
          },
        },
      ]);
    }, 500);
  });
};
const handleTableChange = (params: any) => {
  console.log('params', params);
};
const handleClickRow = (
  record: any,
  key: string | GetRowKey<any>,
  selectedRowKeys: (string | GetRowKey<any>)[],
) => {
  console.log('record', record, key, selectedRowKeys);
};
</script>
