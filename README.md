This project was generated with [Amplication](https://amplication.com) and consists of three apps:

## ecommerce-server
Order management service for e-commerce applications.
### <u>Features</u>:
- Use [PostgreSQL plugin](https://github.com/amplication/plugins/tree/master/plugins/db-postgres) as a database
- Use [JWT plugin](https://github.com/amplication/plugins/tree/master/plugins/auth-jwt) as authentication strategy
- Use [Kafka plugin](https://github.com/amplication/plugins/tree/master/plugins/broker-kafka) as a message broker

#### *Message Broker Topics:*
This service use the `send` pattern of the broker to notify when an order or a product was created or updated`
- `order.create.v1`
- `order.update.v1`
- `product.create.v1`
- `product.update.v1`
## ecommerce-admin
The admin UI dashboard for the e-commerce application
## logistic-server
Services that holds the warhorse and the shipment entities.
### <u>Features</u>:
- Use [MySQL plugin](https://github.com/amplication/plugins/tree/master/plugins/db-mysql) as a database
- Use [Http Base plugin](https://github.com/amplication/plugins/tree/master/plugins/auth-basic)  as authentication strategy
- Use [Kafka plugin](https://github.com/amplication/plugins/tree/master/plugins/broker-kafka) as a message broker

#### *Message Broker Topics:*
This service use the `receive` pattern of the broker to notify when an order or a product was created or updated
- `order.create.v1` 
- `order.update.v1`
- `product.create.v1`
- `product.update.v1`
### Learn more

You can learn more in the [Amplication documentation](https://docs.amplication.com/guides/getting-started).
