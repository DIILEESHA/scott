import React, { useState } from "react";
import { Form, Input, InputNumber, Button, message } from "antd";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebaseConfig"; // Adjust path to your firebase config

const ProductForm = ({ refreshProducts }) => {
  const [form] = Form.useForm();
  const [authPassword, setAuthPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePasswordSubmit = () => {
    if (authPassword === "123") {
      setAuthenticated(true);
    } else {
      message.error("Incorrect password!");
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await addDoc(collection(db, "products"), {
        ...values,
        status: "available",
        reservedBy: "",
        purchasedBy: "",
        createdAt: new Date().toISOString(),
      });
      message.success("Product added successfully!");
      alert("Product added successfully!");
      form.resetFields();
      if (refreshProducts) refreshProducts(); // Optional
    } catch (error) {
      console.error("Error adding product:", error);
      message.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <div
        style={{
          maxWidth: 400,
          margin: "100px auto",
          textAlign: "center",
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#ddd",
          borderRadius: "20px",
          padding: "20px",
        }}
      >
        <h2 className="rsvp_ttle" style={{ fontSize: "30px" }}>
          Enter Password to Access Form
        </h2>
        <Input.Password
          placeholder="Enter Password"
          value={authPassword}
          onChange={(e) => setAuthPassword(e.target.value)}
          onPressEnter={handlePasswordSubmit}
          style={{ marginBottom: 16 }}
        />
        <Button
          style={{ background: "#000", color: "#fff", width: "100%" }}
          type="primary"
          onClick={handlePasswordSubmit}
        >
          Submit
        </Button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>Add New Product</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Product Name"
          rules={[
            { required: true, message: "Please input the product name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea />
        </Form.Item>
        {/* <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please input the price!" }]}
        >
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item> */}
        <Form.Item
          name="image"
          label="Image URL"
          rules={[{ required: true, message: "Please input the image URL!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductForm;
