import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link rel="icon" type="image/png" href="/logo.png" />
				<script async src="https://www.googletagmanager.com/gtag/js?id=G-V0NK6T96V5"></script>
				<script
					dangerouslySetInnerHTML={{
						__html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-V0NK6T96V5');
            `,
					}}
				/>
			</Head>
			<body>
				<Main />
				<div id="portal" />
				<NextScript />
			</body>
		</Html>
	);
}
