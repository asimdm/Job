import { DataTypes, Model } from "sequelize";
import sequelize from "../configuration/database";
import bcrypt from 'bcryptjs';

class User extends Model{
    public user_id!: number;
    public name!: string;
    public username!: string;
    public password!: string;

    public passwordCheck(password: string): boolean{
        return bcrypt.compareSync(password, this.password);
    }
}

User.init({
    user_id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    sequelize,
    modelName: 'User',
    hooks:{
        beforeCreate: (user: User)=>{
            user.password = bcrypt.hashSync(user.password, 10);
        },
    },
});

export default User;