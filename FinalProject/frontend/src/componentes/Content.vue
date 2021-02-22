<template>
	<v-layout column>
		<v-flex>
			<UserLogged />
		</v-flex>
		<v-flex>
			<v-tabs centered dark icons-and-text>
				<v-tabs-slider color="white"></v-tabs-slider>

				<v-tab>
					Authentication
					<v-icon>fingerprint</v-icon>
				</v-tab>

				<v-tab>
					Users
					<v-icon>people</v-icon>
				</v-tab>

				<v-tab>
					Profiles
					<v-icon>how_to_reg</v-icon>
				</v-tab>

				<v-tab-item>
					<AuthenticationTabs />
				</v-tab-item>

				<v-tab-item>
					<UserTabs />
				</v-tab-item>

				<v-tab-item>
					<ProfileTabs />
				</v-tab-item>
			</v-tabs>
		</v-flex>
	</v-layout>
</template>

<script>
import AuthenticationTabs from './autenticacao/Tabs';
import UserLogged from './autenticacao/UserLogged';
import UserTabs from './usuario/Tabs';
import ProfileTabs from './perfil/Tabs';

export default {
	components: {
		AuthenticationTabs,
		UserLogged,
		UserTabs,
		ProfileTabs,
	},
}
</script>

<style></style>