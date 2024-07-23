<script>
	import * as Tabs from '$lib/components/ui/tabs';
	import { FormWrapper, LoginForm, RegisterForm } from '$lib/components/form';
	import { superForm } from 'sveltekit-superforms';

	export let data;
	const loginForm = superForm(data.loginForm, {
		onError: ({ result }) => {
			console.log(result);
		}
	});

	const registerForm = superForm(data.registerForm);
	const { enhance, message, delayed } = loginForm;
	const { enhance: RegisterEnhance, delayed: registerDelay } = registerForm;
</script>

{#if $message}
	<p>{$message}</p>
{/if}
<Tabs.Root class="mx-auto w-96">
	<Tabs.List class="grid w-full grid-cols-2">
		<Tabs.Trigger value="login">Login</Tabs.Trigger>
		<Tabs.Trigger value="signup">Signup</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="login">
		<FormWrapper
			{enhance}
			title="Log in"
			description="Fill the form to log in"
			delayed={$delayed}
			btnLabel="login"
			action="?/login"
		>
			<LoginForm form={loginForm} />
		</FormWrapper>
	</Tabs.Content>
	<Tabs.Content value="signup">
		<FormWrapper
			title="Sign up"
			action="?/signup"
			enhance={RegisterEnhance}
			description="Fill the form to signup"
			btnLabel="register"
			delayed={$registerDelay}
		>
			<RegisterForm form={registerForm} />
		</FormWrapper>
	</Tabs.Content>
</Tabs.Root>
