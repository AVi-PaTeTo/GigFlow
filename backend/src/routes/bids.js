import express from 'express'
import mongoose, { startSession } from 'mongoose';
import Bid from '../models/Bid.js'
import Gig from '../models/Gig.js'
import { requireAuth } from '../middlewares/auth.middleware.js';
const router = express.Router()


//get all bids
// router.get('/', async (req, res) => {
//     try{
//         const bids = await Bid.find()
//         res.json(bids)
//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// })

//get all bids of a user
router.get('/me', requireAuth, async (req, res) => {

    try{
        const bids = await Bid.find({freelancerId: req.userId}).populate('gigId')
        res.status(200).json(bids)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//get all bids of a specific Gig 
router.get('/:gigId', requireAuth, async (req, res) => {
    const currentUser = req.userId
    try{
        const gig = await Gig.findById(req.params.gigId)
        if (!gig.ownerId.equals(currentUser)) return res.status(404).json({ message: "Not authorized."})
        
        const bids = await Bid.find({gigId: req.params.gigId}).populate("freelancerId")
        if(!bids) return res.status(404).json({ message: "Bid not found."})
        
        res.status(200).json({gig, bids})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.patch('/:id/hire', requireAuth, async (req, res) => {
    let bidId = req.params.id;
    let gigId = null

    try{
        const bid = await Bid.findById(req.params.id)
        if (!bid) return res.status(404).json({message: "No bid found"})

        gigId = bid.gigId
        const gig = await Gig.findById(gigId)
        if (!gig.ownerId.equals(req.userId))return res.status(403).json({ message: "Not authorized."})

    } catch (error) {
        return res.status(500).json({message: error.message})
    }

    const session = await mongoose.startSession()
    session.startTransaction()

    try{
        const gigRes = await Gig.updateOne(
            {_id:gigId, status: 'open'},
            { $set: { status: 'assigned' }},
            { session }
        )

        if (gigRes.matchedCount === 0) {
            throw new Error("Gig is no longer open");
        }

        await Bid.updateMany(
            { gigId, _id: { $ne : bidId}},
            { $set: { status: 'rejected' }},
            { session }
        )

        const bidRes = await Bid.updateOne(
            { _id: bidId, gigId },
            { $set: { status: 'hired' }},
            { session }
        )

        if ( bidRes.matchedCount === 0) {
            throw new Error("Bid not found");
        }

        await session.commitTransaction()
        return res.status(200).json({ message: "Bid hired successfully" });
    } catch (err) {
        await session.abortTransaction()
        return res.status(400).json({ message: err.message });
    } finally {
        session.endSession()
    }
})


//Create Bid
router.post('/', requireAuth, async (req, res) => {
    try{
        const freelancerId = req.userId
        const { gigId, message } = req.body

        const newBid = await Bid.create({ gigId, freelancerId, message })
        res.status(201).json(newBid)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Edit Bid
// router.patch('/', (req, res) => {
//     try{

//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// })

// Delete Bid
router.delete('/:id', requireAuth, async (req, res) => {
    try{
        const bid = await Bid.findById(req.params.id)
        if (!bid.freelancerId.equals(req.userId)) return res.status(404).json({ message: "Not authorized."})
        if (!bid) return res.status(404).json({message: 'Bid not found.'})
        
        await Bid.deleteOne(bid)
        res.json({message: 'Bid Deleted.'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})




export default router;