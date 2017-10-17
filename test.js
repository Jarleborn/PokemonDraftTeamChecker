const rapidSpinMons = [
  "Anorith",
  "Armaldo",
  "Avalugg",
  "Baltoy",
  "Bergmite",
  "Blastoise",
  "Bounsweet",
  "Claydol",
  "Cloyster",
  "Cryogonal",
  "Delibird",
  "Dhelmise",
  "Donphan",
  "Drilbur",
  "Excadrill",
  "Forretress",
  "Hitmonchan",
  "Hitmonlee",
  "Hitmontop",
  "Kabuto",
  "Kabutops",
  "Komala",
  "Pheromosa",
  "Pineco",
  "Sandshrew",
  "Sandshrew-Alola",
  "Sandslash",
  "Sandslash-Alola",
  "Shellder",
  "Spinda",
  "Squirtle",
  "Starmie",
  "Staryu",
  "Steenee",
  "Tentacool",
  "Tentacruel",
  "Torkoal",
  "Tsareena",
  "Tyrogue",
  "Wartortle"
]

const defogMons = [

]


{this.props.mons.map(function (mon) {
  <div>
    <h2>{mon.name}</h2>
    <img src={mon.sprite} />
  </div>
})}
