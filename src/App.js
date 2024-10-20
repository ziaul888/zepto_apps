import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Wishlist from "./pages/WishList";
import Layout from "./components/Layout";
import BookDetails from "./pages/BookDetails/BookDetails";

function App() {
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/wishlist" element={<Wishlist />} />
					<Route path="/book/:id" element={<BookDetails />} /> 
				</Routes>
			</Layout>
		</BrowserRouter>
	);
}

export default App;
