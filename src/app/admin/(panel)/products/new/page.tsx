import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-brand-900">
        Nouveau produit
      </h1>
      <ProductForm />
    </div>
  );
}