# MERN-Ecommerce

Cập nhật lại đồ án Webside bán hàng + thanh toán

Dự án code 2019 sau này mới push lên git. Cần support hay tư vấn gì add tele anh 0374742756

Environment anh đã quên rùi nên mấy em tham khảo lại thôi.

Gợi ý BE nên deploy Netlify còn client(FE) nên deploy Vercel cho nhanh

Code nếu đọc thì nên migration sang version mới nhất của các thư viện để xài

Database: MongoDB (Atlas), Cloudinary (Lưu images)

Backend: NodeJS + ExpressJS (Framework)

Fontend: React

UI: TailwindCSS / CSS. (CSS này mấy em migration sang SCSS đi).

Đầy đủ các tính năng thêm xoá sửa tìm kiếm sắp xếp

Hỗ trợ thanh toán Paypal

Đã kiểm tra responsive các kích cỡ màng hình thông dụng

Giao diện khách hàng có trong Demo bên dưới được deploy bằng heroku

Demo <https://minh-react-ecommerce.herokuapp.com/> (Die từ 2022)

Giao diện ADMIN

![alt text](https://res.cloudinary.com/anh-minh/image/upload/v1627641420/Demo/1_owgwat.png)

Giao diện thêm Products

![alt text](https://res.cloudinary.com/anh-minh/image/upload/v1627641576/Demo/2_lrsrij.png)

Giao diện thêm Category

![alt text](https://res.cloudinary.com/anh-minh/image/upload/v1627641638/Demo/3_tbmmaw.png)

Giao diện Check lịch sử mua hàng của các user

![alt text](https://res.cloudinary.com/anh-minh/image/upload/v1627641774/Demo/4_wzwfnr.png)

### FIX Error

**Error message "error:0308010C:digital envelope routines::unsupported"**

For Windows, use the below command in cmd:

```bash
set NODE_OPTIONS=--openssl-legacy-provider
```

For Unix, use:

```bash
export NODE_OPTIONS=--openssl-legacy-provider
```
