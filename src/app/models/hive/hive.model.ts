export interface Hive {
  id: string;
  name: string;
  type: string;
  createdAt: string;
  status: string;
  userId: string;

  lastInspection?: string | null;
  nextInspection?: string | null;
  queenBirthDate?: string | null;
  queenStatus?: string | null;
  breed?: string | null;
  isMarked?: boolean | null;
  requeeningDate?: string | null;
  combCondition?: string | null;
  frameCount?: number | null;
  honeyAmount?: number | null;
  harvestedHoney?: number | null;
  feedingStatus?: string | null;
  diseaseSymptoms?: string | null;
  beeBehavior?: string | null;
  pests?: string | null;
  notes?: string | null;
}
