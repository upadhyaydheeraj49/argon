const express = require("express");
const path = require("path");
const {open} = require("sqlite")
const sqlite3 = require("sqlite3")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cors());
let db = null;
const initializeDBAndServer = async () => {
    const dbPath = path.join(__dirname, "argon.db");
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });
        app.listen(8080, () => {
            console.log("Server Started");
        });
    }
    catch(e) {
        console.log(`DB Error: ${e.message}`);
        process.exit(1);
    }
};

initializeDBAndServer();

const authenticateToken = async (request, response, next) => {
    let jwtToken
    const authHeader = request.headers['authorization']

    if (authHeader !== undefined) {
      //take out the token
        jwtToken = authHeader.split(' ')[1]
    }
    await jwt.verify(jwtToken, 'secret_key', (error, payload) => {
    if (error) {
        response.status(401)
        response.send('Invalid JWT Token')
    } else {
        next()
    }
    })
}

app.post("/login", async (request, response) => {
    const userDetails = request.body
    const {email, password} = userDetails

    const getUserQuery = `
            SELECT
                *
            FROM
                users
            WHERE email = '${email}';
            `
    const dbUser = await db.get(getUserQuery)
    // console.log(dbUser)
    if (dbUser === undefined) {
        response.status(400)
        response.send('Invalid user')
    } else {
        const isPasswordValid = await bcrypt.compare(password, dbUser.password)
        if (isPasswordValid) {
            //valid user
            const jwtToken = await jwt.sign({email}, 'secret_key')
            response.send({jwtToken})
        } else {
            response.status(400)
            response.send('Invalid password')
        }
    }
});
app.post("/signup", async (request, response) => {
    const userDetails = request.body;
    const {email, password} = userDetails;
    const getUserQuery = `
            SELECT
                *
            FROM
                users
            WHERE email = '${email}';
            `
    const dbUser = await db.get(getUserQuery)
    
    if (dbUser !== undefined){
        response.send("User already exists");
    } else {
        const hashed_password = await bcrypt.hash(password, 10);
        const addUserQuery = `
            INSERT INTO users (email, password)
            VALUES
            ('${email}', '${hashed_password}');`
        const res = await db.run(addUserQuery);
        response.send("User Added Successfully")
    }
});

app.get("/locations",  async (request, response) => {
    const getLocationsQuery = `
            SELECT DISTINCT location
            FROM  technicians
            ORDER BY location;`;
    const locations = await db.all(getLocationsQuery);
    const locationsList = locations.map(loc => loc.location)
    response.send(locationsList);
});

app.get("/appliances", authenticateToken, async (request, response) => {
    const {
        search_q=""
    } = request.query;
    const getAppliancesSuggestionQuery = `
            SELECT *
            FROM appliance_types
            WHERE type_name LIKE "%${search_q}%"
            ORDER BY type_name
            LIMIT 5;`;
    const suggestions = await db.all(getAppliancesSuggestionQuery);
    response.send(suggestions);
});

app.get("/featured-technicians", authenticateToken, async (request, response) => {
    const {search_q="", location="Pune"} = request.query;
    const getTechniciansQuery = `
            SELECT *
            FROM technicians
            WHERE specialization LIKE "%${search_q}%" AND location LIKE "${location}";`
    const techniciansList = await db.all(getTechniciansQuery);
    response.send(techniciansList);
});

