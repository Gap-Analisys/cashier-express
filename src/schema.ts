import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Product {
    rf_id: String!
    product_name: String!
    price: Float!
  }

  type Transaction {
    qr_code: String!
    rf_id: String!
    price: Float!
    total_price: Float!
  }

  type Query {
    getProductByRfId(rf_id: String!): Product
  }

  type Mutation {
    checkinProduct(rf_id: String!, product_name: String!, price: Float!): String
    saveTransaction(
      qr_code: String!
      rf_id: String!
      price: Float!
      total_price: Float!
    ): String
  }
`;

export default typeDefs;
