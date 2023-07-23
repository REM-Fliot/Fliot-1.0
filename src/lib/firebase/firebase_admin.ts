//FOR BACKEND

import admin, { initializeApp } from "firebase-admin"
import * as credential from "./fliot-authentication-firebase-adminsdk-d1e7c-a7220b3e58.json"

const fliot_admin = initializeApp({
    credential: admin.credential.cert(JSON.parse(JSON.stringify(credential)))
    //JSON conversion is hacky solution for TypeScript
});



export default fliot_admin
