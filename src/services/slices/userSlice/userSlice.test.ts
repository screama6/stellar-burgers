import {
  checkUserAuth,
  loginUser,
  registerUser,
  updateUser
} from '../../../services/thunk/user';
import { RequestStatus } from '../ingredientsSlice/ingredientsSlice';
import { initialState, TUserState, userSliceReducer } from './userSlice';

describe('userSlice', () => {
  it('should update state with ingredients data and set isLoading to false when fulfilled is dispatched', () => {
    const testData = {
      success: true,
      user: {
        email: 's@g.ru',
        name: 'alek'
      }
    };

    const actualState = userSliceReducer(
      { ...initialState },
      checkUserAuth.fulfilled(testData, '')
    );

    expect(actualState).toEqual({
      user: testData.user,
      requestStatus: RequestStatus.Success,
      isAuthChecked: false
    });
  });

  it('should update state with ingredients data and set isLoading to false when fulfilled is dispatched', () => {
    const testData = {
      success: true,
      user: {
        email: 's@g.ru',
        name: 'alek'
      },
      accessToken: '12345',
      refreshToken: '54321'
    };

    const testDataUser = {
      password: 'qwe',
      email: 's@g.ru',
      name: 'alek'
    };

    const actualState = userSliceReducer(
      { ...initialState },
      registerUser.fulfilled(testData, '', testDataUser)
    );

    expect(actualState).toEqual({
      user: testData.user,
      requestStatus: RequestStatus.Success,
      isAuthChecked: false
    });
  });

  it('should update state with ingredients data and set isLoading to false when fulfilled is dispatched', () => {
    const testData = {
      success: true,
      user: {
        email: 's@g.ru',
        name: 'alek'
      },
      accessToken: '12345',
      refreshToken: '54321'
    };

    const testDataUser = {
      password: 'qwe',
      email: 's@g.ru',
      name: 'alek'
    };

    const actualState = userSliceReducer(
      { ...initialState },
      loginUser.fulfilled(testData, '', testDataUser)
    );

    expect(actualState).toEqual({
      user: testData.user,
      requestStatus: RequestStatus.Success,
      isAuthChecked: false
    });
  });

  it('should update state with ingredients data and set isLoading to false when fulfilled is dispatched', () => {
    const testData = {
      success: true,
      user: {
        email: 's@g.ru',
        name: 'alek'
      }
    };

    const testDataUser = {
      password: 'qwe',
      email: 's@g.ru',
      name: 'alek'
    };

    const actualState = userSliceReducer(
      { ...initialState },
      updateUser.fulfilled(testData, '', testDataUser)
    );

    expect(actualState).toEqual({
      user: testData.user,
      requestStatus: RequestStatus.Success,
      isAuthChecked: false
    });
  });
});
