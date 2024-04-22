import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link rel="icon" type="image/png" href="/logo.png" />
			</Head>
			<body>
				<Main />
				<div id="portal" />
				<NextScript />
			</body>
		</Html>
	);
}
