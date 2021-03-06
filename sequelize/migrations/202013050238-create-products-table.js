module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "products",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      mainImage: DataTypes.TEXT,
      sku: {
        unique: true,
        type: DataTypes.STRING,
      },
      brandId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "brands",
        },
      },
      categoryId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "categories",
        },
      },
      supplierId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "suppliers",
        },
      },
      description: DataTypes.TEXT,
      descriptionImage: DataTypes.STRING,
      additionalInformation: DataTypes.TEXT,
      name: DataTypes.STRING,
      productCode: {
        unique: true,
        type: DataTypes.STRING,
        comment: "Product Handle",
      },
      slug: {
        unique: true,
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.FLOAT,
        default: 0,
      },
      bestSeller: DataTypes.BOOLEAN,
      topRated: DataTypes.BOOLEAN,
      featured: DataTypes.BOOLEAN,
   
      metaTitle: DataTypes.TEXT,
      metaKeywords: DataTypes.TEXT,
      metaDescription: DataTypes.TEXT,
      productType: {
        type: DataTypes.ENUM(["eboves", "supplier"]),
        default: "eboves",
      },
      active: {
        type: DataTypes.BOOLEAN,
        default: true,
      },
      commentsCount: {
        type: DataTypes.INTEGER.UNSIGNED,
        default: 0,
      },
      rating: {
        type: DataTypes.INTEGER.UNSIGNED,
        default: 0,
      },
      createdBy: {
        // allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "users",
        },
      },

      updatedBy: {
        // allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "users",
        },
      },
      deletedBy: {
        
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "users",
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt: {
        
        type: DataTypes.DATE,
      },
    },
    {
      charset: "utf8",
    }
  );
};

module.exports.down = (queryInterface) => queryInterface.dropTable("products");
