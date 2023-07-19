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
export const LEARNING_TRAVEN_URL = {
  getAllVideos: "/videos/listAllVideos",
  getVideoDetails: "/videos/getVideoDetails",
  getAllBlogs: "/blog/listAllBlogs",
  getBlogDetails: "/blog/getBlogDetails",
  createBlog: '/blog/createBloagByUser'
};

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
  claimReward: '/claimAchivementReward'
}

export const TREASURE_QUEST_SERVICES_URL = {
  getAllQuest: '/auth/getUser',
  updatedTChestStatus: '/updatedTChestStatus'
}

export const DAILY_QUEST_SERVICES_URL = {
  claimDailyQuestRewards: '/claimDailyQuestRewards'
}

