import { Network } from '@interest-protocol/aptos-move-dex';
import mongoose, { Document, Model, Schema } from 'mongoose';

const modelName = 'MovementMetricsPorto';

export interface Metrics {
  network: Network;
  weeklyTXs: Map<string, number>;
  weeklyUsers: Map<string, number>;
  weeklySwaps: Map<string, number>;
  weeklyPools: Map<string, number>;
  weeklyTokens: Map<string, number>;
  weeklyFaucets: Map<string, number>;
  weeklyDeposits: Map<string, number>;
  weeklyAirdrops: Map<string, number>;
}

export type MetricsDocument = Document & Metrics;

export const MetricsSchema = new Schema({
  network: {
    index: true,
    type: String,
    required: true,
  },
  weeklyTXs: { type: Schema.Types.Map },
  weeklyUsers: { type: Schema.Types.Map },
  weeklySwaps: { type: Schema.Types.Map },
  weeklyPools: { type: Schema.Types.Map },
  weeklyTokens: { type: Schema.Types.Map },
  weeklyFaucets: { type: Schema.Types.Map },
  weeklyDeposits: { type: Schema.Types.Map },
});

export default (mongoose.models[modelName] as Model<MetricsDocument>) ||
  mongoose.model<MetricsDocument>(modelName, MetricsSchema);
