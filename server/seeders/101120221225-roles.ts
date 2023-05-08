export = {
  up: function (queryInterface: any) {
    return queryInterface.context.bulkInsert(
      "roles",
      [
        {
          id: 1,
          role: "Admin",
          createdAt: new Date(),
          createdBy: 1,
          updatedAt: new Date(),
          updatedBy: 1,
        },
        {
          id: 2,
          role: "User",
          createdAt: new Date(),
          createdBy: 1,
          updatedAt: new Date(),
          updatedBy: 1,
        }
      ],
      {}
    );
  },
};
