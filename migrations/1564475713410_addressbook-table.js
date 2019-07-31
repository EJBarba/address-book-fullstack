exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("addressbook", {
    id: {
      type: "serial",
      primaryKey: true
    },
    userId: {
      type: "integer",
      notNull: true,
      references: '"users"'
    },
    contactId: {
      type: "integer",
      references: '"contact"'
    }
  });
};

exports.down = pgm => {};
