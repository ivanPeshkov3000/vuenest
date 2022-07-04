### Модули (Modules)

Модуль - это класс, аннотированный декоратором `@Module()`. Декоратор `@Module()` предоставляет метаданные, которые **Nest** использует для организации структуры приложения.

<figure><img src="./assets/Modules_1.png" /></figure>

Каждое приложение имеет по крайней мере один **корневой модуль**. Корневой модуль - это отправная точка, которую Nest использует для построения **графа приложений** - внутренней структуры данных, используемой Nest для разрешения взаимосвязей и зависимостей между модулем и провайдером. Хотя очень маленькие приложения теоретически могут иметь только корневой модуль, это не типичный случай. Мы хотим подчеркнуть, что модули **настоятельно** рекомендуются в качестве эффективного способа организации ваших компонентов. Таким образом, для большинства приложений результирующая архитектура будет использовать несколько модулей, каждый из которых инкапсулирует тесно связанный набор **возможностей**.

Декоратор `@Module()` принимает один объект, свойства которого описывают модуль:

|||
|---|---|
| `providers`   | провайдеры, которые будут созданы с помощью инжектора Nest и которые могут быть общими по крайней мере для этого модуля |
| `controllers` | набор контроллеров, определенных в этом модуле, которые должны быть инстанцированы |
| `imports`     | список импортированных модулей, экспортирующих провайдеры, которые требуются в этом модуле |
| `exports`     | подмножество `providers` , которые предоставляются этим модулем и должны быть доступны в других модулях, которые импортируют этот модуль. Вы можете использовать либо самого поставщика, либо только его токен (значение `provide`) |

Модуль **инкапсулирует** провайдеры по умолчанию. Это означает, что невозможно внедрить провайдер, который не является ни прямой частью текущего модуля, ни экспортированным из импортированных модулей. Таким образом, вы можете рассматривать экспортированные провайдеры из модуля как общедоступный интерфейс модуля или API.

#### Функциональные модули (Feature modules)
Функциональные модули

`CatsController` и `CatsService` принадлежат одному и тому же домену приложения. Поскольку они тесно связаны, имеет смысл переместить их в функциональный модуль. Функциональный модуль просто организует код, относящийся к конкретной функции, сохраняя упорядоченность кода и устанавливая четкие границы. Это помогает нам справляться со сложностями и вести разработку соответствуя [SOLID](https://en.wikipedia.org/wiki/SOLID) принципам, особенно по мере роста размера приложения и/или команды.

Чтобы продемонстрировать это, мы создадим `CatsModule`.

```typescript
@@filename(cats/cats.module)
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
```

> **Совет:** Чтобы создать модуль с помощью CLI, просто выполните команду `$ nest g module cats`.

Выше мы определили `CatsModule` в файле `cats.module.ts` и переместили все, что связано с этим модулем, в каталог `cats`. Последнее, что нам нужно сделать, это импортировать этот модуль в корневой модуль (`AppModule`, определенный в файле `app.module.ts`).

```typescript
@@filename(app.module)
import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule {}
```

Вот как теперь выглядит наша структура каталогов:

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
      <div class="item">cats.module.ts</div>
      <div class="item">cats.service.ts</div>
    </div>
    <div class="item">app.module.ts</div>
    <div class="item">main.ts</div>
  </div>
</div>

#### Общие модули (Shared modules)

В Nest модули по умолчанию являются **синглтонами**, и, таким образом, вы можете легко использовать один и тот же экземпляр любого провайдера между несколькими модулями.

<figure><img src="./assets/Shared_Module_1.png" /></figure>

Каждый модуль автоматически становится **общим модулем**. После создания он может быть повторно использован любым модулем. Давайте представим, что мы хотим разделить экземпляр `CatsService` между несколькими другими модулями. Чтобы сделать это, нам сначала нужно **экспортировать** провайдер `CatsService`, добавив его в массив `exports` модуля, как показано ниже:

```typescript
@@filename(cats.module)
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService]
})
export class CatsModule {}
```

Теперь любой модуль, который импортирует `CatsModule`, имеет доступ к `CatsService` и будет совместно использовать один и тот же экземпляр со всеми другими модулями, которые также импортируют его.

#### Реэкспорт модуля(Module re-exporting)

As seen above, Modules can export their internal providers. In addition, they can re-export modules that they import. In the example below, the `CommonModule` is both imported into **and** exported from the `CoreModule`, making it available for other modules which import this one.

Как показано выше, модули могут экспортировать своих внутренних провайдеров. Кроме того, они могут реэкспортировать модули, которые они импортируют. В приведенном ниже примере `CommonModule` одновременно импортируется **и** экспортируется из `CoreModule`, что делает его доступным для других модулей, которые импортируют этот модуль.

```typescript
@Module({
  imports: [CommonModule],
  exports: [CommonModule],
})
export class CoreModule {}
```

#### Внедрение зависимостей (Dependency injection)

Класс модуля также может **внедрять** провайдеры (например, для целей конфигурации):

```typescript
@@filename(cats.module)
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {
  constructor(private catsService: CatsService) {}
}
@@switch
import { Module, Dependencies } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
@Dependencies(CatsService)
export class CatsModule {
  constructor(catsService) {
    this.catsService = catsService;
  }
}
```

Однако сами классы модулей не могут быть введены в качестве провайдеров из-за [circular dependency](/fundamentals/circular-dependency).

#### Глобальные модули (Global modules)

Если вам приходится везде импортировать один и тот же набор модулей, это может стать утомительным. В отличие от Nest, в [Angular](https://angular.io) `providers` зарегистрированы в глобальной области. После определения они доступны везде. Однако Nest инкапсулирует провайдеры внутри области действия модуля. Вы не сможете использовать провайдеры модуля в другом месте без предварительного импорта инкапсулирующего модуля.

Если вы хотите предоставить набор провайдеров, которые должны быть доступны везде из коробки (например, хэлперы, подключения к базе данных и т.д.), Сделайте модуль **глобальным** с помощью декоратора `@Global()`.

```typescript
import { Module, Global } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
```

Декоратор `@Global()` делает модуль глобальным. Глобальные модули должны быть зарегистрированы **только один раз**, как правило, корневым или основным модулем. В приведенном выше примере провайдер `CatsService` будет повсеместным, и модулям, которые хотят внедрить сервис, не нужно будет импортировать `CatsModule` в свой массив imports.

> **Совет:** Делать все глобальным - не самое удачное дизайнерское решение. Доступны глобальные модули, позволяющие сократить количество необходимых шаблонов. Массив `imports`, как правило, является предпочтительным способом сделать API модуля доступным для потребителей.

#### Динамические модули (Dynamic modules)

The Nest module system includes a powerful feature called **dynamic modules**. This feature enables you to easily create customizable modules that can register and configure providers dynamically. Dynamic modules are covered extensively [here](/fundamentals/dynamic-modules). In this chapter, we'll give a brief overview to complete the introduction to modules.


Модульная система Nest включает в себя мощную фичу под названием **динамические модули**. Эта функция позволяет легко создавать настраиваемые модули, которые могут динамически регистрировать и настраивать провайдеры. Динамические модули подробно описаны [здесь](/fundamentals/dynamic-modules). В этой главе мы дадим краткий обзор, чтобы завершить введение в модули.

Ниже приведен пример определения динамического модуля `DatabaseModule`:

```typescript
@@filename()
import { Module, DynamicModule } from '@nestjs/common';
import { createDatabaseProviders } from './database.providers';
import { Connection } from './connection.provider';

@Module({
  providers: [Connection],
})
export class DatabaseModule {
  static forRoot(entities = [], options?): DynamicModule {
    const providers = createDatabaseProviders(options, entities);
    return {
      module: DatabaseModule,
      providers: providers,
      exports: providers,
    };
  }
}
@@switch
import { Module } from '@nestjs/common';
import { createDatabaseProviders } from './database.providers';
import { Connection } from './connection.provider';

@Module({
  providers: [Connection],
})
export class DatabaseModule {
  static forRoot(entities = [], options?) {
    const providers = createDatabaseProviders(options, entities);
    return {
      module: DatabaseModule,
      providers: providers,
      exports: providers,
    };
  }
}
```

> **Совет:** Метод `forRoot()` может возвращать динамический модуль либо синхронно, либо асинхронно (т.е. через `Promise`).

This module defines the `Connection` provider by default (in the `@Module()` decorator metadata), but additionally - depending on the `entities` and `options` objects passed into the `forRoot()` method - exposes a collection of providers, for example, repositories. Note that the properties returned by the dynamic module **extend** (rather than override) the base module metadata defined in the `@Module()` decorator. That's how both the statically declared `Connection` provider **and** the dynamically generated repository providers are exported from the module.

Этот модуль определяет провайдер `Connection` по умолчанию (в метаданных декоратора `@Module()`), но дополнительно - в зависимости от объектов `entities` и `options`, переданных в метод `forRoot()` - предоставляет набор провайдеров, например, репозиториев. Обратите внимание, что свойства, возвращаемые динамическим модулем, **расширяют** (а не переопределяют) метаданные базового модуля, определенные в декораторе `@Module()`. Вот как статически объявленный провайдер `Connection` **и** динамически генерируемые провайдеры репозитория экспортируются из модуля.

Если вы хотите зарегистрировать динамический модуль в глобальной области видимости, установите для свойства `global` значение `true`.

```typescript
{
  global: true,
  module: DatabaseModule,
  providers: providers,
  exports: providers,
}
```

> **Предупреждение!** Как упоминалось выше, делать все глобальным **не является хорошим дизайнерским решением**.

`DatabaseModule` может быть импортирован и настроен следующим образом:

```typescript
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [DatabaseModule.forRoot([User])],
})
export class AppModule {}
```

Если вы, в свою очередь, хотите повторно экспортировать динамический модуль, вы можете опустить вызов метода `for Root()` в массиве экспорта:

```typescript
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [DatabaseModule.forRoot([User])],
  exports: [DatabaseModule],
})
export class AppModule {}
```

В главе [Динамические модули](/fundamentals/dynamic-modules) эта тема рассматривается более подробно и включает [рабочий пример](https://github.com/nestjs/nest/tree/master/sample/25-dynamic-modules ).