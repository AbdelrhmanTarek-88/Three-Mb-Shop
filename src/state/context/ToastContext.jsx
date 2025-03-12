import { createContext, useState } from "react";
import { Button, Toast, ToastContainer } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
const ToastContext = createContext();
export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    bg: "secondary",
    btn: false,
    btnText: "",
    onClick: null,
  });

  const showToast = (
    message,
    bg = "secondary",
    btn,
    btnText,
    onClick = null
  ) => {
    setToast({ show: true, message, bg, btn, btnText, onClick });
    setTimeout(() => {
      setToast({
        show: false,
        message: "",
        bg,
        btn: false,
        btnText: "",
        btnLink: "",
        onClick: null,
      });
    }, 3000);
  };
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer className="position-fixed top-0 end-0 p-3  mt-5">
        <AnimatePresence>
          {toast.show && (
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <Toast bg={toast.bg}>
                <Toast.Header closeButton={false}>
                  <strong className="me-auto">Notification</strong>
                </Toast.Header>
                <Toast.Body>
                  <div className="mb-2 fs-6">{toast.message}</div>
                  {toast.btn && (
                    <Button variant="danger" onClick={toast.onClick}>
                      {toast.btnText}
                    </Button>
                  )}
                </Toast.Body>
              </Toast>
            </motion.div>
          )}
        </AnimatePresence>
      </ToastContainer>
    </ToastContext.Provider>
  );
};
ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ToastContext;
