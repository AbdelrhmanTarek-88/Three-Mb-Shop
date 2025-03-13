import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { Button } from "react-bootstrap";
import { Navigation } from "swiper/modules";
import { fetchProducts } from "../../services/api";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { BtnStyled, ProductCard } from "../";
function FlashSales() {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56,
  });
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data.slice(0, 7));
    };
    getProducts();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);
  return (
    <div className="container  mt-5 position-relative">
      <div className="d-flex gap-2">
        <span
          className="d-inline-block bg-danger mt-2 rounded-2"
          style={{
            width: "20px",
            height: "40px",
          }}
        ></span>
        <p className="text-danger mt-2 text-uppercase fs-3">Today&rsquo;s</p>
      </div>
      <div
        className="d-flex gap-2 justify-content-between mb-3"
        style={{ flexWrap: "wrap" }}
      >
        <div>
          <div className="d-flex flex-wrap gap-2 align-items-center fs-2 fw-bold text-danger-emphasis">
            <h4 className="text-dark fs-2 fw-bold me-5">Flash Sales</h4>
            <div style={{ width: "300px" }}>
              <span className="fs-3">{timeLeft.days}d</span>
              <span className="mx-1">:</span>
              <span className="fs-3">{timeLeft.hours}h</span>
              <span className="mx-1">:</span>
              <span className="fs-3">{timeLeft.minutes}m</span>
              <span className="mx-1">:</span>
              <span className="fs-3">{timeLeft.seconds}s</span>
            </div>
          </div>
        </div>
        <div className="d-flex gap-2 me-5" style={{ height: "40px" }}>
          <Button
            ref={prevRef}
            variant="danger"
            className="swiper-button-custom prev-btn rounded-5"
          >
            <FaChevronLeft />
          </Button>
          <Button
            ref={nextRef}
            variant="danger"
            className="swiper-button-custom next-btn rounded-5"
          >
            <FaChevronRight />
          </Button>
        </div>
      </div>
      <Swiper
        ref={swiperRef}
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={6}
        breakpoints={{
          0: { slidesPerView: 2 },
          576: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1500: { slidesPerView: 5 },
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={product} />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="d-flex justify-content-center mt-4">
        <BtnStyled
          text={"View All Products"}
          onClick={() => {
            navigate("/product");
          }}
        />
      </div>
    </div>
  );
}

export default FlashSales;
