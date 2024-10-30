import { Network } from '@interest-protocol/aptos-move-dex';

import dbConnect from '@/server';
import metrics from '@/server/model/metrics';
import QuestModel, { Quest } from '@/server/model/quest';
import QuestProfileModel from '@/server/model/quest-profile';
import { getExactDayTimestamp, getFirstWeekDayTimestamp } from '@/utils';

type ProfileField = 'swap';

type MetricField = 'weeklySwaps';

type LastField = 'lastSwapAt';

const lastFieldMap: Record<ProfileField, LastField> = {
  swap: 'lastSwapAt',
};

const metricsFieldMap: Record<ProfileField, MetricField> = {
  swap: 'weeklySwaps',
};

export const addQuest = async (
  quest: Omit<Quest, 'timestamp'>,
  profileField: ProfileField,
  network: Network
) => {
  await dbConnect();

  const questProfile = await findQuestProfile(quest.address);

  const todayTimestamp = getExactDayTimestamp();
  const weekTimestamp = getFirstWeekDayTimestamp();

  await updateMetrics(
    network,
    !questProfile.weeks?.includes(weekTimestamp),
    quest.kind
  );

  const finalQuest = { ...quest, timestamp: todayTimestamp };

  const doc = await QuestModel.create(finalQuest);
  await doc.save();

  if (questProfile[lastFieldMap[profileField]] === todayTimestamp)
    return finalQuest;

  questProfile[lastFieldMap[profileField]] = todayTimestamp;

  if (!questProfile.weeks?.includes(weekTimestamp))
    questProfile.weeks = [...(questProfile.weeks ?? []), weekTimestamp];

  await questProfile.save();

  return finalQuest;
};

export const findQuestProfile = async (address: string) => {
  await dbConnect();

  const questProfile = await QuestProfileModel.findOne({ address });

  return (
    questProfile ??
    QuestProfileModel.create({
      address,
      weeks: [],
      lastSwapAt: 0,
    })
  );
};

export const findMetrics = async (network: Network) => {
  await dbConnect();

  const metric = await metrics.findOne({ network });

  return (
    metric ??
    metrics.create({
      network,
      weeklyTXs: {},
      weeklyUsers: {},
      weeklySwaps: {},
    })
  );
};

export const updateMetrics = async (
  network: Network,
  newUser: boolean,
  kind: ProfileField
) => {
  await dbConnect();
  const firstWeekDay = getFirstWeekDayTimestamp();

  const metric = await findMetrics(network);

  metric.weeklyTXs.set(
    String(firstWeekDay),
    (metric.weeklyTXs.get(String(firstWeekDay)) ?? 0) + 1
  );

  if (!metric[metricsFieldMap[kind]]) metric[metricsFieldMap[kind]] = new Map();

  metric[metricsFieldMap[kind]].set(
    String(firstWeekDay),
    (metric[metricsFieldMap[kind]].get(String(firstWeekDay)) ?? 0) + 1
  );

  if (newUser)
    metric.weeklyUsers.set(
      String(firstWeekDay),
      (metric.weeklyUsers.get(String(firstWeekDay)) ?? 0) + 1
    );

  await metric.save();
};
