# Kaznet frontend

[![Build Status](http://cicd.onalabs.org/api/badges/onaio/kaznet-frontend/status.svg)](http://cicd.onalabs.org/onaio/kaznet-frontend)

The Kaznet front end.

The front end is built with [React](https://reactjs.org/) and communicates with a [Django API](https://github.com/onaio/kaznet-web) serving [JSON API](http://jsonapi.org/) styled documents.

The state is managed by [redux](https://redux.js.org/).

The structure is inherited from [create-react-app](https://github.com/facebook/create-react-app).

## Guidelines

- We try follow the [BEM](https://en.bem.info/methodology/quick-start/) or Block Element Modifier guidelines for CSS.
- We strictly follow the [three principles of redux](https://redux.js.org/introduction/three-principles).

## Getting started

```sh
yarn

yarn start
```

## Testing

```sh
yarn test
```
