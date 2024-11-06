import mongoose, { Document, Model, Schema } from 'mongoose';

const modelName = 'MovementQuestProfilePorto';

export interface QuestProfile {
  address: string;
  lastSwapAt: number;
  lastCreateTokenAt: number;
  lastCreateAndDeployTokenAt: number;
  weeks: ReadonlyArray<number>;
}

export type QuestProfileDocument = Document & QuestProfile;

export const QuestProfileSchema = new Schema({
  address: { index: true, type: String, required: true, unique: true },
  lastSwapAt: { type: Number },
  lastCreateTokenAt: { type: Number },
  lastCreateAndDeployTokenAt: { type: Number },
  weeks: { type: Schema.Types.Array },
});

export default (mongoose.models[modelName] as Model<QuestProfileDocument>) ||
  mongoose.model<QuestProfileDocument>(modelName, QuestProfileSchema);
