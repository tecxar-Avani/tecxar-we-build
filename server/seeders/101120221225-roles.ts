export = {
  up: function (queryInterface: any) {
    return queryInterface.context.bulkInsert(
      "roles",
      [
        {
          id: 1,
          role: "Admin",
          createdAt: new Date(),
          created_by: 1,
          updatedAt: new Date(),
          updated_by: 1,
        },
        {
          id: 2,
          role: "User",
          createdAt: new Date(),
          created_by: 1,
          updatedAt: new Date(),
          updated_by: 1,
        },
      ],
      {}
    );
  },
};
