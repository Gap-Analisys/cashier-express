/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductService from '../services/product.service';
import TransactionService from '../services/transaction.service';

const resolvers = {
  Query: {
    getProductByRfId: async (_: any, { rf_id }: { rf_id: string }) => {
      return await ProductService.getProductByRfId(rf_id);
    }
  },
  Mutation: {
    checkinProduct: async (
      _: any,
      {
        rf_id,
        product_name,
        price
      }: { rf_id: string; product_name: string; price: number }
    ) => {
      await ProductService.checkinProduct({ rf_id, product_name, price });
      return 'Product check-in successful';
    },
    saveTransaction: async (
      _: any,
      {
        qr_code,
        rf_id,
        price,
        total_price
      }: { qr_code: string; rf_id: string; price: number; total_price: number }
    ) => {
      await TransactionService.saveTransactionToMongo({
        qr_code,
        rf_id,
        price,
        total_price
      });
      await TransactionService.transferTransactionToPostgres({
        qr_code,
        rf_id,
        price,
        total_price
      });
      return 'Transaction saved and transferred successfully';
    }
  }
};

export default resolvers;
