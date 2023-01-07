import { ThemeProvider } from '@mui/material';
import React, { ReactNode } from 'react';
import Footer from './Footer';

import { CssBaseline } from '@mui/material/';
import { themeDark, themeLight } from './styles';

type Props = {
	children?: ReactNode;
	title?: string;
};

const Layout = ({ children }: Props) => {
	return (
		<>
			<ThemeProvider theme={themeDark}>
				<CssBaseline />
				<main>{children}</main>
			</ThemeProvider>
		</>
	);
};

export default Layout;
