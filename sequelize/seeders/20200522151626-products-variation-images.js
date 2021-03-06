/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
const { randomArrayElement } = require("../../dist/util/index");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const products = await queryInterface.sequelize.query(
      "select id from product_variations"
    );

    const productsImages = [];
    [...Array(Math.floor(Math.random() * 600) + 1)].map(() =>
      productsImages.push({
        productVariationId: randomArrayElement(products[0]).id,
        image: "https://via.placeholder.com/720x720",
      })
    );
    return queryInterface.bulkInsert(
      "product_variation_images",
      productsImages
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.bulkDelete("product_variation_images", null, {});
  },
};
