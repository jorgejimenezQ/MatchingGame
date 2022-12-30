## Fantasy Match

[Check Out the Game!](https://josephmancuso.github.io/fantasy-match/)

[TOC]

<!--
- [Fantasy Match](#fantasy-match)
- [The project](#the-project)
- [Front End Stack](#front-end-stack)
- [Back End Stack](#back-end-stack)
- [Data flow](#data-flow) -->
<!-- - [deploying](#deploying) -->

## The project

The game is a simple match game. The user has to match the cards by clicking on them. The app
allows two players to play against each other. A game session is created when a player joins the
game. The game will start when the second player joins the game.

<img src="./desktop.png" alt="An image of the game in desktop mode" width="500"/>
<br/>
<img src="./mobile.png" alt="An image of the game in mobile mode" width="200"/>

## Front End Stack

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Phaser](https://phaser.io/)
- [React-Redux](https://react-redux.js.org/)

For this project, I wanted to use React for the UI and Phaser for all the game logic. The biggest
challenge was to get the two to work together. I wanted to learn as much as possible without
re-inventing the wheel. I could have, for example, used the [react-phaser-fiber](https://www.npmjs.com/package/react-phaser-fiber)
package, but I wanted to challenge myself and learn how to do it myself.

I did not have a lot of experience with Phaser or React, so I had to do a lot of research. There
are a lot of resources online for React, Phaser is a different story. I mostly read the documentation
and looked at the examples on their website.

## Back End Stack

- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Socket.io](https://socket.io/)

For the back end, I used Node and Express because of their simplicity to get up and running as we. For this project, I wanted to concentrate on getting the connection between the players right because there will be a lot moving pieces. Therefore, I used a stack that I was familiar with and had a lot of resources online.

Socket.io is a great library for real-time communication app like this one. It abstract a lot of the complexity of web sockets and makes it easy to get your ideas on the screen.

## Data flow

I had a pretty clear idea of how the data was going to flow through the app. I knew the React side of the app
would be handling the UI, User input, displaying player scores, etc. Phaser would handle the game logic, detect
when a player scores, and send data to the server. Both React and Phaser would receive and send data to the server.

So, I created a redux store using React-Redux-Toolkit. I used the store to store the a game session id, both player's usernames, both player's scores, and the current player's turn. It is also great to get an overview of how web sockets work before tackling a more complex project that requires them.

[![React and Phase communicate through redux store](react-redux-2.png)](./react-redux-2.png)

## deploying

```bash
# Commit all changes
$ git add .;commit -m "message ..."; git push -u origin main
# Build:
$ yarn run build
# Add dist folder:
$ git add dist -f
# Build the vite project
$ yarn run build
# Deploy using gh-pages
$ git subtree push --prefix dist origin gh-pages
```
