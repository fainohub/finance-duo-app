const TOKEN_KEY = 'access_token';
const USER_FIRSTNAME = 'user_first_name';
const USER_LASTNAME = 'user_last_name';
const USER_EMAIL = 'user_email';
const USER_AVATAR = 'user_avatar';
const STUDIO_NAME = 'studio_name';
const STUDIO_URL = 'studio_url';
const CHALLENGE_STATUS = 'user_challenge_status';

const StorageService = {
  getUser() {
    return {
      'firstName': localStorage.getItem(USER_FIRSTNAME),
      'lastName': localStorage.getItem(USER_LASTNAME),
      'email': localStorage.getItem(USER_EMAIL),
      'avatar': localStorage.getItem(USER_AVATAR),
      'studioName': localStorage.getItem(STUDIO_NAME),
      'studioUrl': localStorage.getItem(STUDIO_URL),
      'challengeStatus': localStorage.getItem(CHALLENGE_STATUS)
    };
  },

  saveUser(firstName, lastName, email, avatar, studioName, studioUrl, userChallengeStatus) {
    localStorage.setItem(USER_FIRSTNAME, firstName);
    localStorage.setItem(USER_LASTNAME, lastName);
    localStorage.setItem(USER_EMAIL, email);
    localStorage.setItem(USER_AVATAR, avatar);
    localStorage.setItem(STUDIO_NAME, studioName);
    localStorage.setItem(STUDIO_URL, studioUrl);
    localStorage.setItem(CHALLENGE_STATUS, JSON.stringify(userChallengeStatus));
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  saveToken(accessToken) {
    localStorage.setItem(TOKEN_KEY, accessToken);
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_FIRSTNAME);
    localStorage.removeItem(USER_LASTNAME);
    localStorage.removeItem(USER_EMAIL);
    localStorage.removeItem(USER_AVATAR);
    localStorage.removeItem(STUDIO_NAME);
    localStorage.removeItem(STUDIO_URL);
    localStorage.removeItem(CHALLENGE_STATUS);
  },

  getAwsLink() {
    return process.env.AWS_LINK;
  }
};

export {StorageService};
