import { DataTypes, Model } from 'sequelize';
import sequelize from "../database/connection";
import { UserInterface } from '../interfaces/UserInterface';

class User extends Model<UserInterface> implements UserInterface {
    public id?: number;
    public login!: string;
    public senha!: string;
    public nome!: string;
    public role!: string;
    public status!: string;
    public idVendedor!: number | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "ID"
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "USUARIO"
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "SENHA"
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "NOME"
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "ROLE"
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "STATUS"
    },
    idVendedor: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "IDVENDEDOR"
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "DATACRIACAO"
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "DATAUPDATE"
    }
}, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'AUTENTICACAO',
    timestamps: true
});

export default User;
