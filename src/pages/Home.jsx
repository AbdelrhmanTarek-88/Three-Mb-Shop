import {
  HeroSection,
  FlashSales,
  ProductList,
  BrandsSlider,
} from "../components/home";
import { SearchBarNav, FeatureSection } from "../components";
function Home() {
  return (
    <>
      <SearchBarNav/>
      <HeroSection />
      <FlashSales />
      <ProductList />
      <BrandsSlider />
      <FeatureSection />
    </>
  );
}
export default Home;
