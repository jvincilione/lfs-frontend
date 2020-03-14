import Cookies from "js-cookie";

const User = (function () {
  const roles = {
    0: "Administrator",
    1: "Company Admin",
    2: "Staff",
    3: "Guest"
  };
  return {
    getType() {
      const user = this.getUserFromJWT();
      return user.userType;
    },
    getId() {
      const user = this.getUserFromJWT();
      return user.id;
    },
    getRoleName(userType) {
      if (userType) {
        return roles[userType];
      }
      const user = this.getUserFromJWT();
      return roles[user.userType];
    },
    getEmail() {
      const user = this.getUserFromJWT();
      return user.email;
    },
    getFullName() {
      const user = this.getUserFromJWT();
      if (!user.lastName) {
        return "";
      }
      return user.firstName + " " + user.lastName;
    },
    getUserFromJWT() {
      const token = Cookies.get("lfs-auth-token");
      if (!token) {
        return {};
      }
      return JSON.parse(atob(token.split(".")[1]));
    },
    logoutUser() {
      Cookies.remove("lfs-auth-token");
      window.location.reload();
    },
    isAuthenticated() {
      const user = this.getUserFromJWT();
      if (!user || !user.exp || Date.now() >= user.exp * 1000) {
        Cookies.remove("lfs-auth-token");
        return false;
      }
      return true;
    },
    hasCompanyEditPrivs(companyId) {
      const user = this.getUserFromJWT();
      return user.companies.includes(companyId) || user.companyId === companyId;
    },
    getCompaniesCount() {
      const user = this.getUserFromJWT();
      return user.companies.length;
    },
    getJWT() {
      return Cookies.get("lfs-auth-token");
    },
    getCompanyId() {
      const user = this.getUserFromJWT();
      return user.companyId;
    }
  };
})();

export default User;
