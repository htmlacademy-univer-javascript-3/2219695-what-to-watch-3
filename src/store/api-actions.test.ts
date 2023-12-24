import {beforeEach, describe} from 'vitest';
import {createAPI} from '../services/api.ts';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../types/state.ts';
import {Action} from 'redux';
import {AppThunkDispatch} from '../types/app-thunk-dispatch.ts';
import {
  addReviewAction,
  checkAuthAction, fetchChangeFavouriteStatusAction,
  fetchDetailsFilmAction, fetchFavouritesAction,
  fetchFilmsAction, fetchPromoFilmAction,
  fetchReviewsAction, fetchSimilarFilmsAction,
  loginAction,
  logoutAction
} from './api-actions.ts';
import {APIRoute} from '../components/app/const.ts';
import {extractActionsTypes} from '../utils/extractActionsTypes.ts';
import {smallFilms} from '../mocks/smallFilms.ts';
import {AuthData} from '../types/auth-data.ts';
import * as tokenStorage from '../services/token';
import {redirectToRoute} from './action.ts';
import {film} from '../mocks/film.ts';
import {mockReviews} from '../mocks/mockReviews.ts';
import {mockPromoFilm} from '../mocks/mockPromoFilm.ts';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;
  const defaultState = {
    films: [],
    isFilmsDataLoading: false,
    detailsFilm: undefined,
    isDetailsFilmDataLoading: false,
    reviews: [],
    isReviewsDataLoading: false,
    similarFilms: [],
    isSimilarFilmsDataLoading: false,
    promoFilm: undefined,
    isPromoFilmDataLoading: false,
    favourites: [],
    isFavouritesDataLoading: false,
  };

  beforeEach(() => {
    store = mockStoreCreator({DATA: defaultState});
  });

  describe('fetchFilmsAction', () => {
    it('should dispatch "fetchFilmsAction.pending", "fetchFilmsAction.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onGet(APIRoute.Films).reply(200, smallFilms);

      await store.dispatch(fetchFilmsAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFilmsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFilmsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFilmsAction.pending.type,
        fetchFilmsAction.fulfilled.type,
      ]);

      expect(fetchFilmsActionFulfilled.payload)
        .toEqual(smallFilms);
    });

    it('should dispatch "fetchFilmsAction.pending", "fetchFilmsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Films).reply(400, []);

      await store.dispatch(fetchFilmsAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFilmsAction.pending.type,
        fetchFilmsAction.rejected.type,
      ]);
    });
  });

  describe('fetchDetailsFilmAction', () => {
    it('should dispatch "fetchDetailsFilmAction.pending", "fetchDetailsFilmAction.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onGet(`${APIRoute.Films}/1`).reply(200, film);

      await store.dispatch(fetchDetailsFilmAction({filmId: '1'}));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchDetailsFilmActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchDetailsFilmAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchDetailsFilmAction.pending.type,
        fetchDetailsFilmAction.fulfilled.type,
      ]);

      expect(fetchDetailsFilmActionFulfilled.payload)
        .toEqual(film);
    });

    it('should dispatch "fetchDetailsFilmAction.pending", "fetchDetailsFilmAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Films}/1`).reply(400, undefined);

      await store.dispatch(fetchDetailsFilmAction({filmId: '1'}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchDetailsFilmAction.pending.type,
        fetchDetailsFilmAction.rejected.type,
      ]);
    });

    it('should dispatch "fetchDetailsFilmAction.pending", "fetchDetailsFilmAction.fulfilled", when server response 200 with isPromo = "true"', async() => {
      mockAxiosAdapter.onGet(`${APIRoute.Films}/1`).reply(200, film);

      await store.dispatch(fetchDetailsFilmAction({filmId: '1', isPromo: true}));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchDetailsFilmActionFulfilled = emittedActions.at(2) as ReturnType<typeof fetchDetailsFilmAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchDetailsFilmAction.pending.type,
        redirectToRoute.type,
        fetchDetailsFilmAction.fulfilled.type,
      ]);

      expect(fetchDetailsFilmActionFulfilled.payload)
        .toEqual(film);
    });
  });

  describe('fetchReviewsAction', () => {
    it('should dispatch "fetchReviewsAction.pending", "fetchReviewsAction.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onGet(`${APIRoute.COMMENTS}/1`).reply(200, mockReviews);

      await store.dispatch(fetchReviewsAction({filmId: '1'}));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchReviewsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.fulfilled.type,
      ]);

      expect(fetchReviewsActionFulfilled.payload)
        .toEqual(mockReviews);
    });

    it('should dispatch "fetchReviewsAction.pending", "fetchReviewsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.COMMENTS}/1`).reply(400, []);

      await store.dispatch(fetchReviewsAction({filmId: '1'}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.rejected.type,
      ]);
    });
  });

  describe('fetchSimilarFilmsAction', () => {
    it('should dispatch "fetchSimilarFilmsAction.pending", "fetchSimilarFilmsAction.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onGet(`${APIRoute.Films}/1/similar`).reply(200, smallFilms);

      await store.dispatch(fetchSimilarFilmsAction({filmId: '1'}));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchSimilarFilmsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchSimilarFilmsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchSimilarFilmsAction.pending.type,
        fetchSimilarFilmsAction.fulfilled.type,
      ]);

      expect(fetchSimilarFilmsActionFulfilled.payload)
        .toEqual(smallFilms);
    });

    it('should dispatch "fetchSimilarFilmsAction.pending", "fetchSimilarFilmsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Films}/1/similar`).reply(400, []);

      await store.dispatch(fetchSimilarFilmsAction({filmId: '1'}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchSimilarFilmsAction.pending.type,
        fetchSimilarFilmsAction.rejected.type,
      ]);
    });
  });

  describe('fetchPromoFilmAction', () => {
    it('should dispatch "fetchPromoFilmAction.pending", "fetchPromoFilmAction.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onGet(APIRoute.PROMO).reply(200, mockPromoFilm);

      await store.dispatch(fetchPromoFilmAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchPromoFilmActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchPromoFilmAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchPromoFilmAction.pending.type,
        fetchPromoFilmAction.fulfilled.type,
      ]);

      expect(fetchPromoFilmActionFulfilled.payload)
        .toEqual(mockPromoFilm);
    });

    it('should dispatch "fetchPromoFilmAction.pending", "fetchPromoFilmAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.PROMO).reply(400, undefined);

      await store.dispatch(fetchPromoFilmAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchPromoFilmAction.pending.type,
        fetchPromoFilmAction.rejected.type,
      ]);
    });
  });

  describe('fetchFavouritesAction', () => {
    it('should dispatch "fetchFavouritesAction.pending", "fetchFavouritesAction.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onGet(APIRoute.FAVORITE).reply(200, smallFilms);

      await store.dispatch(fetchFavouritesAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFavouritesActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFavouritesAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFavouritesAction.pending.type,
        fetchFavouritesAction.fulfilled.type,
      ]);

      expect(fetchFavouritesActionFulfilled.payload)
        .toEqual(smallFilms);
    });

    it('should dispatch "fetchFavouritesAction.pending", "fetchFavouritesAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.FAVORITE).reply(400, []);

      await store.dispatch(fetchFavouritesAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavouritesAction.pending.type,
        fetchFavouritesAction.rejected.type,
      ]);
    });
  });

  describe('fetchChangeFavouriteStatusAction', () => {
    it('should dispatch "fetchChangeFavouriteStatusAction.pending", "fetchChangeFavouriteStatusAction.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onPost(`${APIRoute.FAVORITE}/1/1`).reply(200, film);

      await store.dispatch(fetchChangeFavouriteStatusAction({filmId: '1', status: 1}));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchChangeFavouriteStatusActionFulfilled = emittedActions.at(2) as ReturnType<typeof fetchChangeFavouriteStatusAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchChangeFavouriteStatusAction.pending.type,
        fetchFavouritesAction.pending.type,
        fetchChangeFavouriteStatusAction.fulfilled.type,
      ]);

      expect(fetchChangeFavouriteStatusActionFulfilled.payload)
        .toEqual(film);
    });

    it('should dispatch "fetchChangeFavouriteStatusAction.pending", "fetchChangeFavouriteStatusAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.FAVORITE}/1/1`).reply(400, undefined);

      await store.dispatch(fetchChangeFavouriteStatusAction({filmId: '1', status: 1}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchChangeFavouriteStatusAction.pending.type,
        fetchChangeFavouriteStatusAction.rejected.type,
      ]);
    });
  });

  describe('addReviewAction', () => {
    it('should dispatch "addReviewAction.pending", "addReviewAction.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onPost(`${APIRoute.COMMENTS}/1`).reply(201, mockReviews[0]);

      await store.dispatch(addReviewAction({filmId: '1', comment: 'testComment1', rating: 5}));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const addReviewActionFulfilled = emittedActions.at(2) as ReturnType<typeof addReviewAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        addReviewAction.pending.type,
        redirectToRoute.type,
        addReviewAction.fulfilled.type,
      ]);

      expect(addReviewActionFulfilled.payload)
        .toEqual(mockReviews[0]);
    });

    it('should dispatch "addReviewAction.pending", "addReviewAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.COMMENTS}/1`).reply(400, undefined);

      await store.dispatch(addReviewAction({filmId: '1', comment: 'testComment1', rating: 5}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        addReviewAction.pending.type,
        addReviewAction.rejected.type,
      ]);
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async() => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "redirectToRoute", "loginAction.fulfilled" when server response 200', async() => {
      const fakeUser: AuthData = { login: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call "saveToken" once with the received token', async () => {
      const fakeUser: AuthData = { login: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async() => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        redirectToRoute.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });
});
