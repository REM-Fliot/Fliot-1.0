<script lang="ts">
	import { collection, getDocs } from "firebase/firestore/lite";
	import { auth_user } from "../../../store/authUser";
	import { reroute } from "../../../utility/reroute";
	import { db } from "$lib/firebase/firebase";
    let ss: number
    const retrieveData = () => {
        const col_ref = collection(db,"data")
        getDocs(col_ref).then(snapshot=>{
            snapshot.docs.forEach((doc)=>{
                console.log(doc.data().AssetCount)
                ss = doc.data().AssetCount;
            })
            console.log(snapshot.docs)
        })
    }

</script>
<button on:click={()=>{reroute("dashboard")}}>Go back to dashboard</button>
<h1>Welcome, {$auth_user?.email}</h1>
<h2>New asset registrations</h2>
<!-- <form>
    <input type = "Asset name"
</form> -->
<button on:click={retrieveData}></button>
{ss}
