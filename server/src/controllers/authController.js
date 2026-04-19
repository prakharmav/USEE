import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendNotification, welcomeEmail } from '../services/emailService.js';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: 'error', message: 'Email already in use.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    // Asynchronously send welcome email without blocking
    if (newUser.notificationsEnabled !== false) {
      const html = welcomeEmail(newUser);
      sendNotification(newUser.email, 'Welcome to Eduvion! 🎓', html).catch(e => console.error(e));
    }

    const token = signToken(newUser._id);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          journeyStage: newUser.journeyStage,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: 'error', message: 'Please provide email and password.' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ status: 'error', message: 'Incorrect email or password.' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ status: 'error', message: 'Incorrect email or password.' });
    }

    const token = signToken(user._id);

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          journeyStage: user.journeyStage,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found.' });
    }
    
    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

export const googleLogin = async (req, res, next) => {
  try {
    const { credential } = req.body;
    
    if (!credential) {
      return res.status(400).json({ status: 'error', message: 'Token is required' });
    }

    let email, name;

    try {
      if (!process.env.GOOGLE_CLIENT_ID) {
        // Fallback for demo without env variables (just decode the token without strict verification)
        const decoded = jwt.decode(credential);
        if (!decoded || !decoded.email) throw new Error("Invalid token payload");
        email = decoded.email;
        name = decoded.name;
      } else {
        const ticket = await googleClient.verifyIdToken({
          idToken: credential,
          audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        email = payload.email;
        name = payload.name;
      }
    } catch (err) {
      return res.status(401).json({ status: 'error', message: 'Invalid Google token' });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, password: 'oauthUser' });
    }

    const token = signToken(user._id);
    res.status(200).json({
      status: 'success',
      token,
      data: { user: { id: user._id, name: user.name, email: user.email, journeyStage: user.journeyStage } },
    });
  } catch (error) {
    next(error);
  }
};

export const linkedinLogin = async (req, res, next) => {
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({ status: 'error', message: 'Code is required' });
    }

    if (!process.env.LINKEDIN_CLIENT_ID || !process.env.LINKEDIN_CLIENT_SECRET) {
      // Dummy response for development if env variables are not present.
      // Usually, you would prompt an error or handle a mock.
      return res.status(500).json({ status: 'error', message: 'LinkedIn credentials not configured on the server.' });
    }

    // 1. Swap authorization code for access token
    const tokenResponse = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
      params: {
        grant_type: 'authorization_code',
        code,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
        redirect_uri: process.env.LINKEDIN_REDIRECT_URI || 'http://localhost:5173/auth/linkedin/callback'
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const accessToken = tokenResponse.data.access_token;

    // 2. Fetch user profile and email
    const profileResponse = await axios.get('https://api.linkedin.com/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const { email, name } = profileResponse.data;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, password: 'oauthUser' });
    }

    const token = signToken(user._id);
    res.status(200).json({
      status: 'success',
      token,
      data: { user: { id: user._id, name: user.name, email: user.email, journeyStage: user.journeyStage } },
    });
  } catch (error) {
    if (error.response && error.response.data) {
      console.error('LinkedIn Auth Error:', error.response.data);
    }
    next(error);
  }
};
