import mongoose, { Document, Model, Schema } from 'mongoose';

const modelName = 'MovementQuestPorto';

interface Coin {
  id: string;
  symbol: string;
  amount: string;
}

export interface SwapData {
  coinIn: Coin;
  coinOut: Coin;
}

export interface CreateTokenData {
  symbol: string;
}

export type Quest = {
  address: string;
  txDigest: string;
  timestamp: number;
} & (
  | {
      kind: 'swap';
      data: SwapData;
    }
  | {
      kind: 'createToken';
      data: CreateTokenData;
    }
  | {
      kind: 'createAndDeployToken';
      data: CreateTokenData;
    }
);

export type QuestDocument = Document & Quest;

export const QuestSchema = new Schema({
  address: {
    index: true,
    type: String,
    required: true,
  },
  timestamp: {
    index: true,
    type: Number,
    required: true,
  },
  txDigest: {
    type: String,
    required: true,
  },
  kind: {
    index: true,
    type: String,
    required: true,
  },
  data: {
    required: true,
    type: Schema.Types.Mixed,
  },
});

export default (mongoose.models[modelName] as Model<QuestDocument>) ||
  mongoose.model<QuestDocument>(modelName, QuestSchema);
