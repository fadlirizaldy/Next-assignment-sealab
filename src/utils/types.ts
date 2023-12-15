export type UserType = {
  id: string;
  name: string;
  email: string;
  password: string;
  like: string[];
  plan: string;
  imgUrl: string;
  expired_subs: string;
  role: string;
  referral_code: string;
};

export type NewsType = {
  id: string;
  title: string;
  description: string;
  isPremium: boolean;
  like: number;
  img: string;
  category: string;
  created_at: Date;
  updated_at: Date;
};

export type TransactionType = {
  id: string;
  user_id: string;
  transactions_id: string;
  type: string;
  transaction_date: string;
  total_paid: number;
  status: string;
};
