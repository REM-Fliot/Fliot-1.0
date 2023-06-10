const express = require("express");
const cors = require("cors");

const app = express();

app.use(
	cors({
		origin: ["http://localhost:5173"],
	})
);

app.use(express.json());

// app.post("/", async (req, res) => {
// 	res.json([]);
// });

console.log("listening to port 8000");
app.listen(8000);
