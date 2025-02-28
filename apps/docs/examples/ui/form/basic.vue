<template>
  <Layout>
    <div>
      <Card>
        <LForm ref="myFormRef" v-bind="formProps" @submit="handleSubmit" @reset="handleSet">
          <template #selectA="{ formModel, field }">
            <Select
              v-model:value="formModel[field]"
              :options="optionsA"
              mode="multiple"
              allow-clear
              @change="valueSelectA = formModel[field]"
            />
          </template>
          <template #selectB="{ formModel, field }">
            <Select
              v-model:value="formModel[field]"
              :options="optionsB"
              mode="multiple"
              allow-clear
              @change="valueSelectB = formModel[field]"
            />
          </template>
          <template #resetBefore>
            <Button type="primary" shape="round" @click="returnClick"> 自定义 </Button>
          </template>
        </LForm>
      </Card>
    </div>
  </Layout>
</template>

<script lang="tsx" setup>
import { UploadOutlined } from '@ant-design/icons-vue';
import { cloneDeep } from '@ssuperlilei-lib/utils';
import { Button, Card, Select, message } from 'ant-design-vue';
import { computed, ref, unref } from 'vue';
import { type FormProps, type FormSchema, LForm, type formInstance } from '@ssuperlilei-lib/ui';
import Layout from '../Layout.vue';

defineOptions({
  name: 'DemosFormBasicForm',
});

const provincesOptions = [
  {
    id: 'guangdong',
    label: '广东省',
    value: '1',
    key: '1',
  },
  {
    id: 'jiangsu',
    label: '江苏省',
    value: '2',
    key: '2',
  },
];
const citiesOptionsData = {
  guangdong: [
    {
      label: '珠海市',
      value: '1',
      key: '1',
    },
    {
      label: '深圳市',
      value: '2',
      key: '2',
    },
    {
      label: '广州市',
      value: '3',
      key: '3',
    },
  ],
  jiangsu: [
    {
      label: '南京市',
      value: '1',
      key: '1',
    },
    {
      label: '无锡市',
      value: '2',
      key: '2',
    },
    {
      label: '苏州市',
      value: '3',
      key: '3',
    },
  ],
};

const fetchOptionList = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        Array.from({ length: 10 }).map((_, i) => ({
          label: `选项${i}`,
          value: `${i}`,
        })),
      );
    }, 3000);
  });
};

const schemas: FormSchema[] = [
  {
    field: 'field1',
    component: 'Input',
    label: '字段字段1字段1字段1字段1字段1字段11',
    componentProps: () => {
      return {
        placeholder: '自定义placeholder',
        onChange: (e: any) => {
          console.log(e);
        },
      };
    },
    componentSlots: () => {
      return {
        prefix: () => '前缀',
        suffix: () => '后缀',
      };
    },
  },
  {
    field: 'field2',
    component: 'Input',
    label: '带后缀',
    defaultValue: '111',
    componentProps: {
      onChange: (e: any) => {
        console.log(e);
      },
    },
    suffix: '天',
  },
  {
    field: 'field3',
    component: 'DatePicker',
    label: '字段3',
  },
  {
    field: 'field4',
    component: 'Select',
    label: '字段4',
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
          key: '1',
        },
        {
          label: '选项2',
          value: '2',
          key: '2',
        },
      ],
    },
  },
  {
    field: 'field5',
    component: 'CheckboxGroup',
    label: '字段5',
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
        },
        {
          label: '选项2',
          value: '2',
        },
      ],
    },
  },
  {
    field: 'field7',
    component: 'RadioGroup',
    label: '字段7',
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
        },
        {
          label: '选项2',
          value: '2',
        },
      ],
    },
  },
  {
    field: 'field8',
    component: 'Checkbox',
    label: '字段8',
    componentSlots: 'Check',
  },
  {
    field: 'field9',
    component: 'Switch',
    label: '字段9',
  },
  {
    field: 'field10',
    component: 'RadioGroup',
    label: '字段10',
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
        },
        {
          label: '选项2',
          value: '2',
        },
      ],
    },
  },
  {
    field: 'field11',
    component: 'Cascader',
    label: '字段11',
    componentProps: {
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                },
              ],
            },
          ],
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    field: 'field30',
    component: 'Select',
    label: '懒加载远程下拉',
    required: true,
    componentProps: {
      request: async () => {
        return await fetchOptionList();
      },
      onChange: (e: any) => {
        console.log('selected:', e);
      },
    },
    defaultValue: '1',
  },
  {
    field: 'field31',
    component: 'Select',
    label: '下拉本地搜索',
    helpMessage: ['Select组件', '远程数据源本地搜索', '只发起一次请求获取所有选项'],
    componentProps: {
      showSearch: true,
      filterOption: (input: string, option: any) => {
        return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      },
      request: async () => {
        return await fetchOptionList();
      },
      onChange: (e: any) => {
        console.log('selected:', e);
      },
    },
    required: true,
    defaultValue: '0',
  },
  {
    field: 'field33',
    component: 'TreeSelect',
    label: '远程下拉树',
    helpMessage: ['TreeSelect组件', '使用接口提供的数据生成选项'],
    required: true,
    componentProps: {
      request: () => {
        return new Promise((resolve) => {
          const treeData = Array.from({ length: 5 }).map((_, i) => ({
            title: `选项 ${i}`,
            value: `选项 ${i}`,
            children: Array.from({ length: 3 }).map((_, j) => ({
              title: `选项 ${i}-${j}`,
              value: `选项 ${i}-${j}`,
            })),
          }));
          setTimeout(() => resolve(treeData), 2000);
        });
      },
    },
  },
  // {
  //   field: 'field34',
  //   component: ({ schema }: any) => {
  //     const options = schema.componentProps?.requestResult || [];
  //     return <RadioGroup options={options.slice(0, 2)}></RadioGroup>;
  //   },
  //   label: '远程RG',
  //   helpMessage: ['RadioGroup组件', '使用接口提供的数据生成选项'],
  //   required: true,
  //   componentProps: {
  //     optionType: 'button',
  //     request: async () => {
  //       const data = await fetchOptionList();
  //       return data;
  //     },
  //   },
  //   defaultValue: '0',
  // },
  // {
  //   field: 'field35',
  //   component: 'RadioGroup',
  //   label: '远程Radio',
  //   helpMessage: ['RadioGroup组件', '使用接口提供的数据生成选项'],
  //   required: true,
  //   componentProps: {
  //     optionType: 'button',
  //     request: async () => {
  //       const data: any = await fetchOptionList();
  //       return data.slice(0, 2);
  //     },
  //   },
  //   defaultValue: '1',
  // },
  {
    field: 'province',
    component: 'Select',
    label: '省份',
    componentProps: ({ formModel, formInstance }: any) => {
      return {
        options: provincesOptions,
        placeholder: '省份与城市联动',
        onChange: (e: any) => {
          // console.log(e)
          let citiesOptions =
            e == 1
              ? // @ts-expect-error
                citiesOptionsData[provincesOptions[0].id]
              : // @ts-expect-error
                citiesOptionsData[provincesOptions[1].id];
          // console.log(citiesOptions)
          if (e === undefined) {
            citiesOptions = [];
          }
          formModel.city = undefined; //  reset city value
          const { updateSchema } = formInstance;
          updateSchema({
            field: 'city',
            componentProps: {
              options: citiesOptions,
            },
          });
        },
      };
    },
  },
  {
    field: 'city',
    component: 'Select',
    label: '城市',
    componentProps: {
      options: [], // defalut []
      placeholder: '省份与城市联动',
    },
  },
  {
    field: 'selectA',
    component: 'Select',
    label: '互斥SelectA',
    slot: 'selectA',
    defaultValue: [],
  },
  {
    field: 'selectB',
    component: 'Select',
    label: '互斥SelectB',
    slot: 'selectB',
    defaultValue: [],
  },
  {
    field: 'field20',
    component: 'InputNumber',
    label: '字段20',
    required: true,
  },
  {
    field: 'field21',
    component: 'Slider',
    label: '字段21',
    componentProps: {
      min: 0,
      max: 100,
      range: true,
      marks: {
        20: '20°C',
        60: '60°C',
      },
    },
  },
  {
    field: 'field22',
    component: 'Rate',
    label: '字段22',
    defaultValue: 3,
    componentProps: {
      disabled: false,
      allowHalf: true,
    },
  },
  {
    field: 'field23',
    component: 'Upload',
    label: '字段23',
    componentProps: {
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    },
    componentSlots: {
      default: () => (
        <Button>
          <UploadOutlined /> Click to Upload
        </Button>
      ),
    },
  },
];

const formProps: FormProps = {
  schemas,
  labelWidth: 120,
  baseColProps: {
    span: 12,
  },
  autoAdvancedLine: 6,
  alwaysShowLines: 6,
  actionColOptions: {
    span: 12,
    style: {
      textAlign: 'center',
    },
  },
  showAdvancedButton: true,
};

const valueSelectA = ref<string[]>([]);
const valueSelectB = ref<string[]>([]);
const options = ref<any>([]);
options.value = Array.from({ length: 10 }).map((_, i) => ({
  label: `选项${i}`,
  value: `${i}`,
}));

const optionsA = computed(() => {
  // @ts-expect-error
  return cloneDeep(unref(options)).map((op) => {
    op.disabled = unref(valueSelectB).indexOf(op.value) !== -1;
    return op;
  });
});
const optionsB = computed(() => {
  // @ts-expect-error
  return cloneDeep(unref(options)).map((op: { disabled: boolean; value: string }) => {
    op.disabled = unref(valueSelectA).indexOf(op.value) !== -1;
    return op;
  });
});

// 点击提交
function handleSubmit(values: any) {
  message.success(
    <div>
      验证通过！<pre class="text-left">{JSON.stringify(values, null, 2)}</pre>
    </div>,
    3,
  );
}

const myFormRef = ref<formInstance>();
const handleSet = () => {
  console.log('myFormRef', myFormRef.value?.formModel);
};

const returnClick = () => {
  console.log('返回');
};
</script>
