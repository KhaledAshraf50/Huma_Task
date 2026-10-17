import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const FetchProducts = async (limit, skip, Search) => {
  if (Search && Search.trim() !== "") {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${Search}`,
    );
    if (!response.ok) {
      throw new Error("Failed To Fetch Products!!");
    }
    const data = await response.json();
    return data.products;
  } else {
    const response = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
    );
    if (!response.ok) {
      throw new Error("Failed To Fetch Products!!");
    }
    const data = await response.json();
    return data.products;
  }
};
const Products = () => {
  //   const [products, setProducts] = useState([]);
  //   useEffect(() => {
  //     const fetchProduct = async () => {
  //       try {
  //         const response = await fetch(
  //           "https://dummyjson.com/products",
  //         );
  //         const data = await response.json();
  //         setProducts(data.products);
  //       } catch (error) {
  //         console.error("Error fetching products:", error);
  //       }
  //     };
  //     fetchProduct();
  //   }, []);
  const [page, SetPage] = useState(1);
  const [Search, SetSearch] = useState("");

  const limit = 10;
  const skip = (page - 1) * limit;

  const {
    data: products,
    isLoading,
    isError,
    error,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["products", page, Search], // unique key for caching and refetch
    queryFn: () => FetchProducts(limit, skip, Search), // function to fetch data
    // staleTime: 1000 * 60 * 5, // Data Fresh for 5 minutes
    // refetchInterval: 5000,
    keepPreviousData: true,
  });

  if (isLoading) return <div className="text-center p-6">جاري التحميل... </div>;
  if (isError)
    return (
      <div className="text-center p-6 text-red-500">
        حدث خطأ: {error.message}
      </div>
    );

  return (
    <>
      <div className="p-6">
        <input
          type="text"
          placeholder="Search Products"
          value={Search}
          onChange={(e) => {
            SetSearch(e.target.value);
            SetPage(1);
          }}
          className="w-full md:w-1/3 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
        {products && products.length > 0 ? (
          products.map((product) => (
            <Card key={product.id} className="max-w-sm dark:bg-gray-800">
              <CardHeader>
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="h-40 object-cover rounded"
                />
                <CardTitle>{product.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{product.description}</p>
              </CardContent>
              <CardFooter>
                <CardDescription>${product.price}</CardDescription>
                <Link
                  to={`/products/${product.id}`}
                  className="text-blue-500 hover:underline text-sm font-medium"
                >
                  Details
                </Link>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-center col-span-3 text-muted-foreground">
            لا توجد منتجات مطابقة للبحث
          </p>
        )}
      </div>
      <div className="flex justify-center items-center gap-4 p-6">
        <button
          id="prev"
          onClick={(e) => SetPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="font-bold text-lg">PageNo: {page}</span>
        <button
          id="next"
          onClick={(e) => SetPage((old) => old + 1)}
          disabled={products.length < limit}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Products;
