# Project Name
>DinDin (formerly Dinder)

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

![swipe demo](/sequence.gif?raw=true)

Now you can have your cake and eat it too. Finding the next place to eat is as easy as pie. With our in-app integrated machine learning and personalized, place-based recommendations, DinDin gets to know you - and we know you're hungry! When you're in a pickle, don't reach for the same-old slice of half-baked carry out. With DinDin you'll be feeling cool as a cucumber - go bananas with our intuitive swipe-cards interface, and pretty soon you'll agree with our in-house team of hunger experts when they say, "DinDin - that's the greatest thing since sliced bread!"

DinDin is a cross-platform mobile app for both iOS and Android devices. Everyone can have a slice of this pie!

## Requirements

### Installing Dependencies
From within the root directory:

```
npm install
```

### Development
This app is built in Javascript using React-Native. Before contributing please consider taking some time and familiarizing with [React-Native](https://facebook.github.io/react-native/).

#### Running a Local API Server
Start a local API server instance using nodemon, and watch for changes in the `./server` directory:

```
npm run server
```

secrets.json file is location for API keys and not commited as part of this repo. Contributers are expected to acquire their own API keys for local development. API keys current sign on server instance and are called when referenced.

#### Compiling and Deploying with the React-Native Package Manager
This project targets both Android and iOS devices, and as such requires slightly different methods for compiling and installing. Follow the [recommended guidelines](https://facebook.github.io/react-native/releases/0.21/docs/getting-started.html) to setup your dev environment.

See the file `config.js` for a complete listing of environment variables required by this project. In development, local variables may be sourced from within a `secrets.json` in the root directory.

##### iOS
Project can be run through Xcode on a local simulator or attached device. Build files are not included in the repo code and the following steps/permissions are needed to get app up and running.

1. Enable non https calls to production server (when/if connecting to production server)
[here](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW33)

2. MANUAL linking libraries to allow app access to camera, camera roll and location
[here](https://facebook.github.io/react-native/docs/linking-libraries-ios.html)

3. Enable external linking, in this case for uber.
[here](https://developer.uber.com/docs/rides/deep-linking)

Outside of those build specificy items, to buil and install the application, run:

```
react-native run-ios
```

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

Additionally logging can be done with either:

```
react-native log-ios
```

OR

```
react-native log-android
```

#### Linting with ESLint and the Hack Reactor style guide:
This assumes you have a global installation of ESLint; if not, `npm install -g eslint` or replace with your preferred linter.

```
npm run lint
```

Note that this project initiates linting with a pre-commit script.

### Tasks & Contributing
View the waffle.io issues [here](https://waffle.io/Scrumbledore/Dinder)

Please make sure to follow the style guide and submit rebased pull requests.
