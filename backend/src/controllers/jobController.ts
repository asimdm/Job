import { Request, Response } from "express";
import Job from "../models/jobs";
import { error } from "console";

export const createJob = async (req: Request, res: Response)=>{
    const {title, description, status} = req.body;
    try{
        const job = await Job.create({title, description, status});
        res.status(201).json(job);
    } catch(err){
        console.log(err);
        res.status(500).json({
            error: "An error occured. Please try again later."
        });
    }
};

export const getJobs = async (req: Request, res: Response)=>{
    try{
        const jobs = await Job.findAll();
        res.status(200).json(jobs);
    } catch(err){
        console.log(err);
        res.status(500).json({
            error: "An error occured. Please try again later."
        });
    }
};

export const getJob = async (req: Request, res: Response)=>{
    const { id } = req.params;
    try{
        const job = await Job.findByPk(id);
        if(!job){
            return res.status(404).json({
                error: "Job not found"
            });
        }
        res.status(200).json(job);
    } catch(err){
        console.log(err);
        res.status(500).json({
            error: "There was an error. Please try again later."
        });
    }
};

export const updateJob = async (req: Request, res: Response)=>{
    const { id } = req.params;
    const { title, description, status } = req.body;
    try{
        const job = await Job.findByPk(id);
        if(!job){
            return res.status(404).json({
                error: "Job not found"
            });
        }
        job?job.title = title:null;
        job?job.description = description:null;
        job?job.status = status:null;
        await job?.save()
        res.status(200).json(job);
    } catch(err){
        console.log(err);
        res.status(500).json({
            error: "There was an error. Please try again later."
        });
    }
};

export const deleteJob = async (req: Request, res: Response)=>{
    const { id } = req.params;
    try{
        const job = await Job.findByPk(id);
        if(!job){
            return res.status(404).json({
                error: "Job not found"
            });
        }
        job?.destroy();
        res.status(204).end();
    } catch(err){
        console.log(err);
        res.status(500).json({
            error: "There was an error. Please try again later."
        });
    }
};