### Контроллеры (Controllers)

Контроллеры отвечают за обработку входящих **запросов** и возврат **ответов** клиенту.

<figure><img src="./assets/Controllers_1.png" /></figure>

Задачей контроллера является получение конкретных запросов для приложения. Механизм **маршрутизации** управляет тем, какой контроллер получает какие запросы. Часто каждый контроллер имеет более одного маршрута, и разные маршруты могут выполнять разные действия.

Чтобы создать базовый контроллер, мы используем классы и **декораторы**. Декораторы связывают классы с требуемыми метаданными и позволяют Nest создавать карту маршрутизации (привязывать запросы к соответствующим контроллерам).

> **Совет:** Для быстрого создания CRUD-контроллера со встроенной [валидацией](https://docs.nestjs.com/techniques/validation) вы можете использовать CLI [CRUD generator](https://docs.nestjs.com/recipes/crud-generator#crud-generator): `nest g resource [name]`.

#### Маршрутизация

В следующем примере мы будем использовать декоратор `@Controller()`, который **необходим** для определения базового контроллера. Мы укажем необязательный префикс пути маршрута `cats`. Использование префикса пути в декораторе `@Controller()` позволяет нам легко группировать набор связанных маршрутов и минимизировать повторяющийся код. Например, мы можем сгруппировать набор маршрутов, которые управляют взаимодействиями с данными customers, по маршруту `/customers`. В этом случае мы могли бы указать префикс пути `customers` в декораторе `@Controller()`, чтобы нам не приходилось повторять эту часть пути для каждого маршрута в файле.

```typescript
@@filename(cats.controller)
import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
@@switch
import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll() {
    return 'This action returns all cats';
  }
}
```

> **Совет:** Чтобы создать контроллер с помощью CLI, просто выполните команду `$ nest g controller cats`.

Декоратор метода HTTP-запроса `@Get()` перед методом `findAll()` указывает NestJS создать обработчик для определенной конечной точки для HTTP-запросов. Конечная точка соответствует методу HTTP-запроса (в данном случае GET) и пути маршрута. Каков путь маршрута? Путь маршрута для обработчика определяется путем объединения (необязательного) префикса, объявленного для контроллера, и любого пути, указанного в декораторе метода. Поскольку мы объявили префикс для каждого маршрута (`cats`) и не добавили никакой информации о пути в декоратор, NestJS сопоставит запросы `GET /cats` с этим обработчиком. Как уже упоминалось, путь включает в себя необязательный префикс пути контроллера **и** любую строку пути, объявленную в декораторе метода запроса. Например, префикс пути `customers` в сочетании с декоратором `@Get('profile')` приведет к отображению маршрута для запросов типа `GET /customers/profile`.

Выше в нашем примере, когда запрос GET отправляется на эту конечную точку, Nest направляет запрос нашему определяемому пользователем методу `findAll()`. Обратите внимание, что имя метода, которое мы выбираем здесь, совершенно произвольно. Очевидно, что мы должны объявить метод для привязки маршрута, но Nest не придает никакого значения выбранному имени метода.

Этот метод вернет код состояния 200 и связанный с ним ответ, который в данном случае представляет собой просто строку. Почему это происходит? Чтобы объяснить, мы сначала представим концепцию, согласно которой Nest использует два **различных** варианта манипулирования ответами:

<table>
  <tr>
    <td>Стандартный (рекомендован)</td>
    <td>
      Используя этот встроенный метод, когда обработчик запроса возвращает объект или массив JavaScript, он <strong>автоматически</strong> сериализуется в JSON. Однако, когда он возвращает примитивный тип JavaScript (например, <code>string</code>, <code>number</code>, <code>boolean</code>), Nest отправит только значение, не пытаясь его сериализовать. Это упрощает обработку ответов: просто верните значение, а Nest позаботится обо всем остальном.
      <br/>
      <br/>
      Кроме того, <strong>код состояния</strong> ответа по умолчанию всегда равен 200, за исключением запросов POST, в которых используется 201. Мы можем легко изменить это поведение, добавив декоратор @HttpCode(...) на уровне обработчика (см. <a href='controllers#код-состояния'>Коды состояния</a>).
    </td>
  </tr>
  <tr>
    <td>Библиотеко-ориентированный</td>
    <td>
      Мы можем использовать специфичный для библиотеки (например, Express) <a href="https://expressjs.com/en/api.html#res" rel="nofollow" target="_blank">объект ответа</a>, который может быть введен с помощью декоратора <code>@Res()</code> в сигнатуре обработчика метода (например, </code>findAll(@Res() response)</code>). При таком подходе у вас есть возможность использовать собственные методы обработки ответов, предоставляемые этим объектом. Например, с помощью Express вы можете создавать ответы, используя такой код, как <code>response.status(200).send()</code>.
    </td>
  </tr>
</table>

> **Предупреждение!** NestJS определяет, когда обработчик использует `@Res()` или `@Next()`, указывая, что вы выбрали опцию, зависящую от конкретной библиотеки. Если оба подхода используются одновременно, стандартный подход **автоматически отключается** для этого единственного маршрута и больше не будет работать должным образом. Чтобы использовать оба подхода одновременно (например, чтобы использовать объект response для установки файлов cookie/headers, но все же предоставить остальное фреймворку), вы должны установить для параметра `passhrough` значение `true` в декораторе `@Res({ passhrough: true })`.


#### Объект запроса

Обработчикам часто требуется доступ к деталям клиентского **запроса**. NestJS предоставляет доступ к объекту [request](https://expressjs.com/en/api.html#req) базовой платформы (по умолчанию Express). Мы можем получить доступ к объекту запроса, поручив NestJS ввести его, добавив декоратор `@Req()` к параметру обработчика.

```typescript
@@filename(cats.controller)
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }
}
@@switch
import { Controller, Bind, Get, Req } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  @Bind(Req())
  findAll(request) {
    return 'This action returns all cats';
  }
}
```

> **Совет:** Чтобы воспользоваться преимуществами типизации `express`(как в примере выше `request: Request`), установите пакет `@types/express`.

Объект запроса представляет HTTP-request и содержит свойства из строки query-параметров, параметров самого запроса, HTTP-заголовков и тела запроса(подробнее читайте [здесь](https://expressjs.com/en/api.html#req)). В большинстве случаев нет необходимости захватывать эти свойства вручную. Вместо этого мы можем использовать специальные декораторы, такие как `@Body()` или `@Query()`, которые доступны из коробки. Ниже приведен список предоставленных декораторов и простых объектов, специфичных для конкретной платформы, которые они представляют.

<table>
  <tbody>
    <tr>
      <td><code>@Request(), @Req()</code></td>
      <td><code>req</code></td></tr>
    <tr>
      <td><code>@Response(), @Res()</code><span class="table-code-asterisk">*</span></td>
      <td><code>res</code></td>
    </tr>
    <tr>
      <td><code>@Next()</code></td>
      <td><code>next</code></td>
    </tr>
    <tr>
      <td><code>@Session()</code></td>
      <td><code>req.session</code></td>
    </tr>
    <tr>
      <td><code>@Param(key?: string)</code></td>
      <td><code>req.params</code> / <code>req.params[key]</code></td>
    </tr>
    <tr>
      <td><code>@Body(key?: string)</code></td>
      <td><code>req.body</code> / <code>req.body[key]</code></td>
    </tr>
    <tr>
      <td><code>@Query(key?: string)</code></td>
      <td><code>req.query</code> / <code>req.query[key]</code></td>
    </tr>
    <tr>
      <td><code>@Headers(name?: string)</code></td>
      <td><code>req.headers</code> / <code>req.headers[name]</code></td>
    </tr>
    <tr>
      <td><code>@Ip()</code></td>
      <td><code>req.ip</code></td>
    </tr>
    <tr>
      <td><code>@HostParam()</code></td>
      <td><code>req.hosts</code></td>
    </tr>
  </tbody>
</table>

<sup>\* </sup>Для совместимости с типизацией на базовых платформах HTTP (например, Express и Justify) Nest предоставляет декораторы `@Res()` и `@Response()`. `@Res()` - это просто псевдоним для `@Response()`. Оба непосредственно предоставляют базовый интерфейс `response` объекта собственной платформы. При их использовании вы также должны импортировать типы для базовой библиотеки (например, `@types /express`), чтобы воспользоваться всеми преимуществами. Обратите внимание, что когда вы вводите `@Res()` или `@Response()` в обработчик метода, вы переводите Nest в **Библиотеко-зависимый режим** для этого обработчика, и вы становитесь ответственным за управление ответом. При этом вы должны выдать какой-то ответ, выполнив вызов объекта `response` (например, `rest.json(...)` или `res.send(...)`), иначе HTTP-сервер зависнет.

> **Совет:** Чтобы узнать, как создавать свои собственные пользовательские декораторы, посетите [эту](/custom-decorators) главу.

#### Ресурсы

Ранее мы определили конечную точку для получения ресурса cats (**GET** route). Обычно мы также хотим предоставить конечную точку, которая создает новые записи. Для этого давайте создадим обработчик **POST**:

```typescript
@@filename(cats.controller)
import { Controller, Get, Post } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Post()
  create(): string {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
@@switch
import { Controller, Get, Post } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Post()
  create() {
    return 'This action adds a new cat';
  }

  @Get()
  findAll() {
    return 'This action returns all cats';
  }
}
```

Вот так просто. Nest предоставляет декораторы для всех стандартных методов HTTP: `@Get()`, `@Post()`, `@Put()`, `@Delete()`, `@Patch()`, `@Options()` и `@Head()`. Кроме того, `@All()` определяет конечную точку, которая обрабатывает их все.

#### Шаблонные маршруты (wildcards)

Также поддерживаются маршруты, основанные на шаблонах. Например, звездочка используется в качестве подстановочного знака и будет соответствовать любой комбинации символов.

```typescript
@Get('ab*cd')
findAll() {
  return 'This route uses a wildcard';
}
```

Путь маршрута `'ab*cd'` будет соответствовать `abcd`, `ab_cd`, `abcd` и так далее. Символы `?`, `+`, `*`, и `()` могут использоваться в пути маршрута и являются подмножествами их аналогов в регулярных выражениях. Дефис ( `-`) и точка (`.`) интерпретируются буквально строковыми путями.

#### Код состояния

Как уже упоминалось, **код состояния** ответа по умолчанию всегда **200**, за исключением запросов POST, для которых отправляется код **201** . Мы можем легко изменить это поведение, добавив декоратор `@HttpCode(...)` на уровне обработчика.

```typescript
@Post()
@HttpCode(204)
create() {
  return 'This action adds a new cat';
}
```

>**Совет:** Импортируйте `HttpCode` из пакета `@nests/common`.

Часто ваш код состояния не является статичным, а зависит от различных факторов. В этом случае вы можете использовать специфичный для библиотеки объект **response** (используя инъекцию `@Res()`) или, в случае ошибки, выдать исключение.

#### Заголовки

Чтобы указать пользовательский заголовок ответа, вы можете либо использовать декоратор `@Header()`, либо объект ответа, специфичный для библиотеки (и вызвать `res.header()` напрямую).

```typescript
@Post()
@Header('Cache-Control', 'none')
create() {
  return 'This action adds a new cat';
}
```

> **Совет:** Импортируйте `Header` из пакета `@nestjs/common`.

#### Перенаправление

`@Redirect()` takes two arguments, `url` and `statusCode`, both are optional. The default value of `statusCode` is `302` (`Found`) if omitted.


Чтобы перенаправить ответ на определенный URL-адрес, вы можете либо использовать декоратор `@Redirect()`, либо объект ответа, специфичный для библиотеки (и вызвать `res.redirect()` напрямую).

`@Redirect()` принимает два аргумента: `url` и `statusCode`, оба являются необязательными. Значение по умолчанию для `statusCode` равно "302"("Найдено"), если оно опущено.

```typescript
@Get()
@Redirect('https://nestjs.com', 301)
```

Иногда вам может потребоваться динамически определить код состояния HTTP или URL-адрес перенаправления. Сделайте это, вернув объект из метода обработчика маршрута с формой:

```json
{
  "url": string,
  "statusCode": number
}
```

Возвращаемые значения переопределят любые аргументы, переданные декоратору `@Redirect()`. Например:

```typescript
@Get('docs')
@Redirect('https://docs.nestjs.com', 302)
getDocs(@Query('version') version) {
  if (version && version === '5') {
    return { url: 'https://docs.nestjs.com/v5/' };
  }
}
```

#### Параметры маршрута

Маршруты со статическими путями не будут работать, когда вам нужно принять **динамические данные** как часть запроса (например, `GET /cats/1`, чтобы получить cat с идентификатором `1`). Чтобы определить маршрут с параметрами, мы можем добавить **токен** в путь маршрута, чтобы зафиксировать динамическое значение в этой позиции в URL-адресе запроса. В приведенном ниже примере, маркер параметра декоратора `@Get()` демонстрирует это использование. Параметры маршрута, объявленные таким образом, могут быть доступны с помощью декоратора `@Param()`, который следует добавить в сигнатуру метода.

```typescript
@@filename()
@Get(':id')
findOne(@Param() params): string {
  console.log(params.id);
  return `This action returns a #${params.id} cat`;
}
@@switch
@Get(':id')
@Bind(Param())
findOne(params) {
  console.log(params.id);
  return `This action returns a #${params.id} cat`;
}
```

`@Param()` используется для оформления параметра метода (`params` в приведенном выше примере) и делает параметры **маршрута** доступными в свойствах декорированного параметра внутри тела метода. Как видно из приведенного выше кода, мы можем получить доступ к параметру `id`, обратившись к `params.id `. Вы также можете передать определенный токен параметра декоратору, а затем ссылаться на параметр маршрута непосредственно по имени в теле метода.

> **Совет:** Импортируйте `Param` из пакета `@nestjs/common`.

```typescript
@@filename()
@Get(':id')
findOne(@Param('id') id: string): string {
  return `This action returns a #${id} cat`;
}
@@switch
@Get(':id')
@Bind(Param('id'))
findOne(id) {
  return `This action returns a #${id} cat`;
}
```

#### Маршрутизация поддоменов

Декоратор `@Controller` может использовать параметр `host`, чтобы потребовать от HTTP-хоста входящих запросов соответствие некоторому определенному значению.

```typescript
@Controller({ host: 'admin.example.com' })
export class AdminController {
  @Get()
  index(): string {
    return 'Admin page';
  }
}
```

> **Предупреждение!** Поскольку в **Justify** отсутствует поддержка вложенных маршрутизаторов, при использовании маршрутизации в поддомене вместо этого следует использовать экспресс-адаптер (по умолчанию).

Аналогично маршруту `path`, опция `hosts` может использовать маркеры для захвата динамического значения в этой позиции в имени хоста. Маркер параметра хоста в приведенном ниже примере декоратора `@Controller()` демонстрирует это использование. К параметрам хоста, объявленным таким образом, можно получить доступ с помощью декоратора `@HostParam()`, который следует добавить в сигнатуру метода.

```typescript
@Controller({ host: ':account.example.com' })
export class AccountController {
  @Get()
  getInfo(@HostParam('account') account: string) {
    return account;
  }
}
```

#### Области видимости(scopes)

Для людей, изучающих разные языки программирования, может оказаться неожиданным узнать, что в Nest почти все разделяется между входящими запросами. У нас есть пул подключений к базе данных, одноэлементные сервисы с глобальным состоянием и т.д. Помните, что Node.js не соответствует многопоточной модели запроса/ответа без состояния, в которой каждый запрос обрабатывается отдельным потоком. Следовательно, использование одноэлементных экземпляров полностью **безопасно** для наших приложений.

Однако существуют крайние случаи, когда желаемым поведением может быть время жизни контроллера на основе запросов, например, кэширование для каждого запроса в приложениях GraphQL, отслеживание запросов или многопользовательская аренда. Узнайте, как управлять областями [здесь](/fundamentals/injection-scopes).

#### Синхронность

Мы любим современный JavaScript и знаем, что извлечение данных в основном **асинхронно**. Вот почему Nest поддерживает и хорошо работает с `асинхронными` функциями.

> **Совет:** Узнайте больше о конструкции `async / await` [здесь](https://kamilmysliwiec.com/typescript-2-1-introduction-async-await )

Каждая асинхронная функция должна возвращать `Promise`. Это означает, что вы можете вернуть отложенное значение, которое Nest сможет разрешить само по себе. Давайте посмотрим на примере:

```typescript
@@filename(cats.controller)
@Get()
async findAll(): Promise<any[]> {
  return [];
}
@@switch
@Get()
async findAll() {
  return [];
}
```

Приведенный выше код полностью валиден. Кроме того, обработчики маршрутов Nest являются еще более мощными, поскольку могут возвращать RxJS [observable streams](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html). NestJS автоматически подпишется на внутренний источник и примет последнее переданное значение (как только поток будет завершен).

```typescript
@@filename(cats.controller)
@Get()
findAll(): Observable<any[]> {
  return of([]);
}
@@switch
@Get()
findAll() {
  return of([]);
}
```

Оба вышеперечисленных подхода работают, и вы можете использовать все, что соответствует вашим требованиям.

#### Полезная нагрузка (payload request)

Наш предыдущий пример обработчика маршрута POST не принимал никаких параметров клиента. Давайте исправим это, добавив сюда декоратор `@Body()`.

Но сначала (если вы используете TypeScript) нам нужно определить схему **DTO** (Data Transfer Object -- Объект передачи данных). DTO - это объект, который определяет, как данные будут передаваться по сети. Мы могли бы определить схему DTO с помощью интерфейсов **TypeScript** или с помощью простых классов. Интересно, что мы рекомендуем использовать здесь **classes**. Почему? Классы являются частью стандарта JavaScript ES6, и поэтому они сохраняются как реальные объекты в скомпилированном JavaScript. С другой стороны, поскольку интерфейсы TypeScript удаляются во время транспиляции, Nest не может ссылаться на них во время выполнения. Это важно, потому что такие функции, как **Pipes**, предоставляют дополнительные возможности, когда у них есть доступ к метатипу переменной во время выполнения.

Давайте создадим класс `CreateCatDto`:

```typescript
@@filename(create-cat.dto)
export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}
```

У него есть только три базовых свойства. Теперь мы можем использовать созданный DTO внутри `CatsController`:

```typescript
@@filename(cats.controller)
@Post()
async create(@Body() createCatDto: CreateCatDto) {
  return 'This action adds a new cat';
}
@@switch
@Post()
@Bind(Body())
async create(createCatDto) {
  return 'This action adds a new cat';
}
```

> **Совет:** Наш `ValidationPipe` может отфильтровывать свойства, которые не должны быть получены обработчиком метода. В этом случае мы можем внести допустимые свойства в белый список, и любое свойство, не включенное в белый список, автоматически удаляется из результирующего объекта. В примере `CreateCatDto` наш белый список - это свойства `name`, `age`, и `breed`. Узнайте больше [здесь](https://docs.nestjs.com/techniques/validation#stripping-properties).

#### Обработка ошибок

Существует отдельная глава об обработке ошибок (т.е. работе с исключениями) [здесь](/exception-filters).

#### Полный пример ресурса

Ниже приведен пример, в котором используются несколько доступных декораторов для создания базового контроллера. Этот контроллер предоставляет несколько методов для доступа к внутренним данным и управления ими.

```typescript
@@filename(cats.controller)
import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateCatDto, UpdateCatDto, ListAllEntities } from './dto';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Query() query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
@@switch
import { Controller, Get, Query, Post, Body, Put, Param, Delete, Bind } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Post()
  @Bind(Body())
  create(createCatDto) {
    return 'This action adds a new cat';
  }

  @Get()
  @Bind(Query())
  findAll(query) {
    console.log(query);
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(':id')
  @Bind(Param('id'))
  findOne(id) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  @Bind(Param('id'), Body())
  update(id, updateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  @Bind(Param('id'))
  remove(id) {
    return `This action removes a #${id} cat`;
  }
}
```

> **Совет:** Nest CLI предоставляет генератор (схему), который автоматически генерирует **весь шаблонный код**, чтобы помочь нам избежать всего этого и значительно упростить работу разработчика. Подробнее об этой функции читайте [здесь](/recipes/crud-generator).

#### Подъем и запуск

Вышеупомянутый контроллер полностью определен, но Nest по-прежнему не знает, что существует `CatsController`, и в результате не создаст экземпляр этого класса.

Контроллеры всегда принадлежат модулю, поэтому мы включаем массив `controllers` в декоратор `@Module()`. Поскольку мы еще не определили никаких других модулей, кроме корневого "Модуля приложения", мы будем использовать его для представления `CatsController`:

```typescript
@@filename(app.module)
import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';

@Module({
  controllers: [CatsController],
})
export class AppModule {}
```

Мы прикрепили метаданные к классу модуля с помощью декоратора `@Module()`, и теперь Nest может отобразить, какие контроллеры должны быть смонтированы.

#### Библиотеко-ориентированный подход

До сих пор мы обсуждали стандартный способ Nest манипулировать ответами. Второй способ манипулирования ответом - использовать специфичный для библиотеки [объект ответа](https://expressjs.com/en/api.html#res ). Чтобы ввести определенный объект ответа, нам нужно использовать декоратор `@Res()`. Чтобы показать различия, давайте перепишем `CatsController` следующим образом:

```typescript
@@filename()
import { Controller, Get, Post, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Res() res: Response) {
    res.status(HttpStatus.CREATED).send();
  }

  @Get()
  findAll(@Res() res: Response) {
     res.status(HttpStatus.OK).json([]);
  }
}
@@switch
import { Controller, Get, Post, Bind, Res, Body, HttpStatus } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Post()
  @Bind(Res(), Body())
  create(res, createCatDto) {
    res.status(HttpStatus.CREATED).send();
  }

  @Get()
  @Bind(Res())
  findAll(res) {
     res.status(HttpStatus.OK).json([]);
  }
}
```

Хотя этот подход работает и фактически обеспечивает большую гибкость в некоторых отношениях, предоставляя полный контроль над объектом ответа (манипулирование заголовками, специфичные для библиотеки функции и т. Д.), Его следует использовать с осторожностью. В целом, этот подход гораздо менее понятен и имеет некоторые недостатки. Основным недостатком является то, что ваш код становится зависимым от платформы (поскольку базовые библиотеки могут иметь разные API для объекта response), и его сложнее тестировать (вам придется имитировать объект response и т.д.).

Кроме того, в приведенном выше примере вы теряете совместимость с функциями Nest, которые зависят от стандартной обработки ответов Nest, такими как перехватчики и декораторы `@HttpCode()` / `@Header()`. Чтобы исправить это, вы можете установить для параметра `passhrough` значение `true` следующим образом:

```typescript
@@filename()
@Get()
findAll(@Res({ passthrough: true }) res: Response) {
  res.status(HttpStatus.OK);
  return [];
}
@@switch
@Get()
@Bind(Res({ passthrough: true }))
findAll(res) {
  res.status(HttpStatus.OK);
  return [];
}
```

Теперь вы можете взаимодействовать с собственным объектом ответа (например, устанавливать файлы cookie или заголовки в зависимости от определенных условий), но остальное предоставить фреймворку.