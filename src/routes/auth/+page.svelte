<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import { FormWrapper, LoginForm, RegisterForm } from '$lib/components/form';
	import { loginSchema, registerSchema } from '$lib/schemas/auth.js';

	export let data;
</script>

<!-- {#if $message}
    <p>{$message}</p>
{/if} -->
<Tabs.Root class="mx-auto w-96">
	<Tabs.List class="grid w-full grid-cols-2">
		<Tabs.Trigger value="login">Login</Tabs.Trigger>
		<Tabs.Trigger value="register">Register</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="login">
		<FormWrapper
			title="Log in"
			description="Fill the form to log in"
			btnLabel="login"
			data={data.loginForm}
			action="?/login"
			let:form
			schema={loginSchema}
		>
			<LoginForm {form} />
		</FormWrapper>
	</Tabs.Content>
	<Tabs.Content value="register">
		<FormWrapper
			title="Register"
			action="?/signup"
			description="Fill the form to register a new account"
			btnLabel="register"
			schema={registerSchema}
			data={data.registerForm}
			let:form
		>
			<RegisterForm {form} />
		</FormWrapper>
	</Tabs.Content>
</Tabs.Root>
