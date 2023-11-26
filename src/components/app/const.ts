export enum AppRoute {
  Main = '/',
  Login = '/login',
  MyList = '/my-list',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
}

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Films = '/films',
  Login = '/login',
  Logout = '/logout',
  COMMENTS = '/comments',
  PROMO = '/promo',
  FAVORITE = '/favorite'
}

export enum NameSpace {
  Data = 'DATA',
  Wtw = 'WTW',
  User = 'USER',
}
