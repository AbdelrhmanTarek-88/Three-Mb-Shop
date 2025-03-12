import { useSearchParams } from "react-router-dom";
import { Container, Spinner, Alert } from "react-bootstrap";
import { motion } from "framer-motion";
import { useProduct } from "../state/hooks";
import {
  TitleName,
  FeatureSection,
  ProductCard,
  SearchBarNav,
} from "../components";
function ProductsPage() {
  const { products, loading, error } = useProduct();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category")?.split(",");
  const query = searchParams.get("q");
  const filteredProducts = products.filter((product) => {
    const matchesCategory = category
      ? category.includes(product.category)
      : true;
    const matchesQuery = query
      ? product.title.toLowerCase().includes(query.toLowerCase())
      : true;

    return matchesCategory && matchesQuery;
  });
  if (loading)
    return (
      <Spinner
        animation="border"
        variant="danger"
        className="d-block mx-auto mt-5"
      />
    );
  if (error)
    return (
      <Alert variant="danger" className="text-center mt-4">
        {error}
      </Alert>
    );
  return (
    <>
      <SearchBarNav />
      <TitleName
        name={
          query
            ? `Search results for: "${query}"`
            : category
            ? `Category: ${category}`
            : "All Products"
        }
      />
      <Container className="d-flex py-3  flex-wrap container-product-page column-gap-2 row-gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))
        ) : (
          <h3 className="text-center w-100">No products found.</h3>
        )}
      </Container>
      <FeatureSection />
    </>
  );
}
export default ProductsPage;
