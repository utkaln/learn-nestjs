# learn-nestjs

- NestJS tutorial using Typescript, Yarn as package manager
- Node 20, Nest 10

### Installations

- Latest Node, NPM, Yarn
- **NestJS CLI**: `yarn global add @nestjs/cli`
- **Generate UUID**: `yarn add uuid`

### Get Familiar with Terms

| Term                   | Interpretation                                                                                        | Usage                                    |
| ---------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Modules                | File that serves as entry point. Resembles with a set of capabilities of a Feature in the application | Annotate with decorator - @Module        |
| Controllers            | Instantiated within module. Control incoming requests and return response to client                   | Annotate - @Controller , @Get, @Post ... |
| Services               | Type of providers, but are of type singleton. Called from Controllers                                 | @Injectable                              |
| Providers              | Dependencies injected into Modules. Used in Modules                                                   | @Injectable                              |
| Exports                | Providers to export to other modules                                                                  |                                          |
| Pipes                  |                                                                                                       |                                          |
| AuthN, AuthZ using JWT |                                                                                                       |                                          |
| TypeORM                |                                                                                                       |                                          |
| QueryBuilder (ORM)     |                                                                                                       |                                          |
| Password Hashing       |                                                                                                       |                                          |
| Deployment of UI (S3)  |                                                                                                       |                                          |
| Deployment of Backend  |                                                                                                       |                                          |

### Getting Started

- Generate a project from CLI: `nest new <app_name>`
- The file named `app.module.ts` is the root file to begin, this is referred in `main.ts`. Leaving behind these two files in source folder, every other starter file can be removed.
- Run the application `yarn start:dev`
- Generate Module using CLI : `nest g module <name>`
- Generate Controller using CLI : `nest g controller <name> --no-spec` [do not create default test file, remember to send the same name for auto update]
- Generate Service using CLI : `nest g service <name> --no-spec` [remember to send the same name for auto update]

### References:

-
