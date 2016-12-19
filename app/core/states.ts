
export const mainState = {
    name: "main",
    template: "<main layout-fill/>",
};

export const homeState = {
    parent: "main",
    name: "home",
    url: "/",
    template: "<home/>",
};

export const loginState = {
	name: "login",
	url: "/login",
    template: "<cp-login-form/>",	
}

export const logoutState = {
    name: "logout",
    template: "",
    controller: ["$state", "Parse", ($state, Parse) => {
        Parse.User.logOut().then(r => $state.go("login", {location:"replace"}))
    }]
}
