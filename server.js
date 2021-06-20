require("dotenv").config();
var cors = require("cors");

const app = require("./app");
app.use(cors());

const apiport = 3000;

app.listen(process.env.PORT || apiport, () => {
  console.log(`Server is running`);
});
