export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
};

export type TConstructorIngredient = TIngredient & {
  id: string;
};

export type TOrder = {
  _id: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
};

export type TOrdersData = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export type TUser = {
  email: string;
  name: string;
};

export type TTabMode = 'bun' | 'sauce' | 'main';

type ServerResponse<T> = {
  success: boolean;
} & T;

export type UserResponse = ServerResponse<{
  user: TUser;
}>;

export type UserResponseToken = ServerResponse<{
  user: TUser;
  accessToken: string;
  refreshToken: string;
}>;

export type UserLoginBodyDto = {
  email: string;
  password: string;
};

export type UserRegisterBodyDto = {
  password: string;
} & TUser;
