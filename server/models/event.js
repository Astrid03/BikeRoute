/* CLase evento de ciclismo*/
module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define('Event', {
      eventid: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
      evtname: DataTypes.STRING,
      description: DataTypes.STRING,
      evtimage: DataTypes.STRING,
      startDate: DataTypes.DATE
    }, {
      classMethods: {
        associate: (models) => {
          Event.belongsToMany(models.User, {through: models.Participation})
          Event.belongsTo(models.City)
        }
      }
    }
  )

  return Event
}
