# RandomUser

Application prepared as recruitment task for [dataedo](https://dataedo.pl).

The randomUser app contains two views:
- People - it displays random people from [randomuser.me](https://randomuser.me) API along with their first names, last names, and photos. Every 5 seconds, the application automatically retrieves information about another random person, unless the user hovers over the first name, last name, user photo, or the 'New' button. 
- About - it presents a static page with a description of this recruitment task.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.

## Used technologies
- Angular 17 - with signals, new control-flow mechanism and defferable views
    - Modules - were mixed with standalone components to achive full lazy-loding behaviour
- SCSS - to add custom styles with better and more readible way than pure CSS
- Bootstrap - to avoid unnecessary work and bring project to life faster
- Jasmine + Karma - for unit tests
- HTML 5 - for semantic meaning of html elements
- Typescript - for improve code quality
- Envirionemntal variables - for possiblity to easily manage global variables such as API url or interval for fetching

## Project structure
All following folders are located in /src/app:
- about - module containig component for 'About' path in the application
- people - module containing services, directives and components for 'People' path in the application
- global - contains components used on each application view
- shared - contains components and models which could be imported in the different part of application

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Author

If you have any questions about this project feel free to contact with me via [edwin.harmata@gmail.com](mailto:edwin.harmata@gmail.com)

