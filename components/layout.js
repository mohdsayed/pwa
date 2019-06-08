import Header from './header';

const Layout = props => (
	<div>
		<Header/>
		{ props.children }
	</div>
);

export default Layout;
