"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create UserApiKey table
    await queryInterface.createTable("UserApiKeys", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      hashed_key: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      encrypted_key: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Create Endpoint table
    await queryInterface.createTable("Endpoints", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      testVersion: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      promptTemplate: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      regexRules: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      typeRules: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      jsonResponseFormat: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      model: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      apiKey: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Create ExternalApiKey table
    await queryInterface.createTable("ExternalApiKeys", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      key: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      UserId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Create User table
    await queryInterface.createTable("Users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Add foreign key constraint
    await queryInterface.addConstraint("UserApiKeys", {
      fields: ["user_id"],
      type: "foreign key",
      name: "fk_userapikey_user_id",
      references: {
        table: "Users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    // Add foreign key constraint
    await queryInterface.addConstraint("ExternalApiKeys", {
      fields: ["UserId"],
      type: "foreign key",
      name: "fk_externalapikey_user_id",
      references: {
        table: "Users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove foreign key constraint
    await queryInterface.removeConstraint(
      "ExternalApiKeys",
      "fk_externalapikey_user_id"
    );
    await queryInterface.removeConstraint(
      "UserApiKeys",
      "fk_userapikey_user_id"
    );

    // Drop tables
    await queryInterface.dropTable("ExternalApiKeys");
    await queryInterface.dropTable("Endpoints");
    await queryInterface.dropTable("UserApiKeys");
    await queryInterface.dropTable("Users");
  },
};
