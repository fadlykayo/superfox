const cheerio = require('cheerio')
const request = require('request-promise')
const superhero = require('../superhero')
let heroes = []

let scrap = {
  getHero: function (url, cb) {
    request(url)
    .then(function (html) {
      return html
    })
    .then(function (html) {
      return cheerio.load(html)
    })
    .then(function ($) {
      heroes.push({profPic: $('.character-image').attr('src'), mainPic: $('.featuredImage img').attr('src'), power: $('.possibleTruncation span').html(), desc: $('.featured-item-desc')[0].children[3].children[0].data.trim()})
      // console.log(heroes);
      cb(heroes)
    })
    .catch(function (err) {
      console.log(err)
    })
  }
}

module.exports = scrap

// superhero.getHeroData('Alex', [1,2,3,4,5,6,10], function(hero){
//   let url = hero.urls[0].url
//   console.log(url);
//   scrap.getHero(url)
// });

// <% if(!data.mainPic){data.profPic}else{null} %>
// background:url(<%= data.mainPic %>) no-repeat center; background-size: cover;
