# Project Name
>Dinder

## Team
  - __Product Owner__: Graham Winbrow
  - __Scrum Master__: Ryan Busby
  - __Development Team Members__: Daniel Chang, Esther Oh

## Table of Contents
1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage
???

## Requirements
Food

## Development


### Installing Dependencies
From within the root directory:

```sh
npm install
```
### Development

#### Running a Local API Server
Start a local API server instance using nodemon, and watch for changes in the `./server` directory:

```sh
npm run server
```

#### Compiling and Deploying with the React-Native Package Manager
This project targets both Android and iOS devices, and as such requires slightly different methods for compiling and installing. Follow the [recommended guidelines](https://facebook.github.io/react-native/releases/0.21/docs/getting-started.html) to setup your dev environment.

##### Android
The following steps are consistent regardless of if you're running an emulator (using the Android SDK is recommended) or testing with a physical device. From the project root directory, to build and install the application, run:

```
react-native run-android
```

Once the build has completed, enter the following command to start the React-Native package manager (appending the flag to reset cache helps avoid errors resulting from old build files):

```
react-native start --reset-cache
```

### Testing
TBD: automation / continuous deployment

#### Testing
The tests included with this project are divided between server and application suites (tk). Server-side tests provide coverage for interacting with the API server and PostgreSQL database:

```
npm test
```

#### Linting with ESLint and the Hack Reactor style guide:
This assumes you have a global installation of ESLint; if not, `npm install -g eslint` or replace with your preferred linter. The included eslintrc.js file in this project's root directory sources the Hack Reactor default style guide, and has been configured to provide coverage for react-native applications:

```sh
npm run lint
```
Note that this project initiates linting with a pre-commit script.

### Tasks
View the waffle.io issues [here](https://waffle.io/Scrumbledore/Dinder)

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
