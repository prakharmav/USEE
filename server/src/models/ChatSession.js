import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'system', 'assistant'],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const chatSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    messages: [messageSchema],
    sessionType: {
      type: String,
      enum: ['career', 'loan', 'visa', 'general'],
      required: true,
      default: 'general',
    },
    title: {
      type: String,
      default: 'New Conversation',
    },
    messageCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

const ChatSession = mongoose.model('ChatSession', chatSessionSchema);
export default ChatSession;
