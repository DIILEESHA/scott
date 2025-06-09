import React, { useState, useEffect } from "react";
import { Modal, Button, Avatar, Form, Input, Divider, message } from "antd";
import { GoogleOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { db, auth } from "../../../firebaseConfig";
import { getDocs, collection, doc, updateDoc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import "./GiftRegistry.css";

const AuthStatus = ({ user, handleLogout, setShowLoginModal }) => {
  const [showLogoutOption, setShowLogoutOption] = useState(false);

  return (
    <div className="auth-status">
      {user ? (
        <div className="user-info">
          <div
            className="user-display"
            onClick={() => setShowLogoutOption(!showLogoutOption)}
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <Avatar
              src={user.photoURL || "https://via.placeholder.com/40"}
              size={50}
            />
          </div>
          {showLogoutOption && (
            <div className="opz">
              <h3 className="fgds" style={{ marginLeft: "10px" }}>
                Welcome, {user.displayName || user.email}
              </h3>
              <Button
                className="d"
                type="primary"
                danger
                onClick={handleLogout}
                style={{ marginLeft: "10px" }}
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Button
          type="primary"
          onClick={() => setShowLoginModal(true)}
          icon={<GoogleOutlined />}
        >
          Login to Reserve Gifts
        </Button>
      )}
    </div>
  );
};

const GiftRegistry = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showReserveModal, setShowReserveModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    loginEmail: "",
    loginPassword: "",
  });
  const [actionLoading, setActionLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [loginForm] = Form.useForm();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        setFormData((prev) => ({
          ...prev,
          name: user.displayName || "",
          email: user.email || "",
        }));
      }
    });
    fetchProducts();
    return () => unsubscribe();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "products"));
      const productData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productData);
    } catch (error) {
      console.error("Error fetching products:", error);
      message.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setActionLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setShowLoginModal(false);
      message.success("Logged in successfully with Google");
    } catch (error) {
      console.error("Google login error:", error);
      message.error("Google login failed. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleEmailLogin = async (values) => {
    try {
      setActionLoading(true);
      await signInWithEmailAndPassword(
        auth,
        values.loginEmail,
        values.loginPassword
      );
      setShowLoginModal(false);
      loginForm.resetFields();
      message.success("Logged in successfully");
    } catch (error) {
      console.error("Login error:", error);
      message.error("Login failed. Please check your credentials.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      message.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      message.error("Logout failed");
    }
  };

  const handleShowDetails = (product) => {
    setCurrentProduct(product);
    setShowDetailsModal(true);
  };

  const handleReserveClick = (product, e) => {
    e.stopPropagation();
    if (!user) {
      setCurrentProduct(product);
      setShowLoginModal(true);
      return;
    }
    setCurrentProduct(product);
    setShowReserveModal(true);
  };

  const handleReserve = async (e) => {
    e.preventDefault();
    try {
      setActionLoading(true);
      const productRef = doc(db, "products", currentProduct.id);

      if (currentProduct.status !== "available") {
        message.warning("This product is no longer available for reservation");
        setShowReserveModal(false);
        fetchProducts();
        return;
      }

      await updateDoc(productRef, {
        status: "reserved",
        reservedBy: user.uid,
        reservationDetails: {
          ...formData,
          reservationDate: new Date().toISOString(),
        },
      });

      message.success("Product reserved successfully!");
      setShowReserveModal(false);
      fetchProducts();
    } catch (error) {
      console.error("Error reserving product:", error);
      message.error(
        "Failed to reserve product. It may have been reserved by someone else."
      );
      fetchProducts();
    } finally {
      setActionLoading(false);
    }
  };

  const handleRelease = async (product, e) => {
    e.stopPropagation();
    try {
      setActionLoading(true);

      if (product.reservedBy !== user?.uid) {
        message.warning(
          "You cannot release a product reserved by someone else"
        );
        return;
      }

      const productRef = doc(db, "products", product.id);

      await updateDoc(productRef, {
        status: "available",
        reservedBy: "",
        reservationDetails: {},
      });

      message.success("Product released successfully!");
      fetchProducts();
    } catch (error) {
      console.error("Error releasing product:", error);
      message.error("Failed to release product");
    } finally {
      setActionLoading(false);
    }
  };

  const handlePurchaseClick = (product, e) => {
    e.stopPropagation();
    setCurrentProduct(product);
    setShowPurchaseModal(true);
  };

  const handlePurchase = async (e) => {
    e.preventDefault();
    try {
      setActionLoading(true);

      if (currentProduct.reservedBy !== user?.uid) {
        message.warning(
          "You cannot purchase a product reserved by someone else"
        );
        setShowPurchaseModal(false);
        fetchProducts();
        return;
      }

      const productRef = doc(db, "products", currentProduct.id);

      await updateDoc(productRef, {
        status: "purchased",
        purchasedBy: user.uid,
        purchaseDetails: {
          ...formData,
          purchaseDate: new Date().toISOString(),
        },
      });

      message.success("Product purchased successfully!");
      setShowPurchaseModal(false);
      fetchProducts();
    } catch (error) {
      console.error("Error purchasing product:", error);
      message.error("Failed to complete purchase");
    } finally {
      setActionLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "reserved":
        return "status-reserved";
      case "purchased":
        return "status-purchased";
      default:
        return "status-available";
    }
  };

  const getStatusText = (status, product) => {
    switch (status) {
      case "reserved":
        return product.reservedBy === user?.uid
          ? "Reserved by you"
          : `Reserved by ${product.reservationDetails?.name || "someone"}`;
      case "purchased":
        return `Purchased by ${product.purchaseDetails?.name || "someone"}`;
      default:
        return "Available";
    }
  };

  return (
    <div className="gift-registry">
      <AuthStatus
        user={user}
        handleLogout={handleLogout}
        setShowLoginModal={setShowLoginModal}
      />

      <div className="gift-registry-content">
        <h1 className="gift-registry-title uixz">Gift Registry</h1>
        <p className="gift-registry-description">
          We're so grateful for your thoughtfulness in celebrating our special
          day with us. If you'd like to contribute a gift, please browse our
          registry below.
        </p>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading gifts...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="empty-registry">
            <p>No products available in the registry yet.</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => handleShowDetails(product)}
              >
                <img
                  src={product.image || "https://via.placeholder.com/300"}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-details">
                  <div className="product-name">
                    {product.name}
                    <span
                      className={`product-status ${getStatusClass(
                        product.status
                      )}`}
                    >
                      {getStatusText(product.status, product)}
                    </span>
                  </div>
                  <p className="product-description">
                    {`${product.description.slice(0, 100)}...`}
                  </p>
                  {/* <p className="product-price">Price: ${product.price}</p> */}

                  <div className="product-actions">
                    {product.status === "available" && (
                      <button
                        className="btn btn-primary"
                        onClick={(e) => handleReserveClick(product, e)}
                        disabled={actionLoading}
                      >
                        Reserve
                      </button>
                    )}

                    {product.status === "reserved" &&
                      product.reservedBy === user?.uid && (
                        <>
                          <button
                            className="btn btn-dashed"
                            onClick={(e) => handleRelease(product, e)}
                            disabled={actionLoading}
                          >
                            Release
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={(e) => handlePurchaseClick(product, e)}
                            disabled={actionLoading}
                          >
                            Purchase
                          </button>
                        </>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Login Modal */}
      <div className="ii">
        <Modal
          title="Login to Reserve Gifts"
          open={showLoginModal}
          onCancel={() => setShowLoginModal(false)}
          footer={null}
          // centered
        >
          <div className="login-options">
            <Button
              block
              size="large"
              className="sxc"
              icon={<GoogleOutlined />}
              onClick={handleGoogleLogin}
              loading={actionLoading}
              // style={{ marginBottom: 20 }}
            >
              Continue with Google
            </Button>
          </div>
        </Modal>
      </div>

      {/* Reserve Modal */}
      {showReserveModal && currentProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={() => setShowReserveModal(false)}
              disabled={actionLoading}
            >
              &times;
            </button>

            <h2>Reserve {currentProduct.name}</h2>

            <form className="vc" onSubmit={handleReserve}>
              <div className="form-group">
                <label>Your Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Message (Optional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowReserveModal(false)}
                  disabled={actionLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={actionLoading}
                >
                  {actionLoading ? "Processing..." : "Confirm Reservation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Purchase Modal */}
      {showPurchaseModal && currentProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={() => setShowPurchaseModal(false)}
              disabled={actionLoading}
            >
              &times;
            </button>

            <h2>Purchase {currentProduct.name}</h2>

            <form onSubmit={handlePurchase}>
              <div className="form-group">
                <label>Your Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Message (Optional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowPurchaseModal(false)}
                  disabled={actionLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={actionLoading}
                >
                  {actionLoading ? "Processing..." : "Confirm Purchase"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Details Modal */}
      {showDetailsModal && currentProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={() => setShowDetailsModal(false)}
            >
              &times;
            </button>

            <div className="modal-details-content">
              <div className="modal-details-image">
                <img
                  src={
                    currentProduct.image || "https://via.placeholder.com/500"
                  }
                  alt={currentProduct.name}
                />
              </div>

              <div className="modal-details-info">
                <h2>{currentProduct.name}</h2>
                <div
                  className={`product-status ${getStatusClass(
                    currentProduct.status
                  )}`}
                >
                  {getStatusText(currentProduct.status, currentProduct)}
                </div>

                <div className="modal-description">
                  <p>{currentProduct.description}</p>
                </div>

                {/* {currentProduct.status === "purchased" &&
                  currentProduct.purchaseDetails && (
                    <div className="purchase-info">
                      <h4>Purchase Information</h4>
                      <p>Name: {currentProduct.purchaseDetails.name}</p>
                      <p>Email: {currentProduct.purchaseDetails.email}</p>
                      <p>Phone: {currentProduct.purchaseDetails.phone}</p>
                      {currentProduct.purchaseDetails.message && (
                        <p>Message: {currentProduct.purchaseDetails.message}</p>
                      )}
                    </div>
                  )} */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GiftRegistry;
