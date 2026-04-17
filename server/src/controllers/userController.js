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

/**
 * Get saved (shortlisted) universities for a user
 */
export const getSavedUniversities = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate('savedUniversities');
    if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });

    res.status(200).json({
      status: 'success',
      data: user.savedUniversities
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Add/Remove university from shortlist
 */
export const toggleSavedUniversity = async (req, res, next) => {
  try {
    const { universityId } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });

    const index = user.savedUniversities.indexOf(universityId);
    if (index > -1) {
      user.savedUniversities.splice(index, 1);
    } else {
      user.savedUniversities.push(universityId);
    }

    await user.save();
    res.status(200).json({
      status: 'success',
      message: index > -1 ? 'Removed from shortlist' : 'Added to shortlist'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get aggregated dashboard data
 */
export const getDashboardData = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });

    // Calculate profile completeness
    const profileFields = ['gre', 'gpa', 'workExp', 'targetCountries', 'targetCourses'];
    const filledFields = profileFields.filter(f => user.profileData?.[f] && 
        (Array.isArray(user.profileData[f]) ? user.profileData[f].length > 0 : true));
    
    const completeness = Math.round((filledFields.length / profileFields.length) * 100);

    res.status(200).json({
      status: 'success',
      data: {
        completeness,
        journeyStage: user.journeyStage,
        shortlistCount: user.savedUniversities.length,
        nextActions: [
          completeness < 100 ? 'Complete your profile for better matches' : null,
          user.savedUniversities.length === 0 ? 'Start shortlisting universities' : null,
          'Check your admission probability'
        ].filter(Boolean)
      }
    });
  } catch (error) {
    next(error);
  }
};
