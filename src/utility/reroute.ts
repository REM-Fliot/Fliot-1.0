import { goto } from "$app/navigation"

export const reroute = async (relative_path: string) => {
    await goto(relative_path)
}
