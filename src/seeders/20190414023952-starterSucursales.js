'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const places = [
      "Huerfanos",
      "Crillon",
      "Mall del Centro",
      "Mall Plaza Alameda",
      "Mall Plaza Maipú",
      "Mall Plaza Oeste",
      "Mall Plaza Vespucio",
      "Mall Florida center",
      "Mall Parque Arauco",
      "Los Dominicos",
      "Mall Alto Las Condes",
      "Mall Plaza Norte",
      "Mall Parque Tobalaba",
      "Mall Costanera Center",
      "Mall Plaza Sur",
      "Mall Plaza Egaña"
    ];
    var p = [];
    for (let i = 0; i < places.length; i += 1) {
      p.push(
        {
          name: places[i],
          region: 'RM',
          address: places[i],
          mapSrc: "map1.jpg,map2.jpg,map.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      )
    }
    
    return queryInterface.bulkInsert('sucursals',p);
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
