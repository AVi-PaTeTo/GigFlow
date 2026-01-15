import express from 'express';
import Gig from '../models/Gig.js'
import Bid from '../models/Bid.js';
import { optionalAuth, requireAuth } from '../middlewares/auth.middleware.js';
const router = express.Router()

//get all gigs
router.get('/', async (req, res) =>{
    try{
        const s = req.query.search || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const gigs = await Gig.find({
                                    status: "open",
                                    $or: [
                                            { title: { $regex: s, $options: "i" } },
                                            { description: { $regex: s, $options: "i" } },
                                        ], })
                                .skip(skip)
                                .limit(limit)
                                .populate('ownerId');

        res.status(200).json(gigs)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/me', requireAuth, async (req, res) => {
    try{
        const gigs = await Gig.find({ownerId: req.userId})
        
        res.status(200).json(gigs)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
})

//find gigs by Id
router.get('/:id', optionalAuth, async (req, res) =>{
    try{
        const gig = await Gig.findById(req.params.id).populate('ownerId')
        if(!gig) return res.json(404).json({message: "Gig not found"})

        let hasPlacedBid = false;

        console.log(gig._id, req.userId)
        if (req.userId) {        
                hasPlacedBid = !!(await Bid.exists({
                gigId: gig._id,
                freelancerId: req.userId,
            }));
        };

        console.log('why',hasPlacedBid)
        
        res.json({gig, hasPlacedBid: hasPlacedBid})
    } catch (error){
        res.status(500).json({message: error.message})
    }
})

//Create
router.post('/', requireAuth, async (req, res) =>{
    const {title, description, budget, duration} = req.body
    
    const gig = new Gig({
        ownerId: req.userId,
        title: title,
        description: description,
        budget: budget,
        duration: duration
    })

    try{
        const newGig = await gig.save()
        res.status(201).json(newGig)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// // Update
// router.patch('/:id', requireAuth, async (req, res) =>{
//     try{
//         const gig = await Gig.findById(req.params.id)
//         if (!gig.ownerId.equals(req.userId)) res.status(403).json({message: 'Forbidden.'})
//         if (!gig) return res.status(404).json({message: 'Gig not found.'})

//         Object.assign(gig, req.body)
//         const updatedGig = await gig.save()
//         res.json(updatedGig)
//     } catch(error) {
//         res.status(500).json({message: error.message})
//     }
// })

// // Delete
// router.delete('/:id', requireAuth, async (req, res) =>{
//     try{
//         const gig = await Gig.findById(req.params.id)
//         if (!gig.ownerId.equals(req.userId)) res.status(403).json({message: 'Forbidden.'})
//         if (!gig) return res.status(404).json({message: 'Gig not found.'})
        
//         await Gig.deleteOne(gig)
//         res.json({message: 'Gig Deleted.'})
//     } catch(error) {
//         res.status(500).json({message: error.message})
//     }
// })

export default router;