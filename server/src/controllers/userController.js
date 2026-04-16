import User from '../models/User.js';

export const updateProfile = async (req, res, next) => {
  try {
    const { profileData, journeyStage, phone } = req.body;
    
    const userToUpdate = await User.findById(req.user.id);
    if (!userToUpdate) {
      return res.status(404).json({ status: 'error', message: 'User not found.' });
    }

    if (profileData) {
      userToUpdate.profileData = {
        ...userToUpdate.profileData,
        ...profileData,
      };
    }
    if (journeyStage) userToUpdate.journeyStage = journeyStage;
    if (phone) userToUpdate.phone = phone;

    await userToUpdate.save();

    res.status(200).json({
      status: 'success',
      data: {
        user: userToUpdate,
      },
    });
  } catch (error) {
    next(error);
  }
};
