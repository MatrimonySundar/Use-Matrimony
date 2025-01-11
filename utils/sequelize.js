import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  host: process.env.NEXT_DATABASE_HOST,
  username: process.env.NEXT_DATABASE_USER, // Correct key for Sequelize
  password: process.env.NEXT_DATABASE_PASSWORD,
  database: process.env.NEXT_DATABASE_NAME,
  dialect: "mysql",
  dialectModule: require("mysql2"),
  logging: false,
  retry: {
    match: [/Deadlock/i],
    max: 5, // Maximum rety 3 times
    backoffBase: 1000, // Initial backoff duration in ms. Default: 100,
    backoffExponent: 1.5, // Exponent to increase backoff each try. Default: 1.1
  },  
});

// this approach is completly wrong., later check and fix.ok

(async () => {
  try {

    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
   // await sequelize.sync({ alter: true }); 
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

export default sequelize;

