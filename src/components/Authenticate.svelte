<script lang="ts">
	import { authHandlers } from "../store/authstore";

    let email = "";
    let password = "";
    let missing_fields = false;
    let error = false;
    let err_info = ""
    let register = false;
    let authenticating = false;

    async function handleAuthenticate() {
        if (authenticating) return
        if (!email || !password && !register) {
            missing_fields = true
            return
        }
        authenticating = true;
        //Have the required information
        try {
            if (!register) {
                await authHandlers.login(email, password)
            }
            else {
                await authHandlers.signup(email,password)
            }
        } catch (err) {
            console.log("There was an AUTH error: ", err)
            err_info = <string>err
            error = true;
            authenticating = false;
        }
        
    }
    function toggleRegister() {
        register = !register
    }
</script>

<div class = authContainer>
    <form>
        <h2 id= "login-title">{register ? 'Register' : 'Login' }</h2>
        {#if missing_fields}
            <p class="error">Missing Fields</p>
        {:else if error}
            <p class="error">{err_info}</p>
        {/if}
        <label>
            <input bind:value={email} type="email" placeholder="Email"/>
        </label>
        <label>
            <input bind:value={password} type="password" placeholder="Password"/>
        </label>
        
            {#if authenticating}
                <button id="submit-disabled" type="button">
                    Connecting...
                </button>
            {:else}
                <button on:click={handleAuthenticate} id="submit" type="button">
                    Submit
                </button>
            {/if}
    </form>
    <div class = "options">
        <p>Or</p>
        {#if register}
            <div>
                <p>
                    <span>Already have an account?</span>
                    <span>&nbsp;</span>
                    <span on:click={toggleRegister} on:keydown={()=>{}}>Login</span>
                </p>
            </div>
        {:else}
            <div>
                <p>
                    <span>Don't have an account?</span>
                    <span>&nbsp;</span>
                    <span on:click={toggleRegister} on:keydown={()=>{}}>Register</span>
                </p>
            </div>
        {/if}
    </div>
</div>

<style>
    @font-face {
        src: url(fonts/Lato/Lato-Regular.ttf);
        font-family: lato;
    }
    .authContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        padding: 1rem
    }
    form {
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
        max-width: 100%;
        width: 40rem;
    }
    form input {
        width: 100%;
        font-size: 1.5rem;
        border-color: #1e272e;
        border-radius: 0.5rem;
        border-width: 0.125rem;
        border-style: solid;
    }
    * {
        font-family: lato;
        font-size: 1rem;
    }
    #login-title {
        font-size: 3rem;
        text-align: center;
        margin: 0;
    }
    #submit {
        width: 100%;
        font-size: 1.5rem;
        border-color: #1e272e;
        border-radius: 0.5rem;
        border-width: 0.125rem;
        border-style: solid;
        transition-duration: 0.25s;
        padding: 0.2rem;
        cursor: pointer;
    }
    #submit:hover {
        background-color:#34ace0;
    }

    #submit-disabled {
        width: 100%;
        font-size: 1.5rem;
        border-color: #1e272e;
        border-radius: 0.5rem;
        border-width: 0.125rem;
        border-style: solid;
        transition-duration: 0.25s;
        padding: 0.2rem;
        cursor: pointer;
    }

    .options {
        text-align: center;
    }
    .options p:last-child span:last-child:hover {
        color:#34ace0;
        text-decoration: underline;
        cursor: pointer;
    }
    .error {
        color: #e03456;
        text-align: center;
    }
    
</style>
