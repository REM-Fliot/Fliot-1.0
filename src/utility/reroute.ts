import { goto } from "$app/navigation"

const reroute = async (relative_path: string) => {
    await goto(relative_path)
}
export default reroute
