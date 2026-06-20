'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProductForm from '../../_components/ProductForm';

export default function EditProductPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/admin/products/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchProduct();
  }, [params.id]);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading product data...</div>;
  if (!product) return <div className="p-8 text-center text-red-500">Product not found</div>;

  return <ProductForm initialData={product} />;
}
