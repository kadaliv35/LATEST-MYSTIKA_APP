export const LOGIN_URL = {
  userRegister: "/auth/userRegistration",
  loginUser: "/auth/login",
  sentVerficationCode: "/auth/forgetPassword",
  resetPassword: "/auth/resetPassword",
  getMasterCharacters: '/character/getMasterCharacters'
};

export const DAILY_LOGIN_BOUNTY_URL = {
  getbounty: "/auth/getUserByName",
  postuserBounty: "/cliamDayReward",
};

export const LEADERBOARD_URL = {
  getDailyCharList: "/leaderBoard/getCharacterwiseDailyRanksList",
  getWeeklyCharList: "/leaderBoard/getCharacterwiseWeeklyRanksList",
  getDailyList: "/leaderBoard/getDailyleaderBoardList",
  getWeeklyList: "/leaderBoard/getWeeklyleaderBoardList",
  getCharDailyRank: "/leaderBoard/getCharacterDailyRank",
  getCharWeekRank: "/leaderBoard/getCharacterWeeklyUserRank",
  getUserDailyRank: "/leaderBoard/getDailyRank",
  getUserWeekRank: "/leaderBoard/getWeeklyUserRank"
}

export const LEARNING_TRAVEN_URL = {
  getAllVideos: "/videos/listAllVideos",
  getVideoDetails: "/videos/getVideoDetails",
  getAllBlogs: "/blog/listAllBlogs",
  getBlogCategories: "/blog/getCategories",
  getBlogDetails: "/blog/getBlogDetails",
  createBlog: '/blog/createBloagByUser'
};

export const MAP_FUNCTION_URL = {
  getAssginedPlace: '/map/getAssginedPlace',
  getAllMap: '/map/all',
  getAllElements: '/map/getAllElements',
  combateClash: '/map/combateClash',
  getMapReward: '/map/checkForMapReward',
  saveCuurentPlace: '/map/saveCurrentPlace',
  userEnemy: '/map/userCobateEnemyList',
  claimMapReward: '/claimMapRewards'
}

export const GOAL_SERVICE_URL = {
  getDecks: '/goals/listUserDecks',
  createGoal: '/goals/createGoal',
  goalCompleteByUser: '/goals/goalCompleteByUser',
  getGoalCard: '/goals/getGoalCard',
  buyGoalCard: '/goals/buyGoalCard',
  buyNewDeck: '/goals/buyNewDeck'
};

export const ACHIVEMENT_SERVICES_URL = {
  getAlLAchivements: '/achivement/all',
  claimReward: '/claimAchivementReward',
  dailyRank: '/leaderBoard/getCharacterDailyRank',
  weeklyRank: '/leaderBoard/getCharacterWeeklyUserRank'
}

export const HEALTH_SERVICES_URL = {
  getPotionCoins: '/store/getHealthPortoionDetails',
  buyPortionCoins: '/store/buyHealthPortionsWithCoins'
}

export const TREASURE_QUEST_SERVICES_URL = {
  getAllQuest: '/auth/getUser',
  updatedTChestStatus: '/claimTresureChestReward'
}

export const DAILY_QUEST_SERVICES_URL = {
  claimDailyQuestRewards: '/claimDailyQuestRewards'
}

export const TRAVELL_SERVICE_URL = {
  travelHere: '/map/saveCurrentPlace'
}