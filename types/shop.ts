interface ProductPreview {
    id: number;
    products_id: number;
    name: string;
    created_at: string;
    updated_at: string;
  }
  
  interface Seller {
    name: string;
    username: string;
    avatar: string;
  }
  
 export  interface Product {
    id: number;
    user_id: number;
    name: string;
    type: string;
    price: string;
    delivery_time: number;
    country_free_shipping: string;
    tags: string;
    description: string;
    file: string;
    mime: string;
    extension: string;
    size: string;
    status: string;
    created_at: string;
    updated_at: string;
    shipping_fee: string;
    quantity: number;
    box_contents: string;
    category: string;
    seller: Seller[];
    previews: ProductPreview[];
  }
  
 export  interface ShopProductResponse {
    product: Product;
    previews: number;
    tags: string[];
    isUserProduct: boolean;
    isPurchaseByUser: boolean;
    totalProducts: number;
    Purchases: number;
  }
  