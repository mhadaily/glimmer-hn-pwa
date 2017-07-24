# Glimmer.js Hacker News Progressive Web App

[![Lighthouse 2.2.1](glimmer-hn-pwa.png)](https://glimmer-hn-pwa.firebaseapp.com)

This is an implementation of a progressive web app with Glimmer (Ember template engine). 
Here is the result

with webpagetest on 3G and EM: 

### [Performance Results (webpagetest EM):](https://www.webpagetest.org/result/170724_59_43187e264846ff2314364b01642ee1e1/)
[![webpagetest](webpagetest.jpg)](https://www.webpagetest.org/result/170724_59_43187e264846ff2314364b01642ee1e1/)

### [Performance Results (webpagetest 3G):](https://www.webpagetest.org/result/170724_Q5_ae999c76745dd61df39f744a6b10f45b/)
[![webpagetest](webpagetest3g.jpg)](https://www.webpagetest.org/result/170724_Q5_ae999c76745dd61df39f744a6b10f45b/)

### and with [Lighthouse 2.2.1](https://www.webpagetest.org/lighthouse.php?test=170724_Q5_ae999c76745dd61df39f744a6b10f45b&run=2)

[![Lighthouse 2.2.1](lighthouse.jpg)](https://glimmer-hn-pwa.firebaseapp.com/lighthouse.html)

## TODO
* Consider using official api to have realtime update
* Collapsible comment threads, with child counts
* Last visit details for stories are cached in localStorage
* try to optimize more
* Consider fast-boot
* Remove SW from Development 

## Installation

* `git clone <repository-url>` this repository
* `cd glimmer-hn-pwa`
* `yarn`

## Running / Development

* `npm start`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Building

* `ember build` (production)
* `ember build:prod` (production and Deploy to Firebase)

## [Contributing](CONTRIBUTING.MD)
Please feel free to open a PR and improve Glimmer PWA.

## Contributors
