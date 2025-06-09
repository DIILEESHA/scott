import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Input,
  Modal,
  Form,
  message,
  Card,
  Spin,
  Result,
  Tag,
  Space,
  Tabs,
} from "antd";
import {
  DownloadOutlined,
  LockOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  getDocs,
  collection,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import * as XLSX from "xlsx";

const { TabPane } = Tabs;

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(true);
  const [activeTab, setActiveTab] = useState("gifts");

  const ADMIN_PASSWORD = "Tyreese123"; // Change this

  const productColumns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },

   
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <>
          <Tag
            color={
              status === "available"
                ? "blue"
                : status === "reserved"
                ? "orange"
                : "green"
            }
          >
            {status.toUpperCase()}
          </Tag>
          {status === "reserved" && record.reservationDetails && (
            <div style={{ marginTop: "8px" }}>
              <div>Reserved by: {record.reservationDetails.name}</div>
              <div>Email: {record.reservationDetails.email}</div>
              <div>Phone: {record.reservationDetails.phone}</div>
              {record.reservationDetails.message && (
                <div>Message: {record.reservationDetails.message}</div>
              )}
            </div>
          )}
          {status === "purchased" && record.purchaseDetails && (
            <div style={{ marginTop: "8px" }}>
              <div>Purchased by: {record.purchaseDetails.name}</div>
              <div>Email: {record.purchaseDetails.email}</div>
              <div>Phone: {record.purchaseDetails.phone}</div>
              {record.purchaseDetails.message && (
                <div>Message: {record.purchaseDetails.message}</div>
              )}
            </div>
          )}
        </>
      ),
      filters: [
        { text: "Available", value: "available" },
        { text: "Reserved", value: "reserved" },
        { text: "Purchased", value: "purchased" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const rsvpColumns = [
    {
      title: "Guest Name",
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
    },
    {
      title: "Attendance",
      dataIndex: "attendance",
      key: "attendance",
      render: (attendance) => (
        <Tag color={attendance === "accept" ? "green" : "red"}>
          {attendance === "accept" ? "Accepting" : "Declining"}
        </Tag>
      ),
      filters: [
        { text: "Accepting", value: "accept" },
        { text: "Declining", value: "decline" },
      ],
      onFilter: (value, record) => record.attendance === value,
    },
    {
      title: "Guest Count",
      dataIndex: "guestCount",
      key: "guestCount",
      render: (count) => (count === "2" ? "Plus One" : "Single"),
    },
    {
      title: "Plus One Name",
      dataIndex: "plusOneName",
      key: "plusOneName",
    },
    {
      title: "Meal Preference",
      dataIndex: "mealPreference",
      key: "mealPreference",
      render: (pref) => {
        if (!pref) return "-";
        const mealMap = {
          chicken: "Chicken",
          lamb: "Lamb",
          fish: "Fish",
          vegetarian: "Vegetarian",
        };
        return mealMap[pref] || pref;
      },
    },
    {
      title: "Dietary Restrictions",
      dataIndex: "dietaryRestrictions",
      key: "dietaryRestrictions",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      render: (text) => text || "-",
    },
    {
      title: "Submitted At",
      dataIndex: "submittedAt",
      key: "submittedAt",
      render: (date) => new Date(date).toLocaleString(),
      sorter: (a, b) => new Date(a.submittedAt) - new Date(b.submittedAt),
    },
  ];

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch products
      const productsSnapshot = await getDocs(collection(db, "products"));
      const productData = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productData);

      // Fetch RSVPs
      const rsvpsSnapshot = await getDocs(collection(db, "rsvps"));
      const rsvpData = rsvpsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRsvps(rsvpData);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await deleteDoc(doc(db, "products", productId));
      message.success("Product deleted successfully");
      fetchData();
    } catch (error) {
      console.error("Error deleting product:", error);
      message.error("Failed to delete product");
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handlePasswordSubmit = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setShowPasswordModal(false);
      message.success("Authentication successful");
    } else {
      message.error("Incorrect password");
    }
  };

  const exportToExcel = (data, sheetName, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, fileName);
  };

  const exportGifts = () => {
    const exportData = products.map((product) => ({
      Name: product.name,
      // 'Description': product.description,
      Price: `$${product.price}`,
      Status: product.status.toUpperCase(),
      "Purchased By": product.purchaseDetails?.buyerName || "",
      Email: product.purchaseDetails?.buyerEmail || "",
      Phone: product.purchaseDetails?.buyerPhone || "",
      Message: product.purchaseDetails?.message || "",
      "Created At": new Date(product.createdAt).toLocaleString(),
      "Purchased At": product.purchaseDetails?.purchaseDate
        ? new Date(product.purchaseDetails.purchaseDate).toLocaleString()
        : "",
    }));
    exportToExcel(exportData, "GiftRegistry", "gift_registry.xlsx");
  };

  const exportRsvps = () => {
    const exportData = rsvps.map((rsvp) => ({
      "Guest Name": rsvp.fullName,
      Attendance: rsvp.attendance === "accept" ? "Accepting" : "Declining",
      "Guest Count": rsvp.guestCount === "2" ? "Plus One" : "Single",
      "Plus One Name": rsvp.plusOneName || "",
      "Meal Preference": rsvp.mealPreference
        ? rsvp.mealPreference.charAt(0).toUpperCase() +
          rsvp.mealPreference.slice(1)
        : "",
      "Dietary Restrictions": rsvp.dietaryRestrictions || "",
      Message: rsvp.message || "",
      "Submitted At": new Date(rsvp.submittedAt).toLocaleString(),
    }));
    exportToExcel(exportData, "RSVPs", "wedding_rsvps.xlsx");
  };
  const filteredProducts = products.filter((product) =>
    Object.values(product).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const filteredRsvps = rsvps.filter((rsvp) =>
    Object.values(rsvp).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  if (!isAuthenticated) {
    return (
      <Modal
        title="Admin Authentication"
        visible={showPasswordModal}
        onCancel={() => setShowPasswordModal(false)}
        footer={null}
        closable={false}
      >
        <Form onFinish={handlePasswordSubmit}>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter the password" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <Card
        title="Wedding Dashboard"
        extra={
          <Space>
            {activeTab === "gifts" && (
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                onClick={exportGifts}
              >
                Export Gifts
              </Button>
            )}
            {activeTab === "rsvps" && (
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                onClick={exportRsvps}
              >
                Export RSVPs
              </Button>
            )}
          </Space>
        }
      >
        <div style={{ marginBottom: "16px" }}>
          <Input.Search
            placeholder={`Search ${
              activeTab === "gifts" ? "products" : "RSVPs"
            }...`}
            allowClear
            enterButton
            onSearch={handleSearch}
            style={{ width: "300px" }}
          />
        </div>

        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="Gift Registry" key="gifts">
            {loading ? (
              <div style={{ textAlign: "center", padding: "50px" }}>
                <Spin size="large" />
              </div>
            ) : products.length === 0 ? (
              <Result
                status="404"
                title="No Products Found"
                subTitle="There are no products in the registry yet."
              />
            ) : (
              <Table
                columns={productColumns}
                dataSource={filteredProducts}
                rowKey="id"
                bordered
                size="middle"
                scroll={{ x: "max-content" }}
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "50", "100"],
                }}
              />
            )}
          </TabPane>
          <TabPane tab="RSVPs" key="rsvps">
            {loading ? (
              <div style={{ textAlign: "center", padding: "50px" }}>
                <Spin size="large" />
              </div>
            ) : rsvps.length === 0 ? (
              <Result
                status="404"
                title="No RSVPs Found"
                subTitle="There are no RSVPs submitted yet."
              />
            ) : (
              <Table
                columns={rsvpColumns}
                dataSource={filteredRsvps}
                rowKey="id"
                bordered
                size="middle"
                scroll={{ x: "max-content" }}
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "50", "100"],
                }}
              />
            )}
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default AdminDashboard;
