import 'dotenv/config';
import startApolloServer from './app';

const PORT = process.env.PORT || 3000;

startApolloServer().then((app) => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
