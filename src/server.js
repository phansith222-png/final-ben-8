import "dotenv/config"
import express from "express";
import authRoute from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import errHandler from "./middlewares/errorHandler.js";
const app = express();

const port = 3000

app.use(express.json())

app.use("/auth",authRoute)

app.use("/users",userRoutes)
app.use("/doctors",doctorRoutes)

app.use(errHandler)

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`)
})