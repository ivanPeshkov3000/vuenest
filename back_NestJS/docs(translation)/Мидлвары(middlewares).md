### Мидлвары (Middleware)

Middleware - это функция, которая вызывается **перед** обработчиком маршрута. Функции мидлвар имеют доступ к объектам [запроса(request)](https://expressjs.com/en/4x/api.html#req ) и [ответа(response)](https://expressjs.com/en/4x/api.html#res ) и промежуточную функцию `next()` в цикле запроса-ответа приложения. Функция мидлвара **next** обычно обозначается переменной с именем `next`.

<figure><img src="./assets/Middlewares_1.png" /></figure>

Nest middleware are, by default, equivalent to [express](https://expressjs.com/en/guide/using-middleware.html) middleware. The following description from the official express documentation describes the capabilities of middleware:
Мидлвары Nest по умолчанию эквивалентны [express](https://expressjs.com/en/guide/using-middleware.html ) мидлварам. Следующее описание из официальной документации express описывает возможности мидлваров:

<blockquote class="external">
  Мидлвары могут выполнять следующие задачи:
  <ul>
    <li>выполнить любой код.</li>
    <li>внести изменения в объекты запроса и ответа.</li>
    <li>завершить цикл запрос-ответ.</li>
    <li>вызвать следующий мидлвар в стеке.</li>
    <li>если текущая мидлвара не завершает цикл запроса-ответа, она должна вызвать <code>next()</code>, чтобы передать управление следующей мидлваре. В противном случае запрос будет оставлен в подвешенном состоянии.</li>
  </ul>
</blockquote>

Мы реализуем пользовательский мидлварь Nest либо в функции, либо в классе с декоратором `@Injectable()`. Класс должен реализовывать интерфейс `NestMiddleware`, в то время как функция не имеет каких-либо особых требований. Давайте начнем с реализации простой мидлвары с использованием метода class.

```typescript
@@filename(logger.middleware)
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}
@@switch
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware {
  use(req, res, next) {
    console.log('Request...');
    next();
  }
}
```

#### Внедрение зависимостей (Dependency injection)

Мидлвары Nest полностью поддерживают внедрение зависимостей. Как и в случае с провайдерами и контроллерами, они могут **инджектировать зависимости**, доступные в одном и том же модуле. Как обычно, это делается через `constructor`.

#### Применение мидлвар (Applying middleware)

В декораторе `@Module()` нет места для мидлваров. Вместо этого мы настраиваем их с помощью метода `configure()` класса module. Модули, включающие мидлвары, должны реализовывать интерфейс `NestModule`. Давайте настроим `LoggerMiddleware` на уровне модуля приложения `AppModule`.

```typescript
@@filename(app.module)
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('cats');
  }
}
@@switch
import { Module } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule {
  configure(consumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('cats');
  }
}
```

В приведенном выше примере мы настроили `LoggerMiddleware` для обработчиков маршрутов `/cats`, которые ранее были определены внутри `CatsController`. Мы также можем дополнительно ограничить мидлвар определенным методом запроса, передав объект, содержащий маршрут `path` и `method` запроса, методу `forRoutes()` при настройке мидлвары. В приведенном ниже примере обратите внимание, что мы импортируем перечисление `RequestMethod`, чтобы ссылаться на желаемый тип метода запроса.

```typescript
@@filename(app.module)
import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
@@switch
import { Module, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule {
  configure(consumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
```

> **Совет:** Метод `configure()` можно сделать асинхронным с помощью `async/await` (например, вы можете `await-ить` асинхронные операции внутри тела метода `configure()`).

#### Шаблонные маршруты (Route wildcards)

Также поддерживаются маршруты, основанные на шаблонах. Например, звездочка используется в качестве **шаблона** и будет соответствовать любой комбинации символов:

```typescript
forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });
```

The `'ab*cd'` route path will match `abcd`, `ab_cd`, `abecd`, and so on. The characters `?`, `+`, `*`, and `()` may be used in a route path, and are subsets of their regular expression counterparts. The hyphen ( `-`) and the dot (`.`) are interpreted literally by string-based paths.

> warning **Warning** The `fastify` package uses the latest version of the `path-to-regexp` package, which no longer supports wildcard asterisks `*`. Instead, you must use parameters (e.g., `(.*)`, `:splat*`).

#### Middleware consumer

The `MiddlewareConsumer` is a helper class. It provides several built-in methods to manage middleware. All of them can be simply **chained** in the [fluent style](https://en.wikipedia.org/wiki/Fluent_interface). The `forRoutes()` method can take a single string, multiple strings, a `RouteInfo` object, a controller class and even multiple controller classes. In most cases you'll probably just pass a list of **controllers** separated by commas. Below is an example with a single controller:

```typescript
@@filename(app.module)
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(CatsController);
  }
}
@@switch
import { Module } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller';

@Module({
  imports: [CatsModule],
})
export class AppModule {
  configure(consumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(CatsController);
  }
}
```

> **Совет:** The `apply()` method may either take a single middleware, or multiple arguments to specify <a href="/middleware#multiple-middleware">multiple middlewares</a>.

#### Excluding routes

At times we want to **exclude** certain routes from having the middleware applied. We can easily exclude certain routes with the `exclude()` method. This method can take a single string, multiple strings, or a `RouteInfo` object identifying routes to be excluded, as shown below:

```typescript
consumer
  .apply(LoggerMiddleware)
  .exclude(
    { path: 'cats', method: RequestMethod.GET },
    { path: 'cats', method: RequestMethod.POST },
    'cats/(.*)',
  )
  .forRoutes(CatsController);
```

> **Совет:** The `exclude()` method supports wildcard parameters using the [path-to-regexp](https://github.com/pillarjs/path-to-regexp#parameters) package.

With the example above, `LoggerMiddleware` will be bound to all routes defined inside `CatsController` **except** the three passed to the `exclude()` method.

#### Functional middleware

The `LoggerMiddleware` class we've been using is quite simple. It has no members, no additional methods, and no dependencies. Why can't we just define it in a simple function instead of a class? In fact, we can. This type of middleware is called **functional middleware**. Let's transform the logger middleware from class-based into functional middleware to illustrate the difference:

```typescript
@@filename(logger.middleware)
import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request...`);
  next();
};
@@switch
export function logger(req, res, next) {
  console.log(`Request...`);
  next();
};
```

And use it within the `AppModule`:

```typescript
@@filename(app.module)
consumer
  .apply(logger)
  .forRoutes(CatsController);
```

> **Совет:** Consider using the simpler **functional middleware** alternative any time your middleware doesn't need any dependencies.

#### Multiple middleware

As mentioned above, in order to bind multiple middleware that are executed sequentially, simply provide a comma separated list inside the `apply()` method:

```typescript
consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);
```

#### Global middleware

If we want to bind middleware to every registered route at once, we can use the `use()` method that is supplied by the `INestApplication` instance:

```typescript
@@filename(main)
const app = await NestFactory.create(AppModule);
app.use(logger);
await app.listen(3000);
```

> **Совет:** Accessing the DI container in a global middleware is not possible. You can use a [functional middleware](middleware#functional-middleware) instead when using `app.use()`. Alternatively, you can use a class middleware and consume it with `.forRoutes('*')` within the `AppModule` (or any other module).
