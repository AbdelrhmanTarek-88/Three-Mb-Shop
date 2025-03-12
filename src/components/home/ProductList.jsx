import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Container, Spinner, Alert } from "react-bootstrap";
import { useProduct } from "../../state/hooks";
import { ProductCard, BtnStyled } from "../";
function ProductList() {
  const { products, loading, error } = useProduct();
  const navigate = useNavigate();
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
    <Container className="mt-5">
      <div className="d-flex gap-2">
        <span
          className="d-inline-block bg-danger mt-2 rounded-2"
          style={{
            width: "20px",
            height: "40px",
          }}
        ></span>
        <p className="text-danger mt-2 text-uppercase fs-3">Our Products</p>
      </div>
      <h2 className="text-dark fs-2 fw-bold">Explore Our Products</h2>
      {products.length === 0 ? (
        <Alert variant="info" className="text-center mt-4">
          No products available.
        </Alert>
      ) : (
        <div className="d-flex py-3 flex-wrap container-product-page column-gap-2 row-gap-4">
          {products.slice(8, 20).map((product) => (
            <motion.div
              key={product.id}
              initial={{
                x: product.id % 2 === 0 ? 40 : -40,
                opacity: 0,
                scale: 0.9,
              }}
              whileInView={{ x: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      )}
      <div className="d-flex justify-content-center mt-4">
        <BtnStyled
          text={"View All Products"}
          onClick={() => {
            navigate("/product");
          }}
        />
      </div>
    </Container>
  );
}
export default ProductList;
