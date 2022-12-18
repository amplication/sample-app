This sample project manages an ecommerce and logistics process. 

The project was generated with [Amplication](https://amplication.com) and consists of three services:
- [ecommerce-server](#ecommerce-server)
- [ecommerce-admin](#ecommerce-admin)
- [logistic-server](#logistic-server)


## ecommerce-server
Order management service for e-commerce applications.
### <u>Features</u>:
- Uses [PostgreSQL plugin](https://github.com/amplication/plugins/tree/master/plugins/db-postgres) as a database
- Uses [JWT plugin](https://github.com/amplication/plugins/tree/master/plugins/auth-jwt) as an authentication strategy
- Uses [Kafka plugin](https://github.com/amplication/plugins/tree/master/plugins/broker-kafka) as a message broker

#### *Message Broker Topics:*
This service use the `send` pattern of the broker to notify when an order or a product was created or updated`
- `order.create.v1`
- `order.update.v1`
- `product.create.v1`
- `product.update.v1`
## ecommerce-admin
The admin UI dashboard for the e-commerce application.
## logistic-server
Services that hold the warehouse and shipment entities.
### <u>Features</u>:
- Uses [MySQL plugin](https://github.com/amplication/plugins/tree/master/plugins/db-mysql) as a database
- Uses [Http Base plugin](https://github.com/amplication/plugins/tree/master/plugins/auth-basic)  as an authentication strategy
- Uses [Kafka plugin](https://github.com/amplication/plugins/tree/master/plugins/broker-kafka) as a message broker

#### *Message Broker Topics:*
This service uses the `receive` pattern of the broker to notify when an order or a product was created or updated.
- `order.create.v1` 
- `order.update.v1`
- `product.create.v1`
- `product.update.v1`
### Learn more

You can learn more in the [Amplication documentation](https://docs.amplication.com/guides/getting-started).
