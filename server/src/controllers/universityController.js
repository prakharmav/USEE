import University from '../models/University.js';

/**
 * @desc    Get all universities with filters, search, and pagination
 * @route   GET /api/universities
 */
export const getUniversities = async (req, res, next) => {
  try {
    const { 
      country, 
      course, 
      minRanking, 
      maxFee, 
      intake, 
      search, 
      page = 1, 
      limit = 10 
    } = req.query;

    const query = {};

    // 1. Full-text search
    if (search) {
      query.$text = { $search: search };
    }

    // 2. Exact filters
    if (country) {
      query.country = country;
    }

    if (course) {
      query['programs.name'] = { $regex: course, $options: 'i' };
    }

    if (intake) {
      query['programs.intake'] = intake;
    }

    // 3. Range filters
    if (minRanking) {
      query.ranking = { ...query.ranking, $gte: Number(minRanking) };
    }

    if (req.query.maxRanking) {
      query.ranking = { ...query.ranking, $lte: Number(req.query.maxRanking) };
    }

    if (maxFee) {
      query['programs.tuitionFee'] = { $lte: Number(maxFee) };
    }

    // Pagination logic
    const skip = (Number(page) - 1) * Number(limit);

    const universities = await University.find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort(search ? { score: { $meta: 'textScore' } } : { ranking: 1 });

    const totalCount = await University.countDocuments(query);

    res.status(200).json({
      status: 'success',
      data: {
        universities,
        totalCount,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(totalCount / Number(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single university by ID
 * @route   GET /api/universities/:id
 */
export const getUniversityById = async (req, res, next) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) {
      return res.status(404).json({
        status: 'error',
        message: 'University not found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: university,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Compare multiple universities
 * @route   POST /api/universities/compare
 */
export const compareUniversities = async (req, res, next) => {
  try {
    const { universityIds } = req.body;

    if (!Array.isArray(universityIds) || universityIds.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide an array of university IDs',
      });
    }

    const universities = await University.find({
      _id: { $in: universityIds },
    });

    res.status(200).json({
      status: 'success',
      data: universities,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get list of supported countries with university counts
 * @route   GET /api/universities/countries
 */
export const getCountries = async (req, res, next) => {
  try {
    const countries = await University.aggregate([
      {
        $group: {
          _id: '$country',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          country: '$_id',
          count: 1,
        },
      },
      { $sort: { country: 1 } },
    ]);

    res.status(200).json({
      status: 'success',
      data: countries,
    });
  } catch (error) {
    next(error);
  }
};
