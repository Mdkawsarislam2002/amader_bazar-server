import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import kleur from "kleur";

import { PORT } from "../app.config";
import { reqLogger } from "./utils";

import { DemoUser } from "./model/DemoUser";
import { seedRoute } from "./router/seed.route";
import { connectDB } from "./utils/connectDB";

const app = express();
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(helmet());
app.use(reqLogger);
app.use(
    cors({
        credentials: true,
    })
);

DemoUser.sync({ force: true });

app.use("/seed", seedRoute);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, async () => {
    await connectDB();
    console.log(
        "⚡",
        kleur
            .bgGreen()
            .white()
            .bold(`Server running on http://localhost:${PORT}`)
    );
});
