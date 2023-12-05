import { Router } from "express";
import movieModel from "../model/movie.js";
const userRouter = Router();


//Function For Pagination
userRouter.get("/movies/pagination", async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const skip = (page - 1) * limit;

        const movies = await movieModel.find().skip(skip).limit(limit);

        const numberOfRecords = await movieModel.countDocuments();
        const totalPages = Math.ceil(numberOfRecords / limit);

        res.status(200).json({
            numberOfRecords,
            totalPages,
            currentPage: page,
            limit,
            movies,
        });

    } catch (error) {
        console.error('Error fetching movies with pagination:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Function For Search Filters
userRouter.get('/search', async (req, res) => {
    try {
        const { title, genre, releaseYear } = req.query;
        const query = {};

        if (title) {
            query.title = { $regex: new RegExp(title, 'i') };
        }

        if (genre) {
            query.genre = { $regex: new RegExp(genre, 'i') };
        }

        if (!isNaN(releaseYear)) {
            query.releaseYear = releaseYear;
        }

        // Execute the search query
        const result = await movieModel.find(query);

        res.status(200).json(result);
    } catch (error) {
        console.error('Error searching movies:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


userRouter.get('/single-search', async (req, res) => {
    try {
        const { keyword } = req.query;

        if (!keyword) {
            return res.status(400).json({ error: 'Keyword is required for search.' });
        }

        const query = {
            $or: [
                { title: { $regex: new RegExp(keyword, 'i') } },
                { genre: { $regex: new RegExp(keyword, 'i') } },
            ],
        };

        // Handle releaseYear separately without using a regular expression
        if (!isNaN(keyword)) {
            query.$or.push({ releaseYear: keyword });
        }

        // Execute the search query
        const result = await movieModel.find(query);

        res.status(200).json(result);
    } catch (error) {
        console.error('Error searching movies:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default userRouter;



