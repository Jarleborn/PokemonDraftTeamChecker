require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_teamChecker__ = __webpack_require__(5);
var colors = __webpack_require__(2);
var express = __webpack_require__(3);
var http = __webpack_require__(4).Server(app);
var port = 1337;
var app = express();

console.log('hej'.green);

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/checkTeam', function (req, res) {
  Object(__WEBPACK_IMPORTED_MODULE_0__modules_teamChecker__["a" /* getInitialData */])(['smeargle']);
});

app.get('/test', function (req, res) {
  Object(__WEBPACK_IMPORTED_MODULE_0__modules_teamChecker__["b" /* test */])(['gengar', 'bisharp', 'hitmonlee', 'roserade', 'masquerain']).then(function (resp) {
    return res.send(resp);
  }).catch(function (err) {
    return console.log(err);
  });
});

app.listen(port, function () {
  console.log('Our app is running on http://localhost:' + port);
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("colors");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getInitialData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return test; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__extra__ = __webpack_require__(7);
var Pokedex = __webpack_require__(6);
var P = new Pokedex();


function getInitialData(array) {
  for (var i = 0; i < array.length; i++) {
    P.getPokemonByName(array[i]) // with Promise
    .then(function (response) {
      console.log(response[0]);
    }).catch(function (error) {
      console.log('There was an ERROR: ', error);
    });
  }
}

function test(mons) {
  var hold = [];
  return new Promise(function (resolve, reject) {
    var team = {};
    team.mons = [];
    team.hazards = [];
    team.removal = [];
    team.voltTurn = [];

    for (var i = 0; i < mons.length; i++) {
      hold.push(P.getPokemonByName(mons[i]) // with Promise
      .then(function (mon) {
        return monChecker(mon);
      }).catch(function (error) {
        console.log('There was an ERROR: ', error);
      }));
    }
    return Promise.all(hold).then(function (res) {
      console.log(res);
      resolve(res);
    });
  });
}

function monChecker(monToCheck) {
  return new Promise(function (resolve, reject) {
    var mon = {};
    mon.name = monToCheck.name;
    mon.type = monToCheck.types;
    mon.sprite = monToCheck.sprites.front_default;
    mon.hazards = [];
    mon.removal = [];
    mon.voltTurn = [];

    var voltTurn = ['volt-switch', 'u-turn'];

    for (var j = 0; j < monToCheck.types.length; j++) {}
    for (var i = 0; i < monToCheck.moves.length; i++) {

      if (voltTurn.includes(monToCheck.moves[i].move.name)) {
        mon.voltTurn.push({
          'type': monToCheck.moves[i].move.name,
          'mon': monToCheck.name
        });
      }
    }
    if (__WEBPACK_IMPORTED_MODULE_0__extra__["f" /* toxicSpikesMons */].includes(monToCheck.name)) {
      mon.hazards.push({
        'type': 'toxic-spikes',
        'mon': monToCheck.name
      });
    }
    if (__WEBPACK_IMPORTED_MODULE_0__extra__["e" /* stickyWebMon */].includes(monToCheck.name)) {
      mon.hazards.push({
        'type': 'sticky-web',
        'mon': monToCheck.name
      });
    }
    if (__WEBPACK_IMPORTED_MODULE_0__extra__["c" /* rocksMon */].includes(monToCheck.name)) {
      mon.hazards.push({
        'type': 'stealth-rock',
        'mon': monToCheck.name
      });
    }

    if (__WEBPACK_IMPORTED_MODULE_0__extra__["d" /* spikesMon */].includes(monToCheck.name)) {
      mon.hazards.push({
        'type': 'spikes',
        'mon': monToCheck.name
      });
    }

    if (__WEBPACK_IMPORTED_MODULE_0__extra__["a" /* defogMons */].includes(monToCheck.name)) {
      mon.removal.push({
        'type': 'defog',
        'mon': monToCheck.name
      });
    }

    if (__WEBPACK_IMPORTED_MODULE_0__extra__["b" /* rapidSpinMons */].includes(monToCheck.name)) {
      mon.removal.push({
        'type': 'rapid-spin',
        'mon': monToCheck.name
      });
    }

    resolve(mon);
  });
}



/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("pokedex-promise-v2");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return toxicSpikesMons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return stickyWebMon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return rocksMon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return spikesMon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return rapidSpinMons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return defogMons; });
var toxicSpikesMons = ['ariados', 'beedrill', 'beedrill-mega', 'cloyster', 'cofagrigus', 'dragalge', 'drapion', 'forretress', 'froakie', 'frogadier', 'garbodor', 'greninja', 'greninja-ash', 'koffing', 'mareanie', 'nidoking', 'nidoqueen', 'nidoran-f', 'nidoran-m', 'nidorina', 'nidorino', 'nihilego', 'omanyte', 'omastar', 'pineco', 'qwilfish', 'roselia', 'roserade', 'scolipede', 'skorupi', 'skrelp', 'spinarak', 'tentacool', 'tentacruel', 'toxapex', 'trubbish', 'venipede', 'venomoth', 'venonat', 'weezing', 'whirlipede', 'yamask'];

var stickyWebMon = ['ariados', 'galvantula', 'kricketune', 'leavanny', 'masquerain', 'sewaddle', 'shuckle', 'spinarak', 'surskit', 'swadloon'];

var rocksMon = ['aerodactyl', 'aggron', 'amaura', 'anorith', 'arceus', 'arceus-bug', 'arceus-dark', 'arceus-dragon', 'arceus-electric', 'arceus-fairy', 'arceus-fighting', 'arceus-fire', 'arceus-flying', 'arceus-ghost', 'arceus-grass', 'arceus-ground', 'arceus-ice', 'arceus-poison', 'arceus-psychic', 'arceus-rock', 'arceus-steel', 'arceus-water', 'archen', 'archeops', 'armaldo', 'aron', 'aurorus', 'azelf', 'baltoy', 'barbaracle', 'bastiodon', 'bibarel', 'bidoof', 'binacle', 'bisharp', 'blissey', 'boldore', 'bonsly', 'bronzong', 'bronzor', 'camerupt', 'carbink', 'carracosta', 'celebi', 'chansey', 'chimchar', 'claydol', 'clefable', 'clefairy', 'cobalion', 'corsola', 'cradily', 'cranidos', 'crustle', 'cubone', 'deoxys', 'deoxys-attack', 'deoxys-defense', 'deoxys-speed', 'dialga', 'diancie', 'diglett', 'donphan', 'drilbur', 'druddigon', 'dugtrio', 'dunsparce', 'dwebble', 'empoleon', 'excadrill', 'ferroseed', 'ferrothorn', 'forretress', 'gabite', 'garchomp', 'geodude', 'geodude-alola', 'gible', 'gigalith', 'gligar', 'gliscor', 'golem', 'golem-alola', 'golett', 'golurk', 'graveler', 'graveler-alola', 'grotle', 'groudon', 'heatran', 'hippopotas', 'hippowdon', 'infernape', 'jigglypuff', 'jirachi', 'kabuto', 'kabutops', 'kecleon', 'krokorok', 'krookodile', 'lairon', 'landorus', 'landorus-therian', 'larvitar', 'lileep', 'lunatone', 'lycanroc', 'lycanroc-midnight', 'magcargo', 'mamoswine', 'marowak', 'marowak-alola', 'marshtomp', 'mawile', 'mesprit', 'metagross', 'metang', 'mew', 'miltank', 'minior', 'monferno', 'necrozma', 'nidoking', 'nidoqueen', 'nihilego', 'nosepass', 'numel', 'omanyte', 'omastar', 'onix', 'palpitoad', 'pawniard', 'phanpy', 'piloswine', 'pineco', 'pinsir', 'piplup', 'prinplup', 'probopass', 'pupitar', 'rampardos', 'regirock', 'registeel', 'relicanth', 'rhydon', 'rhyhorn', 'rhyperior', 'rockruff', 'roggenrola', 'sandile', 'sandshrew', 'sandslash', 'seismitoad', 'shieldon', 'shuckle', 'skarmory', 'solrock', 'steelix', 'stunfisk', 'sudowoodo', 'swampert', 'swinub', 'terrakion', 'tirtouga', 'torkoal', 'torterra', 'turtwig', 'tyranitar', 'tyrantrum', 'tyrunt', 'uxie', 'wigglytuff', 'wormadam-sandy', 'wormadam-trash'];

var spikesMon = ['accelgor', 'budew', 'bunnelby', 'cacnea', 'cacturne', 'chesnaught', 'chespin', 'cloyster', 'crustle', 'delibird', 'deoxys', 'deoxys-Attack', 'deoxys-Defense', 'deoxys-Speed', 'diggersby', 'dwebble', 'ferroseed', 'ferrothorn', 'forretress', 'froslass', 'garbodor', 'glalie', 'golisopod', 'greninja', 'greninja-ash', 'klefki', 'maractus', 'omanyte', 'omastar', 'pineco', 'quilladin', 'qwilfish', 'roselia', 'roserade', 'scolipede', 'shelmet', 'skarmory', 'snorunt', 'trubbish', 'venipede', 'whirlipede', 'wimpod'];

var rapidSpinMons = ['anorith', 'armaldo', 'avalugg', 'baltoy', 'bergmite', 'blastoise', 'bounsweet', 'claydol', 'cloyster', 'cryogonal', 'delibird', 'dhelmise', 'donphan', 'drilbur', 'excadrill', 'forretress', 'hitmonchan', 'hitmonlee', 'hitmontop', 'kabuto', 'kabutops', 'komala', 'pheromosa', 'pineco', 'sandshrew', 'sandshrew-alola', 'sandslash', 'sandslash-alola', 'shellder', 'spinda', 'squirtle', 'starmie', 'staryu', 'steenee', 'tentacool', 'tentacruel', 'torkoal', 'tsareena', 'tyrogue', 'wartortle'];

var defogMons = ['aerodactyl', 'arceus', 'arceus-bug', 'arceus-dark', 'arceus-dragon', 'arceus-electric', 'arceus-fairy', 'arceus-fighting', 'arceus-fire', 'arceus-flying', 'arceus-ghost', 'arceus-grass', 'arceus-ground', 'arceus-ice', 'arceus-poison', 'arceus-psychic', 'arceus-rock', 'arceus-steel', 'arceus-water', 'archen', 'archeops', 'articuno', 'beautifly', 'beedrill', 'braviary', 'butterfree', 'charizard', 'chatot', 'crobat', 'dartrix', 'decidueye', 'delibird', 'dragonite', 'drifblim', 'drifloon', 'ducklett', 'dustox', 'empoleon', 'farfetchd', 'fearow', 'finneon', 'flygon', 'fomantis', 'giratina', 'giratina-origin', 'gligar', 'gliscor', 'golbat', 'honchkrow', 'ho-oh', 'hoothoot', 'kartana', 'latias', 'latios', 'lugia', 'lumineon', 'lurantis', 'mandibuzz', 'mantine', 'masquerain', 'mew', 'moltres', 'mothim', 'murkrow', 'ninjask', 'noctowl', 'nuzleaf', 'pelipper', 'pidgeot', 'pidgeotto', 'pidgey', 'piplup', 'prinplup', 'rowlet', 'rufflet', 'salamence', 'scizor', 'scyther', 'seedot', 'shiftry', 'skarmory', 'skuntank', 'spearow', 'staraptor', 'staravia', 'starly', 'stunky', 'swanna', 'swellow', 'taillow', 'tapu fini', 'togekiss', 'togetic', 'tropius', 'venomoth', 'vespiquen', 'vibrava', 'vullaby', 'wingull', 'xatu', 'yanma', 'yanmega', 'zapdos', 'zubat'];



/***/ })
/******/ ]);
//# sourceMappingURL=main.map