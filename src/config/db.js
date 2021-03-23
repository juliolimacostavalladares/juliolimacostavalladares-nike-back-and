require("dotenv").config()
module.exports = {
  database: process.env.MYSQL_DATDABASE,
    username: process.env.MYSQL_USERNAME, 
    password: process.env.MYSQL_PASSWORD, 
    host: process.env.MYSQL_HOST,
    dialect: process.env.MYQLS_DIALECT,
    define: {
      timestamp: true,
      underscored: true
    }
}
