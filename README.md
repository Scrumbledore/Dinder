# Project Name
>Dinder

## Team
  - __Product Owner__: Graham Wimbrow
  - __Scrum Master__: Ryan Busby
  - __Lead Engineers__: Daniel Chang, Esther Oh

## Table of Contents
1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage
It's been a hot, dog day - you're hungry, the fridge is empty, and you wouldn't have the will to cook even if you did have the ingredients. You went for pizza twice this week already, and don't relish the idea of another fruitless online search. Your mind is toast, and if you don't eat soon you'll be feeling nutty as a fruitcake. You've been working hard to bring home the bacon - you have a lot on your plate - and right now you have bigger fish to fry than to skim through restaurant reviews. But you guess that's just how the cookie crumbles...

_Enter DinDin_

Now you can have your cake and eat it too. With DinDin, finding the next place to eat is as easy as pie - with integrated machine learning and personalized, place-based recommendations, DinDin gets to know you - and we know you're hungry! When you're in a pickle, don't reach for the same-old slice of half-baked carry out. With DinDin you'll be feeling cool as a cucumber - go bananas with our intuitive swipe-cards interface, and pretty soon you'll agree with our in-house team of hunger experts when they say, "DinDin - that's the greatest thing since sliced bread!"

## Requirements
DinDin is a cross-platform mobile app that will compile to run on both iOS and Android devices. Everyone can have a slice of this pie!

## Development

### Installing Dependencies
From within the root directory:

```
npm install
```

### Development

#### Running a Local API Server
Start a local API server instance using nodemon, and watch for changes in the `./server` directory:

```
npm run server
```

#### Compiling and Deploying with the React-Native Package Manager
This project targets both Android and iOS devices, and as such requires slightly different methods for compiling and installing. Follow the [recommended guidelines](https://facebook.github.io/react-native/releases/0.21/docs/getting-started.html) to setup your dev environment.

See the file `config.js` for a complete listing of environment variables required by this project. In development, local variables may be sourced from within a `secrets.json` in the root directory.

##### Android
The following steps are consistent regardless of if you're running an emulator (using the Android SDK is recommended) or testing with a physical device. From the project root directory, to build and install the application, run:

```
react-native run-android
```

Once the build has completed, enter the following command to start the React-Native package manager (appending with ---reset-cache helps avoid errors from stale build files):

```
react-native start --reset-cache
```

#### Testing
Server-side tests provide coverage for interacting with the API server and PostgreSQL database:

```
npm test
```

#### Linting with ESLint and the Hack Reactor style guide:
This assumes you have a global installation of ESLint; if not, `npm install -g eslint` or replace with your preferred linter.

```
npm run lint
```

Note that this project initiates linting with a pre-commit script.

### Tasks
View the waffle.io issues [here](https://waffle.io/Scrumbledore/Dinder)

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
