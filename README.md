# Todo Application

A Todo project, built as part of The Odin Project's JavaScript course.

[**Live demo**](https://karafakioglu.github.io/todo-list/)

## Features

- Add projects and edit them via modal
- Add todos that are tied to a project and edit them via modal
- Show todos depending on their date and status
- Back button reverts to the view where they actually clicked from.
- Saving projects and todos into localStorage and reading the data from localStorage

## What I learned

This is the first time I have used modules and as the project kept grew bigger, it became harder to follow which part was responsible for
which part. I have learned that planning thoroughly before you write a single line of code makes the implementation much faster and less frustrating.

Also used `date-fns` and learned to work with dates.

Maybe the most interesting part was working with JSON because I have utilized using localStorage to have data persistency. This means that if the user comes back after some time, all the projects and todos are still available.

## Built with

- HTML
- CSS
- Vanilla JavaScript
- date-fns
- Webpack

## Running locally

Clone the repo
1) Install `node.js`
2) Run `npm install` to install dependencies
3) Run `npm run dev` to run the development version