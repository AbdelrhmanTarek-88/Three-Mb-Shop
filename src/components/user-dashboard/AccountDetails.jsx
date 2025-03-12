import { useEffect, useState, useCallback } from "react";
import { Container, Form, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { fetchUserData, updateUserData } from "../../services/api";
import { BtnStyled } from "../";
import { capitalize } from "../../utils/helpers";
const AccountDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const userId = sessionStorage.getItem("userId");

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    phone: "",
  });
  const getUserData = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    try {
      const userData = await fetchUserData(`${userId}`);
      if (userData && userData.name) {
        setUser(userData);
        setFormData({
          firstname: userData.name.firstname || "",
          lastname: userData.name.lastname || "",
          email: userData.email || "",
          username: userData.username || "",
          phone: userData.phone || "",
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
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
        email: formData.email,
        username: formData.username,
        phone: formData.phone,
        name: {
          firstname: formData.firstname,
          lastname: formData.lastname,
        },
      };
      const updatedUser = await updateUserData(userId, formattedData);
      if (updatedUser && updatedUser.name) {
        setUser(updatedUser);
        setFormData({
          firstname: updatedUser.name.firstname || "",
          lastname: updatedUser.name.lastname || "",
          email: updatedUser.email || "",
          username: updatedUser.username || "",
          phone: updatedUser.phone || "",
        });
        Swal.fire({
          title: "Success!",
          text: "Your details have been updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#dc3545",
        });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update user data.",
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
        <p className="fw-bold">Loading user data...</p>
      </div>
    );
  if (!user)
    return (
      <p className="text-center text-danger fw-bold">User data not found.</p>
    );
  return (
    <Container>
      <h2 className="mb-4 fs-3 fw-bold text-dark">Account Details</h2>
      <Form onSubmit={handleUpdate}>
        <Form.Group controlId="firstname" className="mb-3">
          <Form.Label className="fw-bold">First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstname"
            value={capitalize(formData.firstname)}
            onChange={handleChange}
            required
            disabled={updating}
          />
        </Form.Group>
        <Form.Group controlId="lastname" className="mb-3">
          <Form.Label className="fw-bold">Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastname"
            value={capitalize(formData.lastname)}
            onChange={handleChange}
            required
            disabled={updating}
          />
        </Form.Group>
        <Form.Group controlId="username" className="mb-3">
          <Form.Label className="fw-bold">Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            disabled
          />
        </Form.Group>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label className="fw-bold">Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled
          />
        </Form.Group>
        <Form.Group controlId="phone" className="mb-3">
          <Form.Label className="fw-bold">Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
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
export default AccountDetails;
