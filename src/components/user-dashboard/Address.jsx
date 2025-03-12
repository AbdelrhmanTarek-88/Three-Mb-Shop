import { useEffect, useState, useCallback } from "react";
import { Container, Form, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { fetchUserData, updateUserData } from "../../services/api";
import { BtnStyled } from "../";
import { capitalize } from "../../utils/helpers";

const Address = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const userId = sessionStorage.getItem("userId");
  const [formData, setFormData] = useState({
    city: "",
    street: "",
    number: "",
    zipcode: "",
  });
  const getUserData = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    try {
      const userData = await fetchUserData(`${userId}`);
      if (userData && userData.address) {
        setUser(userData);
        setFormData({
          city: userData.address.city || "",
          street: userData.address.street || "",
          number: userData.address.number || "",
          zipcode: userData.address.zipcode || "",
        });
      }
    } catch (error) {
      console.error("Error fetching user address:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);
  useEffect(() => {
    getUserData();
  }, [getUserData]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!userId) return;
    setUpdating(true);
    try {
      const formattedData = {
        address: {
          city: formData.city,
          street: formData.street,
          number: formData.number,
          zipcode: formData.zipcode,
        },
      };
      const updatedUser = await updateUserData(userId, formattedData);
      if (updatedUser && updatedUser.address) {
        setUser(updatedUser);
        setFormData({
          city: updatedUser.address.city || "",
          street: updatedUser.address.street || "",
          number: updatedUser.address.number || "",
          zipcode: updatedUser.address.zipcode || "",
        });
        Swal.fire({
          title: "Success!",
          text: "Your address has been updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#dc3545",
        });
      }
    } catch (error) {
      console.error("Error updating address:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update address.",
        icon: "error",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#dc3545",
      });
    } finally {
      setUpdating(false);
    }
  };
  if (loading)
    return (
      <div className="d-flex flex-column align-items-center justify-content-start text-center fs-4 fw-bold text-danger">
        <Spinner animation="border" />
        <p className="fw-bold">Loading address data...</p>
      </div>
    );
  if (!user)
    return (
      <p className="text-center text-danger fw-bold">Address data not found.</p>
    );
  return (
    <Container>
      <h2 className="mb-4 fs-3 fw-bold text-dark">Address Details</h2>
      <Form onSubmit={handleUpdate}>
        <Form.Group controlId="city" className="mb-3">
          <Form.Label className="fw-bold">City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={capitalize(formData.city)}
            onChange={handleChange}
            required
            disabled={updating}
          />
        </Form.Group>
        <Form.Group controlId="street" className="mb-3">
          <Form.Label className="fw-bold">Street</Form.Label>
          <Form.Control
            type="text"
            name="street"
            value={capitalize(formData.street)}
            onChange={handleChange}
            required
            disabled={updating}
          />
        </Form.Group>
        <Form.Group controlId="number" className="mb-3">
          <Form.Label className="fw-bold">Number</Form.Label>
          <Form.Control
            type="text"
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
            disabled={updating}
          />
        </Form.Group>
        <Form.Group controlId="zipcode" className="mb-3">
          <Form.Label className="fw-bold">Zip Code</Form.Label>
          <Form.Control
            type="text"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            required
            disabled={updating}
          />
        </Form.Group>
        <BtnStyled
          type="submit"
          width="150px"
          disabled={updating}
          text={
            updating ? (
              <>
                <Spinner
                  animation="border"
                  size="sm"
                  className="me-2 fw-bold"
                />
                Saving...
              </>
            ) : (
              "Save Changes"
            )
          }
        />
      </Form>
    </Container>
  );
};
export default Address;
