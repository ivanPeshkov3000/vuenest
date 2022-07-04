### Провайдеры(providers)

Провайдеры(поставщики) - это фундаментальная концепция в Nest. Многие из базовых классов Nest можно рассматривать как провайдер – сервисы, хранилища, фабрики, помощники и так далее. Основная идея провайдера заключается в том, что он может быть **внедрен(injected)** как зависимость; это означает, что объекты могут создавать различные отношения друг с другом, а функция "подключения" экземпляров объектов может быть в значительной степени делегирована системе выполнения Nest.

<figure><img src="./assets/Components_1.png" /></figure>

В предыдущей главе мы создали простой `CatsController`. Контроллеры должны обрабатывать HTTP-запросы и делегировать более сложные задачи **провайдерам**. Провайдеры - это простые классы JavaScript, которые объявлены как `providers` в [модуле](/modules).

> **Совет:** 
Поскольку Nest предоставляет возможность проектировать и организовывать зависимости чуть более чем 00-способами, мы настоятельно рекомендуем следовать [SOLID](https://en.wikipedia.org/wiki/SOLID ) принципы.

#### Сервисы(Services)

Давайте начнем с создания простого `CatsService`. Этот сервис будет отвечать за хранение и извлечение данных и предназначен для использования `CatsController`-ом, поэтому он является хорошим кандидатом для определения в качестве провайдера.

```typescript
@@filename(cats.service)
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
@@switch
import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  constructor() {
    this.cats = [];
  }

  create(cat) {
    this.cats.push(cat);
  }

  findAll() {
    return this.cats;
  }
}
```

> **Совет:** Чтобы создать сервис с помощью CLI, просто выполните команду `$ nest g service cats`.

Наш `CatsService` - это базовый класс с одним свойством и двумя методами. Единственная новая функция заключается в том, что она использует декоратор `@Injectable()`. Декоратор `@Injectable()` прикрепляет метаданные, в которых объявляется, что `CatsService` - это класс, которым может управлять Nest [IoC](https://en.wikipedia.org/wiki/Inversion_of_control ) контейнер. Кстати, в этом примере также используется интерфейс `Cat`, который, вероятно, выглядит примерно так:

```typescript
@@filename(interfaces/cat.interface)
export interface Cat {
  name: string;
  age: number;
  breed: string;
}
```

Теперь, когда у нас есть класс сервиса для извлечения cats, давайте использовать его внутри `CatsController`:

```typescript
@@filename(cats.controller)
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
@@switch
import { Controller, Get, Post, Body, Bind, Dependencies } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
@Dependencies(CatsService)
export class CatsController {
  constructor(catsService) {
    this.catsService = catsService;
  }

  @Post()
  @Bind(Body())
  async create(createCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll() {
    return this.catsService.findAll();
  }
}
```

`CatsService` **инджектируется** через конструктор класса. Обратите внимание на использование синтаксиса `private`. Это ключевое слово позволяет нам объявлять и инициализировать экземпляр `catsService` немедленно в том же месте.

#### Внедрение зависимостей(Dependency injection)

Nest построен на основе строгого шаблона проектирования, широко известного как **внедрение зависимостей**. Мы рекомендуем прочитать отличную статью об этой концепции в официальной документации [Angular](https://angular.io/guide/dependency-injection ).

В Nest, благодаря возможностям TypeScript, чрезвычайно легко управлять зависимостями, поскольку они разрешаются только по типу. В приведенном ниже примере Nest разрешит `catsService`, создав и вернув экземпляр `CatsService` (или, в обычном случае синглтон вернет существующий экземпляр, если он уже был запрошен в другом месте). Эта зависимость разрешается и передается конструктору вашего контроллера (или присваивается указанному свойству).:

```typescript
constructor(private catsService: CatsService) {}
```

#### Области действия (Scopes)

Провайдеры обычно имеют срок службы ("область действия"), синхронизированный с жизненным циклом приложения. Когда приложение загружается, каждая зависимость должна быть разрешена, и, следовательно, должен быть создан экземпляр каждого провайдера. Аналогично, когда приложение завершает работу, каждый провайдер будет уничтожен. Тем не менее, есть способы также ограничить срок службы вашего провайдера **request-scoped(областью действия запроса)**. Вы можете прочитать больше об этих методах [здесь](/fundamentals/injection-scopes).

#### Пользовательские провайдеры

Nest имеет встроенный контейнер инверсии управления ("IoC"), который разрешает отношения между провайдерами. Эта функция лежит в основе функции внедрения зависимостей, описанной выше, но на самом деле она гораздо более мощная, чем то, что мы описывали до сих пор. Существует несколько способов определения провайдера: вы можете использовать простые значения, классы и асинхронные или синхронные фабрики. Дополнительные примеры приведены [здесь](/fundamentals/dependency-injection).

#### Опциональные провайдеры

Иногда у вас могут возникнуть зависимости, которые не обязательно должны быть разрешены. Например, ваш класс может зависеть от **объекта конфигурации**, но если ни один из них не передан, следует использовать значения по умолчанию. В таком случае зависимость становится необязательной, поскольку отсутствие провайдера конфигурации не приведет к ошибкам.

Чтобы указать, что провайдер является необязательным, используйте декоратор `@Optional()` в подписи конструктора.

```typescript
import { Injectable, Optional, Inject } from '@nestjs/common';

@Injectable()
export class HttpService<T> {
  constructor(@Optional() @Inject('HTTP_OPTIONS') private httpClient: T) {}
}
```

Обратите внимание, что в приведенном выше примере мы используем пользовательский провайдер, поэтому мы включаем пользовательский **токен HTTP_OPTIONS**. Предыдущие примеры показывали внедрение на основе конструктора, указывающее на зависимость через класс в конструкторе. Подробнее о пользовательских поставщиках и связанных с ними токенах читайте [здесь](/fundamentals/custom-providers).

#### Инъекция на уровне свойств (Property-based injection)

Метод, который мы использовали до сих пор, называется инъекцией на уровне конструктора, поскольку провайдеры вводятся с помощью метода конструктора. В некоторых очень специфических случаях может быть полезна **инъекция на уровне свойства**. Например, если ваш класс верхнего уровня зависит от одного или нескольких провайдеров, передача их всех вверх путем вызова `super()` в подклассах из конструктора может быть очень утомительной. Чтобы избежать этого, вы можете использовать декоратор `@Inject()` на уровне свойств.

```typescript
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class HttpService<T> {
  @Inject('HTTP_OPTIONS')
  private readonly httpClient: T;
}
```

> **Предупреждение!** Если ваш класс не расширяет другого провайдера, вы всегда должны отдавать предпочтение использованию **инъекции на уровне конструктора (constructor-based injection)**.

#### Регистрация провайдера

Теперь, когда мы определили провайдер (`CatsService`), и у нас есть потребитель этого сервиса (`CatsController`), нам нужно зарегистрировать сервис в Nest, чтобы он мог выполнить инъекцию. Мы делаем это, редактируя наш файл модуля (`app.module.ts`) и добавляя сервис в массив `providers` декоратора `@Module()`.

```typescript
@@filename(app.module)
import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class AppModule {}
```

Теперь Nest сможет разрешать зависимости класса `CatsController`.

Вот как теперь должна выглядеть наша структура каталогов:

<style>
  .children {
    left-padding: 10px;
  }
</style>
<div class="file-tree">
<div class="item">src</div>
<div class="children">
<div class="item">cats</div>
<div class="children">
<div class="item">dto</div>
<div class="children">
<div class="item">create-cat.dto.ts</div>
</div>
<div class="item">interfaces</div>
<div class="children">
<div class="item">cat.interface.ts</div>
</div>
<div class="item">cats.controller.ts</div>
<div class="item">cats.service.ts</div>
</div>
<div class="item">app.module.ts</div>
<div class="item">main.ts</div>
</div>
</div>

#### Создание экземпляра вручную (Manual instantiation)

До сих пор мы обсуждали, как Nest автоматически обрабатывает большинство деталей разрешения зависимостей. В определенных обстоятельствах вам может потребоваться выйти за пределы встроенной системы внедрения зависимостей и вручную извлекать или создавать экземпляры провайдеров. Далее мы кратко обсудим две такие темы.

Чтобы получить существующие экземпляры или динамически создавать экземпляры, вы можете использовать [Ссылку на модуль](https://docs.nestjs.com/fundamentals/module-ref ).

Чтобы получить провайдер в функции `bootstrap()` (например, для автономных приложений без контроллеров или для использования службы конфигурации во время начальной загрузки), см. [Автономные приложения](https://docs.nestjs.com/standalone-applications ).
