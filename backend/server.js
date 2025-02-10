const express = require("express");
const connectToDb = require("./db");
const dotenv = require("dotenv");
const cors = require('cors')
const cookieParser = require('cookie-parser')
dotenv.config();
const app = express();
const port = 3000;
app.use(cors({origin:'http://localhost:5173' ,credentials: true }))
app.use(express.json())
app.use(cookieParser())
connectToDb(process.env.MONGO_URI);

// Routes
app.use("/api/v1/auth", require("./routes/userRoute"));
app.use("/api/v1/company", require("./routes/agentRoute"));
app.use("/api/v1/service", require("./routes/serviceRoute"));
app.use("/api/v1/hotel", require("./routes/hotelRoute"));
app.use("/api/v1/hotel/rate", require("./routes/rateRoute"));
app.use("/api/v1/display", require("./routes/displayRoute"));
app.use("/api/v1/service-pakage", require("./routes/servicePakageRoute"));
app.use("/api/v1/hotel-pakage", require("./routes/hotelPakageRoute"));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)

})
