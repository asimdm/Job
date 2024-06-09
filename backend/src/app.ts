import  express  from "express";
import sequelize from "./configuration/database";
import authRoutes from './routes/authRoutes';
import jobRoutes from './routes/jobRoutes';
import preSignedUrlRoutes from './routes/preSignedUrlRoutes';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT;
app.use('/jobManagement', authRoutes);
app.use('/jobManagement', jobRoutes);
app.use('/jobManagement', preSignedUrlRoutes);

(async ()=>{
    try{
        await sequelize.sync();
        app.listen(PORT, ()=>{
            console.log(`Server running on port ${PORT}`);
        })
    } catch(err){
        console.log("Unable to connect to the database", err);
    }
})();