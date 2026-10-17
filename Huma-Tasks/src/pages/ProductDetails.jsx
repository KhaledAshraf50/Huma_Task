import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card";
const fetchProductDetails = async (id) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product details!");
  }
  return response.json();
};
const ProductDetails = () => {
  const para = useParams();
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", para.id],
    queryFn: () => fetchProductDetails(para.id),
  });
  if (isLoading)
    return (
      <div className="text-center p-10 text-lg">
        جاري تحميل تفاصيل المنتج...
      </div>
    );
  if (isError)
    return (
      <div className="text-center p-10 text-red-500">
        حدث خطأ: {error.message}
      </div>
    );
  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* زر للرجوع للخلف */}
      <Link
        to="/"
        className="inline-block mb-6 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-sm font-medium hover:opacity-80"
      >
        ← العودة للقائمة
      </Link>

      <Card className="dark:bg-gray-800 shadow-lg">
        <CardHeader>
          {/* عرض صور المنتج */}
          {product.images && product.images.length > 0 && (
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-72 object-contain rounded-lg mb-4 bg-white p-2"
            />
          )}
          <CardTitle className="text-2xl font-bold">{product.title}</CardTitle>
          <CardDescription className="text-lg font-semibold text-green-600 dark:text-green-400">
            ${product.price}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm pt-4 border-t dark:border-gray-700">
            <div>
              <span className="font-bold">التصنيف:</span> {product.category}
            </div>
            <div>
              <span className="font-bold">التقييم:</span> {product.rating}
            </div>
            <div>
              <span className="font-bold">المخزون:</span> {product.stock} قطعة
            </div>
            <div>
              <span className="font-bold">العلامة التجارية:</span>{" "}
              {product.brand || "غير متوفرة"}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between text-xs text-gray-500">
          <span>الضمان: {product.warrantyInformation}</span>
          <span>{product.shippingInformation}</span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductDetails;
