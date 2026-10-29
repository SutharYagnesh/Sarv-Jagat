import { Suspense } from 'react';
import ProductForm from '../_components/ProductForm';

export const dynamic = 'force-dynamic';

export default function NewProductPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading form...</div>}>
      <ProductForm />
    </Suspense>
  );
}
