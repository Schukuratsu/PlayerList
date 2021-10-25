POST '/game'
type createGameRequest = {
  title: string;
  description: string;
  players: Array<string>
  permissions: {
    view: 'public' | 'invited'; // por enquanto só public
    edit: 'public' | 'invited' | 'admin'; // por enquanto só public
  }
}

GET '/game/{game_id}'
type getGameParams = {
  title: string;
  description: string;
  players: Array<{
    alias: string;
  }>;
}

POST '/player'
type createPlayerRequest = {
  game_id: number;
  alias: string;
}

DELETE '/player/{player_id}'

PATCH '/player/{player_id}'
type editPlayerRequest = {
  game_id: number;
  alias: string;
}
