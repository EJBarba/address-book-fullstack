exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("addressbook", {
    id: {
      type: "serial",
      primaryKey: true
    },
    userid: {
      type: "integer",
      notNull: true,
      references: '"users"'
    },
    contactid: {
      type: "integer",
      references: '"contact"'
    }
  });
};

exports.down = pgm => {};
