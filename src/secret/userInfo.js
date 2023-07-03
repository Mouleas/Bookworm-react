import CryptoJS from "crypto-js";

const user = {
    userId: -1,
    userName: "",
    userEmail: "",
    userPassword: "",
    userPhone: "",
    userAccount: "",
};

let secretKey = "usersecretlocker";

export async function setUserData(data) {
    if (data) {
        user.userId = data.userId;
        user.userName = data.userName;
        user.userPassword = data.userPassword;
        user.userEmail = data.userEmail;
        user.userPhone = data.userPhone;
        user.userAccount = data.userAccount;

        var encryptedData = CryptoJS.AES.encrypt(
            JSON.stringify(user),
            secretKey
        );
        var userLocalStorage = localStorage.getItem("user") || 0;
        if (userLocalStorage === 0) {
            localStorage.setItem("user", encryptedData);
        }
        return 0;
    }
    return 0;
}

export async function getUserData() {
    var userLocalStorage = localStorage.getItem("user") || 0;
    if (userLocalStorage !== 0) {
        var decryptedData = CryptoJS.AES.decrypt(
            localStorage.getItem("user"),
            secretKey
        );
        return JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));
    }
}

export async function deleteUserData() {
    localStorage.removeItem("user");
    return 0;
}
