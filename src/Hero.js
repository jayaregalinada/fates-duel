function Hero(name, subName, description) {
  this.name = name;
  this.description = description;
  this.subName = subName;
  this.imagePath = `./assets/heroes/${name
    .toLowerCase()
    .replaceAll(' ', '-')}.png`;
}

export default Hero;
