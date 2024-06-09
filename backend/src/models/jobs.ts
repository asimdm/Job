import { DataTypes, Model } from 'sequelize';
import sequelize from '../configuration/database';

class Job extends Model {
  public _id!: number;
  public title!: string;
  public description!: string;
  public status!: string;
}

Job.init({
  _id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Job',
});

export default Job;
