import { v4 as uuidv4 } from 'uuid'; // UUID generator
import { pool } from '../configs/postgres.config';
import { Transaction } from '../models/transaction.model';

interface TransactionData {
  qr_code: string;
  rf_id: string;
  price: number;
  total_price: number;
}

class TransactionService {
  async saveTransactionToMongo(data: TransactionData): Promise<void> {
    const transaction = new Transaction(data);
    await transaction.save();
  }

  async transferTransactionToPostgres(data: TransactionData): Promise<void> {
    const client = await pool.connect();
    const id = uuidv4();
    const date = new Date();

    try {
      await client.query('BEGIN');

      const insertTransactionQuery = `
        INSERT INTO transactions (id, qr_code, rf_id, price, total_price, date)
        VALUES ($1, $2, $3, $4, $5, $6)
      `;
      await client.query(insertTransactionQuery, [
        id,
        data.qr_code,
        data.rf_id,
        data.price,
        data.total_price,
        date
      ]);

      const updateCustomerWalletQuery = `
        UPDATE customers
        SET wallet = wallet - $1
        WHERE qr_code = $2
        RETURNING wallet
      `;

      const updateResult = await client.query(updateCustomerWalletQuery, [
        data.total_price,
        data.qr_code
      ]);

      if (updateResult.rowCount === 0) {
        throw new Error(`Customer with qr_code ${data.qr_code} not found`);
      }

      await client.query('COMMIT');
      console.log('Transaction and wallet update successfully');
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error executing transaction and wallet update:', error);
      throw error;
    } finally {
      client.release();
    }
  }
}

export default new TransactionService();
