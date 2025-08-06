const { sequelize } = require("../Config/dbConfig");
const User = require("./userModel");
// const Address = require("./address");
// const Supplier = require("./supplier");
// const Client = require("./client");
// const Carrier = require("./carrier");
// const Vehicle = require("./vehicle");
// const Product = require("./product");
// const Order = require("./order");
// const Company = require("./company");
// const Area = require("./area");
// const OrderItem = require("./order_item");
const Role = require("./roleModel");
const Permission = require("./permissionModel");
const RolePermission = require("./role_permissionModel");

// Users to Addresses (One-to-Many)
// User.hasMany(Address, { foreignKey: "user_id", as: "addresses", onDelete: "CASCADE" });
// Address.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });

// // Users to Suppliers (One-to-One)
// User.hasOne(Supplier, { foreignKey: "user_id", onDelete: "CASCADE" });
// Supplier.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });

// // Users to Clients (One-to-One)
// User.hasOne(Client, { foreignKey: "user_id", onDelete: "CASCADE" });
// Client.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });

// // Users to Carriers (One-to-One)
// User.hasOne(Carrier, { foreignKey: "user_id", onDelete: "CASCADE" });
// Carrier.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });

// Users to Roles (One-to-Many)
User.belongsTo(Role, { foreignKey: "role_id" });
Role.hasMany(User, { foreignKey: "role_id" });

// Roles to Permissions (Many-to-Many)
Role.belongsToMany(Permission, { through: RolePermission, foreignKey: "role_id", onDelete: "CASCADE" });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: "permission_id", onDelete: "CASCADE" });
RolePermission.belongsTo(Role, { foreignKey: "role_id", onDelete: "CASCADE" });
RolePermission.belongsTo(Permission, { foreignKey: "permission_id", onDelete: "CASCADE" });
Role.hasMany(RolePermission, { foreignKey: "role_id", onDelete: "CASCADE" });
Permission.hasMany(RolePermission, { foreignKey: "permission_id", onDelete: "CASCADE" });

// // Suppliers to Products (One-to-Many)
// Supplier.hasMany(Product, { foreignKey: "supplier_id", as: "products", onDelete: "CASCADE" });
// Product.belongsTo(Supplier, { foreignKey: "supplier_id", onDelete: "CASCADE" });

// // Orders to Suppliers (Many-to-One)
// Supplier.hasMany(Order, { foreignKey: "supplier_id", as: "orders" });
// Order.belongsTo(Supplier, { foreignKey: "supplier_id" });

// // Orders to Clients (Many-to-One)
// Client.hasMany(Order, { foreignKey: "client_id", as: "orders" });
// Order.belongsTo(Client, { foreignKey: "client_id" });

// // Orders to Carriers (Many-to-One)
// Carrier.hasMany(Order, { foreignKey: "carrier_id", as: "orders", onDelete: "SET NULL" });
// Order.belongsTo(Carrier, { foreignKey: "carrier_id", onDelete: "SET NULL" });

// // Orders to Addresses (Billing and Shipping, Many-to-One)
// Address.hasMany(Order, { as: "BillingOrders", foreignKey: "billing_address_id" });
// Address.hasMany(Order, { as: "ShippingOrders", foreignKey: "shipping_address_id" });
// Order.belongsTo(Address, { as: "BillingAddress", foreignKey: "billing_address_id" });
// Order.belongsTo(Address, { as: "ShippingAddress", foreignKey: "shipping_address_id" });

// // Orders to Products (Many-to-Many)
// Order.belongsToMany(Product, {
//   through: OrderItem,
//   foreignKey: "order_id",
//   otherKey: "product_id",
//   onDelete: "CASCADE",
// });
// Product.belongsToMany(Order, {
//   through: OrderItem,
//   foreignKey: "product_id",
//   otherKey: "order_id",
//   onDelete: "CASCADE",
// });
// OrderItem.belongsTo(Order, { foreignKey: "order_id", onDelete: "CASCADE" });
// OrderItem.belongsTo(Product, { foreignKey: "product_id", onDelete: "CASCADE" });
// Order.hasMany(OrderItem, { foreignKey: "order_id", as: "orderItems", onDelete: "CASCADE" });
// Product.hasMany(OrderItem, { foreignKey: "product_id", as: "orderItems", onDelete: "CASCADE" });

// // Carriers to Vehicles (One-to-Many)
// Carrier.hasMany(Vehicle, { foreignKey: "carrier_id", as: "vehicles", onDelete: "CASCADE" });
// Vehicle.belongsTo(Carrier, { foreignKey: "carrier_id", onDelete: "CASCADE" });

// // Clients to Areas (Many-to-One)
// Area.hasMany(Client, { foreignKey: "area_id", as: "clients" });
// Client.belongsTo(Area, { foreignKey: "area_id" });

// // Carriers to Areas (Many-to-One)
// Area.hasMany(Carrier, { foreignKey: "area_id", as: "carriers" });
// Carrier.belongsTo(Area, { foreignKey: "area_id" });

module.exports = {
  User,
  // Address,
  // Supplier,
  // Client,
  // Carrier,
  // Vehicle,
  // Product,
  // Order,
  // Company,
  // Area,
  // OrderItem,
  Role,
  Permission,
  RolePermission,
};
