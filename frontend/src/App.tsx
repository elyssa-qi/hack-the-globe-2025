import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/home";
import ComparisonPage from "./pages/comparison";
import ScannerPage from "./pages/scanner";
import SearchPage from "./pages/search";
import ProductDetailsPage from "./pages/product-details";
import { ThemeProvider } from "./components/theme/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/comparison" element={<ComparisonPage />} />
              <Route path="/scanner" element={<ScannerPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/products/:id" element={<ProductDetailsPage />} />
            </Route>
          </Routes>
        </>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
