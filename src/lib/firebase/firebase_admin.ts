//FOR BACKEND

import admin, { initializeApp } from "firebase-admin"
import * as credential from "./fliot-backend-firebase-adminsdk-36kfd-cddadbd564.json"

const admin_auth = initializeApp({
    credential: admin.credential.cert(JSON.parse(JSON.stringify(credential)))
    //JSON conversion is hacky solution for TypeScript
});



export default admin_auth
