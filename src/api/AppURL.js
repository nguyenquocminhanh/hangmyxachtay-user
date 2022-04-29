class AppURL {
    static BaseURL = "http://192.241.134.90/api";

    static VisitorDetails = this.BaseURL + '/getvisitor';
    static PostContact = this.BaseURL + '/postcontact';
    static AllSiteInfo = this.BaseURL + '/allsiteinfo';
    static AllCategory = this.BaseURL + '/allcategory';
    static AllHomeSlider = this.BaseURL + '/allslider';
    static ProductListByRemark(remark) {
        return this.BaseURL + '/productlistbyremark/' + remark;
    }

    static ProductListByCategory(category) {
        return this.BaseURL + '/productlistbycategory/' + category;
    } 
    static ProductListBySubCategory(category, subcategory) {
        return this.BaseURL + '/productlistbysubcategory/' + category + '/' + subcategory;
    } 

    static ProductListBySearch(searchKey) {
        return this.BaseURL + '/search/' + searchKey;
    } 

    static SimilarProductList(subcategory) {
        return this.BaseURL + '/similar/' + subcategory;
    } 


    static ProductDetails(code) {
        return this.BaseURL + '/productdetails/' + code;
    } 

    // REVIEW //
    static ProductReviews(code) {
        return this.BaseURL + '/reviewlist/' + code;
    } 
    static PostReview = this.BaseURL + '/postreview';


    static NotificationHistory = this.BaseURL + '/notification';



    // CART //
    static AddToCart = this.BaseURL + '/addtocart';
    static CartCount(email) {
        return this.BaseURL + '/cartcount/' + email;
    } 
    static CartList(email) {
        return this.BaseURL + '/cartlist/' + email;
    } 
    static RemoveCartList(id, email) {
        return this.BaseURL + '/removecartlist/' + id + '/' + email;
    } 
    static CartItemPlus(id, quantity, price, email) {
        return this.BaseURL + '/cartitemplus/' + id + '/' + quantity + '/' + price + '/' + email;
    } 
    static CartItemMinus(id, quantity, price, email) {
        return this.BaseURL + '/cartitemminus/' + id + '/' + quantity + '/' + price + '/' + email;
    } 
    static CartOrder = this.BaseURL + '/cartorder';
    static OrderListByUser(email) {
        return this.BaseURL + '/orderlistbyuser/' + email;
    } 
    static CancelOrder(id) {
        return this.BaseURL + '/cancelorder/' + id;
    } 
    static CheckSoldOut(id) {
        return this.BaseURL + '/checksoldout/' + id;
    }


    // FAVOURITE //
    static AddToFavourite(product_code, email, product_id) {
        return this.BaseURL + '/addfavourite/' + product_code + '/' + email + '/' + product_id;
    } 
    static FavouriteList(email) {
        return this.BaseURL + '/favouritelist/' + email;
    } 
    static RemoveFavourite(product_code, email) {
        return this.BaseURL + '/removefavourite/' + product_code + '/' + email;
    } 




    // APP AUTHENTICATION //
    static UserLogin = this.BaseURL + '/login';
    static UserRegister = this.BaseURL + '/register';
    static UserData = this.BaseURL + '/user';
    static UserForget = this.BaseURL + '/forgetpassword';
    static UserReset = this.BaseURL + '/resetpassword';
    static UserChange = this.BaseURL + '/changepassword';

    static UserProfileUpdate = this.BaseURL + '/user/updateprofile';

    static UserImageUpload = this.BaseURL + '/user/uploadimage';
}

export default AppURL