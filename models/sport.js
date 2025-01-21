import { DataTypes } from "sequelize";
import database from "../db/database.js";

export const Sport = database.define("sport", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    minimum_players: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sport_id: {
        type: DataTypes.STRING,
        max: 255,
        unique: true,
        allowNull: false
    }
},{
    tableName: "Sports"
});

