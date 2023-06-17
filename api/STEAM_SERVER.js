import axios from 'axios';
import { STEAM_KEY } from './API_KEYS';
import { RAPID_API_KEY } from './API_KEYS';

const SteamServer = axios.create({
  baseURL: 'https://api.steampowered.com/',
});

const SteamStoreServer = axios.create({
  baseURL: 'https://store.steampowered.com/',
});

// const RapidServer = axios.create({
//   baseURL: 'https://games-details.p.rapidapi.com/single_game/',
//   headers: {
//     'X-RapidAPI-Key': RAPID_API_KEY,
//     'X-RapidAPI-Host': 'games-details.p.rapidapi.com',
//   },
// });

const RapidServer = axios.create({
  baseURL: 'https://steam2.p.rapidapi.com/appDetail/',
  headers: {
    'X-RapidAPI-Key': RAPID_API_KEY,
    'X-RapidAPI-Host': 'steam2.p.rapidapi.com',
  },
});

export const getUserSummary = async (userId, callback) => {
  try {
    const response = await SteamServer.get(
      `ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_KEY}&steamids=${userId}`
    );
    callback(response.data.response.players);
  } catch {
    console.log('Error fetching user summary');
    callback(null);
  }
};

export const getUserOwnedGames = async (userId, callback) => {
  try {
    const response = await SteamServer.get(
      `IPlayerService/GetOwnedGames/v0001/?key=${STEAM_KEY}&steamid=${userId}&include_appinfo=1`
    );
    callback(response.data.response);
  } catch {
    console.log('Error fetching user owned games');
    callback(null);
  }
};

export const getUserFriends = async (userId, callback) => {
  try {
    const response = await SteamServer.get(
      `ISteamUser/GetFriendList/v0001/?key=${STEAM_KEY}&steamid=${userId}`
    );
    callback(response.data.friendslist.friends);
  } catch {
    console.log('Error fetching user friends');
    callback(null);
  }
};

export const getGameDetailsSteamApi = async (appId, callback) => {
  const response = await RapidServer.get(appId);
  callback(response.data);
};

export const getGameDetailsSteamApiV2 = async (appId, callback) => {
  const response = await SteamStoreServer.get(
    `api/appdetails?key=${STEAM_KEY}&cc=us&appids=${appId}`
  );
  callback(response.data[appId].data);
};
