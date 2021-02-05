import { Response, Request } from "express";
import example from '../services/example';

export const example1 = async (_: Request, res: Response): Promise<void> => {
	try {
		//res.status(200).json({"hello":"example1","database": "a"});
		res.json(await example.getTest());
	} catch (error) {
		res.status(400).send("Bad Request");
		// res.status(500).send("Internal Server Error");
	}
};

export const example2 = async (_: Request, res: Response): Promise<void> => {
	try {
		res.status(200).json({"hello":"example2"});
	} catch (error) {
		res.status(400).send("Bad Request");
		// res.status(500).send("Internal Server Error");
	}
};
