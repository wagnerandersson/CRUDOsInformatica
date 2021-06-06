require("dotenv").config();

const app = require("./app");

const apiport = 3000;

app.listen(process.env.PORT || apiport, () => {
  console.log(`Server is running`);
});
