import { redisClient } from '../configs/redis.config';

interface Product {
  rf_id: string;
  product_name: string;
  price: number;
}

class ProductService {
  async checkinProduct(product: Product): Promise<void> {
    const { rf_id, product_name, price } = product;

    await redisClient.set(rf_id, JSON.stringify({ product_name, price }));
  }

  async getProductByRfId(rf_id: string): Promise<Product | null> {
    const product = await redisClient.get(rf_id);
    if (product) {
      return JSON.parse(product);
    }
    return null;
  }
}

export default new ProductService();
