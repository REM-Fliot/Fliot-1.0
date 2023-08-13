//FOR BACKEND

import admin, { initializeApp } from "firebase-admin"
import * as credential from "./fliot-authentication-firebase-adminsdk-d1e7c-428ef94945.json"

const admin_auth = initializeApp({
    credential: admin.credential.cert(JSON.parse(JSON.stringify(credential)))
    //JSON conversion is hacky solution for TypeScript
});



export default admin_auth
