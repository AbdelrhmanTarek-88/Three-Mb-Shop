import { Container } from "react-bootstrap";
import { TitleName, WishlistItem, BtnStyled } from "../components";
import { useWishlist, useToast, useCart } from "../state/hooks";
import { wishlistImg } from "../assets/image";
const WishlistPage = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const moveAllToCart = () => {
    wishlist.forEach((item) => addToCart(item));
    showToast("All Items Moved To Your Cart!","light");
  };
  return (
    <>
      <TitleName name="Wishlist"/>
      <Container className="mt-5">
        {wishlist.length === 0 ? (
          <>
            <p className="fs-4 fw-bold fst-italic">Your wishlist is empty.</p>
            <img src={wishlistImg} />
          </>
        ) : (
          <>
            <div className="d-flex flex-column gap-4">
              {wishlist.map((product) => (
                <WishlistItem
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                  removeFromWishlist={removeFromWishlist}
                />
              ))}
            </div>
            <div className="d-flex justify-content-end py-4">
              <BtnStyled
                bordeRadius="4px"
                text="Move All To Bag"
                onClick={moveAllToCart}
              />
              <BtnStyled
                background="dark"
                width="140px"
                borderRadius="4px"
                text="Clear Wishlist"
                onClick={clearWishlist}
                hover={{
                  background: "#212529",
                  color: "#212529",
                  border: "1px solid black",
                }}
              />
            </div>
          </>
        )}
      </Container>
    </>
  );
};
export default WishlistPage;
