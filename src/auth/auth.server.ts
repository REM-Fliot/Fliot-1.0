import fliot_admin from "$lib/firebase/firebase_admin"
import admin from "$lib/firebase/firebase_admin"

export const serverAuthHandlers = {
    addTechnician: async (email: string, pass:string) => {
        console.log("MAKING NEW USER")
        fliot_admin.auth().createUser({
            email: email,
            password: pass,
        }).then(async user_credentials => {
            console.log("user created")
        }).catch((err)=>{
            console.log(err)
            throw err
        })
        // await createUserWithEmailAndPassword(auth, email, pass).then(async (user_credentials)=>{
        //     let email = user_credentials.user.email
        //         let i = email?.lastIndexOf("@")
        //         let j = email?.lastIndexOf(".")
        //         let co
        //         console.log(email)
        //         console.log(username)
        //         if (i != -1) {
        //             co = email.substring(i+1, j);
        //         }
        //         console.log(co)
        //         if (co) {
        //             await setDoc(doc(db, "company", co, "awaiting_verification", user_credentials.user.uid), {
        //                 name: username
        //             });
        //             await setDoc(doc(db, "users", user_credentials.user.uid), {
        //                 name: username,
        //                 company: co
        //             });
        //         }
                
            
        //     auth_user.set(user_credentials.user)  //Dont think this should be set here    
        //     await goto("/dashboard")
        // }).catch((err)=>{
        //     console.log(err)
        //     throw err
        // })
    },
}
