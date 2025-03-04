# 类型判断

## isString

> 判断是否为字符串。

```ts
import { isString } from '@ssuperlilei/utils';

isString('hello'); // true
isString(123); // false
```

## isType

判断是什么类型。

```ts
import { isType } from '@ssuperlilei/utils';

isType<string>('hello'); // true
isType<number>(123); // true
```

## getType

获取类型。

```ts
import { getType } from '@ssuperlilei/utils';

getType('hello'); // [object String]
getType(123); // [object Number]
```

## isFn

判断是否为函数。

```ts
import { isFn } from '@ssuperlilei/utils';

isFn(() => {}); // true
isFn(async () => {}); // true
```

## isWindow

判断是否为 window 对象。

```ts
import { isWindow } from '@ssuperlilei/utils';

isWindow(window); // true
```

## isHTMLElement

判断是否为 HTMLElement 对象。

```ts
import { isHTMLElement } from '@ssuperlilei/utils';

isHTMLElement(document.body); // true
```

## isArray

判断是否为数组。

```ts
import { isArray } from '@ssuperlilei/utils';

isArray([]); // true
```

## isPlainObj

判断是否为普通对象。

```ts
import { isPlainObj } from '@ssuperlilei/utils';

isPlainObj({}); // true
```

## isBoolean

判断是否为布尔值。

```ts
import { isBoolean } from '@ssuperlilei/utils';

isBoolean(true); // true
```

## isNumber

判断是否为数字。

```ts
import { isNumber } from '@ssuperlilei/utils';

isNumber(123); // true
```

## isObject

判断是否为对象。

```ts
import { isObject } from '@ssuperlilei/utils';

isObject({}); // true
```

## isRegExp

判断是否为正则表达式。

```ts
import { isRegExp } from '@ssuperlilei/utils';

isRegExp(/hello/); // true
```

## isValid

判断是否为有效值。

```ts
import { isValid } from '@ssuperlilei/utils';

isValid('hello'); // true
isValid(null); // false
```

## isValidNumber

判断是否为有效数字。

```ts
import { isValidNumber } from '@ssuperlilei/utils';

isValidNumber(123); // true
isValidNumber(NaN); // false
```

## is

判断是否为某种类型。

```ts
import { is } from '@ssuperlilei/utils';

is('hello', 'String'); // true
is(123, 'Number'); // true
```

## isDef

判断是否定义。

```ts
import { isDef } from '@ssuperlilei/utils';

isDef('hello'); // true
isDef(undefined); // false
```

## isUnDef

判断是否未定义。

```ts
import { isUnDef } from '@ssuperlilei/utils';

isUnDef('hello'); // false
isUnDef(undefined); // true
```

## isEmpty

判断是否为空。

```ts
import { isEmpty } from '@ssuperlilei/utils';

isEmpty(''); // true
isEmpty([]); // true
```

## isDate

判断是否为日期。

```ts
import { isDate } from '@ssuperlilei/utils';

isDate(new Date()); // true
```

## isNull

判断是否为 null。

```ts
import { isNull } from '@ssuperlilei/utils';

isNull(null); // true
```

## isNullAndUnDef

判断是否为 null 或未定义。

```ts
import { isNullAndUnDef } from '@ssuperlilei/utils';

isNullAndUnDef(null); // true
isNullAndUnDef(undefined); // true
```

## isNullOrUnDef

判断是否为 null 或未定义。

```ts
import { isNullOrUnDef } from '@ssuperlilei/utils';

isNullOrUnDef(null); // true
isNullOrUnDef(undefined); // true
```

## isPromise

判断是否为 Promise 对象。

```ts
import { isPromise } from '@ssuperlilei/utils';

isPromise(Promise.resolve()); // true
```

## isFunction

判断是否为函数。

```ts
import { isFunction } from '@ssuperlilei/utils';

isFunction(() => {}); // true
```

## isAsyncFunction

判断是否为异步函数。

```ts
import { isAsyncFunction } from '@ssuperlilei/utils';

isAsyncFunction(async () => {}); // true
```

## isElement

判断是否为元素。

```ts
import { isElement } from '@ssuperlilei/utils';

isElement(document.body); // true
```

## isMap

判断是否为 Map 对象。

```ts
import { isMap } from '@ssuperlilei/utils';

isMap(new Map()); // true
```

## isServer

判断是否为服务端。

```ts
import { isServer } from '@ssuperlilei/utils';

isServer; // true
```

## isClient

判断是否为客户端。

```ts
import { isClient } from '@ssuperlilei/utils';

isClient; // true
```

## isUrl

判断是否为 URL。

```ts
import { isUrl } from '@ssuperlilei/utils';

isUrl('https://www.example.com'); // true
```

## isObjectOrArray

判断是否为对象或数组。

```ts
import { isObjectOrArray } from '@ssuperlilei/utils';

isObjectOrArray({}); // true
isObjectOrArray([]); // true
```

## isUndefined

判断是否为未定义。

```ts
import { isUndefined } from '@ssuperlilei/utils';

isUndefined(undefined); // true
```
