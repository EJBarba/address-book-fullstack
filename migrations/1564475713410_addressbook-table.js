exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("addressbook", {
    id: {
      type: "serial",
      primaryKey: true
    },
    userId: {
      type: "text",
      notNull: true,
      references: '"users"'
    },
    contactName: {
      type: "text",
      notNull: true,
      references: '"contacts"'
    }
  });
};

exports.down = pgm => {};
