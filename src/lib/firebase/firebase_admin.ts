//FOR BACKEND

import admin, { initializeApp } from "firebase-admin"
import * as credential from "./fliot-backend-firebase-adminsdk-36kfd-cddadbd564.json"

const fliot_admin = initializeApp({
    credential: admin.credential.cert(JSON.parse(JSON.stringify(credential)))
    //JSON conversion is hacky solution for TypeScript
});



export default fliot_admin
