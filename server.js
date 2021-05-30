require("dotenv").config();

const app = require("./app");

const apiport = 3001;

app.listen(process.env.PORT || apiport, () => {
  console.log(`Server is running`);
});
