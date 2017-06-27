# Glimmer Hacker News Progressive Web App

This is an implementation of a progressive web app with Glimmer (Ember template engine). 
Here is the result

with webpagetest on 3G: 

[Performance Results (webpagetest):](https://www.webpagetest.org/result/170626_00_46d2a10b1a22cd6edc3e99fa6b403bde/)
[![webpagetest](webpagetest.jpg)](https://glimmer-hn-pwa.firebaseapp.com/)

and with Lighthouse 2.1.0

[![Lighthouse 2.1.0](lighthouse.jpg)](https://glimmer-hn-pwa.firebaseapp.com/)

## TODO
* Add next and previous function to see more news
* Consider using official api to have realtime update
* Collapsible comment threads, with child counts
* Last visit details for stories are cached in localStorage
* Consider adding animations 

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Yarn](https://yarnpkg.com/en/)
* [Ember CLI](https://ember-cli.com/)

## Installation

* `git clone <repository-url>` this repository
* `cd glimmer-hn-pwa`
* `yarn`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Building

* `ember build` (development)
* `ember build --environment production` (production)

## Further Reading / Useful Links

* [glimmerjs](http://github.com/tildeio/glimmer/)
* [ember-cli](https://ember-cli.com/)
