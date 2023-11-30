import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			// authorization 設置，每次均要求選擇帳號
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
				},
			},
		}),
		// ...add more providers here
	],
	secret: process.env.SECRET,
	jwt: {
		secret: process.env.SECRET,
	},
	session: {
		// This is the default. The session is saved in a cookie and never persisted anywhere.
		strategy: 'jwt',
	},
	// Enable debug messages in the console if you are having problems
	debug: true,
	// callbacks: {
	// 	session: authSession,
	// },
	callbacks: {
		async session({ session, token }) {
			console.log('Auth session', session);
			console.log('Auth token', token);
			// Send properties to the client, like an access_token from a provider.
			session.accessToken = token.accessToken;
			session.refreshToken = token.refreshToken;
			session.idToken = token.idToken;
			session.provider = token.provider;
			session.id = token.id;
			return session;
		},
		async jwt({ token, user, account }) {
			console.log('Auth jwt token', token);
			console.log('Auth jwt user', user);
			console.log('Auth jwt account', account);
			// Persist the OAuth access_token to the token right after signin
			if (account) {
				token.accessToken = account.access_token;
				token.refreshToken = account.refresh_token;
				token.idToken = account.id_token;
				token.provider = account.provider;
			}
			if (user) {
				token.id = user.id.toString();
			}
			return token;
		},
	},
};

export default NextAuth(authOptions);
