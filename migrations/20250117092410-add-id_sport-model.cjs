'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn(
            'Sports',
            'sport_id',
            {
                type: Sequelize.STRING,
                max: 255,
                unique: true,
                allowNull: false,
            },
            {
                after: 'id',
            }
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('Sports', 'sport_id');
    },
};
