import React, { useState } from 'react';
import { Card, Button, Tag, Image, message, Modal, Form, Input } from 'antd';
import { ShoppingCartOutlined, UndoOutlined, CheckOutlined } from '@ant-design/icons';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

const ProductCard = ({ product, userId, isAdmin, refreshProducts }) => {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showReserveModal, setShowReserveModal] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleReserve = async (values) => {
    try {
      setLoading(true);
      const productRef = doc(db, 'products', product.id);
      
      await updateDoc(productRef, {
        status: 'reserved',
        reservedBy: userId,
        reservationDetails: {
          reserverName: values.name,
          reserverEmail: values.email,
          reserverPhone: values.phone,
          reservationDate: new Date().toISOString(),
          message: values.message || '',
        }
      });
      
      message.success('Product reserved successfully!');
      setShowReserveModal(false);
      refreshProducts();
    } catch (error) {
      console.error('Error reserving product:', error);
      message.error('Failed to reserve product');
    } finally {
      setLoading(false);
    }
  };

  const handleRelease = async () => {
    try {
      setLoading(true);
      const productRef = doc(db, 'products', product.id);
      
      await updateDoc(productRef, {
        status: 'available',
        reservedBy: '',
        reservationDetails: {}
      });
      
      message.success('Product released successfully!');
      refreshProducts();
    } catch (error) {
      console.error('Error releasing product:', error);
      message.error('Failed to release product');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (values) => {
    try {
      setLoading(true);
      const productRef = doc(db, 'products', product.id);
      
      await updateDoc(productRef, {
        status: 'purchased',
        purchasedBy: userId,
        purchaseDetails: {
          buyerName: values.name,
          buyerEmail: values.email,
          buyerPhone: values.phone,
          purchaseDate: new Date().toISOString(),
          message: values.message || '',
        }
      });
      
      message.success('Product purchased successfully!');
      setShowPurchaseModal(false);
      refreshProducts();
    } catch (error) {
      console.error('Error purchasing product:', error);
      message.error('Failed to complete purchase');
    } finally {
      setLoading(false);
    }
  };

  const getStatusTag = () => {
    if (product.status === 'reserved') {
      return product.reservedBy === userId ? (
        <Tag color="orange">Reserved by you</Tag>
      ) : (
        <Tag color="orange">
          Reserved by {product.reservationDetails?.reserverName || 'someone'}
        </Tag>
      );
    } else if (product.status === 'purchased') {
      return <Tag color="green">Purchased</Tag>;
    }
    return <Tag color="blue">Available</Tag>;
  };

  const renderActions = () => {
    if (product.status === 'available') {
      return (
        <Button 
          type="primary" 
          icon={<ShoppingCartOutlined />}
          onClick={() => setShowReserveModal(true)}
        >
          Reserve
        </Button>
      );
    } else if (product.status === 'reserved' && (product.reservedBy === userId || isAdmin)) {
      return (
        <>
          <Button 
            icon={<UndoOutlined />}
            onClick={handleRelease}
            loading={loading}
          >
            Release
          </Button>
          <Button 
            type="primary" 
            icon={<CheckOutlined />}
            onClick={() => setShowPurchaseModal(true)}
            loading={loading}
          >
            Purchase
          </Button>
        </>
      );
    }
    return null;
  };

  return (
    <>
      <Card
        hoverable
        cover={
          <Image
            alt={product.name}
            src={product.image || 'https://via.placeholder.com/300'}
            height={200}
            style={{ objectFit: 'cover' }}
          />
        }
        actions={[renderActions()]}
      >
        <Card.Meta
          title={<>{product.name} {getStatusTag()}</>}
          description={
            <>
              <p>{product.description}</p>
              <p><strong>Price: ${product.price}</strong></p>
              {product.status === 'purchased' && product.purchaseDetails && (
                <p>Purchased by: {product.purchaseDetails.buyerName}</p>
              )}
            </>
          }
        />
      </Card>

      {/* Reserve Modal */}
      <Modal
        title={`Reserve ${product.name}`}
        visible={showReserveModal}
        onCancel={() => setShowReserveModal(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleReserve}>
          <Form.Item
            name="name"
            label="Your Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: 'email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="message" label="Message (Optional)">
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Confirm Reservation
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Purchase Modal */}
      <Modal
        title={`Purchase ${product.name}`}
        visible={showPurchaseModal}
        onCancel={() => setShowPurchaseModal(false)}
        footer={null}
      >
        <Form form={form} onFinish={handlePurchase}>
          <Form.Item
            name="name"
            label="Your Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: 'email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="message" label="Message (Optional)">
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Confirm Purchase
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProductCard;