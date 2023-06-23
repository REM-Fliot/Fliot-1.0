import admin from "firebase-admin"
import * as credential from "../../../fliot-authentication-firebase-adminsdk-d1e7c-91abcc304e.json"

admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(JSON.stringify(credential)))
    //JSON conversion is hacky solution for TypeScript
});

export default admin
